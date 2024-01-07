import React from "react";
import "./imagecontainer.css";

const ImageContainer = (props) => {
  return (
    <div className="imageContainer">
      <img src={props.item["urls"]["regular"]} alt="" />
      <div className="imageDetails">
        <p className="name">{props.item.user.first_name}</p>
        <p className="description">{props.item.alt_description}</p>
        <p className="date">{props.item.created_at}</p>
      </div>
    </div>
  );
};

export default ImageContainer;
