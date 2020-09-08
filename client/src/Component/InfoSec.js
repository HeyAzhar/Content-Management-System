import React, { useContext } from "react";
import { ContentContext } from "../Context/Index";
import { Row } from "reactstrap";
import InfoCard from "./InfoCard";

const InfoSec = () => {
  const context = useContext(ContentContext);

  return (
    <div className="infoSec">
      <Row>
        <InfoCard
          infoImg={context.content?.infoImgOne}
          infoTitle={context.content?.infoTitileOne}
          infoText={context.content?.infoTextOne}
        />
        <InfoCard
          infoImg={context.content?.infoImgTwo}
          infoTitle={context.content?.infoTitileTwo}
          infoText={context.content?.infoTextTwo}
        />
        <InfoCard
          infoImg={context.content?.infoImgThree}
          infoTitle={context.content?.infoTitileThree}
          infoText={context.content?.infoTextThree}
        />
      </Row>
    </div>
  );
};

export default InfoSec;
