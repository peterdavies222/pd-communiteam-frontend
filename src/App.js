import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'


class App {
  constructor(){
    this.name = "Communiteam"
    this.version = "1.0.0"
    this.apiBase = 'http://localhost:3000' // for local editing, comment out this line when pushing to github
    //this.apiBase = 'https://pd-communiteam-backend.onrender.com' // for live site, make sure this line is active before publishing to github
    this.rootEl = document.getElementById("root")
    this.version = "1.0.0"
  }
  
  init() { 
    console.log("App.init")
    
    // Toast init
    Toast.init()   
    
    // Authentication check    
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

export default new App()