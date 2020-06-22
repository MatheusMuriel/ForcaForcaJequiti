import React, { useState, useEffect } from 'react';
import { socket } from "../../services/silvioSantos";

import "./styles.scss"

const Registro = () => {
  const [nome, setNome] = useState("");
  const [id, setID] = useState<number>();

  function handleChange(event: any){
    setID(event.target.value)
  }

  function handleRegister(){
    console.log(id);
    //socket.emit("novo_nome", nome); // TODO, mudar nome da mensagens
  }

  function handleLogin(){
    console.log(id);
    //socket.emit("novo_nome", nome); // TODO, mudar nome da mensagens
  }

  return (
    <div className="formRegistro">
      <span className="login100-form-title">Bem Vindo</span>
      
      <div className="wrap-input100">
        <input className="input100" type="number" value={id} onChange={handleChange} ></input>
        <span className="focus-input100" data-placeholder="ID"></span>
      </div>

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
      </div>

      <div className="text-center p-t-115">
        <span className="txt1">
          Não tem um ID?&nbsp;&nbsp;
        </span>

        <a className="txt2" href="#">
          Clique aqui
        </a>
      </div>
    </div>
  );
}

export default Registro;
