import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import ProjectsTab from "./components/ProjectsTab";
import Status from "./components/Status";
import TopBar from "./components/TopBar";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import CreateTaskModal from "./components/CreateTaskModal";
function App() {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <div className="App">
      <Login/>
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
    </div>
  );
}

export default App;
