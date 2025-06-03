import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import EventAPI from '../../EventAPI'



class ExploreView {
  init(){
    document.title = 'Explore'   
    this.events = null 
    this.getEvents()
    this.render()    
    Utils.pageIntroAnim()
    Utils.filtersTriggers()
    Utils.dropdownClosePrevention()
  }

  async getEvents() {
      try {
        this.events = await EventAPI.getEvents()
        console.log(this.events)
        this.render()
      } catch(err) {
        Toast.show(err, 'error')
      }
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
          image="images/explore-hero.jpeg"
          title="Find your next sport"
        ></ct-heroimage>
    </header>
      

      <main class="explore main-content horizontal">
        
        <div class="explore__content">
          
          <div class="explore__search">
            
            <sl-input placeholder="Try searching for something new..." pill>
              <sl-icon slot="prefix" name="search"></sl-icon>
            </sl-input>

            <div class="explore__buttons">
              <div class="explore__quick-filters">

                <sl-dropdown>
                  <sl-button slot="trigger" caret pill>Difficulty</sl-button>
                  <sl-menu>
                    <sl-menu-item value="easy" type="checkbox" class="prevent-close">Easy</sl-menu-item>
                    <sl-menu-item value="medium" type="checkbox" class="prevent-close">Medium</sl-menu-item>
                    <sl-menu-item value="hard" type="checkbox" class="prevent-close">Hard</sl-menu-item>
                  </sl-menu>
                </sl-dropdown>

                <sl-dropdown>
                  <sl-button slot="trigger" caret pill>Date</sl-button>
                  <sl-menu>
                    <sl-menu-item>Today</sl-menu-item>
                    <sl-menu-item>Tomorrow</sl-menu-item>
                    <sl-menu-item>This week</sl-menu-item>
                    <sl-menu-item>Next week</sl-menu-item>
                  </sl-menu>
                </sl-dropdown>

                <sl-dropdown>
                  <sl-button slot="trigger" caret pill>Group size</sl-button>
                  <sl-menu>
                    <sl-menu-item>2-5</sl-menu-item>
                    <sl-menu-item>6-10</sl-menu-item>
                    <sl-menu-item>11-20</sl-menu-item>
                    <sl-menu-item>21+</sl-menu-item>
                  </sl-menu>
                </sl-dropdown>

              </div>

              <button class="explore__button button button--solid filters-button">See all filters</button>
            </div>
          </div>

          <div class="explore__events">
            ${this.events !== null ?
              this.events.map(event => html`
                <ct-event
                name="${event.name}"
                .images="${event.images}"
                date="${event.date}"
                description="${event.description}"
                location="${event.location}"
                url="/event?id=${event._id}"
                orientation="horizontal"
                ></ct-event>`)
                :
                html`<p>No events found!</p>`

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
                    <sl-option value="option-1">AFL</sl-option>
                    <sl-option value="option-2">Cricket</sl-option>
                    <sl-option value="option-3">Golf</sl-option>
                    <sl-option value="option-4">Netball</sl-option>
                    <sl-option value="option-5">Rugby</sl-option>
                    <sl-option value="option-6">Running</sl-option>
                    <sl-option value="option-7">Soccer</sl-option>
                    <sl-option value="option-8">Hockey</sl-option>
                    <sl-option value="option-9">Tennis</sl-option>
                    <sl-option value="option-10">Badminton</sl-option>
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