import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaUser } from "react-icons/fa";
import { useHistory, Link, useParams } from "react-router-dom";
import TopNav from "../../components/topNav";

import api from "../../services/api";

import "./styles.css";

function DeveloperUpdate() {
  const history = useHistory();
  const params = useParams();

  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    try {
      api.get(`developers/${params.id}`).then((response) => {
        const birthValue = response.data.birth.split("/");
        setName(response.data.name);
        setHobby(response.data.hobby);
        setBirth(`${birthValue[0]}-${birthValue[1]}-${birthValue[2]}`);
        setGender(response.data.gender);
        setAge(response.data.age);
      });
    } catch (error) {}
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      api
        .put(`developers/${params.id}`, {
          name,
          gender,
          age,
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
        <form onSubmit={handleSubmit} className="form-update">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-update"
            placeholder="Nome"
          />

          <label htmlFor="hobby">Hobby</label>
          <textarea
            name="hobby"
            id="hobby"
            cols="30"
            rows="10"
            className="input-update"
            placeholder="Hobby"
            value={hobby}
            onChange={(event) => setHobby(event.target.value)}
          ></textarea>

          <label htmlFor="birth">Data de narcimento</label>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={(event) => setBirth(event.target.value)}
            className="input-update"
            placeholder="Data de nascimento"
          />

          <label htmlFor="age">Idade</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="input-update"
            placeholder="Idade"
          />

          <label htmlFor="gender">Sexo</label>
          <select
            name="gender"
            id="gender"
            className="input-update"
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

export default DeveloperUpdate;
