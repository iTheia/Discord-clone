import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function TwitchGames() {
    
    const [topGames, setTopGames] = useState([])

    useEffect(() => {
        axios.get('https://api.twitch.tv/kraken/games/top?limit=21', {
            headers:{
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID':'ax3f1os49v9yrqk4eoh246bu6n5s1k'
            }
        })
        .then(res =>{
            setTopGames(res.data.top)
        })
        .catch(error =>{

        })
    },[])

    const GameCard = (game) =>{
        let card = (
        <div key={game.game._id} className="game">
            <a className="game__link" target="_blank" rel="noopener noreferrer" href={`https://www.twitch.tv/directory/game/${game.game.name}`}>
                <img src={game.game.box.medium} alt=""/>
                <span className="game__viewers">Viewers: {game.viewers}</span>
            </a>
        </div>)
        return card
    }
    return (
        <>
             <h1 className="margin__top">The top games on <a href="https://www.twitch.tv/" rel="noopener noreferrer" target="_blank"  className="highlight__purple">Twitch.tv</a></h1>
             <div className="games">
                {
                    topGames.map(game =>{
                        return GameCard(game)
                    })
                }
            </div>
        </>
        
    )
}
