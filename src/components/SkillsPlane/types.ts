export enum Area {
    DATA_ENGINEERING = "Data Engineering",
    MACHINE_LEARNING = "Machine Learning",
    MLOPS = "MLOps",
    DATA_VISUALIZATION = "Data Visualization",
    AUTOMATION = "Automation",
}

export enum Level {
    INTERACTED_WITH = "Interacted with",
    USED_ONCE = "Used once",
    USED_FREQUENTLY = "Used frequently",
    USED_EVERYDAY = "Used everyday",
    STILL_LEARNING = "Still learning",
}

export type Skill = {
    area: Area;
    level: Level;
    name: string;
}

export type TransformedSkill = {
    position: {
        row: number;
        col: number;
    }
    name: string;
}