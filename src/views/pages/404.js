import App from './../../App'
import {html, render } from 'lit'

class FourOFourView{
  init(){
    console.log('FourOFourView.init')    
    document.title = '404 File not found'    
    this.render()
  }

  render(){
    const template = html`   
      <style>
        h1 {
          font-weight: 100;
          font-family: 'veneer-regular';
        }
        .calign {
          height: 100vh;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        }
      </style> 
      <div class="calign">
        <h1>Oops!</h1>
        <p>Sorry, we couldn't find that. Check the URL and try again.</p>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new FourOFourView()