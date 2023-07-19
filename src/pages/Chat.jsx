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
const Chat = () => {
  const [isUserSeletected, setIsUserSelected] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [receiver, setReceiver] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [createConversationId, setCreateConversationId] = useState("");
  const { users } = useSelector((store) => store.users);
  const { currentUser } = useSelector((store) => store.user);
  const scrollRef = useRef();
  const receiverOptions = users.filter((u) => u.email !== currentUser.email);
  console.log(receiverOptions);
  const getConversations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/conversations/" + currentUser._id,
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
        "http://localhost:8800/api/messages/" + chatId,
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
      await axios
        .post(
          "http://localhost:8800/api/conversations/",
          { senderId, receiverId },
          {
            withCredentials: true,
          }
        )
        .then((res) => setCreateConversationId(res?.data._id));
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
    // check if conversation between 2 people exist?
    for (const conv of conversations) {
      if (
        conv.members.includes(currentUser._id) &&
        conv.members.includes(receiver)
      ) {
        isExist = true;
        if (isExist === true) {
          backupConversationId = conv._id;
          setCreateConversationId(conv._id);
        }
        break;
      }
    }
    console.log(createConversationId);
    console.log(isExist);
    // if not exist then create a new one
    if (!isExist) createConversation(currentUser._id, receiver);
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: createConversationId
        ? createConversationId
        : backupConversationId,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/messages/",
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
    createConversationId
      ? getMessages(createConversationId)
      : getMessages(backupConversationId);
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
                      setReceiver(v._id);
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
