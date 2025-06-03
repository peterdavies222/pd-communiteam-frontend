import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import EventAPI from '../../EventAPI'



class ExploreView {
  async init(){
    document.title = 'Explore'   
    this.events = null
    await this.getEvents()
    this.render()    
    Utils.pageIntroAnim()
    Utils.filtersTriggers()
    Utils.dropdownClosePrevention()
  }

  async getEvents() {
      try {
        this.events = await EventAPI.getEvents()
        console.log(this.events)
      } catch(err) {
        Toast.show(err, 'error')
      }
    }

    async clearFilters() {
      console.log('clearing events')
      let inputs = document.querySelectorAll('.quick-filters-input')
      inputs.forEach(input => {
        input.value = ''
      })
      await this.getEvents()
      this.render()
    }

  async handleFilterBtn(field, match) {
    console.log('filtering events...')
    console.log('field = ', field)
    console.log('match = ', match)
    if(!field || !match) return
    this.events = await EventAPI.getEvents()

    const selects = document.querySelectorAll('.quick-filters-input')
    selects.forEach(select => {
      const id = select.id || ''
      if (!id.includes(field)) {
        select.value = '' // clear select if it's not the current field
      }
    })

    let filteredEvents

    if(field == "sport") {
      filteredEvents = this.events.filter((event) => event.sport == match)
    }

    if(field == "difficulty") {
      filteredEvents = this.events.filter((event)=> event.difficulty == match)
    }

    if(field == "groupsize") {
      filteredEvents = this.events.filter((event)=> event.groupSize == match)
    }

    if(field == "date") {
      const now = new Date()
      const startOfToday = new Date(now.setHours(0, 0, 0, 0))
      const oneWeekFromNow = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000)
      const twoWeeksFromNow = new Date(startOfToday.getTime() + 14 * 24 * 60 * 60 * 1000)
      filteredEvents = this.events.filter((event)=> {
        const eventDate = new Date(event.date)
        if (match === "this-week") {
          return eventDate >= startOfToday && eventDate < oneWeekFromNow
        }

        if (match === "next-week") {
          return eventDate >= oneWeekFromNow && eventDate < twoWeeksFromNow
        }

        return false
      })
      
    }

