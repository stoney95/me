import {FC} from "react";

import "./SkillsPlane.scss";


type Skill = {
    style: {
        top: string;
        left: string;
    },
    name: string;
}

interface ISkillPlaneView {
    skills: Array<Skill>;
}


const Skill: FC<Skill> = ({style, name}) => {
    return (
        <div className="skill-container d-flex align-items-center justify-content-center" style={style}>
                <span className="skill">{name}</span>
        </div>
    )
}


const SkillsPlaneView: FC<ISkillPlaneView> = ({skills}) => {
    return (
        <div className="plane">
            {skills.map(sk => Skill(sk))}
        </div>
    )
}

export default SkillsPlaneView;