import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class OnboardingView {
  init(){
    document.title = 'Onboarding'    
    this.render()    
    Utils.pageIntroAnim()
    Utils.onboarding()
  }

  render(){
    const template = html`
      <main class="onboarding">

        <img src="../images/onboarding-background.jpeg" alt="People running." class="background-image">

        <div class="main-content onboarding">

          <div class="signinup__title">
            <img src="../images/ct-logo.svg" alt="Communiteam logo." class="signinup__logo">
            <p class="signinup__tagline">Find your community. Find your team.</p>
          </div>

          <div class="onboarding__carousel-container">
            <button class="onboarding__button left scroll-button"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="onboarding__carousel-content">
              <ct-onboarding-frame
              image="../images/dashboard.png" title="Dashboard" message="Easily find a summary of new messages, upcoming events, and suggestions."></ct-onboarding-frame>
              <ct-onboarding-frame
              image="../images/explore.png" title="Explore" message="Find events by location, activity type, date, skill level, and more."></ct-onboarding-frame>
              <ct-onboarding-frame
              image="../images/events.png" title="My Events" message="Post new events*, and see your saved and upcoming events."></ct-onboarding-frame>
              <ct-onboarding-frame
              image="images/messages.png" title="Messages" message="Get in touch with your fellow athletes."></ct-onboarding-frame>
              <ct-onboarding-frame
              image="images/profile.png" title="Profile" message="Easily review and update your information."></ct-onboarding-frame>
            </div>
            <button class="onboarding__button right scroll-button"><i class="fa-solid fa-chevron-right"></i></button>
          </div>

          <!-- may want to use glider js for the onboarding carousel ?? -->
          
        </div>
      </main>
    `
    render(template, App.rootEl)
  }
}


export default new OnboardingView()