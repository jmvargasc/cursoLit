import { LitElement, html, css } from "lit-element";
import { ESTILOS_PAGE_PRINCIPAL } from "../css/css";
import { Http } from "../js/http";

class ViewHome extends LitElement {
  static get properties() {
    return {
      URL: { type: String },
      persons: { type: Array },
      votos: { type: Number },
      selected: { type: Boolean },
      lugares: { type: Array },
      display: { type: String },
    };
  }
  constructor() {
    super();
    this.URL = " https://randomuser.me/api/?results=10.";
    this.persons = [];
    this.votos = 0;
    this.selected = false;
    this.lugares = {
      primero: "",
      segundo: "",
      tercero: "",
    };
    this.display = "none";
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
  render() {
    return html`
      <!-- CSS only -->
      <link rel="stylesheet" href="./src/lib/bootstrap/css/bootstrap.min.css" />
      <script src="./src/lib/jquery/jquery-3.5.1.min.js"></script>
      <script src="./src/lib/bootstrap/js/bootstrap.min.js"></script>
      <primeros-lugares id="primerosLugares"></primeros-lugares>
        ${this.persons.map(
          (todo) =>
            html`
              <div class="card mb-3" style="max-width: 540px;    margin: auto">
                <div class="row no-gutters">
                  <div class="col-md-2">
                    <img src="${todo.picture.thumbnail}" alt="..." />
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <p class="card-text" @click="${this.updateVoto}">
                        ${todo.name.first + " " + todo.name.last}
                        (${todo.login.username == this.selected
                          ? (todo.votos = this.votos)
                          : todo.votos})
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <button
                      type="button"
                      class="btn btn-success votar"
                      name="${todo.votos + "-" + todo.login.username}"
                      @click="${this.updateVoto}"
                    >
                      Votar
                    </button>
                    <button
                      style="display:none"
                      id="${todo.login.username}"
                      type="button"
                      class="btn btn-danger votar"
                      name="menos${todo.votos + "-" + todo.login.username}"
                      @click="${this.lessVoto}"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            `
        )}
      </section>
    `;
  }
  firstUpdated() {
    const URL = "https://randomuser.me/api/?results=10.";
    let pero = Http.fetchData(URL)
      .then((response) => {
        console.log("response dentro", response);
        this.persons = response.results;
        console.log("response dentro", this.persons);
      })
      .catch((e) => console.log("ocurrio un error", e));
    console.log("should update!", pero);
  }
  searchPerson() {
    const URL = "https://randomuser.me/api/?results=10.";
    Http.fetchData(URL);
    return Http.fetchData(URL);
  }
  updated(changedProps) {
    super.updated(changedProps);
    let per = [];
    //for (let i = 0; i < this.persons.length; i++) {
    // per.push(this.persons[i]);
    //}
    //console.log("per", per);
    //let gu = this.ordenarAsc(per, "votos");
    //console.log("asasd", gu);
    //this.lugares.primero = gu[0].name.first;
    return true;
  }
  disconnectedCallback() {
    console.log("disconnected!");
    console.log(this.shadowRoot.querySelector("ul"));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom home", name);
    updateStyle(this);
  }
  ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
      console.log(a.votos);
      return b.votos - a.votos;
    });
    return p_array_json;
  }
  swap(myArr, indexOne, indexTwo) {
    var tmpVal = myArr[indexOne];
    console.log("asdf", tmpVal);
    myArr[indexOne] = myArr[indexTwo];
    myArr[indexTwo] = tmpVal;
    return myArr;
  }
  updateVoto(e) {
    e.preventDefault();

    let nombreCompleto = e.target.getAttribute("name");
    let quitaPalabra = nombreCompleto.replace("menos", "");
    let voto1 = quitaPalabra.split("-");

    let elemet = this.shadowRoot.getElementById(voto1[1]);
    elemet.style.display = "";

    let voto = nombreCompleto.split("-");

    this.selected = voto[1];
    this.votos = parseInt(voto[0]);
    this.votos++;
    let per = [];

    for (let i = 0; i < this.persons.length; i++) {
      per.push(this.persons[i]);
    }
    console.log("per", per);
    //let gu = this.ordenarAsc(per, "votos");
    //console.log("asasd", gu);
    // this.lugares.primero = gu[0].name.first;

    this.shadowRoot.getElementById("primerosLugares").updateLugares(per);
  }
  lessVoto(e) {
    e.preventDefault();

    let nombreCompleto = e.target.getAttribute("name");
    let quitaPalabra = nombreCompleto.replace("menos", "");
    let voto = quitaPalabra.split("-");

    let element = this.shadowRoot.getElementById(voto[1]);
    element.style.display = "none";
    this.selected = voto[1];
    this.votos = parseInt(voto[0]);

    if (this.votos > 0) {
      this.votos--;
    }
    let per = [];

    for (let i = 0; i < this.persons.length; i++) {
      per.push(this.persons[i]);
    }
    console.log("per", per);
    //let gu = this.ordenarAsc(per, "votos");
    //console.log("asasd", gu);
    // this.lugares.primero = gu[0].name.first;

    this.shadowRoot.getElementById("primerosLugares").updateLugares(per);
  }
}
customElements.define("view-home", ViewHome);
