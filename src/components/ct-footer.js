import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-footer', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
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
      * {
        box-sizing: border-box;
      }
      footer {
        border-top: solid var(--ct-black) 2px;
        margin-top: 60px;
        background-color: var(--ct-darkgrey);
        padding: 60px;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      /* .footer__logo {
        width: 277px;
        height: fit-content;
      } */
      .footer__logo img {
        width: 277px:
      }
      .footer__tagline {
        font-family: 'sofia-regular';
        font-size: calc(14rem / 16);
        font-style: italic;
        color: var(--ct-lightgrey);
        text-transform: uppercase;
        margin-top: 5px;
      }
      .footer__disclaimer {
        font-family: 'sofia-regular';
        font-size: calc(12rem / 16);
        color: var(--ct-lightgrey);
      }
    </style>
  
    <footer>
      <div class="footer__logo">
        <img src="/images/ct-logo.svg" alt="Communiteam logo.">
        <p class="footer__tagline">Find your community. Find your team.</p>
      </div>
      <p class="footer__disclaimer">© 2025 Communiteam. All rights reserved.</p>
    </footer>
    `
  }
  
})