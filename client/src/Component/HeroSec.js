import React, { useContext, useState } from "react";
import { ContentContext } from "../Context/Index";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const HeroSec = () => {
  const context = useContext(ContentContext);

  //Button color effects
  const [adminHover, setAdminHover] = useState(false);
  const [demoHover, setDemoHover] = useState(false);

  const handleAdmin = () => {
    setAdminHover(!adminHover);
  };
  const handleDemo = () => {
    setDemoHover(!demoHover);
  };

  const adminColor = () => {
    if (adminHover) {
      return {
        backgroundColor: context.content?.primaryColor,
        color: context.content?.secondaryColor,
        border: `solid 2px ${context.content?.secondaryColor}`,
      };
    } else {
      return {
        backgroundColor: context.content?.secondaryColor,
        color: context.content?.primaryColor,
        border: `solid 2px ${context.content?.primaryColor}`,
      };
    }
  };

  const demoColor = () => {
    if (demoHover) {
      return {
        backgroundColor: context.content?.secondaryColor,
        color: context.content?.primaryColor,
        border: `solid 2px ${context.content?.primaryColor}`,
      };
    } else {
      return {
        backgroundColor: context.content?.primaryColor,
        color: context.content?.secondaryColor,
        border: `solid 2px ${context.content?.secondaryColor}`,
      };
    }
  };

  return (
    <Row>
      <Col sm={6}>
        <div className="heroText">
          <h1>{context.content?.heroText}</h1>
        </div>
        <div className="myBtn">
          <Link to="/admin/edit">
            <button
              style={adminColor()}
              onMouseEnter={handleAdmin}
              onMouseLeave={handleAdmin}
              className="adminBtn"
            >
              ADMIN
            </button>
          </Link>
          <Link to="/demo">
            <button
              style={demoColor()}
              onMouseEnter={handleDemo}
              onMouseLeave={handleDemo}
              className="demoBtn"
            >
              DEMO
            </button>
          </Link>
        </div>
      </Col>
      <Col sm={6}>
        <div className="imageSection">
          <img
            className="headerImage"
            src={context.content?.headerImage}
            alt=""
          />
        </div>
      </Col>
    </Row>
  );
};

export default HeroSec;
