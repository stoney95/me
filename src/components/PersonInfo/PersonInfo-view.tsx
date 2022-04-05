import React from "react";

import "./PersonInfo.scss";
import pic from "../../assets/profile-picture.jpg"

function Detail(icon: string, text: string) {
    return (
        <div className="detail">
            <img src={icon}/>
            <div className="detail-text">{text}</div>
        </div>
    )
}

function PersonInfoView() {
    return (
        <div className="person-info">
            <div>
                <div className="outer-border">
                    <div className="inner-border">   
                        <img src={pic}/>
                    </div>
                </div>
            </div>
            <div className="details-box">
                <div className="name-box">
                    <span>Simon Steinheber</span>
                </div>
            </div>
        </div>
    )
}

export default PersonInfoView;