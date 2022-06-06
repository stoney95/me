import { RefObject, useEffect, useState } from "react";
import useMousePosition from "./useMousePosition";


export default function useBoundingBox(ref: RefObject<HTMLElement>) {
    const [boundingBox, setBoundingBox] = useState({x: 0, y: 0})
    
    const updateBoundingBox = () => {
        const elem = ref.current;
        const boundingBox = elem?.getBoundingClientRect();

        if(boundingBox) {
            setBoundingBox({
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

    return boundingBox;
}


export function useElementOffset(ref: RefObject<HTMLElement>) {
    const mousePosition = useMousePosition();
    const [offset, setOffset] = useState({ x: 0, y: 0})

    useEffect(() => {
        const elem = ref.current;
        const boundingBox = elem?.getBoundingClientRect();

        if(boundingBox) {
            setOffset({
                x: mousePosition.x - boundingBox.left,
                y: mousePosition.y - boundingBox.top
            });
        }
    }, [mousePosition])

    return offset;
}