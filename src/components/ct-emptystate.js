import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-emptystate', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      image: {
        type: String
      },
      imagealt: {
        type: String
      },
      message: {
        type: String
      },
      buttonlabel: {
        type: String
      },
      buttonurl: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  testHandler(){
    alert("test")
  }
  
  render(){    
    return html`
    <style>
      .empty-state {
        margin: auto;
        width: 480px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 60px;
        margin-bottom: 60px;
      }
      .empty-state__image {
        align-self: center;
        margin: 0;
        width: 300px;
      }
      .empty-state__text {
        display: flex;
        gap: 30px;
        flex-direction: column;
      }
      .empty-state__title {
        font-family: 'veneer-regular';
        font-size: calc(36rem / 16);
        color: var(--ct-black);
        margin: 0;
        font-weight: 100;
      }
      .empty-state__message {
        font-size: 1rem;
        color: var(--ct-darkgrey);
        margin: 0;
      }
      .empty-state__button {
        font-family: 'sofia-medium';
        text-decoration: none;
        color: var(--ct-darkgrey);
        background-color: var(--ct-green);
        padding: 5px 15px;
        align-self: center;
        border-radius: 15px;
      }
      .empty-state__button:hover {
        background-color: var(--ct-tintedgreen);
      }
    </style>
  
    <div class="empty-state">
      <img class="empty-state__image" src="${this.image ? this.image : '../images/empty-states/emptystate-nodrafts.svg'}" alt="${this.imagealt}">
      <div class="empty-state__text">
        <h2 class="empty-state__title">${this.title ? this.title : 'Empty state'}</h2>
        <p class="empty-state__message">${this.message ? this.message : 'Empty state message'}</p>
        
      </div>
      ${this.buttonurl ? html`<a class="empty-state__button" href="${this.buttonurl}">${this.buttonlabel ? this.buttonlabel : 'label'}</a>` : ''}
    </div>
    `
  }
  
})