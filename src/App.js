import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import ProjectsTab from "./components/ProjectsTab";
import Status from "./components/Status";
import TopBar from "./components/TopBar";
import Login from "./pages/Login";
import SignIn from "./components/login/SignIn";
import Register from "./components/login/Register";
import { useSelector } from "react-redux";
import CreateTaskModal from "./components/CreateTaskModal";
import SharedMainLayout from "./components/main/SharedMainLayout";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Boards from "./pages/Boards";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import Chat from "./pages/Chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/main" element={<SharedMainLayout />}>
          <Route index element={<Project />}></Route>
          <Route path="projects/:projectId" element={<Projects />}>
          </Route>
          <Route path="projects/:projectId/boards" element={<Boards />} />
          <Route path="projects/:projectId/files" element={<Files />} />
          <Route path="dashboard" element={<Dashboard/>}></Route>
         <Route path="chats" element={<Chat/>}></Route>
        </Route>
      </Routes>

      {/* {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-overlay z-30"></div>
      )}
      <div className="flex">
        {isOpen && <CreateTaskModal />}
        <NavBar />
        <div className="flex flex-col  px-8 pt-8 h-screen overflow-hidden">
          <TopBar />
          <Status />
          <ProjectsTab />
          <Calendar />
        </div>
      </div> */}
    </BrowserRouter>
  );
}

export default App;
