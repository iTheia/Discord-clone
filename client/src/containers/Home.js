import React from 'react'
import {Link , useHistory , Switch, Route} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { logout } from '../actions'
import ServerList from '../components/ServerList'
import TopSlide from '../modules/TopSlide'
import FriendList from '../components/FriendList'
import TwitchGames from '../components/TwitchGames'
import TextFriend from '../components/TextChannel'
import Request from '../components/Request'

export default function Home({match:{url}}) {

    const history = useHistory()
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friends)
    const disableActive = useSelector(state => state.disableActive)

    const logOut = ()=>{
        dispatch(logout())
        history.push('/')
    }
    return (
        <div className="home-container" style={{'--width':'300px'}}>
            <div className="left-panel">
                <ServerList></ServerList>
                <div className="secundary-panel">
                    <input placeholder="Search a friend" type="text" className="fancy__input"/>
                    <div className="friendList" style={{background:'#2f3136', paddingLeft:'20px'}} >
                        <FriendList items={friendList} url="/home/me"/>
                    </div>
                </div>
            </div>
            <div className="menu" style={{background:'#2f3136'}}>
                <Link to="/">Landing</Link>
                <Link to={`${url}/pending`}>Request</Link>
                <a href="#logout" className="logout" onClick={logOut}>Log out</a>
            </div>
            <div className="right-panel scroll" style={{background:'#36393f'}} >
                <TopSlide leftPannel='left-panel' rigthPannel='menu' center={{title:'Games', link:'/home/me'}} />
                <div className="wrapper" onClick={()=>disableActive('left-panel', 'menu')} >
                    <Switch>
                        <Route exact path={`${url}`} component={TwitchGames} />
                        <Route exact path={`${url}/pending`} component={Request} />
                        <Route path={`${url}/:id`} component={TextFriend} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
