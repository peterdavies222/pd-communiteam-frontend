import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import Toast from '../Toast'
import UserAPI from '../UserAPI'

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
      },
      action: {
        type: String
      },
      imagesize: {
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

  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    gotoRoute(pathname)
  }

  async verify() {
    try {
      // Save current path
      const currentPath = window.location.pathname

      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {accessLevel: 2})
      this.user = await updatedUser
      Auth.currentUser = updatedUser
      console.log(updatedUser)
      console.log(`Access level = ${Auth.currentUser.accessLevel}`)
      
      // Simulate navigation away and back to trigger popstate
      window.history.pushState({}, '', '/temp')
      window.history.replaceState({}, '', currentPath)
      window.dispatchEvent(new PopStateEvent('popstate'))

      Toast.show(`You're now verified!`)
      }catch(err) {
      Toast.show(err, 'error')
    }
  }
  
  render(){    
    return html`
    <style>
      .empty-state {
        margin: auto;
        width: 480px;
        max-width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
      .empty-state__image {
        align-self: center;
        margin: 0;
        width: 300px;
        max-width: 100%;
        ${this.imagesize === "small" ? 'width: 200px;' : ''}
      }
      .empty-state__text {
        display: flex;
        gap: 10px;
        flex-direction: column;
      }
      .empty-state__title {
        font-family: 'veneer-regular';
        font-size: calc(24rem / 16);
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
      button {
        border: none;
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
      ${this.buttonurl ? html`<a class="empty-state__button" href="${this.buttonurl}" @click="${this.menuClick}">${this.buttonlabel ? this.buttonlabel : 'label'}</a>` : 
      html`<button class="empty-state__button" @click=${this.action === 'verify' ? () => this.verify() : null}>${this.buttonlabel ? this.buttonlabel : 'label'}</button>`}
    </div>
    `
  }
  
})