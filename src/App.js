import React from "react";
import LuaAtual from "./components/luaComponente";
import TempoAtual from "./components/tempoComponente";
import ClimaAtual from "./components/climaComponente";
import ConstelacaoAtual from "./components/constelacaoComponente";
import LuaImagem from "./components/luaImagem";
import './styles.css';


function App() {
  return (
    <div className="App">
    <TempoAtual/>
    <ClimaAtual/>
    <LuaAtual/>
    <LuaImagem/>
    <ConstelacaoAtual/>
    </div>
  );
};

export default App;
