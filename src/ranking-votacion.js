import { LitElement, html, css } from 'lit-element';

export class RankingVotacion extends LitElement {

    static get properties(){
        return{
            datosVotacion:{type:Array},
            nameSumar:{type:String},
            nameRestar:{type:String}
        };
    }

    static get styles(){
        return  css`
            div{text-align: -webkit-center;}
            table{
                width: 50%;
                border: 2px solid #000;
            }
            button{
                height: 40px;
                border-radius: 5px;
                color: #FFFFFF;
            }
            .btnVerde{            
                background: #159f15;
                width: 60px;
            }
            .btnRojo{            
                background: #a91010;
                width: 100px;
                display:none;
            }
        `
    }

    constructor(){
        super();
        this.nameSumar = "sumarContador";
        this.nameRestar = "restarContador";
        this.obtenerInfoVotacion();
    }

    render() {
        return html`
            <div>
                <top-votacion id="rankingTop"></top-votacion>
                <br/>
                <table>
                    ${this.datosVotacion.length > 0 ?
                        html`
                            ${this.datosVotacion.map(i => html`
                                <tr>
                                    <td><img src="${i.img}"/></td>
                                    <td>${i.nombre}</td>
                                    <td style="width: 30px;"><label id="${i.id}">${i.votos}</label></td>
                                    <td>
                                        <button name="${this.nameSumar}" value="${i.id}" @click="${this.validarContador}" class="btnVerde">VOTAR</button>
                                    </td>
                                    <td style="width: 105px;">
                                        <button name="${this.nameRestar}" value="${i.id}" @click="${this.validarContador}" class="btnRojo" id="btnCan${i.id}">CANCELAR</button>
                                    </td>
                                </tr>
                            `)}
                        `
                        :html`
                            <tr>
                                <td style="text-align:center;">No existen elementos</td>
                            </tr>
                        `
                    }    
                </table>      
            </div>
        `;
    }
    
    obtenerInfoVotacion(){
        fetch("https://randomuser.me/api/?results=15.")
        .then(response => response.json())
        .then(data => {this.ordenarInformacion(data.results);})
        .catch(e => console.error(e));
    }

    ordenarInformacion (datos){
        this.datosVotacion = []; 
        for(let i in datos){
            let obj = new Object();
            obj.id = "participante_"+i;
            obj.img = datos[i].picture.thumbnail;
            obj.nombre = datos[i].name.title+" "+datos[i].name.first+" "+datos[i].name.last;
            obj.votos = 0;
            this.datosVotacion.push(obj);
        }
    }
    
    validarContador(event){
        let val = event.target.value;
        let tipoContador = event.target.name;
        for(let i in this.datosVotacion){
            if(this.datosVotacion[i].id == val){
                if(tipoContador == this.nameSumar){
                    this.datosVotacion[i].votos++;
                    this.shadowRoot.getElementById("btnCanparticipante_"+i).setAttribute("style","display:block;"); 
                }else if(tipoContador == this.nameRestar){
                    this.datosVotacion[i].votos--;
                    this.shadowRoot.getElementById("btnCanparticipante_"+i).setAttribute("style","display:none;");
                }
                this.shadowRoot.getElementById("participante_"+i).innerHTML = this.datosVotacion[i].votos;
            }
        }
        this.validarTop();

    }

    validarTop(){
        let primero = new Object();
        let segundo = new Object();
        let tercero = new Object();
        primero.votos = 0;
        segundo.votos = 0;
        tercero.votos = 0;
        for(let i in this.datosVotacion){
            if(this.datosVotacion[i].votos > primero.votos){
                tercero = segundo;
                segundo = primero;
                primero = this.datosVotacion[i];
            }else if(this.datosVotacion[i].votos > 0 && this.datosVotacion[i].votos == primero.votos){
                tercero = segundo;
                segundo = this.datosVotacion[i];
            }else if(this.datosVotacion[i].votos > segundo.votos){
                tercero = segundo;
                segundo = this.datosVotacion[i];
            }else if(this.datosVotacion[i].votos > 0 && this.datosVotacion[i].votos == segundo.votos){
                tercero = this.datosVotacion[i];
            }else if(this.datosVotacion[i].votos > tercero.votos){
                tercero = this.datosVotacion[i];
            }
        }
        let posiciones = new Array();
        posiciones.push(primero);
        posiciones.push(segundo);
        posiciones.push(tercero);
        this.shadowRoot.getElementById("rankingTop").asignarTop(posiciones);
    }
}
customElements.define('ranking-votacion', RankingVotacion);