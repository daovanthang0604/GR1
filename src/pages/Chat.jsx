import React, { useState, useEffect, useRef } from "react";
import {
  UserAddIcon,
  SearchIcon,
  LinkIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";
import { create } from "@mui/material/styles/createTransitions";
import { io } from "socket.io-client";
const Chat = () => {
  const serverURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;
  const [isUserSeletected, setIsUserSelected] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [receiver, setReceiver] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState("");
  const [createConversationId, setCreateConversationId] = useState("");
  const { users } = useSelector((store) => store.users);
  const { currentUser } = useSelector((store) => store.user);
  const scrollRef = useRef();
  const receiverOptions = users.filter((u) => u.email !== currentUser.email);
  //implement socket
  const socket = useRef();
  useEffect(() => {
    socket.current = io(`${serverURL}`)
    socket.current.on("getMessage", data=>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      })
    })
  }, []);
  useEffect(()=>{
    arrivalMessage && (receiver === arrivalMessage?.sender) &&
    setMessages(prev=>[...prev, arrivalMessage])
  },[arrivalMessage,receiver])
  useEffect(() => {
    socket.current.emit("addUser",currentUser._id)
    socket.current.on("getUsers",users=>{
      console.log(users)
    })
  }, [socket.current]);

  const getConversations = async () => {
    try {
      const res = await axios.get(
        `${serverURL}/api/conversations/` + currentUser._id,
        {
          withCredentials: true,
        }
      );
      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMessages = async (chatId) => {
    try {
      const res = await axios.get(
        `${serverURL}/api/messages/` + chatId,
        {
          withCredentials: true,
        }
      );
      setMessages(res.data);
    } catch (err) {
      console.log("Error getting the messages", err);
    }
  };
  const createConversation = async (senderId, receiverId) => {
    try {
      const response = await axios
        .post(
          `${serverURL}/api/conversations/`,
          { senderId, receiverId },
          {
            withCredentials: true,
          }
        )
          return response.data?._id
    } catch (error) {
      console.log("Error creating conversation", error);
    }
  };
  useEffect(() => {
    getConversations();
  }, []);
  console.log(conversations);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isExist = false;
    let backupConversationId;
    console.log(receiver)
    // check if conversation between 2 people exist?
    for (const conv of conversations) {
      if (
        conv.members.includes(currentUser._id) &&
        conv.members.includes(receiver)
      ) {
        isExist = true;
        if (isExist === true) {
          backupConversationId = conv._id;
        }
        break;
      }
    }
    console.log(isExist);
    // if not exist then create a new one
    if (!isExist) { const newConversationId = await createConversation(currentUser._id, receiver);
    backupConversationId = newConversationId;
    getConversations();
    };
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: backupConversationId,
    };
    socket.current.emit("sendMessage",{
      senderId: currentUser._id,
      receiverId: receiver,
      text: newMessage,
    })
    try {
      const res = await axios.post(
        `${serverURL}/api/messages/`,
        message,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("Error sending message", error);
    }
    if (receiver) {
      const friend = users.find((user) => user._id === receiver);
      setUserSelected(friend);
    }
    setNewMessage("");
    setIsUserSelected(true);
    getMessages(backupConversationId);
  };

  const handleChat = async (chatId, friend) => {
    console.log(chatId);
    setReceiver(friend._id);
    getMessages(chatId);
    setIsUserSelected(true);
    setUserSelected(friend);
  };
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth",block: "end"})
  },[messages])
  return (
    <div>
      <div className="text-2xl font-semibold">Chat</div>
      <div className="mt-8 flex rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[45rem]">
        {/* contact */}
        <div className="w-1/4 border-r border-gray-200 flex flex-col gap-4">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <img
                src={currentUser?.image}
                alt="current-user"
                className="w-10 h-10 rounded-full"
              />
              <UserAddIcon
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={() => setIsUserSelected(false)}
              />
            </div>
            <div className="relative">
              <SearchIcon className="w-6 h-6 absolute top-1/2 transform translate-y-[-50%] translate-x-2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="py-3 pl-10 w-full rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* users */}
          <div className="flex flex-col overflow-y-auto h-[30rem] scrollbar">
            {conversations.map((con) => {
              const friendId = con.members.find((m) => m !== currentUser._id);
              const friend = users.find((user) => user._id === friendId);
              return (
                <div
                  className="flex hover:bg-gray-300"
                  key={con._id}
                  onClick={() => handleChat(con._id, friend)}
                >
                  <div className="p-4 flex items-center gap-4">
                    <img
                      src={friend?.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold">{friend?.fullName}</p>
                      <p className="font-light">{friend?.email}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* conversation */}
        <div className="w-full flex flex-col">
          <div className="w-full border-b border-slate-300 h-20">
            {!isUserSeletected ? (
              <div className="flex items-center gap-4 p-4">
                <span className="transform translate-y-2">To: </span>
                <div className="w-1/2">
                  <Autocomplete
                    disablePortal
                    id="tags-standard"
                    options={receiverOptions}
                    sx={{ width: "100%" }}
                    getOptionLabel={(option) => option.email}
                    onChange={(e, v) => {
                      console.log(v);
                      setReceiver(v?._id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Email"
                        placeholder="Recipient"
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center h-full ml-4">
                <div className="flex items-center gap-4">
                  <img
                    src={userSelected?.image}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <p>{userSelected?.fullName}</p>
                </div>
              </div>
            )}
          </div>

          {isUserSeletected ? (
            <div className="h-[calc(100%-9rem)] overflow-y-auto scrollbar p-2"  >
              <div ref={scrollRef}>
              {messages.map((mess) => {
                if (mess?.sender === currentUser._id)
                  return (
                    <div
                      className="flex items-center gap-2 flex-row-reverse mt-4"
                      key={mess._id}
                    >
                      <img
                        src={currentUser?.image}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="rounded-md p-2 bg-[#C8FAD6] max-w-xs">
                          {mess.text}
                        </p>
                        <p className="text-xs text-[#A6B1BB] ml-auto">
                          {format(mess.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                else
                  return (
                    <div
                      className="flex items-center gap-2 mt-4"
                      key={mess._id}
                    >
                      <img
                        src={userSelected?.image}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <span className="text-[#A6B1BB] text-sm">
                          {userSelected?.fullName}
                        </span>
                        <p className="rounded-md p-2 bg-[#F4F6F8] max-w-xs">
                          {mess.text}
                        </p>
                        <p className="text-xs text-[#A6B1BB]">
                          {format(mess.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
              })}
                            </div>
            </div>
          ) : (
            <div className="h-[calc(100%-9rem)] overflow-y-auto scrollbar p-2"></div>
          )}
          {/* chat text */}
          <form
            className="border-t border-t-slate-300 flex items-center gap-2 h-16"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Type a message"
              className="py-4 pl-8 w-[90%] outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <LinkIcon className="w-6 h-6 cursor-pointer text-slate-400" />
            <button type="submit">
              <ArrowCircleRightIcon className="w-6 h-6 cursor-pointer text-ocean" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
