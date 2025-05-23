import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'

class PostedView {
  init(){
    document.title = 'My Posted Events'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <header>
        <ct-nav
        section="myevents"
        messagecount="2"
        user=${JSON.stringify(Auth.currentUser)}
        >
        </ct-nav>
        <ct-heroimage
        title="My Posted Events"
        image="../images/events-hero.jpeg"
        ></ct-heroimage>
      </header>
      <main class="main-content">
        <!-- if the user isnt verified -->
        <ct-emptystate
          title="Oops! It looks like you're not verified yet!"
          image="../images/empty-states/emptystate-unverified.svg"
          message="For the community’s safety, you must get verified to post your own events. Don’t worry — getting verified is quick and easy!"
          buttonlabel="Get verified now"
          buttonurl="#"
          ></ct-emptystate>
          <!-- if user is verified and has no posts -->
          <ct-emptystate
            title="You haven't posted any events yet!"
            image="../images/empty-states/emptystate-noevents.svg"
            message="Why not post an event and connect with the community?"
            buttonlabel="Post an event"
            buttonurl="#"
          ></ct-emptystate>

          <!-- if the user is verified and has posts -->
          <div class="content-frame">
            <div class="title">
              <h2>Friday, April 18</h2>
            </div>
            <div class="events-grid">
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
            </div>
          </div>
          <div class="content-frame">
            <div class="title">
              <h2>Date</h2>
            </div>
            <div class="events-grid">
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
              <ct-event type="grid"></ct-event>
            </div>
          </div>
          
          
          
      </main>
      <ct-footer></ct-footer>
      
    `
    render(template, App.rootEl)
  }
}


export default new PostedView()