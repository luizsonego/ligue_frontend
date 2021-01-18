import React, { useEffect, useState } from "react";
import TopNav from "../../components/topNav";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import './styles.css'


function Developer() {
  const history = useHistory();
  const params = useParams();

  const [dataDeveloper, setDataDeveloper] = useState()

  useEffect(() => {
    try {
      api.get("developers/" + params.id).then((response) => {
        setDataDeveloper(response.data)
      })
    } catch (error) {
      
    }
  }, [setDataDeveloper])

  const handleBack = () => {
    history.goBack()
  }

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
    </TopNav>

    <div className="content">
      <div className="profile-picture"></div>
      <div className="profile-body">
        <p className="name">{dataDeveloper.name}</p>
        <p className="gender">{dataDeveloper.gender}</p>
        <p className="hobby">{dataDeveloper.hobby}</p>
        <p className="birth">{dataDeveloper.birth}</p>
        <p className="birth">{dataDeveloper.age}</p>
      </div>
    </div>

    </>
  );
}

export default Developer;
