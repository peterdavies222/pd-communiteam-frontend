import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-message', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      status: {
        type: String
      },
      sender: {
        type: Object
      },
      content: {
        type: String
      },
      url: {
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
      .message {
        width: 100%;
        height: fit-content;
        display: flex;
        gap: 15px;
        border-radius: 15px;
        padding: 10px;
        position: relative;
      }
      .message.unread {
        border-bottom: solid var(--ct-midgrey) 2px;
        background-color: var(--ct-darkgrey-translucent);
      }
      .message__avatar-container {
        width: 60px;
        height: 60px;
        position: relative;
        flex-shrink: 0;
      }
      .message.unread .message__avatar-container::before {
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: var(--ct-red);
        top: 3px;
        right: 3px;
        position: absolute;
      }
      .message__avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        object-fit: cover;
      }
      p.message__avatar {
        margin: 0;
        background-color: var(--ct-midgrey);
        color: var(--ct-black);
        font-size: 2rem;
        font-family: 'sofia-bold';
      }
      .message__text {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .message__text p {
        margin: 0;
      }
      .message__name {
        font-family: 'sofia-bold';
        color: var(--ct-black);
        font-size: calc(20rem / 16);
      }
      .message__message {
        font-family: 'sofia-regular';
        color: var(--ct-darkgrey);
        font-size: calc(14rem / 16);
      }
      .message.unread .message__message {
        font-family: 'sofia-bold';
      }
      .message__link {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    </style>

    <div class="message ${this.status == 'unread' ? 'unread' : 'read'}">
      <div class="message__avatar-container">
        ${this.sender.avatar ? 
          html`<img class="message__avatar" src="${App.apiBase}/images/${this.sender.avatar}" alt="Profile image.">` : 
          html`<p class="message__avatar">${this.sender.firstName.charAt(0)}${this.sender.lastName.charAt(0)}</p>`}
      </div>
      <div class="message__text">
          <p class="message__name">${this.sender.firstName} ${this.sender.lastName}</p>
          <p class="message__message">${this.content}</p>
      </div>
      <a href="${this.url}" class="message__link"></a>
    </div>
    `
  }
  
})