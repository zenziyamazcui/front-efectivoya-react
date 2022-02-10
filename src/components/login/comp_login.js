import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Input_ } from "../../styles/Box";
import { device } from "../../model/device";
import { label_ } from "../../styles/leters";
import * as contants from "./../../constants";
import { Btn_ } from "../../styles/bottom";
import Burger from "../header/Nav/Burger";
import { Code_ } from "../../styles/code";
import { COMP_Laberinto } from "../laberinto/comp_laberinto";
import interaccionesService from "../../services/interacciones";
import GoogleLogin from "react-google-login";
import { Facebook } from "react-bootstrap-icons";
import { withRouter } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
const assets = process.env.REACT_APP_ASSETS;
const googleId= process.env.REACT_APP_GOOGLE_ID
const api = process.env.REACT_APP_EFECTIVOYA_API

class COMP_Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: contants.header2,
      element: contants.pasosReq,
      email: "",
      cedula: "",
      celular: "",
      setMail: false,
      setConfirm: false,
      setComplete: false,
      setVerifyCode: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseGoogle = (response) => {
    const { email } = response.profileObj;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email}),
        };
        fetch(`${api}api/v1/email/login`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
          });
        this.setState({ setMail: true });
  };

  responseFacebook = async (response) => {
    const { authResponse } = await new Promise(window.FB.login);
  };

  handleChange(event) {
    let type = event.target.id;
    switch (type) {
      case "txtEmail":
        this.setState({ email: event.target.value });
        break;
      case "txtCedula":
        this.setState({ cedula: event.target.value });
        break;
      case "txtCelular":
        this.setState({ celular: event.target.value });
        break;
      default:
        break;
    }
    if (this.state.email && this.state.cedula && this.state.celular) {
      document.getElementById("confirmValues").disabled = false;
    }
  }

  handleConfirm() {}

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.state.email }),
    };
    fetch(`${api}api/v1/email/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
      });
    this.setState({ setMail: true });
  }

  render() {
    return (
      <div
        style={{
          background:
            device.device.type === "desktop"
              ? "linear-gradient(86.65deg,rgba(41, 182, 246, 0.51) -20.51%,  #000064 109.86%)"
              : "white",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: device.device.type === "desktop" ? "100vh" : "100%",
        }}
      >
        <Container fluid className="h-100">
          {device.device.type === "desktop" ? (
            <>
              <Row className="d-flex justify-content-center">
                <Col xs={0} md={5} className="pt-3 my-auto ">
                  <Row className="d-flex justify-content-center">
                    <Col xs={12} className="p-2 pb-5 text-center">
                      <label style={label_(3, 0, "25px")}>
                        {this.state.h.map((x) => {
                          return (
                            <img
                              src={`${assets}${x.Contenido}`}
                              style={{ width: "255px" }}
                            />
                          );
                        })}
                      </label>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} md={5}>
                  <div
                    style={{
                      margin: "0px 100px 0px 100px",
                      width: "430px",
                      height: "100vh",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                    }}
                  >
                    <div id="e" className="pt-3 pb-1">
                      <Container>
                        {this.state.setMail ? ( (
                            <>
                              <Row className="ml-3">
                                <Col xs={12} className="pt-3">
                                  <label
                                    className="font-weight-bold"
                                    style={label_(0, 0, "28px", "left")}
                                  >
                                    ¡Hola! Te enviamos un mensaje para confirmar
                                    tu e-mail.
                                  </label>
                                </Col>
                                <Col xs={12}>
                                  <span style={label_(1, 0, "14px")}>
                                    El mensaje vence en 15 minutos.
                                  </span>
                                </Col>
                              </Row>
                              <Row className="mt-3 ml-3 mr-3"></Row>
                              <Row className="mt-4">
                                <Col xs={12} className="text-center">
                                  <Button
                                    style={Btn_(2, 2, 3, "60%")}
                                    id="enviarLink"
                                    onClick={this.handleConfirm}
                                  >
                                    Confirmar e-mail
                                  </Button>
                                </Col>
                              </Row>
                            </>
                          )
                        ) : (
                          <form onSubmit={this.handleSubmit}>
                            <Row className="ml-3">
                              <Col xs={12} className="pt-3">
                                <label
                                  className="font-weight-bold"
                                  style={label_(0, 0, "24px", "center")}
                                >
                                  Ingresar
                                </label>
                              </Col>
                              <Col xs={12}>
                                <span style={label_(1, 0, "14px")}>
                                  Eres nuevo?{" "}
                                </span>
                                <a style={label_(2, 0, "14px")}>
                                  Crear una cuenta
                                </a>
                              </Col>
                            </Row>
                            <Row className="mt-3 ml-3 mr-3">
                              <Col xs={12} className="pt-3">
                                <label style={label_(0, 0, "12px", "left")}>
                                  E-mail
                                </label>
                              </Col>

                              <Col xs={12}>
                                <input
                                  type="email"
                                  id="txtEmail"
                                  style={Input_(1, 4)}
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                />
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Col xs={12} className="text-center">
                                <Button
                                  style={Btn_(2, 2, 3, "60%")}
                                  id="enviarLink"
                                  type="submit"
                                >
                                  Continuar
                                </Button>
                              </Col>
                            </Row>
                            <Row style={{ height: "120px" }}>
                              <hr
                                style={{
                                  width: "80%",
                                  height: "1px",
                                  backgroundColor: "lightgrey",
                                  marginTop: "80px",
                                }}
                              ></hr>
                            </Row>
                            <Row className="mt-4">
                              <Col xs={12} className="text-center">
                                <GoogleLogin
                                  clientId="464416817637-pqfov3j6um2jt92toke8knj2f3q0ndu6.apps.googleusercontent.com"
                                  buttonText="Continue with Google"
                                  onSuccess={this.responseGoogle}
                                  onFailure={this.responseGoogle}
                                  cookiePolicy={"single_host_origin"}
                                />
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Col xs={12} className="text-center">
                                <Button
                                  style={{
                                    width: "80%",
                                    borderRadius: "20px",
                                    padding: "10px",
                                  }}
                                  onClick={this.responseFacebook}
                                >
                                  <Facebook className="mr-4 mb-1" />
                                  <span> Continue with Facebook</span>
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        )}

                        <Row></Row>
                      </Container>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row
                className="pt-3 pl-3 my-auto mb-4 mt-4"
                style={{ background: "#3A68AD" }}
              >
                <Col className="p-2">
                  {this.state.h.map((x) => {
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
              <Row>
                <Col xs={12}>
                  <div
                    style={{
                      background: "#FFFFFF",
                      margin: 0,
                      height: "90vh",
                      marginTop: "20px",
                    }}
                  >
                    <div id="e" className="pt-3 pb-1">
                      <Container>
                        <div id="e" className="pt-3 pb-1">
                          <Container>
                            {this.state.setMail ? ( (
                                <>
                                  <Row className="ml-3">
                                    <Col xs={12} className="pt-3">
                                      <label
                                        className="font-weight-bold"
                                        style={label_(0, 0, "28px", "left")}
                                      >
                                        ¡Hola! Te enviamos un mensaje para
                                        confirmar tu e-mail.
                                      </label>
                                    </Col>
                                    <Col xs={12}>
                                      <span style={label_(1, 0, "14px")}>
                                        El mensaje vence en 15 minutos.
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3 ml-3 mr-3"></Row>
                                  <Row className="mt-4">
                                    <Col xs={12} className="text-center">
                                      <Button
                                        style={Btn_(2, 2, 3, "60%")}
                                        id="enviarLink"
                                        onClick={this.handleConfirm}
                                      >
                                        Confirmar e-mail
                                      </Button>
                                    </Col>
                                  </Row>
                                </>
                              )
                            ) : (
                              <form onSubmit={this.handleSubmit}>
                                <Row className="ml-3">
                                  <Col xs={12} className="pt-3">
                                    <label
                                      className="font-weight-bold"
                                      style={label_(0, 0, "24px", "center")}
                                    >
                                      Ingresar
                                    </label>
                                  </Col>
                                  <Col xs={12}>
                                    <span style={label_(1, 0, "14px")}>
                                      Eres nuevo?{" "}
                                    </span>
                                    <a style={label_(2, 0, "14px")}>
                                      Crear una cuenta
                                    </a>
                                  </Col>
                                </Row>
                                <Row className="mt-3 ml-3 mr-3">
                                  <Col xs={12} className="pt-3">
                                    <label style={label_(0, 0, "12px", "left")}>
                                      E-mail
                                    </label>
                                  </Col>

                                  <Col xs={12}>
                                    <input
                                      type="email"
                                      id="txtEmail"
                                      style={Input_(1, 4)}
                                      value={this.state.email}
                                      onChange={this.handleChange}
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-4">
                                  <Col xs={12} className="text-center">
                                    <Button
                                      style={Btn_(2, 2, 3, "60%")}
                                      id="enviarLink"
                                      type="submit"
                                    >
                                      Continuar
                                    </Button>
                                  </Col>
                                </Row>
                                <Row style={{ height: "120px" }}>
                                  <hr
                                    style={{
                                      width: "80%",
                                      height: "1px",
                                      backgroundColor: "lightgrey",
                                      marginTop: "80px",
                                    }}
                                  ></hr>
                                </Row>
                                <Row className="mt-4">
                                  <Col xs={12} className="text-center">
                                    <GoogleLogin
                                      clientId="655477334896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                      buttonText="Continue with Google"
                                      onSuccess={this.responseGoogle}
                                      onFailure={this.responseGoogle}
                                      cookiePolicy={"single_host_origin"}
                                    />
                                  </Col>
                                </Row>
                                <Row className="mt-4">
                                  <Col xs={12} className="text-center">
                                    <Button
                                      style={{
                                        width: "90%",
                                        borderRadius: "20px",
                                        padding: "10px",
                                      }}
                                    >
                                      <Facebook className="mr-4 mb-1" />
                                      <span> Continue with Facebook</span>
                                    </Button>
                                  </Col>
                                </Row>
                              </form>
                            )}

                            <Row></Row>
                          </Container>
                        </div>
                      </Container>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    );
  }
}

export default withRouter(COMP_Login);
