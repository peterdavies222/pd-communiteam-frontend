import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-onboarding-frame', class Communiteam extends LitElement {
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
      message: {
        type: String
      },
      index: {
        type: Number
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
      .wrap {
        width: 100%;
        height: fit-content;
        
      }
      .image-container {
        max-width: 350px;
        margin: auto;
        text-align: center;
      }
      img {
        height: 100%;
        max-height: 50vh;
        margin-block: auto;
      }
      .line {
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg,rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 1) 13%, rgba(23, 23, 23, 1) 87%, rgba(23, 23, 23, 0) 100%);
        opacity: 50%;
      }
      .info {
        text-align: center;
        margin-top: 30px;
      }
      h2 {
        margin-block: 0px 30px;
      }
      p {
        margin: 0;
      }
      
    </style>
  
    <div class="wrap">
        <div class="image-container">
          <img src="${this.image ? this.image : '../images/dashboard.png'}" alt="${this.title ? this.title : 'Onboarding image.'}">
        </div>
          
        <div class="line"></div>
        <div class="info">
          <h2>${this.title ? this.title : 'title'}</h2>
          <p>${this.message ? this.message : 'message'}</p>
        </div>
    </div>    
    `
  }
  
})