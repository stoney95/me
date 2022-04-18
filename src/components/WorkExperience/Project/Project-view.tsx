import {FC} from "react";

import "./Project.scss";

interface MinimalProjectViewProps {
    scope: string;
    teamSize: number;
}

export interface ProjectViewProps extends MinimalProjectViewProps {
    title: string;
    description: string;
    extended?: boolean;
}

const ExtendedProjectView: FC<ProjectViewProps> = ({title, description, scope, teamSize}) => {
    return (<div className="d-flex flex-column">
        <div className="d-flex flex-row">
            <div className="block"/>
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

const MinimalProjectView: FC<MinimalProjectViewProps> = ({scope, teamSize}) => {
    return (<div className="d-flex flex-row">
        <div className="block"/>
        <div className="d-flex flex-column">
            <div className="we-detail">{scope}</div>
            <div className="we-detail">Team size: {teamSize}</div>
        </div>
    </div>)
}


const ProjectView: FC<ProjectViewProps> = (props) => {
    return (<>
        {props.extended? ExtendedProjectView(props) : MinimalProjectView({scope: props.scope, teamSize: props.teamSize})}
    </>)
}

export default ProjectView;