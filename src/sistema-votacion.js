import { LitElement, html, css } from 'lit-element';
import "./card-component";

export class SistemaVotacion extends LitElement {

  static get properties() {
    return {
      participantes: { type: Array },
      primerLugar: { type: Object },
      segundoLugar: { type: Object },
      tercerLugar: { type: Object }
    };
  }
  constructor() {
    super();
    this.participantes = [];
    this.primerLugar = { nombre: "", votos: 0 };
    this.segundoLugar = { nombre: "", votos: 0 };
    this.tercerLugar = { nombre: "", votos: 0 };
  }

  render() {
    return html`
      <h1>Sistema de votación</h1>
      <p id="statusVotacion">Estatus de la votación</p>
      <ul>
        <li>1er lugar: ${this.primerLugar.nombre}</li>
        <li>2do lugar: ${this.segundoLugar.nombre}</li>
        <li>3er lugar: ${this.tercerLugar.nombre}</li>
      </ul>

      ${(this.participantes.length == 0) ?
        html`<p>DATA NOT AVAILABLE</p>` :
        this.renderCards()
      }
    `;
  }

  async firstUpdated() {
    try {
      let apiResult = await fetch(`https://randomuser.me/api/?results=14`);
      let apiResultJson = await apiResult.json();
      this.participantes = apiResultJson.results;
    } catch (error) {
      console.log("something wrong!:");
    }
  }


  renderCards() {
    let cards = this.participantes.map((participante) => {
      return html`<card-component
            nombreParticipante="${participante.name.title}  ${participante.name.first} ${participante.name.last}"
            urlFotoParticipante="${participante.picture.medium}"
            @actualizarVotacion="${this.actualizarVotacion}">
          </card-component>`
    });
    return cards;
  }

  actualizarVotacion(e) {
    let { nombre: nombreEvnt, votos: votosEvnt } = e.detail;
    // actualizar votos si el participante ya esta en el top
    if (nombreEvnt == this.primerLugar.nombre) this.primerLugar.votos = votosEvnt;
    if (nombreEvnt == this.segundoLugar.nombre) this.segundoLugar.votos = votosEvnt;
    if (nombreEvnt == this.tercerLugar.nombre) this.tercerLugar.votos = votosEvnt;
    //si es mas grande que el segundo lugar
    if (votosEvnt >= this.primerLugar.votos) {
      if (nombreEvnt != this.primerLugar.nombre) {
        if (nombreEvnt != this.segundoLugar.nombre) {
          this.tercerLugar = this.segundoLugar;
        }
        this.segundoLugar = this.primerLugar;
        this.primerLugar = {
          nombre: nombreEvnt,
          votos: votosEvnt
        };
      } else {
        this.primerLugar.votos = votosEvnt;
      }
      this.requestUpdate();
      return 0;
    }
    //si es mas grande que el segundo lugar
    if (votosEvnt >= this.segundoLugar.votos) {
      if (nombreEvnt != this.segundoLugar.nombre) {
        this.tercerLugar = this.segundoLugar;
        this.segundoLugar = {
          nombre: nombreEvnt,
          votos: votosEvnt
        };
      } else {
        this.segundoLugar.votos = votosEvnt;
      }
      this.requestUpdate();
      return 0;
    }
    // si es mas grande que el tercero
    if (votosEvnt > this.tercerLugar.votos) {
      if (nombreEvnt != this.primerLugar.nombre && nombreEvnt != this.segundoLugar.nombre) {
        this.tercerLugar = {
          nombre: nombreEvnt,
          votos: votosEvnt
        };
      }
      this.requestUpdate();
      return 0;
    }
  }

  shouldUpdate(changedProperties) {
    // si se actualizaron los datos por que el participante ya estaba en el top
    if (this.tercerLugar.votos > this.segundoLugar.votos) {
      let votoTemp = this.tercerLugar.voto;
      let nombreTemp = this.tercerLugar.nombre;
      this.tercerLugar.nombre = this.segundoLugar.nombre;
      this.tercerLugar.votos = this.segundoLugar.votos;
      this.segundoLugar.nombre = nombreTemp;
      this.segundoLugar.votos = votoTemp;
    }
    if (this.segundoLugar.votos > this.primerLugar.votos) {
      let votoTemp = this.primerLugar.voto;
      let nombreTemp = this.primerLugar.nombre;
      this.primerLugar.nombre = this.segundoLugar.nombre;
      this.primerLugar.votos = this.segundoLugar.votos;
      this.segundoLugar.nombre = nombreTemp;
      this.segundoLugar.votos = votoTemp;
    }
    if(this.primerLugar.votos == 0) this.primerLugar.nombre = "";
    if(this.segundoLugar.votos == 0) this.segundoLugar.nombre = "";
    if(this.tercerLugar.votos == 0) this.tercerLugar.nombre = "";
    return true;
  }

  static get styles() {
    return css`
      @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
      :host{
        display:block;
        font-family: 'Balsamiq Sans', cursive;
      }
      h1{
        text-align:center;
        
      }
      p#statusVotacion{
        margin-left:30px;
        font-size:20px;
    }
    li{
      background:#008CBA;
      border-radius: 5px;
      margin: 2px;
      padding:4px;
      color:white;
      width: 350px;
    }
    li:nth-child(2){
      margin-left: 20px;
    }
    li:nth-child(3){
      margin-left: 40px;
    }
    `;
  }
}
customElements.define('sistema-votacion', SistemaVotacion);
