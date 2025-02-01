import logo from "./logo.svg";
import "./App.css";
import Section1 from "./components/section1";
import Section2 from "./components/section2";

function App() {
  return (
    <>
      <div className="overflow-hidden">
        <Section1 />
        <Section2 />
      </div>
    </>
  );
}

export default App;
