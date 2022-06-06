import { createContext, useState } from "react";

export const ProjectHover = createContext({hover: false, setHover: (hover: boolean) => {}})

export const ProjectHoverProvider: React.FC = ({children}) => {
    const [hover, setHover] = useState(false)

    return <ProjectHover.Provider value={{
        hover, setHover
    }}>{children}</ProjectHover.Provider>
}