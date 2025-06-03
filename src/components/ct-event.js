import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-event', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      name: {
        type: String
      },
      date: {
        type: Date
      },
      location: {
        type: String
      },
      description: {
        type: String
      },
      images: {
        type: Array
      },
      url: {
        type: String
      },
      orientation: {
        type: String
      },
      section: {
        type: String
      },
      type: {
        type: String
      },
      id: {
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
    e.stopImmediatePropagation()
  const href = e.target.closest('a').href // get full URL (with query string)
  const url = new URL(href)               // parse URL safely
  gotoRoute(url.pathname + url.search)    // preserve path + query params
  }
  
  render(){    
    return html`
    <style>
      * {
        box-sizing: border-box;
      }
      .event {
        width: 300px;
        max-width: 100%;
        ${this.type == 'grid' ? 'width: 100%;' : ''}
        height: fit-content;
        margin-bottom: 5px;
      }
      .event__image {
        margin: 0;
        width: 100%;
        aspect-ratio: 300/185;
        margin-bottom: 15px;
        border-radius: 15px;
        border: solid var(--ct-midgrey) 1px;
        overflow: hidden;
        background-color: var(--ct-yellow);
      }

      .event__image img {
        margin: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;

      }
      .event__details {
        margin: 0;
        color: var(--ct-red);
        font-size: 0.75rem;
        font-family: 'sofia-bold';
      }
      .event__name {
        margin: 0;
        color: var(--ct-black);
        font-size: 1.25rem;
        font-family: 'sofia-bold';
        margin-bottom: 15px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
                line-clamp: 3; 
        -webkit-box-orient: vertical;
      }
      .event__description {
        margin: 0;
        color: var(--ct-darkgrey);
        font-size: calc(14rem / 16);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
                line-clamp: 5; 
        -webkit-box-orient: vertical;
        margin-bottom: 15px;
      }
      .event__button {
        margin: 0;
        color: var(--ct-darkgrey);
        font-size: calc(14rem / 16);
        text-decoration: none;
        background-color: var(--ct-green);
        padding: 5px 15px;
        border-radius: 100px;
        font-family: 'sofia-medium';
        border: none;
        cursor: pointer;
      }
      .event__button.dashed {
        background-color: transparent;
        border: dashed var(--ct-midgrey) 2px;
      }
      .event__button:hover {
        background-color: var(--ct-tintedgreen);
      }
      .event__button.dashed:hover {
        background-color: transparent;
        border: dashed var(--ct-darkgrey) 2px;
      }

      /* Horizontal event styling */

      .event--horizontal {
        display: flex;
        gap: 15px;
        width: 100%;
        height: fit-content;
      }
      .event--horizontal .event__image {
        width: 50%;
        margin: 0;
      }
      .event--horizontal .event__text {
        width: 50%;
      }

    </style>

    <div class="event ${this.orientation == 'horizontal' ? 'event--horizontal' : ''}">
      <div class="event__image">
        <img src="${App.apiBase}/images/${this.images?.[0].imageUrl}" alt="Image of ${this.name}.">
      </div>
      <div class="event__text">
        <p class="event__details">${this.date ? new Date(this.date).toDateString() : 'DATE HERE'}, ${this.location ? this.location : 'LOCATION HERE'}</p>
        <h3 class="event__name">${this.name ? this.name : 'NAME HERE'}</h3>
        <p class="event__description">${this.description ? this.description : 'DESCRIPTION HERE'}</p>
        ${this.section == 'drafts' ? 
          html`<a href="${this.url.bind(this)}" class="event__button dashed" @click="${this.menuClick}">Edit draft</a>` :
          html`<button @click=${()=>gotoRoute(`/event?id=${this.id}`)} class="event__button">View details</button>`}
      </div>
      
    </div>    
    `
  }
  
})