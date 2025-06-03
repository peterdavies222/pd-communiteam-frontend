import App from './../../App'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
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
          <form class="input-validation-required signinup__form" @submit="${this.signInSubmitHandler}">
            <h1>Sign in</h1>
            <div class="input-group">
                <label for="email">Email</label>
                <sl-input name="email" type="email" required pill></sl-input>
              </div>
              <div class="input-group">
                <label for="password">Password</label>
                <sl-input name="password" type="password" required toggle-password pill></sl-input>
              </div>
              <sl-button type="submit" variant="primary" class="submit-btn" style="width: 100%;" pill>Sign in</sl-button>
              <p class="signinup__signup-prompt">Not a member yet? <a href="/signup" @click=${anchorRoute}>Create an account.</a></p>
          </form>
        </div>
        <div class="signinup__right">
          <img class="signinup__image" src="../images/signinup.png" alt="People running.">
        </div>
      </main>
      <!--
      <div class="signinup-box">
                   
            <form class="input-validation-required" @submit="${this.signInSubmitHandler}">          
              <div class="input-group">
                <sl-input name="email" type="email" placeholder="Email" required></sl-input>
              </div>
              <div class="input-group">
                <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
              </div>
              <sl-button type="submit" variant="primary" class="submit-btn" style="width: 100%;">Sign In</sl-button>
            </form>
            <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
          </div>
          -->
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()