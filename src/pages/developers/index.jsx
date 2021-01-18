import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import TopNav from "../../components/topNav";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

import api from "../../services/api";

import "./styles.css";

function Developers() {
  const [dataDevelopers, setDataDevelopers] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      api.get("developers").then((response) => {
        setDataDevelopers(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setDataDevelopers]);

  async function handleNextPage(event) {
    event.preventDefault();
    const response = await api.get(`${dataDevelopers.next}`);
    setDataDevelopers(response.data);
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  async function handlePrevPage(event) {
    event.preventDefault();
    const response = await api.get(`${dataDevelopers.prev}`);
    setDataDevelopers(response.data);
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  async function handleSearchDeveloper(event) {
    event.preventDefault();
    const response = await api.get("developers", {
      params: {
        name,
      },
    });
    setDataDevelopers(response.data);
  }

  if (!dataDevelopers) {
    return <p>carregando...</p>;
  }
  return (
    <>
      <TopNav>
        <Link to="/novo" className="add">
          <FaPlus />
        </Link>
      </TopNav>

      <div className="content">
        <form
          action=""
          onSubmit={handleSearchDeveloper}
          className="form-search"
        >
          <input
            type="text"
            name="name"
            className="input-search"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button type="submit" className="submit-search">
            <FaSearch color="#ccc" />
          </button>
        </form>

        {dataDevelopers.data.map((developer) => {
          return (
            <Card
              key={developer.id}
              name={developer.name}
              age={developer.age}
              birth={developer.birth}
              gender={developer.gender}
              hobby={developer.hobby}
              id={developer.id}
            />
          );
        })}

        <div className="button-navigation">
          <button onClick={handleNextPage} className="next-button">
            Proximo
          </button>
          <button onClick={handlePrevPage} className="prev-button">
            Anterior
          </button>
        </div>
      </div>
    </>
  );
}

export default Developers;
