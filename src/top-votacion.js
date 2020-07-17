import { LitElement, html, css } from 'lit-element';

export class TopVotacion extends LitElement {

    static get properties(){
        return{
            primero:{type:Object},
            segundo:{type:Object},
            tercero:{type:Object}
        };
    }

    static get styles(){
        return css`
            table{
                width: 50%;
                height: 50px;
                text-align: center;
                border: 2px solid #000;
            }
            table td{
                height: 25px;
            }
            .imagenesTop{
                width: 20px;
                height: 20px;
            }
        `
    }

    constructor(){
        super();
        this.primero = new Object;
        this.segundo = new Object;
        this.tercero = new Object;
    }

    render() {
        return html`
            <table>
                <tr>
                    <td colspan="2">
                        ${this.primero.nombre != undefined ? 
                            html`
                                <img src="/../img/primer-lugar.jpg" class="imagenesTop"/>
                                <label>${this.primero.nombre}</label>
                            `
                            : ""}
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%;">
                        ${this.segundo.nombre != undefined ? 
                            html`
                                <img src="/../img/segundo-lugar.jpg" class="imagenesTop"/>
                                <label>${this.segundo.nombre}</label>`
                            : ""}
                    </td>
                    <td style="width: 50%;">
                        ${this.tercero.nombre != undefined ?
                            html`
                                <img src="/../img/tercer-lugar.jpg" class="imagenesTop"/>
                                <label>${this.tercero.nombre}</label>
                            `
                            : ""}    
                    </td>
                </tr>   
            </table>
        `;
    }

    updated(changedProperties) {
        changedProperties.forEach((newValue, propName) => {
          //console.log(`cambio ${propName}`);
          //console.log(newValue)
        });
        
      }

    asignarTop(posiciones){
        this.primero = posiciones[0];
        this.segundo = posiciones[1];
        this.tercero = posiciones[2];
    }
}
customElements.define('top-votacion', TopVotacion);