import React from 'react'
import { Link } from 'react-router-dom'

export default function ChannelList({textChannels, voiceChannels, url}) {

    return (
        <div className="text-channel__list">
            {
                textChannels.map(channel =>{
                    return (
                        <Link key={channel._id} to={`${url}/${channel._id}`}>
                            {channel.name}
                        </Link>
                    )
                })
            }
        </div>
    )
}
