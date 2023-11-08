//import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./remotelogo.png";
import Button from "react-bootstrap/Button";
import Index from "./pages/Alljobs/index.jsx";
// import Elasticsearch from "./component/Elasticsearch";
 import JobsList from "./component/JobList"
//  import Jobcard from "./components/Jobcard/Jobcard";
import Texteditor from "./component/Texteditor"
import Form from "./Form"

function App() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span style={{ fontSize: "20px", marginLeft: "10px" }}>
            Remote Jobs
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <NavDropdown title="For Companies" id="collasible-nav-dropdown">
              <NavDropdown.Item href="fulltime">
                Hire Full-Time Developers
              </NavDropdown.Item>
              <NavDropdown.Item href="parttime">
                Hire Part-Time Developers
              </NavDropdown.Item>
              <NavDropdown.Item href="freelance">
                Hire Freelance Developers
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="For Job Seekers" id="collasible-nav-dropdown">
              <NavDropdown.Item href="overview">Overview</NavDropdown.Item>
              <NavDropdown.Item href="remotejobs">Remote Jobs</NavDropdown.Item>
              <NavDropdown.Item href="remotecompanies">
                Remote Companies
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="login" style={{ marginRight: "10px" }}>
              Log In
            </Nav.Link>
            <Button
              variant="outline-light"
              href="find"
              style={{ marginRight: "20px" }}
            >
              Find Jobs
            </Button>
            <Button href="hire">Post a Job</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    {/* <Elasticsearch /> */}
    {/* <JobsList /> */}
    { <Texteditor/>}
    {<Form/>}
    {/* <Jobcard /> */}
    

  </>

  );

 
}

export default App;
