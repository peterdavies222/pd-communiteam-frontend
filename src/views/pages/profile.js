import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
    <header>
      <ct-nav
        section="profile"
        messagecount="2"
        user=${JSON.stringify(Auth.currentUser)}
      ></ct-nav>
      <ct-heroimage
        title="Profile"
        image="../images/profile-hero.jpeg"
      ></ct-heroimage>
    </header>

    <main class="main-content profile">
      <div class="content-frame">

        <div class="title title--close">
          <h2>Public info</h2>
          <a href="#" class="button button--outline">Edit</a>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Profile image</p>
          <sl-avatar></sl-avatar>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Name</p>
          <p class="profile__item__text">${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</p>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Bio</p>
          <p class="profile__item__text">${Auth.currentUser.bio ? Auth.currentUser.bio : 'No bio set!'}</p>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Interests</p>
          <div class="chips">
            <ct-chip label="Soccer"></ct-chip>
            <ct-chip label="Tennis"></ct-chip>
          </div>
        </div>

      </div>

      <div class="content-frame">

        <div class="title title--close">
          <h2>Private account details</h2>
          <a href="#" class="button button--outline">Edit</a>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Email</p>
          <p class="profile__item__text">${Auth.currentUser.email}</p>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Password</p>
          <p class="profile__item__text">${Auth.currentUser.password}</p>
        </div>

      </div>

      <div class="content-frame">
        <div class="title">
          <h2>Account actions</h2>
        </div>
        <a href="#" class="delete-account-button">Delete account</a>
      </div>

    </main>
    <ct-footer></ct-footer>


    <!-- old stuff that im scared to delete
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p>${Auth.currentUser.email}</p>
        
        <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

        <sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
      </div>      -->
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()