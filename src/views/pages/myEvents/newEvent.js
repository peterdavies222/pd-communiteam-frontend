import App from '../../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../../Router'
import Auth from '../../../Auth'
import Utils from '../../../Utils'
import EventAPI from '../../../EventAPI'
import Toast from '../../../Toast'

class newEventView {
  init(){
    document.title = 'New Event'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newEventSubmitHandler(e){
    // prevent submitting from resetting the page
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    // set submit attribute to loading to give loading animation
    submitBtn.setAttribute('loading', '')
    const formData = new FormData(e.target)

    console.log(formData)
    
    try {
      await EventAPI.newEvent(formData)
      Toast.show('Event posted!')
      submitBtn.removeAttribute('loading')
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

  }

  render(){
    const template = html`
      <header>
        <ct-nav
        section="myevents"
        messagecount="2"
        user=${JSON.stringify(Auth.currentUser)}>
        </ct-nav>
        <ct-heroimage title="Post new event" image="../images/events-hero.jpg"></ct-heroimage>
      </header>
      <main class="main-content new-event">

        
        ${Auth.currentUser.accessLevel == 1 ? 
          // user is not verified
          html`
            <ct-emptystate
              title="Oops! It looks like you're not verified yet!"
              image="../images/empty-states/emptystate-unverified.svg"
              message="For the community’s safety, you must get verified to post your own events. Don’t worry — getting verified is quick and easy!"
              buttonlabel="Get verified now"
              action="verify"
            ></ct-emptystate>
          `
          :
          // user is verified
          html`
        <form class="page-form" @submit=${this.newEventSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
            <div class="input-group-pair">
              <div class="input-group">
                <label for="name">Event name</label>
                <sl-input name="name" type="text" placeholder="Event name" required pill></sl-input>
              </div>
              <div class="input-group">
                <label for="sport">Sport</label>
                <sl-select name="sport" type="text" required clearable pill>
                <sl-option value="afl">AFL</sl-option>
                <sl-option value="badminton">Badminton</sl-option>
                <sl-option value="cricket">Cricket</sl-option>
                <sl-option value="golf">Golf</sl-option>
                <sl-option value="netball">Netball</sl-option>
                <sl-option value="rugby">Rugby</sl-option>
                <sl-option value="running">Running</sl-option>
                <sl-option value="soccer">Soccer</sl-option>
                <sl-option value="hockey">Hockey</sl-option>
                <sl-option value="tennis">Tennis</sl-option>
                </sl-select>
              </div>
            </div> 
          
          

            <div class="input-group-pair">
              <div class="input-group">
                <label for="date">Date</label>
                <sl-input name="date" type="date" requiried pill></sl-input>
              </div>
              <div class="input-group">
                <label for="time">Time</label>
                <sl-input name="time" type="time" required pill></sl-input>
              </div>
            </div>
          <!--<div class="input-group">
            <sl-input name="start-time" type="time" required></sl-input>
            <sl-input name="end-time" type="time" required></sl-input>
          </div>-->
            <div class="input-group">
              <label for="location">Location</label>
              <sl-input name="location" type="text" placeholder="Location" required pill></sl-input>
            </div>

            <div class="input-group">
              <label for="difficulty">Difficulty</label>
              <sl-radio-group name="difficulty">
                <sl-radio-button value="easy" pill>Easy</sl-radio-button>
                <sl-radio-button value="medium" pill>Medium</sl-radio-button>
                <sl-radio-button value="hard" pill>Hard</sl-radio-button>
              </sl-radio-group>
            </div>
            <div class="input-group">   
              <label for="groupsize">Group size</label>
              <sl-radio-group name="groupsize" required pill>
                <sl-radio-button value="2-5" pill>2-5</sl-radio-button>
                <sl-radio-button value="6-10" pill>6-10</sl-radio-button>
                <sl-radio-button value="11-20" pill>11-20</sl-radio-button>
                <sl-radio-button value="21+" pill>21+</sl-radio-button>
              </sl-input>
            </div>
          

            <div class="input-group">
              <label for="description">Description</label>
              <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
            </div>
            <div class="input-group" style="margin-bottom: 2em;">
              <label>Images</label>
              <input type="file" multiple name="images" />              
            </div>
            <div class="button-container">
              <sl-button variant="primary" type="submit" class="submit-btn">Post event</sl-button>
            </div>
        </form>
          `}

        
        
      </main>      
      <ct-footer></ct-footer>
    `
    render(template, App.rootEl)
  }
}


export default new newEventView()