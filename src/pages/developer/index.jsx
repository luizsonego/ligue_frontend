import React, { useEffect, useState } from "react";
import TopNav from "../../components/topNav";
import { FaPlus, FaArrowLeft, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

function Developer() {
  const params = useParams();

  const [dataDeveloper, setDataDeveloper] = useState();

  useEffect(() => {
    try {
      api.get("developers/" + params.id).then((response) => {
        setDataDeveloper(response.data);
      });
    } catch (error) {}
  }, [params.id]);

  if (!dataDeveloper) {
    return <p>carregando...</p>;
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
        <Link to="/admin" className="add">
          <FaUser />
        </Link>
      </TopNav>

      <div className="content">
        <div className="profile-picture">
          <img src="https://picsum.photos/300/300?random=1" alt="" />
        </div>
        <div className="profile-body">
          <p className="name">{dataDeveloper.name} - <small>{dataDeveloper.age}</small></p>
          <p className="gender">{dataDeveloper.gender}</p>
          <p className="hobby">{dataDeveloper.hobby}</p>
          <p className="birth">{dataDeveloper.birth}</p>
        </div>
      </div>
    </>
  );
}

export default Developer;
