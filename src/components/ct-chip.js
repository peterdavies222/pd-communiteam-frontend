import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-chip', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      label: {
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
      .chip {
        width: fit-content;
        font-family: 'sofia-regular';
        font-size: 1rem;
        padding: 5px 10px;
        border: solid var(--ct-midgrey) 2px;
        border-radius: 100px;
        margin: 0;
      }
    </style>
  
    <p class="chip">
      ${this.label ? this.label : 'chip'}
    </p>
    `
  }
  
})