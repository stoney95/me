import {FC} from "react";

import "./Project.scss";

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
            <div ref={ref} className="block"/>
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
    return (<div className="d-flex flex-row">
        <div ref={ref} className="block"/>
        <div className="d-flex flex-column">
            <div className="we-detail">{scope}</div>
            <div className="we-detail">Team size: {teamSize}</div>
        </div>
    </div>)
}


const ProjectView: FC<ProjectViewProps> = (props, ref) => {
    return (<>
        {props.extended? ExtendedProjectView(props, ref) : MinimalProjectView({scope: props.scope, teamSize: props.teamSize}, ref)}
    </>)
}

export default ProjectView;
export type {ProjectViewProps};