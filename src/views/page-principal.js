import { LitElement, html, css } from "lit-element";
import { miCSS } from "../css/css";

class PagePrincipal extends LitElement {
  static get styles() {
    return [
      miCSS,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
  render() {
    return html`<p>Hola mundo</p>`;
  }
}
customElements.define("page-principal", PagePrincipal);
