import {createRef, FC} from 'react';
import { ArrowContainerHandle } from './Arrow';
import {ArrowRefs} from "./types"

import {default as WorkExperienceView} from "./WorkExperience-view";


const projects = [
    {
        projectProps: {
            title: "EMNLP2018: Publish bachelor thesis",
            description: "I am se greatesht!!!. Lorem ipusum",
            scope: "NLP",
            teamSize: 4,
        },
        date: {
            year: 2018,
            month: 6
        }
    },
    {
        projectProps: {
            title: "LOGAN: Spark pipelines",
            description: "The projects was shit but I did very well",
            scope: "ETL",
            teamSize: 15,
            extended: true,
        },
        date: {
            year: 2020,
            month: 3
        }
    },
    {
        projectProps: {
            title: "ai:attack: Democratizing AI throughout Siemesn",
            description: "Ioannis is a strange guy but the content of the project makes fun",
            scope: "MLOps",
            teamSize: 4,
            extended: true,
        },
        date: {
            year: 2021,
            month: 9
        }
    },
    {
        projectProps: {
            title: "CarSharing: Short project",
            description: "I did not know what I was supposed to do there",
            scope: "Timeseries Forecasting",
            teamSize: 9,
            extended: true,
        },
        date: {
            year: 2019,
            month: 6
        }
    },
    {
        projectProps: {
            title: "Call Analysis",
            description: "BMW loved our results",
            scope: "NLP, Voice Transcription",
            teamSize: 5
        },
        date: {
            year: 2019,
            month: 2
        }
    },
]



const WorkExperienceContainer: FC = () => {
    const arrowRefs = new Map<string, ArrowRefs>();

    projects.map(project => 
        arrowRefs.set(project.projectProps.title, {
            source: createRef<HTMLDivElement>(),
            target: createRef<HTMLDivElement>(),
            arrow: createRef<ArrowContainerHandle>(),
        })
    )

    return <WorkExperienceView projects={projects} arrowRefs={arrowRefs}/>;
}

export default WorkExperienceContainer;