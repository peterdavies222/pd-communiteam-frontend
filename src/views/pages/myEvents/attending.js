import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'
import EventAPI from '../../../EventAPI'
import Toast from '../../../Toast'

class AttendingView {
  async init(){
    document.title = 'Attending'
    this.attendingEvents = null
    this.attendingEventIds = Auth.currentUser.attendingEvents
    await this.getAttendingEvents()  
    this.render()
    Utils.pageIntroAnim()
  }

  async getAttendingEvents() {
    try {
        this.attendingEvents = await Promise.all(
          this.attendingEventIds.map(async id => await EventAPI.getEvent(id))
        );
        console.log(this.attendingEvents)
      } catch(err) {
        Toast.show(err, 'error')
      }
  }

  render(){
    const template = html`
      <header>
        <ct-nav

        user=${JSON.stringify(Auth.currentUser)}
        section="myevents"
        messagecount="2"
        ></ct-nav>
        <ct-heroimage
        title="Attending"
        image="../images/events-hero.jpg"
        ></ct-heroimage>

      </header>
      <main class="main-content">
        <!-- If user is not attending any events -->

        ${this.attendingEvents.length == 0 ? html`
            <ct-emptystate
            title="Hmm, you don't have any upcoming events."
            message="Why not search for one now? Who knows, you may love it!"
            buttonlabel="Explore events"
            buttonurl="/explore"
            ></ct-emptystate>`

            :

            html`
            <div class="events-grid">
            ${this.attendingEvents.map(event => html`
              <ct-event
              type="grid"
              .images="${event.images}"
              date="${event.date}"
              name="${event.name}"
              description="${event.description}"
              location="${event.location}"
              url="/event?id=${event._id}"
              id="${event._id}"></ct-event>
              `)}
          </div>

          `}


        

        <!-- If user has upcoming events 
        <div class="content-frame">
          <div class="title">
            <h2>[date]</h2>
          </div>
          <div class="events-grid">
            ${this.attendingEvents.map(event => html`
              <ct-event
              type="grid"
              .images="${event.images}"
              date="${event.date}"
              name="${event.name}"
              description="${event.description}"
              location="${event.location}"
              url="/event?id=${event._id}"></ct-event>
              `)}
          </div>
        </div>-->

      </main>
      <ct-footer></ct-footer>
            
    `
    render(template, App.rootEl)
  }
}


export default new AttendingView()