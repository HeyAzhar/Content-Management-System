import React, { useContext } from "react";
import { ContentContext } from "../Context/Index";
import { Col, Row } from "reactstrap";

const Footer = () => {
  const context = useContext(ContentContext);
  return (
    <>
      <div className="footer">
        <Row>
          <Col>
            <h2>{context.content?.footerText}</h2>
          </Col>
        </Row>
      </div>
      <div className="credit">
        <Row>
          <Col>
            <p>&lt;Developed by Az/&gt;</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Footer;
