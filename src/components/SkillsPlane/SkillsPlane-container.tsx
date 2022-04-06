import {FC} from 'react';

import {default as SkillsPlaneView} from "./SkillsPlane-view";

type Area = "Data Engineering" | "Machine Learning" | "MLOps" | "Data Visualization"

type Skill = {
    area: string;
    score: number;
    name: string;
}

type TransformedSkill = {
    style: {
        top: string;
        left: string;
    }
    name: string;
}

interface ISkillPlane {
    skills: Array<Skill>;
}


const SkillsPlaneContainer: FC<ISkillPlane> = ({skills}) => {
    const maxHeight = 5
    const minHeight = 0
    const areas = ["Data Engineering", "Machine Learning", "MLOps", "Data Visualization"]

    const transform = (skill: Skill) => {
        const index = areas.indexOf(skill.area);
        const indexPercent = index / (areas.length);
        const middleOffset = 100 / (areas.length) / 2;
        const xPercent = indexPercent * 100 + middleOffset; 

        const yPercent = 100 - skill.score / (maxHeight) * 100;

        return {style: {top: `${yPercent}%`, left: `${xPercent}%`}, name: skill.name}
    }

    const transformedSkills = skills.map((skill: Skill) => transform(skill))

    return (<SkillsPlaneView skills={transformedSkills}/>)
}

export default SkillsPlaneContainer;