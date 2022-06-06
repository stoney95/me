import {createRef, FC, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import {motion} from "framer-motion"
import useMousePosition from "../../../hooks/useMousePosition"

import Project, { ProjectViewProps } from "../Project";
import {ArrowRefs, ItemTypes} from "../types";
import "./ExtendedProject.scss";
import { ProjectHover } from "../../../context/cursor/hoverProject";
import useBoundingBox, { useElementOffset } from "../../../hooks/useBoundingBox";

interface ExtendedProjectProps {
    project: ProjectViewProps;
    arrowRefs: Map<string, ArrowRefs>;
    onDrop: (title: string) => void;
    dragLayerPosition: {x: number, y: number}
}

const ExtendedProjectView: FC<ExtendedProjectProps> = ({project, arrowRefs, onDrop, dragLayerPosition}) => {
    const [containerOffset, setContainerOffset] = useState({x: 0, y: 0})
    const container = createRef<HTMLDivElement>()
    const {hover} = useContext(ProjectHover)
    
    const [{ isOver, isDragging }, drop] = useDrop(() => ({
        accept: ItemTypes.PROJECT,
        drop: (item: ProjectViewProps, monitor: DropTargetMonitor<ProjectViewProps, void>) => {
            onDrop(item.title);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            isDragging: monitor.getClientOffset() !== null,
        }),
    }))

    const boundingBox = useBoundingBox(container);
    // const elementOffset = useElementOffset(container);

    
    const ref = arrowRefs.get(project.title)?.extendedSource;
    project.extended = true;
    
    let className = "extended-project";
    // if (isOver) className += " dragging-over";
    // if (hover) className += " project-hovered"

    const variants = {
        standard: {
            opacity: 0,
            height: "100%",
        },
        onDrag: {
            height: "100%",
            opacity: 1,
            backgroundColor: "rgba(0, 0, 255, 0.3)",
            border: "2px dashed blue",
        },
        onHover: {
            opacity: 1,
            height: "100%",
            backgroundColor: "#EBEBEB",
            border: "2px dashed #ccc",
        }
    }

    let variant = "standard";
    if (hover) variant = "onDrag";
    if (isDragging) variant = "onDrag";
    if (isOver) variant = "onHover";

    const animationOffset = {
        x: dragLayerPosition.x - boundingBox.x,
        y: dragLayerPosition.y - boundingBox.y
    };
    // const animationOffset = {
    //     x: elementOffset.x,
    //     y: elementOffset.y
    // };

    return <div ref={drop} className={className}>
        <motion.div 
            className="curtain-animation"
            variants={variants}
            animate={variant}
            transition={{
                duration: 0.2,
            }}
        />
        <div ref={container} className="animation-container">
            {isOver? null : Project(project, ref)}
            {true ? 
                <motion.div 
                    className="circle-animation"
                    style={{
                        top: `${animationOffset.y}px`, 
                        left: `${animationOffset.x}px`
                    }}
                    // initial={{
                    //     height: "20px", 
                    //     width: "20px"
                    // }}
                    // animate={{
                    //     height: "500px", 
                    //     width: "500px"
                    // }}
                    transition={{
                        duration: 2
                    }}
                /> : null
            }
        </div>
    </div>
}

export default ExtendedProjectView;