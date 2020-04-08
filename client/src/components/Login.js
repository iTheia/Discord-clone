import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, Link } from 'react-router-dom'
const URI = 'http://localhost:5000/api/v1/acess'

export default function Login() {
    const history = useHistory()

    const [user, setUser] = useState({
        password:'',
        email:''
    })

    const submit = async e =>{
        e.preventDefault()
        const url = `${URI}/login`
        const copy = user
        const response  = await axios.post(url, copy)
        if(response.status === 200){
            localStorage.setItem('auth-token', response.data)
            history.push('/home')
        }
    }
    const handleChange = e =>{
        let copy = user
        copy[e.target.name] = e.target.value
        setUser(copy)
    }

    return (
        <div className="login login-component">
            <div className="content">
                <Link to="/"><img className="logo" src={require('../src/logo.png')} alt=""/></Link>
                <h1>¡Hello again!</h1>
                <p>we are very happy to see you again</p>
                <form autoComplete="off">
                    <div className="margin__bottom" style={{'--margin':'20px'}}>
                        <label className="opaccity" htmlFor="email">EMAIL</label>
                        <input className="fancy__input" name="email" onChange={handleChange} type="email"/>
                    </div>
                    <div className="margin__bottom" style={{'--margin':'20px'}}>
                        <label className="opaccity" htmlFor="password">PASSWORD</label>
                        <input className="fancy__input" name="password" onChange={handleChange} type="text"/>
                    </div>
                    <button className="fancy__button__login margin__top" style={{'--margin':'8px'}} onClick={submit}>Login</button>
                </form>
                <div className="margin__top" style={{'--margin':'7px'}}>
                    <span className="opaccity">Do you need an account? </span><Link className="highlight" to="/register">Register</Link>
                </div>
            </div>
            <img className="bg" src={require('../src/bg.jpg')} alt=""/>
        </div>
    )
}
