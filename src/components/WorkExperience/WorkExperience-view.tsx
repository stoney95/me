import { FC, useEffect, useLayoutEffect, useState } from "react";

import Timeline from "./Timeline";
import Arrow, {ArrowContainerHandle} from './Arrow';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {WorkExperience, ArrowRefs} from "./types"
import ProjectList from "./ProjectList";
import ExtendedProject from "./ExtendedProject";
import ProjectDragLayer from "./ProjectDragLayer";

interface WorkExperienceProps {
    projects: Array<WorkExperience>
    arrowRefs: Map<string, ArrowRefs> 
}

const compareDates = (date1: {year: number; month: number}, date2: {year: number; month: number;}) => {
    return (date1.year - date2.year) * 100 + (date1.month - date2.month)
}

const WorkExperienceView: FC<WorkExperienceProps> = ({projects, arrowRefs}) => {
    const dates = projects.map((project) => ({
        date: project.date,
        title: project.projectProps.title
    }));

    projects.sort((a, b) => compareDates(a.date, b.date));

    const upperProjects = projects.slice(0,3)
    const lowerProjects = projects.slice(3, projects.length)

    const [extendedProject, setExtendedProject] = useState(projects[0]);
    const [dragLayerPosition, setDragLayerPosition] = useState({x: -1, y: -1})

    const changeProject = (title: string) => {
        const project = projects.find((project) => project.projectProps.title === title);
        if (typeof project !== "undefined") {
            setExtendedProject(project);
        }
    }

    useLayoutEffect(() => {
        arrowRefs.forEach((refs => refs.arrow.current?.updateArrow()))
    }, [projects, extendedProject])

    const upperProjectPropsList = upperProjects.map(project => project.projectProps)
    const lowerProjectPropsList = lowerProjects.map(project => project.projectProps)
    const extendedProjectProps = extendedProject.projectProps;
    const extendedProjectRefs = arrowRefs.get(extendedProjectProps.title);

    return <div className="d-flex flex-column">
        <DndProvider backend={HTML5Backend}>
            <div className="d-flex flex-row">
                <div className="d-flex flex-column" style={{width: "100%"}}>
                    <ProjectList projects={lowerProjectPropsList} arrowRefs={arrowRefs} setDragLayerPosition={setDragLayerPosition}/>
                    <Timeline dates={dates} arrowRefs={arrowRefs}/>
                    <ProjectList projects={upperProjectPropsList} arrowRefs={arrowRefs} setDragLayerPosition={setDragLayerPosition}/>
                </div>
                <ExtendedProject 
                    project={extendedProject.projectProps} 
                    arrowRefs={arrowRefs}
                    onDrop={changeProject}
                    dragLayerPosition={dragLayerPosition}
                />
            </div>
            <ProjectDragLayer />
        </DndProvider>
        {Array.from(arrowRefs.entries())
            .map(([key, refs]) => (
            <Arrow 
                source={refs.source}
                target={refs.target}
                />
                ))}
        {/* {extendedProjectRefs ? <Arrow
            source={extendedProjectRefs.source}
            target={extendedProjectRefs.extendedSource}
            ref={extendedProjectRefs.arrow}
        /> : null} */}
    </div>
}

export default WorkExperienceView;