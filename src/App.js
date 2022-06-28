import NavBar from "./components/NavBar";
import ProjectsTab from "./components/ProjectsTab";
import Status from "./components/Status";
import TopBar from "./components/TopBar";
function App() {
  return (
    <div className="App">
      <div className="flex">
      <NavBar/>
      <div className="w-full p-8">
      <TopBar/>
      <Status/>
      <ProjectsTab/>
      </div>
    
      </div>
    </div>
  );
}

export default App;
