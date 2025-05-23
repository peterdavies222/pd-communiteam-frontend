import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'

class SavedView {
  init(){
    document.title = 'Saved Events'    
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
      ></ct-nav>
      <ct-heroimage
      title="Saved Events"
        image="../images/events-hero.jpeg"
      ></ct-heroimage>
    </header>
    <main class="main-content">

      <!-- If user has no saved events -->
      <ct-emptystate
      title="Hmm, looks like you haven't saved any events yet..."
      message="It's never too late to find and join a Communiteam event!"
      buttonlabel="Explore events"
      buttonurl="/explore"
      ></ct-emptystate>

      <!-- If user has saved events -->
      <div class="content-frame">
        <div class="title">
          <h2>This week</h2>
        </div>
        <div class="events-grid">
          <ct-event type="grid"></ct-event>
          <ct-event type="grid"></ct-event>
          <ct-event type="grid"></ct-event>
          <ct-event type="grid"></ct-event>
        </div>
      </div>

      <div class="content-frame">
        <div class="title">
          <h2>Next week</h2>
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


export default new SavedView()