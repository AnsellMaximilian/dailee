import React from 'react'

import { Link } from 'react-router-dom'
import { auth } from '../firebase/config'

export default function Header() {
    
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <div>
                { auth.currentUser?.email }
            </div>
            <nav>
                <ul>
                    {!auth.currentUser ?
                        <>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </>
                        :           
                        <li onClick={() => auth.signOut()}>Sign Out</li>
                    }
                </ul>
            </nav>
        </header>
    )
}
