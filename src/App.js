import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import ProjectsTab from "./components/ProjectsTab";
import Status from "./components/Status";
import TopBar from "./components/TopBar";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <div className="flex">
        <NavBar />
        <div className="flex flex-col  px-8 pt-8 h-screen overflow-hidden">
          <TopBar />
          <Status />
          <ProjectsTab />
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
