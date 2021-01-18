import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import TopNav from "../../components/topNav";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Admin() {
  const history = useHistory();
  const [dataDevelopers, setDataDevelopers] = useState();

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
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  async function handlePrevPage(event) {
    event.preventDefault();
    const response = await api.get(`${dataDevelopers.prev}`);
    setDataDevelopers(response.data);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  const handleViewDeveloper = (id) => {
    history.push(`/detalhes/${id}`);
  };

  const handleEditDeveloper = (id) => {
    history.push(`/edit/${id}`);
  };

  async function handleDeleteDeveloper(id) {
    try {
      await api.delete(`developers/${id}`).then((res) => {
        api.get("developers").then((response) => {
          setDataDevelopers(response.data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!dataDevelopers) {
    return <div className="loading">carregando...</div>;
  }

  return (
    <>
      <TopNav>
        <Link to="" className="back">
          <FaArrowLeft />
        </Link>
        <Link to="/novo" className="add">
          <FaPlus />
        </Link>
      </TopNav>

      <div className="content">
        <div className="table-responsive">
          <table border="0">
            <thead>
              <tr>
                <th className="name">Nome</th>
                <th className="birth">Dt. Nascimento</th>
                <th className="age">Idade</th>
                <th className="age">Sexo</th>
                <th className="action">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dataDevelopers.data.map((developer) => {
                return (
                  <tr key={developer.id}>
                    <td>{developer.name}</td>
                    <td>{developer.birth}</td>
                    <td>{developer.gender}</td>
                    <td>{developer.age}</td>
                    <td className="action-icons">
                      <FaEye
                        onClick={() => handleViewDeveloper(developer.id)}
                        className="btn-acrion"
                      />
                      <FaPen
                        onClick={() => handleEditDeveloper(developer.id)}
                        className="btn-acrion"
                      />
                      <FaTrash
                        onClick={() => handleDeleteDeveloper(developer.id)}
                        className="btn-acrion"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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

export default Admin;
