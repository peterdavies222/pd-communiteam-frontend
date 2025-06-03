import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import Utils from '../Utils'

customElements.define('ct-dashboardhero', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      user: {
        type: Object
      },
      message: {
        type: String
      },
      image: {
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

      .dashboardhero {
        height: 510px;
        width: 100%;
        position: relative;
        margin-bottom: 45px;
        overflow: hidden;
      }

      .dashboardhero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0% 15%;
        /* height: calc(100% + 50px);
        object-fit: cover; */
        /* position: absolute;
        top: -50px; */
      }

      .dashboardhero__gradient {
        width: 100%;
        height: 300px;
        position: absolute;
        bottom: -1px;
        background: linear-gradient(0deg, var(--ct-lightyellow) 0%, rgba(0, 0, 0, 0) 100%);
      }

      .dashboardhero__text {
        position: absolute;
        margin-inline: var(--ct-margins);
        bottom: 50px;
        display: flex;
        flex-direction: column;
        gap: 
      }

      .dashboardhero__title {
        font-family: var(--titles-font-family);
        color: var(--ct-black);
        font-size: calc(60rem / 16);
        font-weight: 100;
        margin-bottom: 10px;
      }
      
      .dashboardhero__message {
        margin: 0;
        color: var(--ct-darkgrey);
        font-size: calc(20rem / 16);
      }

      @media screen and (max-width: 1024px) {
        /* .dashboardhero {
          height: 350px;
        } */
        .dashboardhero img {
          object-position: 100% 0%;
        }
        /* .dashboardhero__gradient {
          background: linear-gradient(180deg, var(--ct-green) 0%, rgba(0, 0, 0, 0) 100%);
          height: 100%;
          bottom: 0;
          opacity: 30%;
        } */
      }
    </style>

    <div class="dashboardhero">
      <img src="${this.image}" alt="Hero image.">
      <div class="dashboardhero__gradient"></div>
      <div class="dashboardhero__text">
        <h1 class="dashboardhero__title">Welcome back, ${Utils.toTitleCase(this.user.firstName)}!</h1>
        <h2 class="dashboardhero__message">${this.message ? this.message : 'Ready to find your sporting community?'}</h2>
      </div>
    </div>
    `
  }
  
})