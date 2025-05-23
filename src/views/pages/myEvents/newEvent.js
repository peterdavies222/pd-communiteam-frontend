import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'

class NewEventView {
  init(){
    document.title = 'Post New Event'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Post New Event" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Page title</h1>
        <p>Page content ...</p>
      </div>
            
    `
    render(template, App.rootEl)
  }
}


export default new NewEventView()