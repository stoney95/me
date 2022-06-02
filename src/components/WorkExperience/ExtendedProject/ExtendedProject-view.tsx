import {createRef, FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import {motion} from "framer-motion"
import useMousePosition from "../../../hooks/useMousePosition"

import Project, { ProjectViewProps } from "../Project";
import {ArrowRefs, ItemTypes} from "../types";
import "./ExtendedProject.scss";

interface ExtendedProjectProps {
    project: ProjectViewProps;
    arrowRefs: Map<string, ArrowRefs>;
    onDrop: (title: string) => void;
    dragLayerPosition: {x: number, y: number}
}

const ExtendedProjectView: FC<ExtendedProjectProps> = ({project, arrowRefs, onDrop, dragLayerPosition}) => {
    const [containerOffset, setContainerOffset] = useState({x: 0, y: 0})
    const container = createRef<HTMLDivElement>()
    
    const [{ canDrop, isOver, itemType, item, didDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.PROJECT,
        drop: (item: ProjectViewProps, monitor: DropTargetMonitor<ProjectViewProps, void>) => {
            onDrop(item.title);
        },
        collect: monitor => ({
            canDrop: !!monitor.canDrop(),
            isOver: !!monitor.isOver(),
            itemType: monitor.getItemType(),
            item: monitor.getItem(),
            didDrop: monitor.didDrop()
        }),
    }))

    const updateBoundingBox = () => {
        const containerElem = container.current;
        const boundingBox = containerElem?.getBoundingClientRect();

        if(boundingBox) {
            setContainerOffset({
                x: boundingBox.left,
                y: boundingBox.top
            })
        }
    }

    useEffect(() => {
        updateBoundingBox();
        document.addEventListener("scroll", updateBoundingBox);
        document.addEventListener("resize", updateBoundingBox);

        return () => {
            document.removeEventListener("scroll", updateBoundingBox);
            document.removeEventListener("resize", updateBoundingBox);
        }
    }, [])

    
    const ref = arrowRefs.get(project.title)?.extendedSource;
    project.extended = true;
    
    let className = "extended-project";
    if (isOver) className += " dragging-over";
    
    const animationOffset = {
        x: dragLayerPosition.x - containerOffset.x,
        y: dragLayerPosition.y - containerOffset.y
    };

    console.log(animationOffset)

    return <div ref={drop} className={className}>
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