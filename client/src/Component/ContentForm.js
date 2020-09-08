import React, { useContext, useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { SketchPicker } from "react-color";
import { ContentContext } from "../Context/Index";

//===Components
import HeroSec from "./HeroSec";
import InfoSec from "./InfoSec";
import Footer from "./Footer";
import Header from "./Header";

const ContentForm = ({ handleImage, handleSubmit, endBtn }) => {
  const context = useContext(ContentContext);

  //===handle color state===
  //Primary
  const [colorPickerPrimary, setColorPickerPrimary] = useState(false);
  const handleColorPrimary = () => {
    setColorPickerPrimary(!colorPickerPrimary);
  };
  //Secondary
  const [colorPickerSecondary, setColorPickerSecondary] = useState(false);
  const handleColorSecondary = () => {
    setColorPickerSecondary(!colorPickerSecondary);
  };
  //===handle fields===
  const updateFields = (e) => {
    context.setContent({
      ...context.content,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Row>
      <Col lg={3} md={4}>
        <div className="form">
          <div className="formTitle">
            <h1>Let's Play</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            {/*=== Color Section ===*/}
            <div className="formDiv">
              <h4>Colors</h4>
              <FormGroup>
                <Label for="heroText"> Primay Color</Label>
                <div
                  style={{ backgroundColor: context.content?.primaryColor }}
                  className="colorButton"
                  onClick={handleColorPrimary}
                />
                {colorPickerPrimary ? (
                  <div className="colorPattle">
                    <div className="colorCover" onClick={handleColorPrimary} />
                    <SketchPicker
                      color={context.content?.primaryColor}
                      onChange={(color) => {
                        context.setContent({
                          ...context.content,
                          primaryColor: color.hex,
                        });
                      }}
                    />
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="heroText"> Seconday Color</Label>
                <div
                  style={{ backgroundColor: context.content?.secondaryColor }}
                  className="colorButton"
                  onClick={handleColorSecondary}
                />
                {colorPickerSecondary ? (
                  <div className="colorPattle">
                    <div
                      className="colorCover"
                      onClick={handleColorSecondary}
                    />
                    <SketchPicker
                      color={context.content?.secondaryColor}
                      onChange={(color) => {
                        context.setContent({
                          ...context.content,
                          secondaryColor: color.hex,
                        });
                      }}
                    />
                  </div>
                ) : null}
              </FormGroup>
            </div>
            {/*=== Hero Section ===*/}
            <div className="formDiv">
              <h4>Hero Section</h4>
              <FormGroup>
                <Label for="heroText"> Hero Text</Label>
                <Input
                  name="heroText"
                  id="heroText"
                  type="text"
                  value={context.content?.heroText}
                  onChange={updateFields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="headerImage"> Hero Image</Label>
                <Input
                  name="headerImage"
                  id="headerImage"
                  type="file"
                  onChange={handleImage}
                />
              </FormGroup>
            </div>
            {/*=== Card One ===*/}
            <div className="formDiv">
              <h4>Card One</h4>
              <FormGroup>
                <Label for="infoImgOne"> Card Image</Label>
                <Input
                  name="infoImgOne"
                  id="infoImgOne"
                  type="file"
                  onChange={handleImage}
                />
              </FormGroup>
              <FormGroup>
                <Label for="infoTitileOne">Card Title</Label>
                <Input
                  name="infoTitileOne"
                  id="infoTitileOne"
                  type="text"
                  value={context.content?.infoTitileOne}
                  onChange={updateFields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="infoTextOne">Card Text</Label>
                <Input
                  name="infoTextOne"
                  id="infoTextOne"
                  type="textarea"
                  value={context.content?.infoTextOne}
                  onChange={updateFields}
                />
              </FormGroup>
            </div>
            {/*=== Card Two ===*/}
            <div className="formDiv">
              <h4>Card Two</h4>
              <FormGroup>
                <Label for="infoImgTwo"> Card Image</Label>
                <Input
                  name="infoImgTwo"
                  id="infoImgTwo"
                  type="file"
                  onChange={handleImage}
                />
              </FormGroup>
              <FormGroup>
                <Label for="infoTitileTwo">Card Title</Label>
                <Input
                  name="infoTitileTwo"
                  id="infoTitileTwo"
                  type="text"
                  value={context.content?.infoTitileTwo}
                  onChange={updateFields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="infoTextTwo">Card Text</Label>
                <Input
                  name="infoTextTwo"
                  id="infoTextTwo"
                  type="textarea"
                  value={context.content?.infoTextTwo}
                  onChange={updateFields}
                />
              </FormGroup>
            </div>
            {/*=== Card Three ===*/}
            <div className="formDiv">
              <h4>Card Three</h4>
              <FormGroup>
                <Label for="infoImgThree"> Card Image</Label>
                <Input
                  name="infoImgThree"
                  id="infoImgThree"
                  type="file"
                  onChange={handleImage}
                />
              </FormGroup>
              <FormGroup>
                <Label for="infoTitileThree">Card Title</Label>
                <Input
                  name="infoTitileThree"
                  id="infoTitileThree"
                  type="text"
                  value={context.content?.infoTitileThree}
                  onChange={updateFields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="infoTextThree">Card Text</Label>
                <Input
                  name="infoTextThree"
                  id="infoTextThree"
                  type="textarea"
                  value={context.content?.infoTextThree}
                  onChange={updateFields}
                />
              </FormGroup>
            </div>
            {/*=== Footer Section ===*/}
            <div className="formDiv">
              <h4>Footer</h4>
              <FormGroup>
                <Label for="footerText">Footer Text</Label>
                <Input
                  name="footerText"
                  id="footerText"
                  type="text"
                  value={context.content?.footerText}
                  onChange={updateFields}
                />
              </FormGroup>
            </div>
            <button className="applyBtn" type="submit" onSubmit={handleSubmit}>
              Apply
            </button>
            {endBtn}
          </Form>
        </div>
      </Col>
      <Col lg={9} md={8}>
        <Header />
        <HeroSec />
        <InfoSec />
        <Footer />
      </Col>
    </Row>
  );
};

export default ContentForm;
