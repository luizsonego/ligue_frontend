import React, { useState } from "react";
import { FaArrowLeft, FaPlus, FaUser } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";
import TopNav from "../../components/topNav";

import api from "../../services/api";

import "./styles.css";

function DeveloperCreate() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAge = new Date().getFullYear() - birth.split("-")[0];

    try {
      api
        .post("developers", {
          name,
          gender,
          age: newAge,
          hobby,
          birth,
        })
        .then(() => {
          history.push("/");
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <TopNav>
        <Link to="" className="back">
          <FaArrowLeft />
        </Link>
        <Link to="/novo" className="add">
          <FaPlus />
        </Link>
        <Link to="/admin" className="add">
          <FaUser />
        </Link>
      </TopNav>

      <div className="container">
        <form onSubmit={handleSubmit} className="form-create">
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-create"
            placeholder="Nome"
          />

          <textarea
            name="hobby"
            id="hobby"
            cols="30"
            rows="10"
            className="input-create"
            placeholder="Hobby"
            value={hobby}
            onChange={(event) => setHobby(event.target.value)}
          ></textarea>

          <input
            type="date"
            id="name"
            value={birth}
            onChange={(event) => setBirth(event.target.value)}
            className="input-create"
            placeholder="Data de nascimento"
          />

          <select
            name="gender"
            id="gender"
            className="input-create"
            onChange={(event) => setGender(event.target.value)}
            value={gender}
          >
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </>
  );
}

export default DeveloperCreate;
