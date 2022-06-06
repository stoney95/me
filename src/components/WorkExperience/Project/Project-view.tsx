import {createRef, FC, RefObject, useContext, useEffect, useState} from "react";
import {motion} from "framer-motion"

import "./Project.scss";
import ObserverableDiv from "./ObserverableDiv";
import useMousePosition from "../../../hooks/useMousePosition";
import { ProjectHover } from "../../../context/cursor/hoverProject";
import useBoundingBox, { useElementOffset } from "../../../hooks/useBoundingBox";

interface MinimalProjectViewProps {
    scope: string;
    teamSize: number;
}

interface ProjectViewProps extends MinimalProjectViewProps {
    title: string;
    description: string;
    extended?: boolean;
}

const ExtendedProjectView: FC<ProjectViewProps> = ({title, description, scope, teamSize}, ref) => {
    return (<div className="d-flex flex-column">
        <div className="d-flex flex-row">
            <ObserverableDiv ref={ref}/>
            <div className="d-flex flex-column">
                <div className="title">{title}</div>
                <div className="d-flex flex-row">
                    <div className="we-detail">{scope}</div>
                    <div className="we-detail">Team Size: {teamSize}</div>
                </div>
            </div>
        </div>
        <div className="description">{description}</div>
    </div>)
}

const MinimalProjectView: FC<MinimalProjectViewProps> = ({scope, teamSize}, ref) => {
    const [variant, setVariant] = useState("default");
    const {hover, setHover} = useContext(ProjectHover);
    const containerRef = createRef<HTMLDivElement>()

    const variants = {
        default: {
            transform: "scale(1)"
        },
        hover: {
            boxShadow: "0 0px 20px 0px rgba(0, 0, 0, 0.5)", 
            transform: "scale(1.01)"
        }
    }

    const setHovering = () => {
        setHover(true);
        setVariant("hover");
    }

    const unsetHovering = () => {
        setHover(false);
        setVariant("default");
    }
    
    return <motion.div 
        variants={variants}
        animate={variant}
    >
        <div
            className="d-flex flex-row project-container"
            ref={containerRef}
            onMouseOver={setHovering}
            onMouseLeave={unsetHovering}
            onDragEnter={unsetHovering}
            onDragExit={unsetHovering}
            onDragCapture={unsetHovering}
        >
            <ObserverableDiv ref={ref}/>
            <div className="d-flex flex-column">
                <div className="we-detail">{scope}</div>
                <div className="we-detail">Team size: {teamSize}</div>
            </div>
            {variant == "hover" && <DragInfo containerRef={containerRef} />}
        </div>
    </motion.div>
}

const DragInfo: FC<{containerRef: RefObject<HTMLElement>}> = ({containerRef}) => {
    const offset = useElementOffset(containerRef)

    if (offset.x <= 0) {
        return null;
    }

    return <motion.div 
        className="drag-info"
        style={{
            top: offset.y, 
            left: offset.x
        }}
    >
        DRAG IT
    </motion.div>
}


const ProjectView: FC<ProjectViewProps> = (props, ref) => {
    return (<>
        {props.extended? ExtendedProjectView(props, ref) : MinimalProjectView({scope: props.scope, teamSize: props.teamSize}, ref)}
    </>)
}

export default ProjectView;
export type {ProjectViewProps};