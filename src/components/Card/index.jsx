import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Card({ name, gender, age, hobby, birth, id }) {
  const history = useHistory();

  const handleClickDeveloper = () => {
    history.push("/detalhes/" + id)
  }

  return (
    <>
      <div className="card" onClick={handleClickDeveloper}>
        
        <div className="card-head">
          <div className="profile-picture">
            <img src="https://picsum.photos/200/300?random=1" alt=""/>
          </div>
          <p>
            <span>{gender}</span>
            <span>{age}</span>
          </p>
        </div>

        <div className="card-body">
          <div className="description">
            <p className="name">{name}</p>
            <p className="hobby">{hobby}</p>
            <p className="birth">{birth}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
