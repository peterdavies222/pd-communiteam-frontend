import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class UserAPI {
  
  async updateUser(userId, userData){
    // validate
    console.log(`updating user with id ${userId} with data ${JSON.stringify(userData)}`)
    if(!userId || !userData) return
    
    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }

    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async updateUserPublic(userId, userData) {
    if(!userId || !userData) return
    const response = await fetch(`${App.apiBase}/user/${userId}/public`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
          // "Content-Type": "application/json"
        },
        body: userData
    })

    if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem updating public details.')
    }

    const data = await response.json()
    return data
  }

  async updateUserPrivate(userId, userData) {
    if(!userId || !userData) return

    const response = await fetch(`${App.apiBase}/user/${userId}/private`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem updating private details.')
    }
    const data = await response.json()
    return data
  }

  async addAttendingEvent(userId, userData) {
    console.log(userData)
    if(!userId || !userData) return
    
    const response = await fetch(`${App.apiBase}/user/${userId}/addattending`, {
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

  async removeAttendingEvent(userId, userData) {
    console.log(userData)
    if(!userId || !userData) return
    
    const response = await fetch(`${App.apiBase}/user/${userId}/removeattending`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem removing you from this event.')
    }
    const data = await response.json()
    return data
  }

  async saveEvent(userId, userData) {
    console.log(userData)
    if(!userId || !userData) return
    
    const response = await fetch(`${App.apiBase}/user/${userId}/save`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem saving this event.')
    }
    const data = await response.json()
    return data
  }

  async unsaveEvent(userId, userData) {
    console.log(userData)
    if(!userId || !userData) return
    
    const response = await fetch(`${App.apiBase}/user/${userId}/unsave`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
        throw new Error('Problem unaving this event.')
    }
    const data = await response.json()
    return data
  }

  async getUser(userId){
    // validate
    if(!userId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting user')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async deleteAccount(userId) {
    if(!userId) return
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      method: "DELETE",
      headers: {
      Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
    if(!response.ok) {
      const err = await response.json()
      if(err) console.log(err)
      throw new Error('Problem deleting user')
    }
    const data = await response.json()
    return data
  }
}

export default new UserAPI()