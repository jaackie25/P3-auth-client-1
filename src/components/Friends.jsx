import { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Login from'./Login'

export default function Friends(props) {
    const [name, setName] = useState('')
    const [friends, setFriends] = useState([])
    // SET FRIENDS WITH BACKEND DATA
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/friends/${props.currentUser.id}`)
        .then(response => {
            setFriends(response.data.friends)
        })
        .catch(err => console.log(err))
    },[friends])
    // ADD NEW FRIEND
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const requestBody = { name }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/friends/${props.currentUser.id}`, requestBody)
            console.log(response.data)
            props.history.push('/friends', response.data.currentUser)
        } catch (error) {
            console.log(error)
        }
    }
    // GENERATE FRONTEND FRIENDS DISPLAY
    let myFriends = friends.map(e => {
        return (
            <div className="event-box">
                <div className="friend-icon fas fa-user"/>
                <h6>{e.name}</h6>
            </div>
        )
    })
    // REDIRECT ON USER ERROR
    if (!props.currentUser) return(
        <Redirect 
            to='/login' 
            component={Login} 
            currentUser={ props.currentUser }
        />
    )
    // RETURN
    return (
        <div>
            <h2 className="component-header">Friends</h2>
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <input
                        type='text'
                        placeholder='Enter your friends name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="login-input"
                    />
                </div>
                <div className="text-center">
                    <input
                        type='submit'
                        value='Add'
                        className="btn login-input text-center"
                    />
                </div>
            </form>
            <div className="log-box">
                {myFriends}
            </div>
        </div>
    )
}