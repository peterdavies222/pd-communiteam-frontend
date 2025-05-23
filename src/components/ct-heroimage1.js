import { LitElement, html, css } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('ct-heroimage', class Communteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){ 
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){   
        navLink.classList.add('active')
      }
    })
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = document.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  createRenderRoot(){
    return this
  }

  render(){    
    return html`
    <style>      
      
      
        header {
            width: 100%;
            padding: 30px 60px 0px;
            height: fit-content;
            position: fixed;
            z-index: 100;
        }

        header * {
            //border: solid red 1px;
        }

        header nav {
            width: 100%;
            background: var(--bg-color);
            border-radius: 1000px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px;
            box-shadow: 0px 4px 20px #00000050;
        }

        header .header__logo {
            width: 150px;
            height: auto;
            padding: 0;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        header ul {
            list-style: none;
            padding: 0;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 30px;
        }

        header li a {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
        }

        header li img {
            width: 19px;
            height: 19px;
        }

        header li p {
            margin: 0;
            padding: 0;
            font-family: 'sofia-bold';
            font-size: 1rem;
        }

    </style>

    <header>
        <nav>
            <a href="/home" @click="${this.menuClick}"><img src="/images/ct-logo.svg" alt="communiteam logo" class="header__logo"></a>
            <ul>
                <li><a href="/" @click="${this.menuClick}"><img src="/images/icons/dashboard.svg" alt="home icon"><p>Dashboard</p></a></li>
                <li><a href="/" @click="${this.menuClick}"><img src="/images/icons/explore.svg" alt="explore icon"><p>Explore</p></a></li>
                <li><a href="/" @click="${this.menuClick}"><img src="/images/icons/events.svg" alt="events icon"><p>Events</p></a></li>
                <li><a href="/" @click="${this.menuClick}"><img src="/images/icons/messages.svg" alt="messages icon"><p>Messages</p></a></li>
                <li><a href="/" @click="${this.menuClick}"><img src="/images/icons/profile.svg" alt="profile icon"><p>Profile</p></a></li>
            </ul>
        </nav>
    </header>    


    `
  }
  
})