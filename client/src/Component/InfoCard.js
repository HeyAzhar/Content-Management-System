import React from "react";
import { Col } from "reactstrap";

const InfoCard = ({ infoImg, infoTitle, infoText }) => {
  return (
    <Col md={4} sm={12}>
      <div className="infoCard">
        <img className="icon" alt="" src={infoImg} />
        <div className="cardBody">
          <div className="cardTitle">
            <h3>{infoTitle}</h3>
            <p>{infoText}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default InfoCard;
