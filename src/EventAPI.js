import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class EventAPI {

  async newEvent(formData){
    // send fetch request
    console.log('creating a new event...')
    const response = await fetch(`${App.apiBase}/event`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })
  
    // if response not ok
    if(!response.ok){ 
      let message = 'Problem posting event'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error(message)
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
  
  

  async getEvents(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/event`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting events')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getEvent(eventId){
      console.log("getting event")
      // validate
      if(!eventId) return
      
      // fetch the json data
      let requestRoute = `${App.apiBase}/event/${eventId}`
      console.log(`the requested route is ${requestRoute}`)
      const response = await fetch(`${App.apiBase}/event/${eventId}`, /*{
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
      }*/)
      console.log('response = ', response)
  
      // if response not ok
      if(!response.ok){ 
        // console log error
        const err = await response.json()
        if(err) console.log(err)
        // throw error (exit this function)      
        throw new Error('Problem getting event')
      }
      
      // convert response payload into json - store as data
      const data = await response.json()
      
      // return data
      return data
    }

    async addAttendee(eventId, userData) {
      console.log(userData)
      if(!eventId || !userData) return

      const response = await fetch(`${App.apiBase}/event/${eventId}/addattendee`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem RSVPing to event.')
      }
      const data = await response.json()
      return data

    }

    async removeAttendee(eventId, userData) {
      console.log(userData)
      if(!eventId || !userData) return

      const response = await fetch(`${App.apiBase}/event/${eventId}/removeattendee`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem removing user from event.')
      }
      const data = await response.json()
      return data

    }

    
}

export default new EventAPI()
