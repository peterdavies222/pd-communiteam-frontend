import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class DashboardView {
  init(){    
    console.log('DashboardView.init')
    document.title = 'Dashboard'    
    this.render()    
    Utils.pageIntroAnim()
    Utils.scrollButtons('suggested')
    Utils.scrollButtons('upcoming')
  }

  render(){
    const template = html`
      <!--<ct-header title='communiteam'></ct-header>-->
      <header>
        <ct-nav
        section="dashboard"
        messagecount="2"
        user="false"
        >
        </ct-nav>

        <ct-dashboardhero
        user=${JSON.stringify(Auth.currentUser)}
        image="/images/dashboard-hero.jpeg"
        ></ct-dashboardhero>
      </header>
      

      <main class="dashboard main-content">
        
        <div class="content-frame">
            <div class="title">
              <h2>New messages</h2> 
              <a href="/messages" @click="${this.menuClick}">See all messages</a>
            </div>
            <div class="dashboard__messages">
            
            <ct-message
              status="unread"
              sender=${JSON.stringify(Auth.currentUser)}
              content='Hello there!'>
            </ct-message>
            <ct-message
              status="unread"
              sender=${JSON.stringify(Auth.currentUser)}
              content='Hello there!'>
            </ct-message>
            </div>
        </div>

        <div class="content-frame">
          <div class="title">
            <h2>Your upcoming events</h2>
            <div class="title__buttons" id="upcoming__buttons">
              <button class="scroll-button" id="upcoming__left"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="scroll-button" id="upcoming__right"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
          <div class="carousel" id="upcoming__carousel">
            <ct-event></ct-event>
            <ct-event></ct-event>
            <ct-event></ct-event>
            <ct-event></ct-event>
            <ct-event></ct-event>
          </div>
        </div>

        <div class="content-frame">
          <div class="title">
            <h2>Suggested activities for you</h2>
            <div class="title__buttons" id="suggested__buttons">
              <button class="scroll-button" id="suggested__left"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="scroll-button" id="suggested__right"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
          <div class="carousel" id="suggested__carousel">
            <ct-event></ct-event>
            <ct-event></ct-event>
            <ct-event></ct-event>
          </div>
        </div>
       
        
      </main>

      <ct-footer></ct-footer>
        
      
     
    `
    render(template, App.rootEl)
  }
}

export default new DashboardView()