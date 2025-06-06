import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import EventAPI from '../../EventAPI'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

const chevronLeftIcon = html`<svg width = "9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`
const savedIcon = html`<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 1H12C12.5523 1 13 1.44772 13 2V13.626C12.9999 14.438 12.083 14.9115 11.4209 14.4414L7.5791 11.7119C7.27559 11.4963 6.88172 11.4691 6.55566 11.6309L6.4209 11.7119L2.5791 14.4414C1.91703 14.9115 1.00012 14.438 1 13.626V2C1 1.44772 1.44772 1 2 1Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
</svg>`

const messagesIcon = html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4041 10.8277C14.7864 9.96295 14.9987 9.00627 14.9987 8C14.9987 4.13401 11.865 1 7.99934 1C4.13371 1 1 4.13401 1 8C1 11.866 4.13371 15 7.99934 15C9.24391 15 10.4126 14.6751 11.4253 14.1056L15 14.9993L14.4041 10.8277Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const attendingIcon = html`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1183 6.81916L7.5625 10.375L6.35041 9.16291M8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const peopleCountIcon = html`<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8 10.8857C19.0673 11.8326 20.2 14.2167 20.2 15.6857C20.2 16.1433 19.8661 16.5143 19.4542 16.5143H19M14.2 7.00451C15.0198 6.53026 15.5714 5.64384 15.5714 4.6286C15.5714 3.61336 15.0198 2.72694 14.2 2.25269M1.74577 16.5143H14.8828C15.2947 16.5143 15.6286 16.1433 15.6286 15.6857C15.6286 12.8091 13.2253 10.4771 8.31428 10.4771C3.40327 10.4771 1 12.8091 1 15.6857C1 16.1433 1.33389 16.5143 1.74577 16.5143ZM11.0571 4.6286C11.0571 6.14344 9.82912 7.37146 8.31428 7.37146C6.79945 7.37146 5.57143 6.14344 5.57143 4.6286C5.57143 3.11376 6.79945 1.88574 8.31428 1.88574C9.82912 1.88574 11.0571 3.11376 11.0571 4.6286Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
`

const sportIcon = html`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.04 0.0136719C11.4121 0.0325402 11.7788 0.0722916 12.1396 0.128906C15.092 0.5921 17.6346 2.28535 19.2295 4.66797C19.3642 4.8693 19.4924 5.07529 19.6133 5.28613C19.8968 5.78056 20.1407 6.30008 20.3418 6.84082C20.7026 7.81101 20.9256 8.84828 20.9834 9.92969C20.9935 10.1185 21 10.3086 21 10.5L20.9941 10.8574C20.9664 11.6867 20.8421 12.4919 20.6328 13.2617H20.6309L20.5117 13.6699C19.1853 17.8628 15.298 20.9159 10.6855 20.9961V20.999L10.5 21L9.95996 20.9863C6.84595 20.8286 4.09238 19.3122 2.27344 17.0205C2.18655 16.911 2.10111 16.8004 2.01855 16.6875C1.72489 16.2857 1.4597 15.8622 1.22461 15.4199C1.12011 15.2234 1.01985 15.0241 0.927734 14.8203C0.402254 13.6578 0.0817264 12.3828 0.0136719 11.041L0 10.5C1.51543e-05 10.1487 0.0190466 9.80146 0.0527344 9.45898C0.0991941 8.98624 0.175114 8.52252 0.282227 8.07031L0.367188 7.73828C1.52664 3.47377 5.30612 0.288381 9.87012 0.0185547L10.3135 0.00195312C10.3751 0.000884769 10.4372 2.72091e-06 10.499 0H10.5L11.04 0.0136719ZM9.97363 2.01562C6.41893 2.23256 3.44966 4.63686 2.40332 7.90234C7.31949 8.77677 11.0527 13.0699 11.0527 18.2373L11.0469 18.5947C11.0425 18.7246 11.0344 18.8538 11.0254 18.9824C14.58 18.7655 17.5483 16.362 18.5947 13.0967C13.8518 12.2524 10.2106 8.22718 9.96094 3.30371L9.94727 2.7627C9.94728 2.5115 9.9563 2.26241 9.97363 2.01562ZM2.02148 9.8916C2.01151 10.0328 2.00599 10.1751 2.00293 10.3184C2.00168 10.3784 2 10.4386 2 10.499C2 12.758 2.88287 14.8096 4.32031 16.332C4.70678 16.741 5.13322 17.1115 5.59375 17.4375C5.81139 17.5917 6.03645 17.7356 6.26855 17.8691C6.99509 18.2869 7.78861 18.6011 8.62988 18.79C8.76159 18.8196 8.89438 18.8458 9.02832 18.8691C9.04359 18.6607 9.05273 18.4501 9.05273 18.2373C9.05273 14.0446 6.01668 10.563 2.02344 9.86621C2.02282 9.87467 2.02208 9.88313 2.02148 9.8916ZM11.9697 2.12891C11.9544 2.33794 11.9473 2.5493 11.9473 2.7627C11.9473 6.9541 14.9812 10.4336 18.9727 11.1318C18.988 10.923 18.999 10.7121 18.999 10.499C18.999 9.36968 18.777 8.29246 18.377 7.30664C18.3446 7.22691 18.3111 7.14784 18.2764 7.06934C17.8819 6.17638 17.3381 5.36498 16.6768 4.66504C16.3854 4.35689 16.0716 4.07047 15.7373 3.80859C15.3178 3.47977 14.8671 3.18969 14.3896 2.94336C13.7618 2.61967 13.0886 2.37172 12.3818 2.21191C12.2456 2.1811 12.1083 2.15309 11.9697 2.12891Z" fill="currentColor"/>
</svg>
`

const timeIcon = html`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0588 13.1987C13.5827 13.3733 14.149 13.0902 14.3237 12.5662C14.4983 12.0423 14.2152 11.476 13.6912 11.3013L13.0588 13.1987ZM10 11.125H9C9 11.5554 9.27543 11.9376 9.68377 12.0737L10 11.125ZM11 6.42087C11 5.86858 10.5523 5.42087 10 5.42087C9.44772 5.42087 9 5.86858 9 6.42087H11ZM13.375 12.25L13.6912 11.3013L10.3162 10.1763L10 11.125L9.68377 12.0737L13.0588 13.1987L13.375 12.25ZM10 11.125H11V6.42087H10H9V11.125H10ZM19 10H18C18 14.4183 14.4183 18 10 18V19V20C15.5228 20 20 15.5228 20 10H19ZM10 19V18C5.58172 18 2 14.4183 2 10H1H0C0 15.5228 4.47715 20 10 20V19ZM1 10H2C2 5.58172 5.58172 2 10 2V1V0C4.47715 0 0 4.47715 0 10H1ZM10 1V2C14.4183 2 18 5.58172 18 10H19H20C20 4.47715 15.5228 0 10 0V1Z" fill="currentColor"/>
</svg>
`

const locationIcon = html`<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.51304 20.2C8.51304 20.2 16.0261 13.5217 16.0261 8.51304C16.0261 4.3637 12.6624 1 8.51304 1C4.3637 1 1 4.3637 1 8.51304C1 13.5217 8.51304 20.2 8.51304 20.2Z" stroke="currentColor" stroke-width="2"/>
<path d="M10.9134 8.20015C10.9134 9.52563 9.83883 10.6002 8.51335 10.6002C7.18787 10.6002 6.11335 9.52563 6.11335 8.20015C6.11335 6.87467 7.18787 5.80015 8.51335 5.80015C9.83883 5.80015 10.9134 6.87467 10.9134 8.20015Z" stroke="currentColor" stroke-width="2"/>
</svg>
`

const difficultyIcon = html`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.72 7.92019V6.92019C7.16771 6.92019 6.72 7.36791 6.72 7.92019H7.72ZM7.81562 7.92019H8.81562C8.81562 7.36791 8.36791 6.92019 7.81562 6.92019V7.92019ZM13.48 7.92019V6.92019C12.9277 6.92019 12.48 7.36791 12.48 7.92019H13.48ZM13.565 7.92019H14.565C14.565 7.36791 14.1173 6.92019 13.565 6.92019V7.92019ZM7.81562 7.99707V8.99707C8.36791 8.99707 8.81562 8.54935 8.81562 7.99707H7.81562ZM7.72 7.99707H6.72C6.72 8.54935 7.16771 8.99707 7.72 8.99707V7.99707ZM13.565 7.99707V8.99707C14.1173 8.99707 14.565 8.54935 14.565 7.99707H13.565ZM13.48 7.99707H12.48C12.48 8.54935 12.9277 8.99707 13.48 8.99707V7.99707ZM8.12223 13.193C7.83155 12.7234 7.21522 12.5784 6.74562 12.8691C6.27603 13.1598 6.13099 13.7761 6.42167 14.2457L8.12223 13.193ZM14.7783 14.2457C15.069 13.7761 14.924 13.1598 14.4544 12.8691C13.9848 12.5784 13.3684 12.7234 13.0778 13.193L14.7783 14.2457ZM20.2 10.8002H19.2C19.2 15.5498 15.3496 19.4002 10.6 19.4002V20.4002V21.4002C16.4542 21.4002 21.2 16.6544 21.2 10.8002H20.2ZM10.6 20.4002V19.4002C5.85035 19.4002 2 15.5498 2 10.8002H1H0C0 16.6544 4.74578 21.4002 10.6 21.4002V20.4002ZM1 10.8002H2C2 6.05055 5.85035 2.2002 10.6 2.2002V1.2002V0.200195C4.74578 0.200195 0 4.94598 0 10.8002H1ZM10.6 1.2002V2.2002C15.3496 2.2002 19.2 6.05055 19.2 10.8002H20.2H21.2C21.2 4.94598 16.4542 0.200195 10.6 0.200195V1.2002ZM7.72 7.92019V8.92019H7.81562V7.92019V6.92019H7.72V7.92019ZM13.48 7.92019V8.92019H13.565V7.92019V6.92019H13.48V7.92019ZM7.81562 7.92019H6.81562V7.99707H7.81562H8.81562V7.92019H7.81562ZM7.81562 7.99707V6.99707H7.72V7.99707V8.99707H7.81562V7.99707ZM7.72 7.99707H8.72V7.92019H7.72H6.72V7.99707H7.72ZM13.565 7.92019H12.565V7.99707H13.565H14.565V7.92019H13.565ZM13.565 7.99707V6.99707H13.48V7.99707V8.99707H13.565V7.99707ZM13.48 7.99707H14.48V7.92019H13.48H12.48V7.99707H13.48ZM10.6 15.6001V14.6001C9.57022 14.6001 8.65236 14.0494 8.12223 13.193L7.27195 13.7194L6.42167 14.2457C7.29142 15.6508 8.83147 16.6001 10.6 16.6001V15.6001ZM13.928 13.7194L13.0778 13.193C12.5476 14.0494 11.6298 14.6001 10.6 14.6001V15.6001V16.6001C12.3685 16.6001 13.9086 15.6508 14.7783 14.2457L13.928 13.7194Z" fill="currentColor"/>
</svg>
`

class EventView {
  async init(){
    document.title = 'Event Details'
    console.log("eventView.init()")
    this.pageHandler()
    Utils.pageIntroAnim()
  }

  async pageHandler() {
    // dynamic page stuff
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('id')
    console.log(`eventId = ${eventId}`)

    if (!eventId) {
      return render(html`<p>Invalid event ID.</p>`, App.rootEl)
    }

    try {
      const event = await EventAPI.getEvent(eventId)
      console.log(event)

      if (!event) {
        throw new Error('Event not found')
      }

      
      await this.render(event)  
      Utils.scrollButtons('images')
    } catch (err) {
      console.error(err)
      render(html`<p>Error loading event.</p>`, App.rootEl)
    }
  }

  async addAttendingEvent() {
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('id')
    console.log('attending event with id', eventId)

    // add event to user's attendingEvents field
      try {
        await UserAPI.addAttendingEvent(Auth.currentUser._id, { "event": eventId })
        await EventAPI.addAttendee(eventId, {"user": Auth.currentUser._id})

        const updatedUser = await UserAPI.getUser(Auth.currentUser._id);
        Auth.currentUser = updatedUser; 
        
        Toast.show("You're down for this event now!")
        await this.pageHandler()
      }catch(err){
        console.log(err)
        Toast.show('Error RSVPing to event...', err)
        await this.pageHandler()
      }
  }

  async removeAttendingEvent() {
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('id')
    console.log('removing event with id', eventId)

    try {
        await UserAPI.removeAttendingEvent(Auth.currentUser._id, { "event": eventId })
        await EventAPI.removeAttendee(eventId, {"user": Auth.currentUser._id})

        const updatedUser = await UserAPI.getUser(Auth.currentUser._id);
        Auth.currentUser = updatedUser; 
        
        Toast.show("You've been removed from this event!")
        await this.pageHandler()
      }catch(err){
        console.log(err)
        Toast.show('Error removing you from the event...', err)
        await this.pageHandler()
      }

  }

  async saveEvent() {
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('id')
    console.log('Saving event with id', eventId)

    try {
        await UserAPI.saveEvent(Auth.currentUser._id, { "event": eventId })

        const updatedUser = await UserAPI.getUser(Auth.currentUser._id);
        Auth.currentUser = updatedUser; 
        
        Toast.show("Event saved!")
        await this.pageHandler()
      }catch(err){
        console.log(err)
        Toast.show("Couldn't save event...", err)
        await this.pageHandler()
      }
  }

  async unsaveEvent() {
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('id')
    console.log('Saving event with id', eventId)

    try {
        await UserAPI.unsaveEvent(Auth.currentUser._id, { "event": eventId })

        const updatedUser = await UserAPI.getUser(Auth.currentUser._id);
        Auth.currentUser = updatedUser; 
        
        Toast.show("Event unsaved.")
        await this.pageHandler()
      }catch(err){
        console.log(err)
        Toast.show("Couldn't unsave event...", err)
        await this.pageHandler()
      }
  }

  async render(event){
    const hostUser = await UserAPI.getUser(event.hostUser)
    const attendingUsers = await Promise.all(
      event.attendingUsers.map(id => UserAPI.getUser(id))
    )
    console.log('attending users: ', attendingUsers)
    const template = html`
      <header>
        <ct-nav
        user=${JSON.stringify(Auth.currentUser)}>
        </ct-nav>
        <div class="event-gradient"></div>
        <!--<ct-heroimage></ct-heroimage>-->
      </header>
      <main class="main-content event">

        <div class="event-title">
          <div class="event-title--left">
            <div class="event-title--left--upper">
              <a class="event-title__back-btn" href="javascript:void(0)" @click="${()=>window.history.back()}">${chevronLeftIcon}Back</a>
              <h1 class="event-title__title">${event.name}</h1>
            </div>
            <div class="event-title--left--lower">
              <div class="event-title__host">
                <sl-avatar image=${hostUser.avatar ? `${App.apiBase}/images/${hostUser.avatar}` : ''}></sl-avatar>
                <p>Organised by <span class="highlighted-text">${hostUser.firstName} ${hostUser.lastName}</span></p>
              </div>
              <div class="event-title__attending">
                <div class="avatar-group">
                  ${attendingUsers.map(user => html`
                    <sl-avatar
                      image=${user.avatar ? `${App.apiBase}/images/${user.avatar}` : ''}
                    ></sl-avatar>`)}
                </div>
                <p><span class="highlighted-text">${attendingUsers.length} ${attendingUsers.length == 1 ? 'person' : 'people'}</span> as well as host attending next session</p>
              </div>
            </div>
            
          </div>

          <div class="event-title--right">
            ${console.log(hostUser._id, Auth.currentUser._id)}
            ${hostUser._id !== Auth.currentUser._id ? 
              html`
              ${Auth.currentUser.savedEvents.includes(event._id) ?
                html`<button class="button button--outline event-button" @click=${()=> this.unsaveEvent()}>${savedIcon} Unsave</button>`:
                 html`<button class="button button--outline event-button" @click=${()=> this.saveEvent()}>${savedIcon} Save</button>`
              }
              
              <button class="button button--outline event-button">${messagesIcon} Message</button>
              ${Auth.currentUser.attendingEvents.includes(event._id) ?
                html`<button class="button button--outline event-button cancel" @click=${()=> this.removeAttendingEvent()}>Cancel RSVP</button>`: 
                html`<button class="button button--solid event-button" @click=${()=> this.addAttendingEvent()}>${attendingIcon} I'm going</button>`}
              ` 
              : 
              html`<p>You're the host of this event!</p>`}
            
            
          </div>
            
        </div>
        <div class="event__images__container">
          <div class="event__images" id="images__carousel">
            ${event.images.map(img => html`
              ${console.log(`${App.apiBase}/images/${img.imageUrl}`)}
              <img src="${App.apiBase}/images/${img.imageUrl}" alt="Event image" class="event-image" />
            `)}
          </div>
          <div class="event__images__buttons" id="images__buttons">
            <button class="scroll-button" id="images__left"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="scroll-button" id="images__right"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
        

        <div class="event__info">
          <div class="content-frame">
            <h2>Overview</h2>
            <p>${event.description}</p>
          </div>
          <div class="content-frame">
            <h2>Details</h2>
            <ul class="details__list">
              <li>${timeIcon}${(new Date(event.date)).toDateString()}, at ${event.time}</li>
              <li>${sportIcon}${Utils.toTitleCase(event.sport)}</li>
              <li>${locationIcon}${event.location}</li>
              <li>${difficultyIcon}${Utils.toTitleCase(event.difficulty)} difficulty</li>
              <li>${peopleCountIcon}${event.groupSize} people</li>
            </ul>
          </div>
            
        </div>


          
      </main>
      <ct-footer></ct-footer>
            
    `
    render(template, App.rootEl)
    
  }
}


export default new EventView()