import { createContext, useEffect, useRef, useState, MutableRefObject } from "react"

type Coord = { x: number, y: number }

export const MousePosition = createContext<MutableRefObject<Coord> | null>(null)

export const MousePositionProvider: React.FC = ({children}) => {
    const ref = useRef<Coord>({x: 0, y: 0});

    const handleWindowMouseMove = (event: MouseEvent) => {
        ref.current = {
            x: event.clientX,
            y: event.clientY
        }
    };

    useEffect(() => {        
        window.addEventListener('dragover', handleWindowMouseMove);
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('dragover', handleWindowMouseMove);
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, []);
    
    return <MousePosition.Provider value={ref}>{children}</MousePosition.Provider>
}