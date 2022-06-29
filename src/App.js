import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import ProjectsTab from "./components/ProjectsTab";
import Status from "./components/Status";
import TopBar from "./components/TopBar";
function App() {
  return (
    <div className="App">
      <div className="flex">
        <NavBar />
        <div className="w-[calc(100%-300px)] p-8">
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
