import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'

class DraftsView {
  init(){
    document.title = 'Drafts'    
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
      title="My Drafts"
        image="../images/events-hero.jpg"
      ></ct-heroimage>
    </header>
    <main class="main-content">
      <!-- if user has no drafts -->
      <ct-emptystate
        title="Looks like you've got no drafts yet!"
        message="Why not put a new event together now?"
        buttonurl="/myEvents/posted"
        buttonlabel="Post new event"
      ></ct-emptystate>
      <!-- if user has drafts -->
      <div class="content-frame">
        <div class="events-grid">
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
          <ct-event section="drafts" type="grid"></ct-event>
        </div>
      </div>
    </main>
    <ct-footer></ct-footer>
      
            
    `
    render(template, App.rootEl)
  }
}


export default new DraftsView()