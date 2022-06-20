import NavBar from "./components/NavBar";
import Status from "./components/Status";
import TopBar from "./components/TopBar";
function App() {
  return (
    <div className="App">
      <div className=" font-tt flex">
      <NavBar/>
      <div className="w-full p-8">
      <TopBar/>
      <Status/>
      </div>
    
      </div>
    </div>
  );
}

export default App;
