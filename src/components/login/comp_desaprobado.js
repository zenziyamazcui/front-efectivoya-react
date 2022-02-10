import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { COMPCalculadoras } from "../../components/calculadora/comp_calculadora";
import { Btn_ } from "../../styles/bottom";
import { label_ } from "../../styles/leters";
import * as contants from "./../../constants";
const assets = process.env.REACT_APP_ASSETS;
export class COMP_desaprobado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: contants.header2,
      element: contants.pasosReq,
    };

  }

  render() {
    return (
      <div
        style={{
padding:0,margin:0
        }}
      >
        <div
          style={{
            width: "100%",
            height: "300px",
            background:
              "linear-gradient(86.65deg,rgba(41, 182, 246, 0.51) -20.51%,  #000064 109.86%)",
          }}
        >
          <Row className="d-flex justify-content-left">
            <Col xs={12} className="p-2 pb-5 text-left">
              <label style={label_(3, 0, "25px")}>
                {this.state.h.map((x) => {
                  return (
                    <img
                      src={`${assets}${x.Contenido}`}
                      style={{ width: "255px", marginLeft: "20px" }}
                    />
                  );
                })}
              </label>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={12} className="p-2 pb-5 text-center">
              <label style={label_(3, 0, "24px")}>
              ¡Lo sentimos!
No podemos prestarte dinero. 
              </label>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: "20px", paddingTop: "20px" }}>
          <Row className="d-flex justify-content-center">
            <Col xs={12} className="text-center">
              <label className="font-weight-bold" style={label_(0, 0, "20px")}>
              Algunas recomendaciones
              </label>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={12} className="text-center">
              <label className="font-weight-bold" style={label_(0, 0, "14px")}>
              Verifica tu ingresos mensuales. Es importante poder comprobar tu actividad y continuidad laboral. 
              </label>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={12} className="text-center">
              <label className="font-weight-bold" style={label_(0, 0, "14px")}>
              Paga tus cuentas a tiempo.
              </label>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={12} className="text-center">
              <label className="font-weight-bold" style={label_(0, 0, "14px")}>
              Intenta mantener los saldos de tus tarjetas de credito por debajo de 35% de tus límites
              </label>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(COMP_desaprobado);
