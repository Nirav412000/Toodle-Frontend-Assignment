import React from 'react';
import './CSS/Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header_title">
                <b>MATHEMATICS</b>
                <hr />
            </div>
            <div className="header_subtitles">
                <div className="header_action">
                    <h3>Actions</h3>
                    <p>Indent, Outdent, Delete</p>
                </div>
                <div className="header_standard">
                    <h3>Standard</h3>
                    <p>The text of the Standard</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Header;
