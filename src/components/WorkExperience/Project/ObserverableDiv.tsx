import React, {RefObject, useEffect, useImperativeHandle, useRef, useState} from "react";


export type ObserverableDiv = {
    subscribe: (observer: Observer) => void
    getBoundingClientRect: () => DOMRect | undefined;
}

interface ObserverableProps extends React.ClassAttributes<ObserverableDiv> {}

export type Observer = {
    notify: () => void;
}


const ObserverableDiv: React.ForwardRefRenderFunction<ObserverableDiv, ObserverableProps> = (props, ref) => {
    const [position, setPosition] = useState({top: -1, left: -1});
    const [style, setStyle] = useState("");
    const [observers, setObservers] = useState(new Array<Observer>())

    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        subscribe: (observer: Observer) => {setObservers([...observers, observer])},
        getBoundingClientRect: () => innerRef.current?.getBoundingClientRect()
    }))


    useEffect(() => {
        const boundingBox = innerRef.current?.getBoundingClientRect();
        if (boundingBox === null || boundingBox == undefined) return

        const newStyle = JSON.stringify(innerRef.current?.style)
        const newTop = boundingBox.top;
        const newLeft = boundingBox.left;

        const styleChanged = (newStyle !== style);
        const topChanged = (newTop !== position.top);
        const leftChanged = (newLeft !== position.left);

        if (styleChanged || topChanged || leftChanged) {
            observers.forEach(o => o.notify());
            setPosition({top: newTop, left: newLeft});
            setStyle(newStyle);
        }
    })

    return <div ref={innerRef} className="block"/>;
}

export default React.forwardRef(ObserverableDiv)

export const Observer = (target: RefObject<ObserverableDiv>, callback: () => void) => {
    target.current?.subscribe({notify: callback});
}
