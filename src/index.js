import App from './App.js'

// Shoelace
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/shoelace.js'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
setBasePath('/')

// components (custom web components)
import './components/va-app-header'
import './components/ct-header'
import './components/ct-event'
import './components/ct-heroimage'
import './components/ct-nav'
import './components/ct-dashboardhero'
import './components/ct-message'
import './components/ct-footer'
import './components/ct-emptystate'
import './components/ct-chip'
import './components/ct-onboarding-frame'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})