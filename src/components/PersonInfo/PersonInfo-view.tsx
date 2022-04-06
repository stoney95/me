import React from "react";

import "./PersonInfo.scss";
import pic from "../../assets/profile-picture.jpg"
import {details, shortDescription} from "./data"



type DetailProps = {
    icon: string;
    text: string | Element;
}


function Detail({icon, text}: DetailProps) {
    return (
        <div className="detail">
            <img className="icon" src={icon}/>
            <div className="detail-text">{text}</div>
        </div>
    )
}

function DetailView(details: Array<DetailProps>) {
    return (
        <div className="d-flex flex-row justify-content-center flex-wrap">
            {details.map(({icon, text}) => <Detail icon={icon} text={text} />)}
        </div>
    )
}

function PersonInfoView() {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center person-info">
                <div>
                    <div className="outer-border">
                        <div className="inner-border">   
                            <img className="profile-picture" src={pic}/>
                        </div>
                    </div>
                </div>
                <div className="details-box">
                    <div className="name-box">
                        <span>Simon Steinheber</span>
                    </div>
                    {DetailView(details)}
                </div>
            </div>
            <div className="short-description">
                {shortDescription}
            </div>
        </div>
    )
}

export default PersonInfoView;