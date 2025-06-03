import gsap from 'gsap'
import Auth from './Auth'
import UserAPI from './UserAPI'
import Toast from './Toast'

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }

  // page intro animation

  pageIntroAnim(){
    const mainContent = document.querySelector('.main-content')
    if(!mainContent) return
    gsap.fromTo(mainContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})
  }

  // carousel on onboarding

  onboarding() {
    const onboardingLeft = document.querySelector('.onboarding__button.left')
    const onboardingRight = document.querySelector('.onboarding__button.right')
    const onboardingFinish = document.querySelector('.onboarding-finish-button')
    const onboardingFrame = document.querySelector('ct-onboarding-frame')
    const onboardingCarousel = document.querySelector('.onboarding__carousel-content')
    let frameWidth
    let scrollLength
    let onboardingPosition = 1
    onboardingLeft.style.visibility = 'hidden'

    function checkFrameWidth() {
      frameWidth = onboardingFrame.offsetWidth
      scrollLength = frameWidth + 30
      console.log(frameWidth, scrollLength)
    }

    checkFrameWidth()

    window.addEventListener('resize', ()=> {
      checkFrameWidth()
    })

    onboardingLeft.addEventListener('click', ()=> {
      onboardingCarousel.scrollLeft -= scrollLength
      if(!onboardingLeft.classList.contains('inactive')) {
        onboardingPosition -= 1
      }
      console.log(onboardingPosition)
      
      if(onboardingPosition == 1) {
        onboardingLeft.style.visibility = 'hidden'
      }
      onboardingRight.classList.add('inactive')
      onboardingLeft.classList.add('inactive')
      setTimeout(()=> {
        onboardingRight.classList.remove('inactive')
        onboardingLeft.classList.remove('inactive')
      }, "300")
      onboardingRight.style.visibility = 'visible'
      onboardingFinish.style.opacity = '0'
      setTimeout(()=> {
        onboardingFinish.style.visibility = 'hidden'
      }, "400")
    })

    onboardingRight.addEventListener('click', ()=> {
      onboardingCarousel.scrollLeft += scrollLength
      if(!onboardingRight.classList.contains('inactive')) {
        onboardingPosition += 1
      }
      console.log(onboardingPosition)
      onboardingRight.classList.add('inactive')
      onboardingLeft.classList.add('inactive')
      setTimeout(()=> {
        onboardingRight.classList.remove('inactive')
        onboardingLeft.classList.remove('inactive')
      }, "300")
      onboardingLeft.style.visibility = 'visible'
      if(onboardingPosition == 5) {
        onboardingRight.style.visibility = 'hidden'
        onboardingFinish.style.visibility = 'visible'
        onboardingFinish.style.opacity = '1'
      }
    })

  }


  // filters on explore page functionality

  filtersTriggers() {
    const filtersTrigger = document.querySelector('.filters-button')
    const filtersContainer = document.querySelector('.filters-container')
    const filtersBackdrop = document.querySelector('.filters-backdrop')
    const filtersModal = document.querySelector('.filters-modal')
    const root = document.querySelector('#root')
    const filtersCancel = document.querySelector('.filters-cancel')
    const filtersSave = document.querySelector('.filters-save')
    
    filtersTrigger.addEventListener('click', ()=> {
      filtersContainer.style.display = 'block'
      root.style.overflow = 'hidden'
      gsap.fromTo(filtersBackdrop, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', duration: 0.5})
      if(window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        gsap.fromTo(filtersModal, {top: '100vh', display: 'none'}, {top: '150px', display: 'flex', duration: 0.5, delay: 0})
      } else {
        gsap.fromTo(filtersModal, {display: 'none', top: '150px', opacity: 0}, {display: 'block', top: '150', opacity: 1, duration: 0.5})
      }
    })

    filtersCancel.addEventListener('click', ()=> {

      gsap.to(filtersModal, {top: '100vh', display: 'none', duration: 0.5})
      gsap.to(filtersBackdrop, {opacity: 0, display: 'none', duration: 0.5})
      gsap.to(filtersContainer, {display: 'none', delay: 0.5})
      
      gsap.to(root, {overflow: 'auto', delay: 0.5})
    })
  }

  // dashboard carousel buttons functionality

  scrollButtons(baseId) {

    const content = document.getElementById(`${baseId}__carousel`);
    const buttonContainer = document.getElementById(`${baseId}__buttons`);
    const leftBtn = document.getElementById(`${baseId}__left`);
    const rightBtn = document.getElementById(`${baseId}__right`);

    if (!content || !buttonContainer || !leftBtn || !rightBtn) {
      console.warn(`One or more elements missing for baseId: ${baseId}`);
      return;
    }

    buttonContainer.style.display = "flex"
    console.log('scrollButtons function being called for ', baseId)



    function buttonVisibility() {
      console.log(baseId, ' content scroll width = ', content.scrollWidth)
      console.log(baseId,' content client width = ', content.clientWidth)
      if(content && content.scrollWidth > content.clientWidth) {
        buttonContainer.style.display = 'flex';
      };
      if(content && content.scrollWidth <= content.clientWidth) {
        buttonContainer.style.display = 'none';
      };
    }
    
    requestAnimationFrame(() => {
      buttonVisibility();
    });


    window.addEventListener('resize', ()=> {
      buttonVisibility()
    })

    leftBtn.addEventListener('click', ()=> {
      content.scrollLeft -= 330;
    })
    
    rightBtn.addEventListener('click', ()=> {
      content.scrollLeft += 330;
    })

  }

  // preventing dropdowns from closing as soon as user clicks

  dropdownClosePrevention() { // not working :(
    let preventCloseButtons = document.querySelectorAll('.prevent-close')
    preventCloseButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault()
      })
    })
  }

  // profile editing stuff

  profileEditing() {
    const publicViewFrame = document.getElementById('public-details-view')
    const publicEditFrame = document.getElementById('public-details-edit')
    const editPublicBtn = document.getElementById('edit-public-details-btn')
    const cancelPublicBtn = document.getElementById('cancel-public-details-btn')
    const savePublicBtn = document.getElementById('save-public-details-btn')

    const privateViewFrame = document.getElementById('private-details-view')
    const privateEditFrame = document.getElementById('private-details-edit')
    const editPrivateBtn = document.getElementById('edit-private-details-btn')
    const cancelPrivateBtn = document.getElementById('cancel-private-details-btn')
    const savePrivateBtn = document.getElementById('save-private-details-btn')

    const deleteAccountBtn = document.getElementById('delete-account-btn')

    editPublicBtn.addEventListener('click', ()=> {
      publicViewFrame.style.display = "none"
      publicEditFrame.style.display = "block"

      editPrivateBtn.style.display = "none"
      deleteAccountBtn.classList.add('inactive')
    })

    cancelPublicBtn.addEventListener('click', ()=> {
      const firstNameInput = document.getElementById('first-name-input')
      const lastNameInput = document.getElementById('last-name-input')
      const bioInput = document.getElementById('bio-input')
      const interestsInput = document.getElementById('interests-select')
      firstNameInput.value = ''
      lastNameInput.value = ''
      bioInput.value = ''
      interestsInput.value = Auth.currentUser.interests

      publicEditFrame.style.display = "none"
      publicViewFrame.style.display = "block"

      editPrivateBtn.style.display = "block"
      deleteAccountBtn.classList.remove('inactive')
    })

    savePublicBtn.addEventListener('click', ()=> {
      publicEditFrame.style.display = "none"
      publicViewFrame.style.display = "block"

      editPrivateBtn.style.display = "block"
      deleteAccountBtn.classList.remove('inactive')
    })

    editPrivateBtn.addEventListener('click', ()=> {
      privateViewFrame.style.display = "none"
      privateEditFrame.style.display = "block"

      editPublicBtn.style.display = "none"
      deleteAccountBtn.classList.add('inactive')
    })

    cancelPrivateBtn.addEventListener('click', ()=> {
      const emailInput = document.getElementById('email-input')
      const passwordInput = document.getElementById('password-input')
      privateEditFrame.style.display = "none"
      privateViewFrame.style.display = "block"

      editPublicBtn.style.display = "block"
      deleteAccountBtn.classList.remove('inactive')
    })

    savePrivateBtn.addEventListener('click', ()=> {
      const emailInput = document.getElementById('email-input')
      const passwordInput = document.getElementById('password-input')
      privateEditFrame.style.display = "none"
      privateViewFrame.style.display = "block"

      editPublicBtn.style.display = "block"
      deleteAccountBtn.classList.remove('inactive')
    })
  }

  // making stuff title case (good for chips)
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  deleteAccountHandler() {
    const deleteButton = document.getElementById('delete-account-btn')

    deleteButton.addEventListener('click', () => {
      // Create the dialog element
      const dialog = document.createElement('sl-dialog')
      dialog.classList.add('delete-account-dialog')
      dialog.label = 'Delete account'
      dialog.innerHTML = `
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <sl-button id="delete-account-final" slot="footer" variant="primary">Delete account</sl-button>
      `

      // Append to DOM
      document.body.appendChild(dialog)

      // Show the dialog
      setTimeout(()=> {
        dialog.show()
      }, "10")

      const deleteFinalButton = document.getElementById('delete-account-final')
      deleteFinalButton.addEventListener('click', ()=> {
        this.deleteAccountFinal()
      })

      // Optional: clean up after it's closed
      dialog.addEventListener('sl-after-hide', () => {
        dialog.remove()
      })
    })
  }

  async deleteAccountFinal() {
    console.log('deleting account final')
  try {
    const deleteDialog = document.querySelector('.delete-account-dialog')
    deleteDialog.hide()
    deleteDialog.addEventListener('sl-after-hide', ()=> deleteDialog.remove())

    const userId = Auth.currentUser._id
    await UserAPI.deleteAccount(userId)
    Toast.show('Account deleted')

    Auth.signOut()
    gotoRoute('/')
    
  } catch (err) {
    Toast.show('Error deleting account', 'error')
    console.error(err)
  }
}


}

export default new Utils()