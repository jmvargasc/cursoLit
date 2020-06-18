import { LitElement, html , css} from 'lit-element';

export class NewComponent extends LitElement {
    static get properties(){
        return{
            links: {type: Array},
        }
    }

    constructor(){
        super();
        this.links = [];
    }

    static get styles(){
        return css`
            .menuMain {
                background: blue;
                color: green;
            }
        `;
    }

    render() {
        return html`
        <div class="menuMain">
            <nav>
                ${this.links.map((item) => html `<a style="color: white" href="${item}">${item} </a>`)}
            </nav>
        </div>

        ${this.links == [] ? this.renderNewHeader() : ''}
        `;
    }

    renderNewHeader(){
        return html `
            <div>
                <nav>
                    <a href="$1">Nueva navegacion</a>
                    <a href="$1">Nuevos links</a>
                </nav>
            </div>
        `
    }


}
customElements.define('new-component', NewComponent);