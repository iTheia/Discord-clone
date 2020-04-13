import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions'
const URI = 'http://localhost:5000/api/v1/acess'

export default function Register() {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const token = useSelector(state => state.isLogged)

    const [user, setUser] = useState({
        name:'iTheia',
        password:'manga123',
        email:'martinez.1ded@gmail.com'
    })

    useEffect(() => {
        if(token !== ''){
            history.push('/home')
        }

        return () => {
            
        }
    }, [])

    const submit = async e =>{
        e.preventDefault()
        const url = `${URI}/register`
        const copy = user
        try {
            const response  = await axios.post(url, copy)
            dispatch(login(response.data))
            history.push('/home/me')
        } catch (error) {
            alert(error)
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
                        <input className="fancy__input" name="name" onChange={handleChange} type="text"/>
                    </div>
                    <div className="margin__bottom" style={{'--margin':'20px'}}>
                        <label htmlFor="password">PASSWORD</label>
                        <input className="fancy__input" name="password" onChange={handleChange} type="password"/>
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
