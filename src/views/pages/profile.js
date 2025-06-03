import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
    Utils.profileEditing()
    Utils.deleteAccountHandler()
    this.getUser()
  }

  async getUser(){
      try {
        this.user = await UserAPI.getUser(Auth.currentUser._id)      
        this.render()
      }catch(err){
        Toast.show(err, 'error')
      }
    }
  
    // async updateProfileSubmitHandler(e){
    //   e.preventDefault()
    //   const submitBtn = document.querySelector('.submit-btn')
    //   submitBtn.setAttribute('loading', '')
    //   try {
    //     const formData = new FormData(e.target)
    //     const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
    //     delete updatedUser.password        
    //     this.user = updatedUser     
    //     Auth.currentUser = updatedUser
    //     this.render()
    //     Toast.show('profile updated')
    //   }catch(err){      
    //     Toast.show(err, 'error')
    //   }
    //   submitBtn.removeAttribute('loading')
    // }

    inputClick() {
      console.log('trying to click!')
      const slFileInput = document.querySelector('#avatar-input').input
      slFileInput.click()
    }

    async updatePublicProfileSubmitHandler(e){
      e.preventDefault()
      console.log('updating public details...')
      try {
        const firstName = document.getElementById('first-name-input').value.trim()
        const lastName = document.getElementById('last-name-input').value.trim()
        const bio = document.getElementById('bio-input').value.trim()
        // const interests = document.getElementById('interests-select').value
        const interestsSelect = document.getElementById('interests-select')
        const interests = interestsSelect.value; // returns an array, not a string
        // const interests = Array.from(interestsSelect.selectedOptions).map(option => option.value)
        const avatar = document.getElementById('avatar-input')?.input?.files?.[0]
        console.log(avatar)

        const formData = new FormData()

        if(firstName.length > 0) formData.append('firstName', firstName)
        if(lastName.length > 0) formData.append('lastName', lastName)
        formData.bio = formData.append('bio', bio)
        // formData.append('interests', interests)
        // interests.forEach(interest => formData.append('interests', interest))
        // interests.forEach(interest => formData.append('interests', interest))
        if (Array.isArray(interests)) {
          if (interests.length > 0) {
            interests.forEach(interest => formData.append('interests', interest))
          } else {
            // explicitly send an empty array indicator
            formData.append('interests', JSON.stringify([]))
          }
        }
        if(avatar) formData.append('avatar', avatar)

        const updatedUser = await UserAPI.updateUserPublic(Auth.currentUser._id, formData)  
        this.user = updatedUser     
        Auth.currentUser = updatedUser
        this.render()
        Toast.show('Public details updated')
      }catch(err){      
        Toast.show(err, 'error')
      }
    }

    async updatePrivateProfileSubmitHandler(e) {
      e.preventDefault()
      console.log('updating private details...')
      
      try {
        const email = document.querySelector('#email-input').value
        //const password = document.querySelector('#password-input').value
        const updatedUser = await UserAPI.updateUserPrivate(Auth.currentUser._id, {
          email
        })
        this.user = updatedUser
        Auth.currentUser = updatedUser
        this.render()
        Toast.show('Private details updated')
      } catch(err) {
        Toast.show(err, 'error')
      }
    }

    async deleteAccountInitial() {
      console.log('opening dialog')

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
        image="../images/profile-hero.jpg"
      ></ct-heroimage>
    </header>

    <main class="main-content profile">

      <!-- viewing public details -->
      <div class="content-frame" id="public-details-view">

        <div class="title title--close">
          <h2>Public info</h2>
          <button class="button button--outline" id="edit-public-details-btn">Edit</button>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Profile image</p>
          ${this.user && this.user.avatar ?
            html`<sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>`:
            html`<sl-avatar></sl-avatar>`
          }
          
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Name</p>
          <p class="profile__item__text">${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</p>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Bio</p>
          <p class="profile__item__text" style="${Auth.currentUser.bio ? '' : 'color: var(--ct-midgrey)'}">${Auth.currentUser.bio ? Auth.currentUser.bio : 'No bio set!'}</p>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Interests</p>
          <div class="chips">
            ${Auth.currentUser.interests.length !== 0 ? Auth.currentUser.interests.map(interest => html`<ct-chip label="${Utils.toTitleCase(interest)}"></ct-chip>`) : html`<p class="profile__item__text" style="color: var(--ct-midgrey);">You have no interests set yet!</p>`}
          </div>
        </div>

      </div>

      <!-- editing public details -->

      <form class="content-frame" id="public-details-edit" @submit=${this.updatePublicProfileSubmitHandler.bind(this)}>
        <div class="title title--close">
          <h2>Public info</h2>
          <div class="editing-buttons">
            <button type="button" class="button button--outline" id="cancel-public-details-btn">Cancel</button>
            <button type="submit" class="button button--solid" id="save-public-details-btn">Save</button>
          </div>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Profile image</p>
          <div class="avatar-container">
            ${this.user && this.user.avatar ?
              html`<sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>`:
              html`<sl-avatar></sl-avatar>`
            }
            <button type="button" @click=${()=> this.inputClick()} id="edit-avatar-btn">
              <i class="fa-solid fa-pen"></i>
            </button>
            <sl-input id="avatar-input" type="file" name="avatar"></sl-input>
            <!--<button type="button" @click=${()=> this.inputClick()}>Button</button>-->
          </div>
          
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">First name</p>
          <sl-input id="first-name-input" name="firstName" type="text" pill placeholder="${Auth.currentUser.firstName ? Auth.currentUser.firstName : 'First name'}"></sl-input>
        </div>

        <div class="profile__item">
            <p class="profile__item__heading">Last name</p>
            <sl-input id="last-name-input" name="lastName" type="text" pill placeholder="${Auth.currentUser.lastName ? Auth.currentUser.lastName : 'Last name'}"></sl-input>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Bio</p>
          <sl-textarea name="bio" id="bio-input" type="text" pill placeholder="${Auth.currentUser.bio ? Auth.currentUser.bio : 'Tell us a bit about yourself...'}"></sl-textarea>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Interests</p>
          <sl-select name="interests" id="interests-select" value="${Auth.currentUser.interests.length !==0 ? Auth.currentUser.interests.join(" ") : ''}" placeholder="${Auth.currentUser.interests.length !==0 ? '' : 'What sports are you into?'}" multiple clearable pill>
            <sl-option value="afl">AFL</sl-option>
            <sl-option value="badminton">Badminton</sl-option>
            <sl-option value="cricket">Cricket</sl-option>
            <sl-option value="golf">Golf</sl-option>
            <sl-option value="netball">Netball</sl-option>
            <sl-option value="rugby">Rugby</sl-option>
            <sl-option value="running">Running</sl-option>
            <sl-option value="soccer">Soccer</sl-option>
            <sl-option value="hockey">Hockey</sl-option>
            <sl-option value="tennis">Tennis</sl-option>
          </sl-input>
        </div>
      </form>

      <!-- viewing private details -->

      <div class="content-frame" id="private-details-view">

        <div class="title title--close">
          <h2>Private account details</h2>
          <button class="button button--outline" id="edit-private-details-btn">Edit</a>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Email</p>
          <p class="profile__item__text">${Auth.currentUser.email}</p>
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Password</p>
          <p class="profile__item__text">••••••••</p>
        </div>

      </div>

      <!-- editing private details -->

      <form class="content-frame" id="private-details-edit" @submit=${this.updatePrivateProfileSubmitHandler.bind(this)}>

        <div class="title title--close">
          <h2>Private account details</h2>
          <div class="editing-buttons">
            <button type="button" class="button button--outline" id="cancel-private-details-btn">Cancel</button>
            <button type="submit" class="button button--solid" id="save-private-details-btn">Save</button>
          </div>
          
        </div>

        <div class="profile__item">
          <p class="profile__item__heading">Email</p>
          <sl-input id="email-input" name="email" type="text" pill placeholder="${Auth.currentUser.email ? Auth.currentUser.email : 'example@example.com'}"></sl-input>
        </div> 

        <!--<div class="profile__item">
          <p class="profile__item__heading">Password</p>
          <sl-input id="password-input" type="text" pill placeholder="••••••••"></sl-input>
        </div>-->

      </form>

      <div class="content-frame">
        <div class="title">
          <h2>Account actions</h2>
        </div>
        <button class="delete-account-button" id="delete-account-btn">Delete account</button>
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