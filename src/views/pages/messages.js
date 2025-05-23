import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class MessagesView {
  init(){
    document.title = 'Messages'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <header>
        <ct-nav 
        section="messages"
        messagecount="2"
        user=${JSON.stringify(Auth.currentUser)}
        ></ct-nav>
        <ct-heroimage
        title="Messages"
        ></ct-heroimage>
      </header>
      <main class="main-content messages">
        <ct-message
          status="unread"
          sender=${JSON.stringify(Auth.currentUser)}
          content='Hello there!'
        ></ct-message>
        <ct-message
          status="unread"
          sender=${JSON.stringify(Auth.currentUser)}
          content='Hello there!'
        ></ct-message>
        <ct-message 
        status="read"
        sender=${JSON.stringify(Auth.currentUser)}
        content='hello there!'></ct-message>
        <ct-message 
        status="read"
        sender=${JSON.stringify(Auth.currentUser)}
        content='hello there!'></ct-message>
      </main>
      <ct-footer></ct-footer>
            
    `
    render(template, App.rootEl)
  }
}


export default new MessagesView()