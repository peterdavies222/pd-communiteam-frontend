import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'
import Toast from '../../../Toast'
import EventAPI from '../../../EventAPI'

class SavedView {
  async init(){
    document.title = 'Saved Events'    
    this.savedEvents = null
    this.savedEventIds = Auth.currentUser.savedEvents
    await this.saved()
    this.render()    
    Utils.pageIntroAnim()
  }

  async saved() {
        try {
            this.savedEvents = await Promise.all(
              this.savedEventIds.map(async id => await EventAPI.getEvent(id))
            )
            console.log(this.savedEvents)
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
      ></ct-nav>
      <ct-heroimage
      title="Saved Events"
        image="../images/events-hero.jpg"
      ></ct-heroimage>
    </header>
    <main class="main-content">

      <!-- If user has no saved events -->
      ${Auth.currentUser.savedEvents.length == 0 ?
        html`      
        <ct-emptystate
      title="Hmm, looks like you haven't saved any events yet..."
      message="It's never too late to find and join a Communiteam event!"
      buttonlabel="Explore events"
      buttonurl="/explore"
      ></ct-emptystate>`

      : html`
      <!-- If user has saved events -->


        <div class="events-grid">
          ${this.savedEvents.map(event => html`
            <ct-event
              name="${event.name}"
              date="${event.date}"
              location="${event.location}"
              description="${event.description}"
              .images="${event.images}"
              url="/event?id=${event._id}"
              id="${event._id}"
              type="grid"
            ></ct-event>
              `)}
        </div>
      `
      }


      

    </main>

    <ct-footer></ct-footer>
      
            
    `
    render(template, App.rootEl)
  }
}


export default new SavedView()