import { ExportResultsData } from "../types/exportTypes";
import { saveAs } from "file-saver";

// Exporta los resultados a un archivo CSV
export const exportToCSV = ({
                                results,
                                generalScore,
                                maxScore,
                                minScore,
                                base10Score,
                            }: ExportResultsData) => {
    const csvRows = [
        ["Category", "Score"],
        ...Object.entries(results).map(([category, score]) => [category, score.toFixed(2)]),
        ["Maximum Possible", maxScore],
        ["Minimum Possible", minScore],
        ["Obtained Score", generalScore],
        ["Rating", base10Score],
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "results.csv");
};

// Exporta los resultados a un archivo JSON
export const exportToJSON = ({
                                 results,
                                 generalScore,
                                 maxScore,
                                 minScore,
                                 base10Score,
                             }: ExportResultsData) => {
    const data = {
        results,
        generalScore,
        maxScore,
        minScore,
        base10Score,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(blob, "results.json");
};

// Exporta los resultados a un archivo Markdown
export const exportToMarkdown = ({
                                     results,
                                     generalScore,
                                     maxScore,
                                     minScore,
                                     base10Score,
                                 }: ExportResultsData) => {
    const markdownRows = Object.entries(results)
        .map(([category, score]) => `- **${category}**: ${score.toFixed(2)} Points`)
        .join("\n");

    const markdownContent = `
# Results Report

## Detailed Scores
${markdownRows}

## Summary
- **Maximum Possible**: ${maxScore} Points
- **Minimum Possible**: ${minScore} Points
- **Obtained Score**: ${generalScore} Points
- **Rating**: ${base10Score}/10
    `;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    saveAs(blob, "results.md");
};