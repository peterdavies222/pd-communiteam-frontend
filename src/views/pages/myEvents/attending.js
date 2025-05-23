import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'

class AttendingView {
  init(){
    document.title = 'Attending'    
    this.render()    
    Utils.pageIntroAnim()
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
        image="../images/events-hero.jpeg"
        ></ct-heroimage>

      </header>
      <main class="main-content">
        <!-- If user is not attending any events -->
        <ct-emptystate
        title="Hmm, you don't have any upcoming events."
        message="Why not search for one now? Who knows, you may love it!"
        buttonlabel="Explore events"
        buttonurl="/explore"
        ></ct-emptystate>

        <!-- If user has upcoming events -->
        <div class="content-frame">
          <div class="title">
            <h2>[date]</h2>
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
            <h2>[date]</h2>
          </div>
          <div class="events-grid">
            <ct-event type="grid"></ct-event>
            <ct-event type="grid"></ct-event>
            <ct-event type="grid"></ct-event>
            <ct-event type="grid"></ct-event>
            <ct-event type="grid"></ct-event>
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


export default new AttendingView()