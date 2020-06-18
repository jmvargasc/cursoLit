import { LitElement, html, css } from 'lit-element';
import '../curso-app/components/new-component/new-component';
import '../curso-app/components/body-curso/body-curso';

export class CursoApp extends LitElement {

  static get properties(){
    return {
      nombre: {type: String},
      edad: {type: Number},

      numeroInicio:{type: Number},
      siguienteNumero:{type: Number},

      primerEvento: {type: Number}
    }
  }

  constructor(){
    super();
    this.links = ["inicio", "nosotros", "contacto"];
    this.edad = 28; 
  }

  set edad(val){
    let oldVal = this._edad;
    this._edad = Math.floor(val);
    this.requestUpdate('edad', oldVal)
  }

  get edad(){
    return this._edad;
  }

  static get styles(){
    return css`
      :host {
        display: block;
      }

      .container{
        padding: 0%;
      }
    `;
  };

  render() {
    return html`
      <h1>Hola mundo</h1>
      <div class="container">
        <new-component .links="${this.links}"></new-component>
        <body-curso></body-curso>
      </div>
    `;
  }

  
}
customElements.define('curso-app', CursoApp);