import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Process } from '../../services/process'
import { Input_ } from "../../styles/Box";
import { device } from "../../model/device";
import { label_ } from "../../styles/leters";
import * as contants from "./../../constants";
import { Btn_ } from "../../styles/bottom";
import Burger from "../header/Nav/Burger";
import { Code_ } from "../../styles/code";
const assets = process.env.REACT_APP_ASSETS;
import { COMP_aprobado } from "./comp_aprobado";
import { COMP_desaprobado } from "./comp_desaprobado";
import GoogleLogin from "react-google-login";
import { Facebook } from "react-bootstrap-icons";
import { withRouter } from "react-router-dom";
import { mobile } from '../../model/mobile'
import { client } from '../../model/client'
import { Trace } from '../../model/trace'
import { Key } from '../../model/Key'
import { COMP_errormail } from "./comp_errormail";
const api = process.env.REACT_APP_EFECTIVOYA_API;

const esCedulaValida = cedula => {

  cedula = cedula.replace(/-/g, '').padStart(11, "0");
  var cedula_sin_digito_verificador = cedula.substr(0, cedula.length - 1);
  var digito_verificador = cedula.substr(cedula.length - 1, 1);
  var suma = 0;

  if (cedula.length < 11) return false;

  for (var i = 0; i < cedula_sin_digito_verificador.length; i++) {
    var mod = "";

    if ((i % 2) == 0) { mod = 1 } else { mod = 2 }

    var res = cedula_sin_digito_verificador.substr(i, 1) * mod;

    if (res > 9) {
      res = res.toString();
      res = eval(res.substr(0, 1)) + eval(res.substr(1, 1));
    }
    suma += eval(res);
  }
  var el_numero = (10 - (suma % 10)) % 10;

  return el_numero == digito_verificador && cedula_sin_digito_verificador.substr(0, 3) != "000";

}
class COMP_verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: contants.header2,
      element: contants.pasosReq,
      email: "",
      cedula: "",
      celular: "",
      tokenVencido: false,
      setComplete: false,
      setVerifyCode: false,
      setRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerifyCode = this.handleVerifyCode.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseGoogle = (response) => {
    const { email } = response.profileObj;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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

  componentDidMount() {
    const token = this.props.match.params.token;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    };
    fetch(`${api}api/v1/email/verify`, requestOptions)
      .then((response) => response.json())
      .then(({ data }) => {
        if (data?.email) {
          document.getElementById('txtEmail').value = data.email;
          this.setState({ email: data.email })
        }
        else
          this.setState({ tokenVencido: true })
      });
  }

  onKeyDown = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      let InputIdBack = "";
      switch (event.target.id) {
        case "A0":
          InputIdBack = "A0";
          break;
        case "A1":
          InputIdBack = "A0";
          break;
        case "A2":
          InputIdBack = "A1";
          break;
        case "A3":
          InputIdBack = "A2";
          break;
      }
      document.getElementById(event.target.id).value = "";
      document.getElementById(InputIdBack).focus();
    }
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

  handleComplete() {
    const isValid = esCedulaValida(this.state.cedula);
    const cedula = this.state.cedula;
    const email = this.state.email;
    const telefono = this.state.telefono;
    mobile.Telefono = this.state.telefono;
    mobile.Identificacion = client.DocumentNumber;
    mobile.KeyOrigen = Key.KeyOrigen;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula, telefono, email }),
    };
    fetch(`${api}api/v1/email/checkCedula`, requestOptions)
      .then((response) => response.json())
      .then(({ data }) => {
        const user = data;
        if (!user) {
          fetch(`${api}api/v1/email/saveCedula`, requestOptions)
            .then((response) => response.json())
            .then(({ data }) => {
              Process(mobile, "Movil/SendCodeAccess").then((movilResponse) => {

              })
            })
        }
        if (this.state.email !== user.email) {
          ReactDOM.render(
            <COMP_errormail />,
            document.getElementById("z")
          );
        }
      });
    // const response = await fetch(`${api}api/v1/email/checkCedula`, requestOptions);
    // const {data} = await response.json();
    // const user = data;
    // console.log(user);
    // if(!user){
    //   const response = await fetch(`${api}api/v1/email/saveCedula`, requestOptions);
    //   const {data} = await response.json();
    //   console.log(data);
    //   let movilresponse = await Process(mobile, "Movil/SendCodeAccess");
    //   console.log(movilresponse)
    //   this.setState({ setComplete: true });
    // }
    // if(this.state.email !== user.email){
    //   ReactDOM.render(
    //     <COMP_errormail />,
    //     document.getElementById("z")
    //   );
    // }
  }

  handleVerifyCode() {
    this.setState({ setVerifyCode: true });
    setTimeout(() => {
      {
        this.setState({ setRedirect: true });
        ReactDOM.render(
          <COMP_aprobado />,
          document.getElementById("z")
        );
      }
    }, 4000);
  }

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
      <div id="master"
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
                        {this.state.tokenVencido ? (
                          <form onSubmit={this.handleSubmit}>
                            <Row className="ml-3">
                              <Col xs={12} className="pt-3">
                                <label
                                  className="font-weight-bold"
                                  style={label_(0, 0, "24px", "left")}
                                >
                                  Lo sentimos, el mensaje
                                  ya venció.
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
                          </form>) : (
                          this.state.setComplete ? (
                            this.state.setVerifyCode ? (
                              <>
                                <Row style={{ height: "116px" }}></Row>
                                <Row>
                                  <Col xs={12} className="text-center">
                                    <label
                                      className="font-weight-bold"
                                      style={label_(0, 0, "28px")}
                                    >
                                      Estamos chequeando la información.
                                    </label>
                                  </Col>
                                </Row>
                                <Row style={{ height: "200px" }}>
                                  <Col xs={12} className="text-center">
                                    <img
                                      src="https://cdn.dribbble.com/users/1415337/screenshots/10781083/media/0466184625e53796cfeb7d5c5918dec8.gif"
                                      style={{
                                        boxSizing: "content-box",
                                        width: "100%",
                                      }}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={12} className="pt-3 text-center">
                                    <label
                                      className="font-weight-bold"
                                      style={label_(0, 0, "28px")}
                                    >
                                      Espera un momento.
                                    </label>
                                  </Col>
                                </Row>
                              </>
                            ) : (
                              <>
                                <Row className="ml-3">
                                  <Col xs={12} className="pt-3">
                                    <label
                                      className="font-weight-bold"
                                      style={label_(0, 0, "28px", "left")}
                                    >
                                      Te enviamos un código al{" "}
                                      <label
                                        className="font-weight-bold"
                                        style={label_(2, 0, "28px", "left")}
                                      >
                                        {this.state.celular}
                                      </label>
                                    </label>
                                  </Col>
                                  <Col xs={12}>
                                    <span style={label_(4, 0, "14px")}>
                                      Ingrésalo aquí:
                                    </span>
                                  </Col>
                                </Row>
                                <Row className="mt-3 ml-3 mr-3"></Row>
                                <Row className="mt-4">
                                  <Col xs={12} className="pt-2 text-center">
                                    <input
                                      type="text"
                                      style={Code_()}
                                      id="A0"
                                      maxLength={1}
                                      onKeyDown={this.onKeyDown}
                                      onChange={this.ValidateCode}
                                    />
                                    <input
                                      type="text"
                                      style={Code_()}
                                      id="A1"
                                      maxLength={1}
                                      onKeyDown={this.onKeyDown}
                                      onChange={this.ValidateCode}
                                      onClick={
                                        (this.valide = () => {
                                          if (
                                            document.getElementById("A0")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A0")
                                              .select();
                                          else if (
                                            document.getElementById("A1")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A1")
                                              .select();
                                          else if (
                                            document.getElementById("A2")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A2")
                                              .select();
                                          else if (
                                            document.getElementById("A3")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A3")
                                              .select();
                                        })
                                      }
                                    />
                                    <input
                                      type="text"
                                      style={Code_()}
                                      id="A2"
                                      maxLength={1}
                                      onKeyDown={this.onKeyDown}
                                      onChange={this.ValidateCode}
                                      onClick={
                                        (this.valide = () => {
                                          if (
                                            document.getElementById("A0")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A0")
                                              .select();
                                          else if (
                                            document.getElementById("A1")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A1")
                                              .select();
                                          else if (
                                            document.getElementById("A2")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A2")
                                              .select();
                                          else if (
                                            document.getElementById("A3")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A3")
                                              .select();
                                        })
                                      }
                                    />
                                    <input
                                      type="text"
                                      style={Code_()}
                                      id="A3"
                                      maxLength={1}
                                      onChange={this.ValidateCode}
                                      onKeyDown={this.onKeyDown}
                                      onClick={
                                        (this.valide = () => {
                                          if (
                                            document.getElementById("A0")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A0")
                                              .select();
                                          else if (
                                            document.getElementById("A1")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A1")
                                              .select();
                                          else if (
                                            document.getElementById("A2")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A2")
                                              .select();
                                          else if (
                                            document.getElementById("A3")
                                              .value == ""
                                          )
                                            document
                                              .getElementById("A3")
                                              .select();
                                        })
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row style={{ marginTop: "120px" }}>
                                  <Col className="text-center mt-6">
                                    <span style={label_(4, 0, "14px")}>
                                      Código valido por 35’
                                    </span>
                                  </Col>
                                </Row>
                                <Row style={{ marginTop: "20px" }}>
                                  <Col className="text-center mt-3">
                                    <Button
                                      style={Btn_(2, 2, 3, "60%")}
                                      id="enviarLink"
                                      onClick={this.handleVerifyCode}
                                    >
                                      Continuar
                                    </Button>
                                  </Col>
                                </Row>
                                <Row style={{ marginTop: "20px" }}>
                                  <Col className="text-center mt-3">
                                    <a style={label_(2, 0, "14px")}>
                                      Ingresar otro número de celular
                                    </a>
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
                                    Completa tus datos
                                  </label>
                                </Col>
                                <Col xs={12}>
                                  <span style={label_(1, 0, "14px")}>
                                    Vamos a evaluar si calificas para el
                                    préstamo
                                  </span>
                                </Col>
                              </Row>
                              <Row className="ml-3 mt-3">
                                <Col xs={12} className="ml-3">
                                  <span style={label_(7, 0, "14px")}>* </span>
                                  <span style={label_(1, 0, "10px")}>
                                    Campos obligatorios
                                  </span>
                                </Col>
                              </Row>
                              <Row className="mt-3 ml-3 mr-3">
                                <Col xs={12} className="pt-3">
                                  <label style={label_(0, 0, "12px", "left")}>
                                    E-mail
                                    <span style={label_(7, 0, "14px")}>
                                      *{" "}
                                    </span>
                                  </label>
                                </Col>

                                <Col xs={12}>
                                  <input
                                    disabled={true}
                                    type="email"
                                    id="txtEmail"
                                    style={Input_(1, 4)}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-3 ml-3 mr-3">
                                <Col xs={12} className="pt-3">
                                  <label style={label_(0, 0, "12px", "left")}>
                                    Número de cédula
                                    <span style={label_(7, 0, "14px")}>
                                      *{" "}
                                    </span>
                                  </label>
                                </Col>

                                <Col xs={12}>
                                  <input
                                    type="text"
                                    maxlength="11"
                                    id="txtCedula"
                                    style={Input_(1, 4)}
                                    value={this.state.cedula}
                                    onChange={
                                      (this.valhd = async (e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (re.test(e.target.value)) {
                                          this.handleChange(e);
                                        }
                                      })
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-3 ml-3 mr-3">
                                <Col xs={12} className="pt-3">
                                  <label style={label_(0, 0, "12px", "left")}>
                                    Número de celular
                                    <span style={label_(7, 0, "14px")}>
                                      *{" "}
                                    </span>
                                  </label>
                                </Col>

                                <Col xs={12}>
                                  <input
                                    type="text"
                                    id="txtCelular"
                                    style={Input_(1, 4)}
                                    value={this.state.telefono}
                                    onChange={
                                      (this.valhd = async (e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (re.test(e.target.value)) {
                                          this.handleChange(e);
                                        }
                                      })
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-4">
                                <Col xs={12} className="text-center">
                                  <Button
                                    // disabled={true}
                                    style={Btn_(2, 2, 3, "60%")}
                                    id="confirmValues"
                                    onClick={this.handleComplete}
                                  >
                                    Continuar
                                  </Button>
                                </Col>
                              </Row>
                            </form>
                          )
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
                            {this.state.setComplete ? (
                              this.state.setVerifyCode ? (
                                <>
                                  <Row style={{ height: "60px" }}></Row>
                                  <Row>
                                    <Col xs={12} className="text-center">
                                      <label
                                        className="font-weight-bold"
                                        style={label_(0, 0, "28px")}
                                      >
                                        Estamos chequeando la información.
                                      </label>
                                    </Col>
                                  </Row>
                                  <Row style={{ height: "200px" }}>
                                    <Col xs={12} className="text-center">
                                      <img
                                        src="https://cdn.dribbble.com/users/1415337/screenshots/10781083/media/0466184625e53796cfeb7d5c5918dec8.gif"
                                        style={{
                                          boxSizing: "content-box",
                                          width: "100%",
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={12} className="pt-3 text-center">
                                      <label
                                        className="font-weight-bold"
                                        style={label_(0, 0, "28px")}
                                      >
                                        Espera un momento.
                                      </label>
                                    </Col>
                                  </Row>
                                </>
                              ) : (
                                <>
                                  <Row className="ml-3">
                                    <Col xs={12} className="pt-3">
                                      <label
                                        className="font-weight-bold"
                                        style={label_(0, 0, "28px", "left")}
                                      >
                                        Te enviamos un código al{" "}
                                        <label
                                          className="font-weight-bold"
                                          style={label_(2, 0, "28px", "left")}
                                        >
                                          {this.state.celular}
                                        </label>
                                      </label>
                                    </Col>
                                    <Col xs={12}>
                                      <span style={label_(4, 0, "14px")}>
                                        Ingrésalo aquí:
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3 ml-3 mr-3"></Row>
                                  <Row className="mt-4">
                                    <Col xs={12} className="pt-2 text-center">
                                      <input
                                        type="text"
                                        style={Code_()}
                                        id="A0"
                                        maxLength={1}
                                        onKeyDown={this.onKeyDown}
                                        onChange={this.ValidateCode}
                                      />
                                      <input
                                        type="text"
                                        style={Code_()}
                                        id="A1"
                                        maxLength={1}
                                        onKeyDown={this.onKeyDown}
                                        onChange={this.ValidateCode}
                                        onClick={
                                          (this.valide = () => {
                                            if (
                                              document.getElementById("A0")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A0")
                                                .select();
                                            else if (
                                              document.getElementById("A1")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A1")
                                                .select();
                                            else if (
                                              document.getElementById("A2")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A2")
                                                .select();
                                            else if (
                                              document.getElementById("A3")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A3")
                                                .select();
                                          })
                                        }
                                      />
                                      <input
                                        type="text"
                                        style={Code_()}
                                        id="A2"
                                        maxLength={1}
                                        onKeyDown={this.onKeyDown}
                                        onChange={this.ValidateCode}
                                        onClick={
                                          (this.valide = () => {
                                            if (
                                              document.getElementById("A0")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A0")
                                                .select();
                                            else if (
                                              document.getElementById("A1")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A1")
                                                .select();
                                            else if (
                                              document.getElementById("A2")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A2")
                                                .select();
                                            else if (
                                              document.getElementById("A3")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A3")
                                                .select();
                                          })
                                        }
                                      />
                                      <input
                                        type="text"
                                        style={Code_()}
                                        id="A3"
                                        maxLength={1}
                                        onChange={this.ValidateCode}
                                        onKeyDown={this.onKeyDown}
                                        onClick={
                                          (this.valide = () => {
                                            if (
                                              document.getElementById("A0")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A0")
                                                .select();
                                            else if (
                                              document.getElementById("A1")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A1")
                                                .select();
                                            else if (
                                              document.getElementById("A2")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A2")
                                                .select();
                                            else if (
                                              document.getElementById("A3")
                                                .value == ""
                                            )
                                              document
                                                .getElementById("A3")
                                                .select();
                                          })
                                        }
                                      />
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "120px" }}>
                                    <Col className="text-center mt-6">
                                      <span style={label_(4, 0, "14px")}>
                                        Código valido por 35’
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "20px" }}>
                                    <Col className="text-center mt-3">
                                      <Button
                                        style={Btn_(2, 2, 3, "60%")}
                                        id="enviarLink"
                                        onClick={this.handleVerifyCode}
                                      >
                                        Continuar
                                      </Button>
                                    </Col>
                                  </Row>
                                  <Row style={{ marginTop: "20px" }}>
                                    <Col className="text-center mt-3">
                                      <a style={label_(2, 0, "14px")}>
                                        Ingresar otro número de celular
                                      </a>
                                    </Col>
                                  </Row>
                                </>
                              )
                            ) : (
                              <>
                                <form onSubmit={this.handleSubmit}>
                                  <Row className="ml-3">
                                    <Col xs={12} className="pt-3">
                                      <label
                                        className="font-weight-bold"
                                        style={label_(0, 0, "24px", "center")}
                                      >
                                        Completa tus datos
                                      </label>
                                    </Col>
                                    <Col xs={12}>
                                      <span style={label_(1, 0, "14px")}>
                                        Vamos a evaluar si calificas para el
                                        préstamo
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className="ml-3 mt-3">
                                    <Col xs={12} className="ml-3">
                                      <span style={label_(7, 0, "14px")}>
                                        *{" "}
                                      </span>
                                      <span style={label_(1, 0, "10px")}>
                                        Campos obligatorios
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3 ml-3 mr-3">
                                    <Col xs={12} className="pt-3">
                                      <label
                                        style={label_(0, 0, "12px", "left")}
                                      >
                                        E-mail
                                        <span style={label_(7, 0, "14px")}>
                                          *{" "}
                                        </span>
                                      </label>
                                    </Col>

                                    <Col xs={12}>
                                      <input
                                        disabled={true}
                                        type="email"
                                        id="txtEmail"
                                        style={Input_(1, 4)}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="mt-3 ml-3 mr-3">
                                    <Col xs={12} className="pt-3">
                                      <label
                                        style={label_(0, 0, "12px", "left")}
                                      >
                                        Número de cédula
                                        <span style={label_(7, 0, "14px")}>
                                          *{" "}
                                        </span>
                                      </label>
                                    </Col>

                                    <Col xs={12}>
                                      <input
                                        type="text"
                                        maxlength="11"
                                        id="txtCedula"
                                        style={Input_(1, 4)}
                                        value={this.state.cedula}
                                        onChange={
                                          (this.valhd = async (e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (re.test(e.target.value)) {
                                              this.handleChange(e);
                                            }
                                          })
                                        }
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="mt-3 ml-3 mr-3">
                                    <Col xs={12} className="pt-3">
                                      <label
                                        style={label_(0, 0, "12px", "left")}
                                      >
                                        Número de celular
                                        <span style={label_(7, 0, "14px")}>
                                          *{" "}
                                        </span>
                                      </label>
                                    </Col>

                                    <Col xs={12}>
                                      <input
                                        type="text"
                                        id="txtCelular"
                                        style={Input_(1, 4)}
                                        value={this.state.telefono}
                                        onChange={
                                          (this.valhd = async (e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (re.test(e.target.value)) {
                                              this.handleChange(e);
                                            }
                                          })
                                        }
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="mt-4">
                                    <Col xs={12} className="text-center">
                                      <Button
                                        // disabled={true}
                                        style={Btn_(2, 2, 3, "60%")}
                                        id="confirmValues"
                                        onClick={this.handleComplete}
                                      >
                                        Continuar
                                      </Button>
                                    </Col>
                                  </Row>
                                </form>
                              </>
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

export default withRouter(COMP_verify);
