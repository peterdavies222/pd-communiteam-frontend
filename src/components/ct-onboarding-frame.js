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
        overflow-y: auto;
      }
      img {
        display: block;
        width: calc(100% - 120px);
        /* height: 424px; */
        aspect-ratio: 16/9;
        object-fit: cover;
        object-position: 0% 0%;
        margin: auto;
        border-radius: 15px 15px 0 0;
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
        <img src="${this.image ? this.image : '../images/dashboard.png'}" alt="${this.title ? this.title : 'Onboarding image.'}">
        <div class="line"></div>
        <div class="info">
          <h2>${this.title ? this.title : 'title'}</h2>
          <p>${this.message ? this.message : 'message'}</p>
        </div>
    </div>    
    `
  }
  
})