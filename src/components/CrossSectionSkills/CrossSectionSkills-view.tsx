import {FC} from "react";

import "./CrossSectionSkills.scss";

type CrossSectionSkill = {
    title: string;
    skill: Array<{
        name: string;
        level: number;
    }>
}

interface ICrossSectionSkills {
    skills: Array<CrossSectionSkill>
}

const LevelView: FC<{level: number}> = ({level}) => {
    const levels = Array.from(Array(5).keys());

    return <div className="cross-section-skill-level-container">
        {levels.map(level_ => {
            if (level_ < level) {
                return <div className="cross-section-skill-level-indicator indicator-active"/>;
            } else {
                return <div className="cross-section-skill-level-indicator indicator-passive"/>;
            }
        })}
    </div>
}

const CrossSectionSkill = (skill: CrossSectionSkill) => {
    return <div className="cross-section-skill-container">
        <div className="cross-section-skill-title">{skill.title}</div>
        <div className="cross-section-skill-table">
            {skill.skill.map(({name, level}) => {
                return <>
                    <div className="cross-section-skill-name">{name}</div>
                    <div className="cross-section-skill-level">
                        <LevelView level={level}/>
                    </div>
                </>
            })}
        </div>
    </div>
}


const CrossSectionSkillsView: FC<ICrossSectionSkills> = ({skills}) => {
    return <div className="cross-section-skills">
        {skills.map(skill => CrossSectionSkill(skill))}
    </div>
}

export default CrossSectionSkillsView;