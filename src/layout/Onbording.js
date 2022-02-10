import React, { Component } from "react";
import { COMP_Header } from "../components/header/comp_header";
import { COMP_Pasos } from "../components/pasos/comp_pasos";
import { COMP_Requisitos } from "../components/requesitos/comp_requisitos";
import { COMP_Consultas } from "../components/consultas/comp_consultas";
import { COMP_historia } from "../components/historias/historias_comp";
import { COMP_Cuotas } from "../components/cuota/comp_cuota";
import { COMP_Footer } from "../components/footer/comp_footer";
const assets = process.env.REACT_APP_ASSETS;
import { withRouter } from "react-router-dom"; 
import { Redirect } from 'react-router-dom';
class Vw_Onboring extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      token:null
    };
  }
  componentDidMount() {
    const token = this.props.location.hash.split('/')[2];
    if (token) {
      this.setState({redirect:true,token:token})
    }
  }
  render() {
    return (this.state.redirect ? <Redirect to={ `verify/${this.state.token}`}/>:
      <div id="master">
        <COMP_Header />
        <COMP_Pasos />
        <div
          style={{
            backgroundImage: `url(${assets}/bk_1.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            marginTop: "-12px",
          }}
        >
          <COMP_Requisitos />
        </div>
        <COMP_Consultas />
        <COMP_historia />
        <COMP_Cuotas />
        <COMP_Footer />
      </div>
    );
  }
}

export default withRouter(Vw_Onboring);