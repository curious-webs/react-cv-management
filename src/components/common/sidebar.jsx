
import * as React from 'react';
import { Link } from 'react-router-dom';
export function sidebar() {
    let currentLink = window.location.href;
    currentLink.split("/");
    let isActiveLink = currentLink.split("/").pop();
    return (
        <nav id="sidebar">
            <div className="sidebar-inner mx-5 bg-white">
                <ul className="sidebar-list pl-0">
                    <li className={isActiveLink === "profile" &&
                        "active"}>
                        <Link to="/profile">
                            Profile
                    </Link>
                    </li>
                    <li className={isActiveLink === "change-password" &&
                        "active"}>
                        <Link  to="/change-password">
                            Change Password
                     </Link>
                    </li>
                    <li className={isActiveLink === "addresses" &&
                        "active"}>
                        <Link to="/addresses">
                            Addresses
                     </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};