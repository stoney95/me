import React, { FC, useState } from "react";
import {DragDropHandler} from "./DragDropHandler";

const projects = [
    {
        title: "EMNLP2018: Publish bachelor thesis",
        description: "I am se greatesht!!!. Lorem ipusum",
        scope: "NLP",
        teamSize: 4,
    },
    {
        title: "LOGAN: Spark pipelines",
        description: "The projects was shit but I did very well",
        scope: "ETL",
        teamSize: 15,
        extended: true
    },
    {
        title: "ai:attack: Democratizing AI throughout Siemesn",
        description: "Ioannis is a strange guy but the content of the project makes fun",
        scope: "MLOps",
        teamSize: 4,
        extended: true
    },
    {
        title: "CarSharing: Short project",
        description: "I did not know what I was supposed to do there",
        scope: "Timeseries Forecasting",
        teamSize: 9,
        extended: true
    },
    {
        title: "Call Analysis",
        description: "BMW loved our results",
        scope: "NLP, Voice Transcription",
        teamSize: 5,
    },
]

const WorkExperienceView: FC = () => {
    return <DragDropHandler projects={projects}/>
}

export default WorkExperienceView;