import { LitElement, html, css } from 'lit-element';

class CardComponent extends LitElement {

    static get properties() {
        return {
            nombreParticipante: { type: String },
            urlFotoParticipante: { type: String },
            votos: { type: Number },
            flagMasUnVoto: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.nombreParticipante = "Participante";
        this.urlFotoParticipante = "https://clubdeescritura.com/wp-content/uploads/users-52/user-51596/2017/05/photo-300x300.png";
        this.votos = 0;
        this.flagMasUnVoto = false;
    }

    static get styles() {
        return css`
            @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
            div.card{
                display:inline-block;
                font-family: 'Balsamiq Sans', cursive;
                border: solid #008CBA 1px;
                width: 200px;
                height: 300px;
                margin: 15px;
                padding: 0px;
                border-radius: 10px;
            }
            div.nombre{
                font-size: 17px;
                padding:0px;
                text-align:center;
                margin:0px;
                background:#008CBA;
                color:white;
                border-radius:10px 10px 0px 0px;
                height:34px;
            }
            div.foto{
                padding-top:3px;
                text-align:center;
            }
            img{
                width:150px;
                height:150px;
            }
            div.botones{
                text-align:center;
                margin-top:0px;
                padding-top:0px;
                overflow:auto;
            }
            button{
                background: transparent;
                background-color: white; 
                color: black; 
                border: 2px solid #008CBA;
                border-radius: 6px;
                padding: 5px 15px;
                text-align: center;
                display: inline-block;
                font-size: 14px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
                text-decoration: none;
                text-transform: uppercase;
            }
            button:hover {
                background-color: #008CBA;
                color: white;
           }
           button#menosUnVoto{
               display:none;
           }
        `;
    }

    render() {
        return html`
            <div class="card">
                <div class="nombre">
                    ${this.nombreParticipante}
                </div>
                <div class="foto">
                    <img src="${this.urlFotoParticipante}">
                </div>
                <div class="botones">
                    <span>${this.votos} VOTOS</span>
                    <br>
                    <button id="masUnVoto" @click=${this.masUnVotoBTN}>+1 Voto</button>
                    <br>
                    <button id="menosUnVoto" @click=${this.menosUnVotoBTN}>-1 Voto</button>
                </div>

            </div>
        `;
    }

    masUnVotoBTN() {
        this.votos = this.votos+1;
        this.shadowRoot.getElementById("menosUnVoto").style.display = "inline";
        this.lanzarEvento();
    }
    menosUnVotoBTN() {
        this.votos = this.votos-1;
        this.shadowRoot.getElementById("menosUnVoto").style.display = "none";
        this.lanzarEvento();
    }
    lanzarEvento(e) {
        let votacionEvent = new CustomEvent('actualizarVotacion', {
            detail: {
                nombre: this.nombreParticipante,
                votos: this.votos
            },
            bubbles: true,
            composed: true
            });
        this.dispatchEvent(votacionEvent);
    }


}

customElements.define('card-component', CardComponent);