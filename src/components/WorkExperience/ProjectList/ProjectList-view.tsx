import {FC, RefObject, useContext, useEffect, useRef, useState} from "react";

import { ArrowRefs, ItemTypes } from "../types";
import Project, { ProjectViewProps } from "../Project"

import "./ProjectList.scss";
import {type ObserverableDiv} from "../Project/ObserverableDiv";
import { useDrag, XYCoord } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import useMousePosition from "../../../hooks/useMousePosition";
import { MousePosition } from "../../../context/cursor/mousePosition";

interface ProjectListProps {
    projects: Array<ProjectViewProps>;
    arrowRefs: Map<string, ArrowRefs>;
    setDragLayerPosition: (position: XYCoord) => void
}


const DraggableProject = (
    props: ProjectViewProps, 
    ref: RefObject<ObserverableDiv> | undefined, 
    setDragLayerPosition: (position: XYCoord) => void,
) => {
    const mousePosition = useContext(MousePosition);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.PROJECT,
        item: props,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if(monitor.didDrop() && mousePosition) {
                setDragLayerPosition(mousePosition.current);
            }
        }
    }))
    
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: false })
    }, [])

    return <div 
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
        }}
    >
        {Project({...props, extended: false}, ref)}
    </div>
}


const ProjectListView: FC<ProjectListProps> = ({projects, arrowRefs, setDragLayerPosition}) => {
    const draggableProjects = projects.map(project => {
        const ref = arrowRefs.get(project.title)?.source
        return DraggableProject(project, ref, setDragLayerPosition)
    })
    
    return <div className="d-flex flex-row justify-content-between">
        {draggableProjects}
    </div>
}

export default ProjectListView;