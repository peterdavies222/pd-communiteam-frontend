import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import EventAPI from '../../EventAPI'

class DashboardView {
  async init(){    
    console.log('DashboardView.init')
    document.title = 'Dashboard'    
    this.attendingEventIds = Auth.currentUser.attendingEvents
    this.upcomingEvents = null
    this.savedEvents = null
    this.savedEventIds = Auth.currentUser.savedEvents
    await this.upcoming()
    await this.saved()
    this.render()
    if(this.savedEvents.length !== 0) Utils.scrollButtons('saved')
    if(this.upcomingEvents.length !== 0) Utils.scrollButtons('upcoming')
    Utils.pageIntroAnim()
  }

  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    gotoRoute(pathname)
  }

  async upcoming() {
    try {
          this.attendingEvents = await Promise.all(
            this.attendingEventIds.map(async id => await EventAPI.getEvent(id))
          )
          console.log(this.attendingEvents)
        } catch(err) {
          Toast.show(err, 'error')
        }
    // this.events = await EventAPI.getEvents()
    // console.log(this.events)
    // this.attendingEvents = this.events.filter(event => event.attendingUsers.includes(Auth.currentUser._id))
    // console.log(this.attendingEvents)
    const now = new Date()
    console.log(now)
    const oneWeekFromNow = new Date()
    oneWeekFromNow.setDate(now.getDate() + 7)
    console.log(oneWeekFromNow)
    this.upcomingEvents = this.attendingEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= now && eventDate <= oneWeekFromNow
    })
    console.log("upcoming events = ", this.upcomingEvents)
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
      <!--<ct-header title='communiteam'></ct-header>-->
      <header>
        <ct-nav
        section="dashboard"
        messagecount="2"
        user="${JSON.stringify(Auth.currentUser)}"
        >
        </ct-nav>

        <ct-dashboardhero
        user=${JSON.stringify(Auth.currentUser)}
        image="/images/dashboard-hero.jpg"
        ></ct-dashboardhero>
      </header>
      

      <main class="dashboard main-content">

      <!--
        
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
        -->

        <div class="content-frame">
          <div class="title">
            <h2>Your upcoming events</h2>
            <div class="title__buttons" id="upcoming__buttons" style="display: none;">
              <button class="scroll-button" id="upcoming__left"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="scroll-button" id="upcoming__right"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
          ${this.upcomingEvents.length === 0 ?
            html`
            <ct-emptystate
            title="No upcoming events!"
            message="Why not search for some events now?"
            buttonlabel="Explore events"
            buttonurl="/explore"
            imagesize="small"
            ></ct-emptystate>`
            :
            html`
            <div class="carousel" id="upcoming__carousel">
            ${this.upcomingEvents.map(event => html`
                <ct-event
                  name="${event.name}"
                  date="${event.date}"
                  location="${event.location}"
                  description="${event.description}"
                  .images="${event.images}"
                  url="/event?id=${event._id}"
                  id="${event._id}"
                ></ct-event>
              `)}
          </div>`
          }
          
        </div>

        <div class="content-frame">
          <div class="title">
            <h2>Your saved events</h2>
            <div class="title__buttons" id="saved__buttons" style="display: none;">
              <button class="scroll-button" id="saved__left"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="scroll-button" id="saved__right"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>

          ${this.savedEvents.length === 0 ?
            html`
            <ct-emptystate
              title="No saved events!"
              message="It's never to late to find your Communiteam!"
              buttonlabel="Explore events"
              buttonurl="/explore"
              imagesize="small"
            ></ct-emptystate>`
            :
            html`
            <div class="carousel" id="saved__carousel">
            ${this.savedEvents.map(event => html`
                <ct-event
                  name="${event.name}"
                  date="${event.date}"
                  location="${event.location}"
                  description="${event.description}"
                  .images="${event.images}"
                  url="/event?id=${event._id}"
                  id="${event._id}"
                ></ct-event>
              `)}
          </div>`
          }
        </div>
       
        
      </main>

      <ct-footer></ct-footer>
        
      
     
    `
    render(template, App.rootEl)
  }
}

export default new DashboardView()