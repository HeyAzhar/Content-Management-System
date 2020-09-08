import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { ContentContext } from "../Context/Index";
import { CgMenuRight } from "react-icons/cg";
import { FaReact } from "react-icons/fa";

const Header = () => {
  const context = useContext(ContentContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navBar">
      <Navbar
        style={{
          backgroundColor: context.content?.primaryColor,
          color: context.content?.secondaryColor,
        }}
        expand="md"
      >
        <NavbarBrand
          style={{
            color: context.content?.secondaryColor,
          }}
          href="/"
        >
          <span className="logo">
            <FaReact />
          </span>
        </NavbarBrand>
        <NavbarToggler className="custom-toggler" onClick={toggle}>
          <CgMenuRight
            style={{
              color: context.content?.secondaryColor,
              fontSize: "2em",
            }}
          />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                style={{
                  color: context.content?.secondaryColor,
                }}
                href="#"
              >
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{
                  color: context.content?.secondaryColor,
                }}
                href="#"
              >
                FEATURES
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{
                  color: context.content?.secondaryColor,
                }}
                href="#"
              >
                GALLERY
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{
                  color: context.content?.secondaryColor,
                }}
                href="#"
              >
                ABOUT
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
