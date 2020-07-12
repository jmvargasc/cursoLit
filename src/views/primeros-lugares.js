import { LitElement, html, css } from "lit-element";
import { ESTILOS_PAGE_PRINCIPAL } from "../css/css";

export class PrimerosLugares extends LitElement {
  static get properties() {
    return {
      primer: { type: String },
    };
  }
  constructor() {
    super();
    this.primer = "";
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
    console.log("es el ordenamiento de primeros lugares", changedProps);
    return true;
  }
  render() {
    return html`
      <link rel="stylesheet" href="./src/lib/bootstrap/css/bootstrap.min.css" />
      <script src="./src/lib/jquery/jquery-3.5.1.min.js"></script>
      <script src="./src/lib/bootstrap/js/bootstrap.min.js"></script>
      <div class="card mb-3" style="max-width: 540px;    margin: auto">
        <div class="row no-gutters">
          <div class="col-md-2">
            <img src=".." alt="..." />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <p class="card-text" id="status">
                ${this.primer}
                <slot></slot>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("primeros-lugares", PrimerosLugares);
