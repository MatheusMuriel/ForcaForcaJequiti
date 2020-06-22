import React, { useState, useEffect } from 'react';
import { socket } from "../../services/silvioSantos";

import "./styles.scss"

const Registro = () => {
  const [nome, setNome] = useState("");
  const [id, setID] = useState<number>();
  const [isRegister, setIsRegister] = useState<Boolean>(false);
  const [naoEncontrado, setNaoEncontrado] = useState<Boolean>(false);

  socket.on("jogador_nao_encontrado", () => {
    setNaoEncontrado(true);
  });

  socket.on("novo_id", (data: any) => {
    setID(data);
  });

  function handleChangeID(event: any) {
    const input = event.target.value;
    const clearedInput = input.replace(/\D/g, ''); 
    setID(clearedInput);
  }

  function handleChangeNome(event: any) {
    setNome(event.target.value);
  }

  function handleGerarID() {
    setIsRegister(true);
    socket.emit("gerar_id");
  }

  function handleRegister() {
    socket.emit("register_id", {id: id, nome: nome});
  }

  function handleLogin() {
    socket.emit("login_id", id);
  }

  return (
    <div className="formRegistro">
      <span className="login100-form-title">Bem Vindo</span>

      <div className="wrap-input100">
        <input className={id ? "input100 has-val" : "input100"} required
        disabled={!!isRegister} value={id} onChange={handleChangeID}></input>
        <span className="focus-input100" data-placeholder="ID"></span>
      </div>

      {(isRegister) && (
        <div className="wrap-input100 nome-input">
          <input className={nome ? "input100 has-val" : "input100"} required
            type="text" value={nome} onChange={handleChangeNome}></input>
          <span className="focus-input100" data-placeholder="Nome"></span>
        </div>
      )}

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          {(isRegister) 
          ? (
            <button className="login100-form-btn" 
              onClick={() => handleRegister()} disabled={!nome}>
              Registrar
            </button>
          ) 
          : (
            <button className="login100-form-btn" onClick={() => handleLogin()}>
              Login
            </button>
          )}
        </div>
      </div>

      <div className="text-center p-t-115">
        {naoEncontrado && <a className="error">Jogador não encontrado...</a>}
        <br/>
        <span className="txt1">
          Não tem um ID?&nbsp;&nbsp;
        </span>

        <a className="txt2" href="#" onClick={() => handleGerarID()}>
          Clique aqui
        </a>
      </div>
    </div>
  );
}

export default Registro;