    this.events = filteredEvents
    console.log('events = ', this.events)
    this.render()
  }


  render(){



    const template = html`
    <header>
      <ct-nav 
        section="explore"
        messagecount="2" 
        user=${JSON.stringify(Auth.currentUser)}
        ></ct-nav>

        <ct-heroimage
          image="images/explore-hero.jpg"
          title="Find your next sport"
        ></ct-heroimage>
    </header>
      

      <main class="explore main-content horizontal">
        
        <div class="explore__content">
          
          <div class="explore__search">
            <div class="sl-select-container">
            <sl-select class="quick-filters-input" id="sport-select" placeholder="Pick a sport..." pill @sl-change=${e => this.handleFilterBtn("sport", e.target.value)}>
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
            </sl-input>
            </div>

            <div class="explore__buttons">
              <div class="explore__quick-filters">
  
              <div class="container">
                <sl-select class="quick-filters-input" id="difficulty-select" placeholder="Difficulty" pill @sl-change=${e => this.handleFilterBtn("difficulty", e.target.value)}>
                  <sl-option value="easy">Easy</sl-option>
                  <sl-option value="medium">Medium</sl-option>
                  <sl-option value="hard">Hard</sl-option>
                </sl-dropdown>
              </div>

              <div class="container">
                <sl-select class="quick-filters-input" id="groupsize-select" placeholder="Group size" pill @sl-change=${e => this.handleFilterBtn("groupsize", e.target.value)}>
                  <sl-option value="2-5">2-5</sl-option>
                  <sl-option value="6-10">6-10</sl-option>
                  <sl-option value="11-20">11-20</sl-option>
                  <sl-option value="21+">21+</sl-option>
                </sl-dropdown>
              </div>

             <div class="container">
              <sl-select class="quick-filters-input" id="date-select" placeholder="Date" pill @sl-change=${e => this.handleFilterBtn("date", e.target.value)}>
                <sl-option value="this-week">This week</sl-option>
                <sl-option value="next-week">Next week</sl-option>
              </sl-select>
             </div>

            </div>

              <button style="display: none;" class="explore__button button button--solid filters-button">See all filters</button>
              <button class="explore__button button button--outline clear-filters" @click=${()=> this.clearFilters()}>Clear filters</button>
            </div>
          </div>

          <div class="explore__events">
            ${this.events.length !== 0 ?
              this.events.map(event => html`
                <ct-event
                name="${event.name}"
                .images="${event.images}"
                date="${event.date}"
                description="${event.description}"
                location="${event.location}"
                url="/event?id=${event._id}"
                id="${event._id}"
                orientation="horizontal"
                ></ct-event>`)
                :
                html`
                <ct-emptystate 
                imagesize="small"
                title="Hmmm... you've stumped us!"
                message="We can't find any events that meet your requirements... Why not posting your own Communiteam event?"
                buttonlabel="Post new event"
                buttonurl="/myEvents/newEvent"></ct-emptystate>`

            }
          </div>
          
        </div>

        <div class="explore__map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.3
          56154914758!2d115.88940687587879!3d-32.0054648739957!2m3!1f0!2f0!3f0!3m2!1i
          1024!2i768!4f13.1!3m3!1m2!1s0x2a32bc6b85869af3%3A0x8623a5870014444e!2sCurti
          n%20University!5e0!3m2!1sen!2sau!4v1747650969520!5m2!1sen!2sau" width="100%"
           height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpo
           licy="no-referrer-when-downgrade"></iframe>
        </div>

        
      </main>

      <div class="filters-container">

          <div class="filters-backdrop"></div>

            <div class="filters-modal">

              <div class="filters__title title">
                <h2>Filters</h2>
                <div class="filters__title-buttons">
                  <button class="button button--outline button--large filters-cancel">Cancel</button>
                  <button class="button button--solid button--large filters-save">Save and close</button>
                </div>
              </div>

              <div class="modal__options-container">
                <div class="modal__content-frame">
                  <sl-select label="Sport" placeholder="Search for a sport..." multiple clearable pill>
                    <sl-icon slot="prefix" name="search"></sl-icon>
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
                <div class="modal__content-frame">
                  <sl-radio-group label="Date">
                    <sl-radio-button value="1" pill>Do not specify</sl-radio-button>
                    <sl-radio-button value="2" pill>Today</sl-radio-button>
                    <sl-radio-button value="3" pill>This week</sl-radio-button>
                    <sl-radio-button value="4" pill>Specific date</sl-radio-button>
                  </sl-radio-group>
                </div>
                <div class="modal__content-frame">
                  <sl-radio-group label="Time">
                    <sl-radio-button value="1" pill>Do not specify</sl-radio-button>
                    <sl-radio-button value="2" pill>7pm</sl-radio-button>
                  </sl-radio-group>
                </div>
                <div class="modal__content-frame">
                  <sl-radio-group label="Location">
                    <sl-radio-button value="1" pill>Do not specify</sl-radio-button>
                    <sl-radio-button value="2" pill>Within 10km of my location</sl-radio-button>
                  </sl-radio-group>
                </div>
                <div class="modal__content-frame">
                  <sl-radio-group label="Group size">
                    <sl-radio-button value="1" pill>Do not specify</sl-radio-button>
                    <sl-radio-button value="2" pill>2-5</sl-radio-button>
                    <sl-radio-button value="3" pill>6-10</sl-radio-button>
                    <sl-radio-button value="4" pill>11-20</sl-radio-button>
                    <sl-radio-button value="5" pill>21+</sl-radio-button>
                  </sl-radio-group>
                </div>
                <div class="modal__content-frame">
                  <sl-radio-group label="Difficulty">
                    <sl-radio-button value="1" pill>Do not specify</sl-radio-button>
                    <sl-radio-button value="2" pill>Easy</sl-radio-button>
                    <sl-radio-button value="3" pill>Medium</sl-radio-button>
                    <sl-radio-button value="5" pill>Hard</sl-radio-button>
                  </sl-radio-group>
                </div>
              </div>
              
            </div>
        </div>

      <ct-footer></ct-footer>

      <!-- filters -->

      
            
    `
    render(template, App.rootEl)


  }
}




export default new ExploreView()