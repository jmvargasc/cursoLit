import { LitElement, html, css } from 'lit-element';

export class BodyCurso extends LitElement {

    static get properties(){
        return{
            numeroInicio:{type: Number},
            siguienteNumero:{type: Number},

            primerEvento: {type: Number}
        }
    }

    constructor(){
        super();
        this.numeroInicio = 0;
        this.siguienteNumero = 0;
        this.primerEvento = 10;
    }

    static get styles(){ 
        return css`
            :host {
                display: block;
            }
            `;
    }

    render() {
        return html`
            <p>${this.edad}</p>
            <button @click="${() => {Math.random()*10}}">Cambia edad</button>

            <p>${this.numeroInicio}</p>
            <p>${this.siguienteNumero}</p>
            <button @click="${() => this.numeroInicio = this.cambiaNumero()}">Cambia propiedad 1</button>
            <button @click="${() => this.siguienteNumero = this.cambiaNumero()}">Cambia propiedad 2</button>
        `;
    }

    async performUpdate(){
        console.info("Antes de actualizar");
        await new Promise((resolve) => requestAnimationFrame(() => resolve()));
        console.info("Ya se actualizo");
        super.performUpdate();
      }
    
      firstUpdated(changedProperties){
        this.primerEvento = this.cambiaNumero();
        console.info(this.primerEvento);
      }
    
      updated(changedProperties){
        this.primerEvento = this.cambiaNumero();
        console.info(this.primerEvento);
        super.update();
      }
    
      shouldUpdate(changeProperties){
        changeProperties.forEach((oldValue, propName) => {
          console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
        return changeProperties.has('numeroInicio');
      }
    
      cambiaNumero(){
        return Math.random()*10;
      }
}
customElements.define('body-curso', BodyCurso);