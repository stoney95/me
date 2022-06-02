import {FC} from "react";
import {motion} from "framer-motion"

import "./AnimatedProject.scss";

interface MinimalProjectViewProps {
    scope: string;
    teamSize: number;
}

interface ProjectViewProps extends MinimalProjectViewProps {
    title: string;
    description: string;
    extended?: boolean;
}

const MinimalProjectView: FC<MinimalProjectViewProps> = ({scope, teamSize}) => {
    return (
    <div className="d-flex flex-row animation-box">
        <div className="d-flex flex-column justify-content-center">
            <motion.div 
                className="block"
                initial={{height: "100%"}}
                animate={{
                    height: "0%",
                    width: "0%",
                    margin: "0px"
                }}
                transition={{duration: 0.5}}
            />
        </div>
        <motion.div 
            className="d-flex flex-column"
            animate={{
                transform: "rotate(-180deg)"
            }}
            transition={{
                delay: 0.2,
                duration: 0.2
            }}
        >
            <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 110 110"
                className="outer-circle-svg"
            >
                <motion.path
                    className="outer-circle"
                    d="
                        M 55, 55 
                        m 50, 0
                        a 50,50 0 0,1 -100,0
                        a 50,50 0 0,1 100,0
                    "
                    initial={{
                        pathLength: 0
                    }}
                    animate={{
                        pathLength: 1
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4
                    }}
                />
            </motion.svg>
            <motion.div 
                className="we-detail"
                animate={{
                    width: "20px",
                    height: "10px",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    margin: "0px",
                    fontSize: "0px"
                }}
                transition={{
                    default: {duration: 0.5},
                    margin: {
                        delay: 0.2,
                        duration: 0.2
                    },
                    borderBottomLeftRadius: {duration: 0.3},
                    borderBottomRightRadius: {duration: 0.3},
                }}
            >
                {scope}
            </motion.div>
            <motion.div 
                className="we-detail"
                animate={{
                    width: "20px",
                    height: "10px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    margin: "0px",
                    fontSize: "0px"
                }}
                transition={{
                    default: {duration: 0.5},
                    borderTopLeftRadius: {duration: 0.3},
                    borderTopRightRadius: {duration: 0.3},
                }}
            >Team size: {teamSize}</motion.div>
        </motion.div>
    </div>
    )
}


const ProjectView: FC<ProjectViewProps> = (props, ref) => {
    return  MinimalProjectView({scope: props.scope, teamSize: props.teamSize})
}

export default ProjectView;
export type {ProjectViewProps};