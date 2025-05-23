import gsap from 'gsap'

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
    const onboardingFrame = document.querySelector('ct-onboarding-frame')
    const onboardingCarousel = document.querySelector('.onboarding__carousel-content')
    let frameWidth
    let scrollLength

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
    })
    onboardingRight.addEventListener('click', ()=> {
      onboardingCarousel.scrollLeft += scrollLength
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

    function buttonVisibility() {
      if(content && content.scrollWidth > content.clientWidth) {
        buttonContainer.style.display = 'flex';
      };
      if(content && content.scrollWidth <= content.clientWidth) {
        buttonContainer.style.display = 'none';
      };
    }
    
    setTimeout(()=> {
      buttonVisibility()
    }, 0)


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


}

export default new Utils()