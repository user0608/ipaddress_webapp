import { useState } from "react";
import Calculadora from "./Calculadora"
import { CalculadoraVLSM } from "./CalculadoraVLSM";

const App = () => {
  const [sel, setSel] = useState(true)
  return (
    <div className="container">
      <div className="options">
        <span>Normal<input type="checkbox" checked={sel} onClick={() => setSel(true)} /></span>
        <span>VLSM<input type="checkbox" checked={!sel} onClick={() => setSel(false)} /></span>
      </div>
      {sel ?
        <Calculadora />
        :
        <CalculadoraVLSM />
      }
    </div>
  );
}

export default App;