import {FC} from 'react';

import {default as SkillsPlaneView} from "./SkillsPlane-view";
import {Skill, Area, Level, TransformedSkill} from "./types"

interface ISkillPlane {
    skills: Array<Skill>;
}

const SkillsPlaneContainer: FC<ISkillPlane> = ({skills}) => {
    const areas = Object.values(Area);
    const levels = Object.values(Level);

    function transformSkill(skill: Skill): TransformedSkill {
        const colIndex = areas.indexOf(skill.area);
        const rowIndex = levels.indexOf(skill.level);

        return {position: {row: levels.length - rowIndex, col: colIndex}, name: skill.name}
    }

    function groupSkills(skills: Array<TransformedSkill>): Map<number, Map<number, Array<string>>> {
        const result = new Map<number, Map<number, Array<string>>>()
        skills.map(skill => {
            const {row, col} = skill.position

            if (result.has(row)) {
                if (result.get(row)?.has(col)) {
                    result.get(row)?.get(col)?.push(skill.name)
                } else {
                    result.get(row)?.set(col, [skill.name])
                }
            } else {
                result.set(row, new Map<number, Array<string>>())
                result.get(row)?.set(col, [skill.name])
            }
        })

        return result
    }

    const transformedSkills = skills.map((skill: Skill) => transformSkill(skill))
    const groupedSkills = groupSkills(transformedSkills)

    console.log(areas)
    console.log(levels)
    console.log(transformedSkills)
    console.log(groupedSkills)
    console.log(Array.from(groupedSkills.keys()))

    return (<SkillsPlaneView skills={groupedSkills}/>)
}

export default SkillsPlaneContainer;