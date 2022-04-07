import {FC, useEffect} from "react";

import "./SkillsPlane.scss";
import SkillView from "./Skill"
import {Skill} from "./Skill/types"
import {Area, Level} from "./types"

interface ISkillPlaneView {
    skills: Map<number, Map<number, Array<string>>>;
}



const generateRow = (row: number, columns: Map<number, Array<string>> | undefined) => {
    if (columns === undefined) {
        console.log("no columns")
        return
    }

    const keys = Array.from(columns.keys())

    const columnElems = keys.map(col => {
        return <div style={{gridRow: row + 1, gridColumn: col + 1}}>
            {columns.get(col)?.map(skillName => {
                return <SkillView name={skillName}/>
            })}
        </div>
    })

    return <>{columnElems}</>
}



const SkillsPlaneView: FC<ISkillPlaneView> = ({skills}) => {
    const rowValues = Array.from(skills.keys())

    const gridStyle = {
        display: "grid",
        gridGap: "10px",
    }

    return (
        <div className="plane" style={gridStyle}>
            {rowValues.map(row => generateRow(row, skills.get(row)))}
        </div>
    )
}

export default SkillsPlaneView;