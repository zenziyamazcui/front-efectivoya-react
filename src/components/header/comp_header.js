import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Row, Container, Col } from "react-bootstrap";
import { label_ } from "../../styles/leters";
import { COMPCalculadoras } from "../../components/calculadora/comp_calculadora";
import { device } from "../../model/device";
import Burger from "./Nav/Burger";
import * as constant from "../../constants";
import COMP_Login  from "../login/comp_login";
const assets = process.env.REACT_APP_ASSETS;
import { Redirect, Link } from "react-router-dom";
export class COMP_Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    {
      this.setState({redirect:true});
      // ReactDOM.render(<COMP_Login />, document.getElementById("master"));
    }
  }

  render() {
    return(
      <>
        <div
          style={{
            backgroundImage: `url(${assets}/bk_0.svg)`,
            backgroundSize: "cover ",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            height: device.device.type === "desktop" ? "750px" : "100%",
          }}
        >
          <Container fluid>
            {device.device.type === "desktop" ? (
              <Row className="p-4 pl-3 my-auto mb-4 rounded">
                <Col className="pl-5">
                  {constant.header.map((x) => {
                    return (
                      <img
                        src={`${assets}${x.Contenido}`}
                        style={{ width: "200px" }}
                      />
                    );
                  })}
                </Col>

                <Col className="ml-auto">
                  <Row className="justify-content-end">
                    <Col xs={3}>
                      <a href="#Cuota">
                        <label style={label_(3, 0)}>¿Cómo pago?</label>
                      </a>
                    </Col>
                    <Col xs={3}>
                      <Link to="/login">
                        {" "}
                        <label style={label_(3, 0)}>
                          Mi Cuenta
                        </label>
                      </Link>
                    </Col>

                    <Col xs={3}>
                      <a href="#Quienes">
                        <label style={label_(3, 0)}>Sobre nosotros</label>
                      </a>
                    </Col>

                    <Col xs={3}>
                      <a href="#Ayuda">
                        <label style={label_(3, 0)}>Ayuda</label>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row className="pt-3 pl-3 my-auto mb-4 rounded">
                <Col className="p-2">
                  {constant.header.map((x) => {
                    return (
                      <img
                        src={`${assets}${x.Contenido}`}
                        style={{ width: "195px" }}
                      />
                    );
                  })}
                </Col>

                <Col xs={1} className="my-auto ml-auto">
                  <Burger />
                </Col>
              </Row>
            )}

            {device.device.type === "desktop" ? (
              <Row className="pt-3">
                <Col
                  xs={device.device.type === "desktop" ? 8 : 12}
                  className="my-auto text-center"
                >
                  <label
                    className="font-weight-bold"
                    style={label_(3, 0, "40px")}
                  >
                    Tu préstamo rápido, seguro
                  </label>
                  <br />
                  <label
                    className="font-weight-bold online"
                    style={label_(3, 0, "40px")}
                  >
                    y 100% on line.
                  </label>
                  <br />
                  <label style={label_(3, 0, "20px")}>¡Es así de fácil!</label>
                </Col>

                <Col xs={8} className="my-auto text-center">
                  <iframe
                    src="https://www.youtube.com/embed/ys3fqp4n92A"
                    width="753,51px"
                    height="425px"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Col>

                <Col
                  xs={device.device.type === "desktop" ? 3 : 12}
                  style={{ marginTop: "-120px" }}
                >
                  <COMPCalculadoras />
                </Col>
              </Row>
            ) : (
              <Row className="pt-5">
                <Col
                  xs={device.device.type === "desktop" ? 4 : 12}
                  className="my-auto text-center"
                >
                  <label
                    className="font-weight-bold"
                    style={label_(3, 0, "30px")}
                  >
                    Tu préstamo rápido, seguro y 100% on line.
                  </label>
                  <label style={label_(3, 0, "17px")}>¡Es así de fácil!</label>
                </Col>

                <Col xs={12} className="pt-2 mb-4 text-center">
                  <iframe
                    src="https://www.youtube.com/embed/ys3fqp4n92A"
                    width="328px"
                    height="185px"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </Col>

                <Col xs={device.device.type === "desktop" ? 4 : 12}>
                  <COMPCalculadoras />
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </>
    );
  }
}
