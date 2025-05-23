import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-eventsfilters', class Communiteam extends LitElement {
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
      .wrap {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
        margin-bottom: 0.5em;
        padding: 1em;
      }
    </style>
  
    <div class="wrap">
      
    </div>
    `
  }
  
})