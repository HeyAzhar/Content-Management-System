import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Container, Row, Col } from "reactstrap";

const AdminPanel = () => {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const user = {
      admin: admin,
      password: password,
    };
    if (!admin && !password) {
      return;
    }
    try {
      const { data } = await Axios.post(
        "http://localhost:5000/az/admin/login",
        user
      );
      if (data.length > 100) {
        sessionStorage.setItem("token", data);
        setLoggedIn(true);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    window.location.reload();
  }

  return (
    <Container fluid className="adminFormDiv">
      <Row>
        <Col className="adminSlide d-none d-md-block" md={6}></Col>
        <Col md={6} sm={12}>
          <div className="adminForm">
            <h1 className="text-center">Admin Login</h1>
            <Form onSubmit={login}>
              <div>
                <p>Admin ID</p>
                <Input
                  type="text"
                  name="admin"
                  id="admin"
                  onChange={(e) => setAdmin(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p>Password</p>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={login} className="login" type="submit">
                Login
              </button>
              <Link to="/">
                <button className="home">HOME</button>
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
