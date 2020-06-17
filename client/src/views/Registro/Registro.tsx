import React, { useState, useEffect } from 'react';
import { socket } from "../../services/silvioSantos";

import "./styles.scss"

const Registro = () => {
  const [nome, setNome] = useState("");

  function handleChange(event: any){
    setNome(event.target.value)
  }

  function handleRegister(){
    socket.emit("novo_nome", nome);
  }

  return (
    <div className="formRegistro">
      <div className="mensagem">
        <p>Parece que você é novo por aqui...</p>
        <p>Qual é o seu nome?</p>
      </div>
      <div className="Inputgroup">
        <input type="text" placeholder="Ex: Arnaldo" value={nome} onChange={handleChange}/>
        <button onClick={() => handleRegister()}>Registrar</button>
      </div>
    </div>
  );
}

export default Registro;
