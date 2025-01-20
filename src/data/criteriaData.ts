import { CriteriaData } from "../types/criteriaTypes";


// Configuration for evaluation criteria
export const criteriaData: CriteriaData = [
    {
        category: "Service Workers",
        importance: 4, // Very important
        max: 5,
        min: -3,
        aspects: [
            { description: "Not implemented", value: -3 },
            { description: "Configured in Webpack", value: 2 },
            {
                description: "Contains configuration files for cache handling",
                value: 2,
            },
            { description: "Implemented", value: 3 },
        ],
    },
    {
        category: "Design System",
        importance: 4, // Very important
        max: 2,
        min: -3,
        aspects: [
            { description: "Does not have Clip's DS library", value: 0 },
            { description: "Uses one of Clip's DS libraries", value: 2 },
            { description: "Uses two of Clip's DS libraries", value: -2 },
            { description: "Uses three of Clip's DS libraries", value: -3 },
        ],
    },
    {
        category: "Icon Libraries",
        importance: 3, // Important
        max: 0,
        min: -3,
        aspects: [
            { description: "Does not have an icon library", value: 0 },
            { description: "Has one icon library", value: 0 },
            { description: "Has two icon libraries", value: -2 },
            { description: "Has three icon libraries", value: -3 },
        ],
    },
    {
        category: "Style Libraries",
        importance: 3, // Important
        max: 2,
        min: -3,
        aspects: [
            { description: "Uses one style library", value: 2 },
            { description: "Uses two style libraries", value: -2 },
            { description: "Uses three style libraries", value: -3 },
        ],
    },
    {
        category: "Extra MUI Libraries",
        importance: 3, // Important
        max: 0,
        min: -4,
        aspects: [
            { description: "None", value: 0 },
            { description: "Uses the System library", value: -2 },
            { description: "Uses the Labs library", value: -2 },
        ],
    },
    {
        category: "Libraries for Async Calls & Caching",
        importance: 4, // Very important
        max: 2,
        min: -2,
        aspects: [
            { description: "Does not use a library", value: -2 },
            {
                description: "Has a library but not implemented",
                value: -2,
            },
            { description: "Has a library and is implemented", value: 2 },
        ],
    },
    {
        category: "Router Libraries",
        importance: 4, // Very important
        max: 2,
        min: -3,
        aspects: [
            {
                description: "Implements routes in medium/large applications",
                value: 2,
            },
            {
                description: "Does not implement routes in medium/large applications",
                value: -2,
            },
            { description: "No routes for small applications", value: 0 },
            {
                description: "Uses libraries other than react-router or NextJS",
                value: -2,
            },
        ],
    },
    {
        category: "React Version",
        importance: 1, // Less important
        max: 2,
        min: -2,
        aspects: [
            { description: "16", value: -2 },
            { description: "17", value: 2 },
            { description: "18", value: 2 },
            { description: "19", value: -2 },
        ],
    },
    {
        category: "Code Splitting",
        importance: 3, // Important
        max: 2,
        min: -3,
        aspects: [
            { description: "Uses React lazy and suspense", value: 2 },
            { description: "Uses Loadable Components", value: 2 },
            { description: "Overuses code splitting", value: -2 },
            {
                description: "Does not use code splitting in medium/large applications",
                value: -2,
            },
        ],
    },
    {
        category: "Web Fonts",
        importance: 4, // Very important
        max: 4,
        min: -3,
        aspects: [
            { description: "Uses one font", value: 2 },
            { description: "Uses two fonts", value: -2 },
            { description: "Uses three fonts", value: -3 },
            {
                description:
                    "Uses preconnect and prefetch for the main font in the HTML",
                value: 2,
            },
        ],
    },
];
