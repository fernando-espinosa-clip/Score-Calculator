import { ExportResultsData } from "../types/exportTypes";
import { saveAs } from "file-saver";

// Exporta los resultados a un archivo CSV
export const exportToCSV = ({
                                projectName,
                                results,
                                generalScore,
                                maxScore,
                                minScore,
                                base10Score,
                                selectedAnswers,
                            }: {
    projectName: string;
    results: Record<string, number>;
    generalScore: number;
    maxScore: number;
    minScore: number;
    base10Score: string;
    selectedAnswers: Record<string, string[]>;
}) => {
    const csvContent = [
        ["Project Name", projectName],
        ["Maximum Possible", maxScore],
        ["Minimum Possible", minScore],
        ["Obtained Score", generalScore],
        ["Rating", `${base10Score}/10`],
        [],
        ["Category", "Selected Answers"],
        ...Object.entries(selectedAnswers).map(([category, answers]) => [
            category,
            answers.join(", "),
        ]),
        [],
        ["Category", "Score"],
        ...Object.entries(results).map(([category, score]) => [category, score.toFixed(2)]),
    ]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${projectName}_results.csv`);
};

// Exporta los resultados a un archivo JSON
export const exportToJSON = ({
                                 projectName,
                                 results,
                                 generalScore,
                                 maxScore,
                                 minScore,
                                 base10Score,
                                 selectedAnswers,
                             }: {
    projectName: string;
    results: Record<string, number>;
    generalScore: number;
    maxScore: number;
    minScore: number;
    base10Score: string;
    selectedAnswers: Record<string, string[]>;
}) => {
    const jsonData = JSON.stringify(
        {
            projectName,
            maxScore,
            minScore,
            obtainedScore: generalScore,
            rating: base10Score,
            results,
            selectedAnswers, // Incluye las respuestas seleccionadas
        },
        null,
        2
    );

    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, `${projectName}_results.json`);
};

// Exporta los resultados a un archivo Markdown
export const exportToMarkdown = ({
                                     projectName,
                                     results,
                                     generalScore,
                                     maxScore,
                                     minScore,
                                     base10Score,
                                     selectedAnswers,
                                 }: {
    projectName: string;
    results: Record<string, number>;
    generalScore: number;
    maxScore: number;
    minScore: number;
    base10Score: string;
    selectedAnswers: Record<string, string[]>;
}) => {
    const markdownContent = `
# Results for ${projectName}

## General Information
- **Maximum Possible:** ${maxScore} Points
- **Minimum Possible:** ${minScore} Points
- **Obtained Score:** ${generalScore} Points
- **Rating:** ${base10Score}/10

## Selected Answers
${Object.entries(selectedAnswers)
        .map(
            ([category, answers]) =>
                `- **${category}:** ${answers.length > 0 ? answers.join(", ") : "None selected"}`
        )
        .join("\n")}

## Detailed Results
${Object.entries(results)
        .map(([category, score]) => `- **${category}:** ${score.toFixed(2)} Points`)
        .join("\n")}
`;

    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8;" });
    saveAs(blob, `${projectName}_results.md`);
};