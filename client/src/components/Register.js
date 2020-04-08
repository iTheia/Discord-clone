import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, Link } from 'react-router-dom'
const URI = 'http://localhost:5000/api/v1/acess'

export default function Register() {
    
    const history = useHistory()

    const [user, setUser] = useState({
        name:'marlon',
        password:'brandon',
        email:'test@test2341.com'
    })

    const submit = async e =>{
        e.preventDefault()
        const url = `${URI}/register`
        const copy = user
        try {
            const response  = await axios.post(url, copy)
            if(response.status === 200){
                localStorage.setItem('auth-token', response.data)
                history.push('/home')
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleChange = e =>{
        let copy = user
        copy[e.target.name] = e.target.value
        setUser(copy)
    }

    return (
        <div className="register login-component">
            <div className="content">
                <Link to="/"><img className="logo" src={require('../src/logo.png')} alt=""/></Link>
                <h1>Create an account</h1>
                <form autoComplete="off">
                    <div className="margin__bottom" style={{'--margin':'20px'}}>
                        <label htmlFor="email">EMAIL</label>
                        <input className="fancy__input" name="email" onChange={handleChange} type="email"/>
                    </div>
                    <div className="margin__bottom" style={{'--margin':'20px'}}>
                        <label htmlFor="user">USER NAME</label>
                        <input className="fancy__input" name="user" onChange={handleChange} type="text"/>
                    </div>
                    <div className="margin__bottom" style={{'--margin':'20px'}}>
                        <label htmlFor="password">PASSWORD</label>
                        <input className="fancy__input" name="password" onChange={handleChange} type="text"/>
                    </div>
                    <button className="fancy__button__login margin__top" style={{'--margin':'8px'}} onClick={submit}>Register</button>
                </form>
                
                <div className="margin__top" style={{'--margin':'7px'}}>
                    <Link to="/login" className="highlight">Your alredy have an account?</Link>
                </div>
                <p className="text__small left" style={{textAlign:"left"}}>
                    By registering, you agree to 
                    <Link className="highlight" to={{
                        pathname:"/politics",
                        section:'therms'
                    }}> the terms of service</Link> and 
                    <Link className="highlight" to={{
                        pathname:"/politics",
                        section:'therms'
                    }}> privacy policies</Link>
                </p>
            </div>
            <img className="bg" src={require('../src/bg.jpg')} alt=""/>
        </div>
    )
}
