import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = new FormData(e.target)
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`   

    <main class="signinup">
        <div class="signinup__left">
          <div class="signinup__title">
            <img class="signinup__logo" src="../images/ct-logo.svg" alt="Communiteam Logo.">
            <p class="signinup__tagline">Find your community. Find your team.</p>
          </div>
          <form class="input-validation-required signinup__form" @submit="${this.signUpSubmitHandler}">
            <h1>Sign up</h1>
            <div class="input-group">
              <label for="firstName">First name</label>
              <sl-input name="firstName" type="text" required pill></sl-input>
            </div>
            <div class="input-group">
            <label for="lastName">Last name</label>
              <sl-input name="lastName" type="text" required pill></sl-input>
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <sl-input name="email" type="email" required pill></sl-input>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <sl-input name="password" type="password" required toggle-password pill></sl-input>
            </div>            
            <sl-button variant="primary" type="submit" class="submit-btn" style="width: 100%;" pill>Sign up</sl-button>
            <p class="signinup__prompt">Already have an account? <a href="/" @click=${anchorRoute}>Sign in.</a></p>
          </form>
        </div>
        <div class="signinup__right">
          <img class="signinup__image" src="../images/signinup.png" alt="People running.">
        </div>
      </main>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()