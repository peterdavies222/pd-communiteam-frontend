// import views
import dashboardView from './views/pages/dashboard'

import fourOFourView from './views/pages/404'

import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import onboardingView from './views/pages/onboarding'

import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'

import exploreView from './views/pages/explore'

import postedView from './views/pages/myEvents/posted'
import draftsView from './views/pages/myEvents/drafts'
import attendingView from './views/pages/myEvents/attending'
import savedView from './views/pages/myEvents/saved'
import newEventView from './views/pages/myEvents/newEvent'

import messagesView from './views/pages/messages'

// define routes
const routes = {
	'/signin': signinView,
	'/signup': signupView,
	'/onboarding': onboardingView,

	'/dashboard': dashboardView,

	'/explore': exploreView,

	'/myEvents/posted': postedView,
	'/myEvents/drafts': draftsView,
	'/myEvents/attending': attendingView,
	'/myEvents/saved': savedView,
	'/myEvents/newEvent': newEventView,

	'/messages': messagesView,

	'404' : fourOFourView,
	
	'/profile': profileView,
	'/editProfile': editProfileView	
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
