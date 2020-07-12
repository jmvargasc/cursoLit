import { LitElement, html, css } from "lit-element";
import { ESTILOS_PAGE_PRINCIPAL } from "../css/css";

export class PrimerosLugares extends LitElement {
  static get properties() {
    return {
      primer: { type: String },
      segundoLugar: { type: String },
      tercerLugar: { type: String },
      personas: { type: Array },
    };
  }
  constructor() {
    super();
    this.primer = "";
    this.segundoLugar = "";
    this.tercerLugar = "";
    this.personas = [];
  }
  static get styles() {
    return [
      ESTILOS_PAGE_PRINCIPAL,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
  updated(changedProps) {
    super.updated(changedProps);
    //console.log("es el ordenamiento de primeros lugares", changedProps);
    //console.log("son las personas", this.personas);
    let consulta = alasql("select * from ?  ORDER BY votos desc", [
      this.personas,
    ]);

    //let consulta = this.ordenarAsc(this.personas);

    if (consulta.length > 0) {
      this.primer = consulta[0].name.first;
      this.segundoLugar = consulta[1].name.first;
      this.tercerLugar = consulta[2].name.first;
    }

    console.log("consulta en update", consulta);
    return true;
  }
  render() {
    return html`
      <link rel="stylesheet" href="./src/lib/bootstrap/css/bootstrap.min.css" />
      <script src="./src/lib/jquery/jquery-3.5.1.min.js"></script>

      <script src="./src/lib/bootstrap/js/bootstrap.min.js"></script>
      <div class="card mb-3" style="max-width: 540px;    margin: auto">
        <div class="row no-gutters">
          <div class="col-md-12">
            <div class="card-body col-md-12">
              <p
                class="card-text col-md-12"
                id="status"
                style="text-align: center; margin-bottom: 7px;"
              >
                ${this.primer}
              </p>
              <p
                class="card-text col-md-6"
                id="status"
                style="text-align: center;float: left;"
              >
                ${this.segundoLugar}
              </p>
              <p
                class="card-text col-md-6"
                id="status"
                style="text-align: center;float: left;"
              >
                ${this.tercerLugar}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  updateLugares(persons) {
    this.primer = "soy el rpimer lugar";
    console.log("soy funcion", persons);
    this.personas = persons;
    //let arregloOrdenado = this.ordenarAsc(persons);
    //console.log("es el arreglo ordenado", arregloOrdenado);
    //this.primer = arregloOrdenado[0].name.first;
    //this.attributeChangedCallback(
    //this.primer,
    //"ss",
    //arregloOrdenado[0].name.first
    //);

    //let consulta = alasql("select * from ? ", [persons]);
    //console.log("consulta", consulta);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    name = newValue;
    console.log("Custom square element attributes changed. ", name);
    this.primer = name;
    super.primer = name;
    //updateStyle(this);
  }
  ordenarAsc(p_array_json, p_key) {
    /*
    p_array_json.sort(function (a, b) {
      console.log(a.votos);
      return b.votos - a.votos;
    });
    return p_array_json;*/
    p_array_json.sort(function (a, b) {
      return b.votos - a.votos;
    });
    return p_array_json;
  }
}
customElements.define("primeros-lugares", PrimerosLugares);
