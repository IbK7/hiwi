import React, { useEffect, useState } from 'react';
import '../styles/header.css'
import { Avatar, Link } from '@mui/material';
import { API_SERVER } from '../constants';

const Header = () => {
    const current_user = "6464bd9113ad291662bb8976"
    const [user, setUser] = useState(null)
    useEffect(() => {
        const get_user = async () => {
            const body = {
                id: current_user
            }
            const user = await (await fetch(`${API_SERVER}/users/get-current`, {
                method: "POST",
                mode: "cors", 
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow", 
                referrerPolicy: "no-referrer",
                body: JSON.stringify(body), 
            })).json()

            setUser(user)
        }

        get_user()
    }, [])

    return (
        <div className='header-wrapper'>
            <div className='links'>
                <Link href='/' underline='hover' >People</Link>
                <Link href='/community' underline='hover' >Community</Link>
            </div>
            <div className='user'>
                {
                    user ? (<Avatar src={user.user.profile_pic} />) : (<Avatar />)
                }
            </div>        
        </div>
    )
}

export default Header
