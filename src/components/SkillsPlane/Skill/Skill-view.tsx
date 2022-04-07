import {FC} from "react";
import {Skill} from "./types"
import "./Skill.scss";



const SkillView: FC<Skill> = ({name}) => {
    return <span className="skill">{name}</span>
}

export default SkillView;