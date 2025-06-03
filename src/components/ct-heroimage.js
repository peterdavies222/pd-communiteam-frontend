import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-heroimage', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      image: {
        type: String
      },
      title: {
        type: String
      },
      buttonlabel: {
        type: String
      },
      buttonicon: {
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
        .heroimage * {
          margin: 0;
        }
        .heroimage {
          width: 100vw;
          height: 300px;
          background-color: var(--ct-yellow);
          overflow: hidden;
          position: relative;
          margin-bottom: 60px;
        }
        .heroimage__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 0% 20%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .heroimage__gradient {
          width: 50%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(90deg,rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
        }
        @media screen and (max-width: 1024px) {
          .heroimage__gradient {
            width: 100%;
          }
        }
        @media screen and (max-width: 500px) {
          .heroimage__gradient {
            width: 150%;
          }
        }
        .heroimage__text {
          width: calc(100% - 120px);
          position: absolute;
          left: var(--ct-margins);
          bottom: 60px;
          display: flex;
          justify-content: space-between;
        }
        .heroimage__title {
          font-family: 'veneer-regular';
          font-weight: 100;
          font-size: 60px;
          color: var(--ct-lightyellow);
        }
        .heroimage__button {
          display: flex;
          gap: 10px;
          padding: 5px 10px;
          background-color: var(--ct-green);
          border-radius: 100px;
          color: var(--ct-black);
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
        }
      </style>

      <div class="heroimage">
          <img class="heroimage__image" src="${this.image ? this.image : '/images/rackets.jpg'}" alt="Hero image">
          <div class="heroimage__gradient"></div>
          <div class="heroimage__text">
            <h1 class="heroimage__title">${this.title ? this.title : 'TITLE'}</h1>
            ${this.buttonlabel ? html`<button class="heroimage__button">${this.buttonicon ? this.buttonicon : html``}${this.buttonlabel}</button>`: ''}
          </div>
      </div>
    `
  }
  
})