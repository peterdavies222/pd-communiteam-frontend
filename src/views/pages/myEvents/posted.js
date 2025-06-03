import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'
import EventAPI from '../../../EventAPI'
import Toast from '../../../Toast'
import UserAPI from '../../../UserAPI'

class PostedView {
  async init(){
    document.title = 'My Posted Events'
    this.events = null
    this.postedEvents = null
    this.render()    
    Utils.pageIntroAnim()

    try {
    // Make sure the current user is loaded before calling getEvents
      await UserAPI.getUser()
      await this.getEvents()
    } catch (err) {
      Toast.show('Error loading user or events', 'error')
      console.error(err)
  }


    // this.getEvents()
    // UserAPI.getUser()
  }

  async getEvents() {
    try {
      this.events = await EventAPI.getEvents()
      this.postedEvents = this.events.filter(event => event.hostUser?._id == Auth.currentUser._id)
      console.log(this.postedEvents)
      //console.log(this.events)
      //this.events.forEach(event => console.log(event.hostUser._id))
      this.render()
    } catch(err) {
      Toast.show(err, 'error')
    }
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
        image="../images/events-hero.jpg"
        ></ct-heroimage>
      </header>
      <main class="main-content">
        <!-- if the user isnt verified -->

        ${Auth.currentUser.accessLevel == 1 ? 
          html`
          <ct-emptystate
          title="Oops! It looks like you're not verified yet!"
          image="../images/empty-states/emptystate-unverified.svg"
          message="For the community’s safety, you must get verified to post your own events. Don’t worry — getting verified is quick and easy!"
          buttonlabel="Get verified now"
          action="verify"
          ></ct-emptystate>`
          :
          html`
          ${this.events == null ? 
            html`<sl-spinner></sl-spinner>`
            :
            html`
              ${this.postedEvents.length == 0 ? 
                html`
                <ct-emptystate
                title="You haven't posted any events yet!"
                image="../images/empty-states/emptystate-noevents.svg"
                message="Why not post an event and connect with the community?"
                buttonlabel="Post an event"
                buttonurl="/myEvents/newEvent"
                ></ct-emptystate>
                `
                :
                html`

                  <div class="events-grid">
                    ${this.postedEvents.map(event => html`
                      <ct-event
                      .images="${event.images}"
                      date="${event.date}"
                      name="${event.name}"
                      description="${event.description}"
                      location="${event.location}"
                      url="/event?id=${event._id}"
                      id="${event._id}"></ct-event>
                      `)}
                  </div>

                    `
              }
            `
          }
          `
          }

       
          <!-- if user is verified and has no posts -->
          
          

          <!-- if the user is verified and has posts -->


            
<!--
            <div class="content-frame">
              <div class="title">
                <h2>This coming week</h2>
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
                <h2>Later</h2>
              </div>
              <div class="events-grid">
                <ct-event type="grid"></ct-event>
                <ct-event type="grid"></ct-event>
                <ct-event type="grid"></ct-event>
                <ct-event type="grid"></ct-event>
                <ct-event type="grid"></ct-event>
              </div>
            </div>
          
          -->
          
          
      </main>
      <ct-footer></ct-footer>
      
    `
    render(template, App.rootEl)
  }
}


export default new PostedView()