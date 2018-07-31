import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    return (
        <nav className="blue lighten-4">
            <div className="nav-wrapper">
                <Link style={{paddingLeft: '8px'}} to='/' className="brand-logo"> Student Grade Table </Link>
                <ul className="right" >
                    <li> <Link to='/'> Home </Link> </li>
                    <li> <Link to='/student-list'> Student Data </Link> </li> 
                    {/* <li> <Link to='/choose-name'> Change Name </Link> </li>  */}
                </ul>
            </div>
        </nav>
    )
}

export default Nav; 