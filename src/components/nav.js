import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    return (
        <nav className="cyan accent-4">
            <div className="nav-wrapper">
                {/* <Link style={{paddingLeft: '8px'}} to='/' className="col s6 offset-s6"> Student Grade Table </Link> */}
                <ul className="center" >
                    {/* <li> <Link to='/'> Home </Link> </li> */}
                    <li className="center"> Welcome Student! </li>
                    {/* <li> <Link to='/student-list'> Student Data </Link> </li>  */}
                    {/* <li> <Link to='/choose-name'> Change Name </Link> </li>  */}
                </ul>
            </div>
        </nav>
    )
}

export default Nav; 