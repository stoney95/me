import React, {FC, RefObject, useEffect, useImperativeHandle, useLayoutEffect, useState} from 'react';
import {default as ArrowView} from "./Arrow-view";
import {setPointState} from "./types";
import useResizeObserver from '@react-hook/resize-observer'
import {Observer, type ObserverableDiv} from "../Project/ObserverableDiv";



interface ArrowContainerProps extends React.ClassAttributes<typeof ArrowContainer>{
    source: RefObject<ObserverableDiv>;
    target: RefObject<HTMLElement>;
}

export interface ArrowContainerHandle {
    updateArrow: () => void;
}


function updateArrow(
    source: RefObject<ObserverableDiv>, 
    target: RefObject<HTMLElement>, 
    setStartPoint: setPointState, 
    setEndPoint: setPointState,
) {
    const boundingBox1 = source.current?.getBoundingClientRect();
    const boundingBox2 = target.current?.getBoundingClientRect();

    if (boundingBox1 === null || boundingBox1 === undefined) return
    if (boundingBox2 === null || boundingBox2 === undefined) return

    const elem1AboveElem2 = boundingBox1.bottom < boundingBox2.bottom

    const startPoint = {
        x: boundingBox1.left + Math.abs(boundingBox1.left - boundingBox1.right) / 2,
        y: elem1AboveElem2 ? boundingBox1.bottom : boundingBox1.top
    }
    
    const endPoint = {
        x: boundingBox2.left + Math.abs(boundingBox2.left - boundingBox2.right) / 2,
        y: elem1AboveElem2 ? boundingBox2.top : boundingBox2.bottom
    }

    setStartPoint(startPoint);
    setEndPoint(endPoint);
}


const ArrowContainer: React.ForwardRefRenderFunction<ArrowContainerHandle, ArrowContainerProps> = ({source, target}, ref) => {
    const [startPoint, setStartPoint] = useState({x: 0, y: 0});
    const [endPoint, setEndPoint] = useState({x: 0, y: 0});

    const _updateArrow = () => updateArrow(source, target, setStartPoint, setEndPoint)
    Observer(source, _updateArrow)

    useImperativeHandle(ref, () => ({
        updateArrow: _updateArrow
    }))

    useEffect(() => {
        window.addEventListener("scroll", _updateArrow);
        window.addEventListener("resize", _updateArrow);
        return () => {
            window.removeEventListener("scroll", _updateArrow);
            window.removeEventListener("resize", _updateArrow);
        }
    }, [])

    useLayoutEffect(() => {
        _updateArrow()
    }, [])

    return (<ArrowView startPoint={startPoint} endPoint={endPoint} />)
}

export default React.forwardRef(ArrowContainer);