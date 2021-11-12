import "./App.css";
import { Route, Routes } from "react-router-dom";
import BinMaker from "./components/BinMaker";
import BinList from "./components/BinList";
import { useEffect, useState } from "react";
function App() {
  const [minMax, setMinMax] = useState();
  const [binData, setBinData] = useState();
  const fetchBinList = async () => {
    let response = await fetch("http://localhost:8080/bins")
      .then((res) => res.json())
      .then((data) => setBinData(data));
  };
  const fetchBinLimits = async () => {
    let response = await fetch("http://localhost:8080/minMax")
      .then((res) => res.json())
      .then((data) => setMinMax(data));
  };
  useEffect(() => {
    fetchBinList();
    fetchBinLimits();
  }, []);
  return (
    <div className="App">
      <h1>Binning App</h1>

      <Routes>
        <Route path="/" element={<BinMaker limit={minMax} />} />
        <Route path="/bins" element={<BinList bins={binData} />} />
      </Routes>
    </div>
  );
}

export default App;
