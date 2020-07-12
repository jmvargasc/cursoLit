import { LitElement, html, css } from "lit-element";
import { miCSS } from "../css/css";
import "./view-home";
import { Http } from "../js/http";

class PagePrincipal extends LitElement {
  constructor() {
    super();
    console.log("esftilos prinipa", this.shadowRoot.getElementById("home"));
  }
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
    return html` <view-home id="home"></view-home> `;
  }
}
customElements.define("page-principal", PagePrincipal);
