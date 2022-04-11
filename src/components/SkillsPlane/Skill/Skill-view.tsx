import {FC} from "react";
import {Skill} from "./types"
import "./Skill.scss";



const SkillView: FC<Skill> = ({name, column}) => {
    const colRange = column.end - column.start;

    if (colRange > 1) return <div className="skill multi-column"><span>{name}</span></div>
    return <span className="skill">{name}</span>
}

export default SkillView;