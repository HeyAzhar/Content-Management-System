import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Axios from "axios";

//=== Components
import { ContentContext } from "./Context/Index";
import Header from "./Component/Header";
import HeroSec from "./Component/HeroSec";
import InfoSec from "./Component/InfoSec";
import Footer from "./Component/Footer";
import ContentForm from "./Component/ContentForm";
import AdminPanel from "./Component/adminPanel";
// import { API } from "../../backend";
// require("dotenv").config();

const App = () => {
  const [content, setContent] = useState({});
  const [checkLog, setCheckLog] = useState(false);
  const [token, setToken] = useState(null);
  const API = "https://cms-webapp.herokuapp.com/";

  const fetchContnet = async () => {
    try {
      const { data } = await Axios.get(API + "az/content");
      const raw = data[0];
      setContent({
        primaryColor: raw.primaryColor,
        secondaryColor: raw.secondaryColor,
        headerImage: API + raw.headerImage,
        heroText: raw.heroText,
        infoImgOne: API + raw.infoImgOne,
        infoImgTwo: API + raw.infoImgTwo,
        infoImgThree: API + raw.infoImgThree,
        infoTitileOne: raw.infoTitileOne,
        infoTitileTwo: raw.infoTitileTwo,
        infoTitileThree: raw.infoTitileThree,
        infoTextOne: raw.infoTextOne,
        infoTextTwo: raw.infoTextTwo,
        infoTextThree: raw.infoTextThree,
        footerText: raw.footerText,
      });
      // console.log(raw);
    } catch (error) {
      console.log(error);
    }
  };

  //handle demo edit
  const handleImage = (e) => {
    setContent({
      ...content,
      [e.target.id]: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("content", JSON.stringify(content));
    // console.log(JSON.stringify(content));
    toast("Modified Successfully", { type: "success" });
  };

  //handle admin edit
  const handleImageAdmin = (e) => {
    setContent({
      ...content,
      [e.target.id]: e.target.files[0],
    });
  };
  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("primaryColor", content.primaryColor);
    newData.append("secondaryColor", content.secondaryColor);
    newData.append("headerImage", content.headerImage);
    newData.append("heroText", content.heroText);
    newData.append("infoImgOne", content.infoImgOne);
    newData.append("infoImgTwo", content.infoImgTwo);
    newData.append("infoImgThree", content.infoImgThree);
    newData.append("infoTitileOne", content.infoTitileOne);
    newData.append("infoTitileTwo", content.infoTitileTwo);
    newData.append("infoTitileThree", content.infoTitileThree);
    newData.append("infoTextOne", content.infoTextOne);
    newData.append("infoTextTwo", content.infoTextTwo);
    newData.append("infoTextThree", content.infoTextThree);
    newData.append("footerText", content.footerText);

    try {
      Axios.put(API + "az/content", newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    fetchContnet();
    window.location.reload();
  };

  //keep admin logged in
  useEffect(() => {
    const localToken = sessionStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      setCheckLog(true);
    }
  }, []);

  // Render End Button
  const goBack = (
    <Link to="/">
      <button className="backBtn">Back</button>
    </Link>
  );
  const clearLocal = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  const logOut = (
    <Link to="/">
      <button onClick={clearLocal} className="backBtn">
        Log Out
      </button>
    </Link>
  );

  useEffect(() => {
    const localStorage = sessionStorage.getItem("content");
    if (localStorage) {
      setContent(JSON.parse(localStorage));
    } else {
      fetchContnet();
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: content.primaryColor,
        color: content.secondaryColor,
      }}
    >
      <Router>
        <ContentContext.Provider value={{ content, setContent }}>
          <ToastContainer position="top-right" />
          <Switch>
            <Route exact path="/">
              <Header />
              <HeroSec />
              <InfoSec />
              <Footer />
            </Route>
            <Route exact path="/demo">
              <ContentForm
                handleSubmit={handleSubmit}
                handleImage={handleImage}
                endBtn={goBack}
              />
            </Route>
            <Route exact path="/admin/edit">
              {checkLog ? (
                <ContentForm
                  handleSubmit={handleSubmitAdmin}
                  handleImage={handleImageAdmin}
                  endBtn={logOut}
                />
              ) : (
                <Redirect to="/admin/login" />
              )}
            </Route>
            <Route path="/admin/login">
              {!checkLog ? <AdminPanel /> : <Redirect to="/admin/edit" />}
            </Route>
          </Switch>
        </ContentContext.Provider>
      </Router>
    </div>
  );
};

export default App;

//---Back Up State---
// primaryColor: "#1b2941",
// secondaryColor: "#c7ea46",
// headerImage: headerImage,
// heroText: "Design With Ease",
// //== Card Elements
// infoImgOne: infoOne,
// infoImgTwo: infoTwo,
// infoImgThree: infoThree,
// infoTitileOne: "One Time Install",
// infoTitileTwo: "Easy Customization",
// infoTitileThree: "24/7 Support",
// infoTextOne:
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit nulla, porttitor vitae erat non, congue suscipit metus. Aliquam at.",
// infoTextTwo:
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit nulla, porttitor vitae erat non, congue suscipit metus. Aliquam at.",
// infoTextThree:
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit nulla, porttitor vitae erat non, congue suscipit metus. Aliquam at.",
// //===footer
// footerText: "Install Once, Customize As You Wish!",

//---Images---
// import headerImage from "./Assets/header.jpg";
// import infoOne from "./Assets/installation.png";
// import infoTwo from "./Assets/customization.png";
// import infoThree from "./Assets/support.png";
