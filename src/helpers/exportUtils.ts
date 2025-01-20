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
                            }: ExportResultsData & { projectName: string }) => {
    const csvRows = [
        [`Project Name:`, projectName],
        [],
        ["Category", "Score"],
        ...Object.entries(results).map(([category, score]) => [category, score.toFixed(2)]),
        [],
        ["Maximum Possible", maxScore],
        ["Minimum Possible", minScore],
        ["Obtained Score", generalScore],
        ["Rating", base10Score],
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${projectName || "results"}.csv`);
};

// Exporta los resultados a un archivo JSON
export const exportToJSON = ({
                                 projectName,
                                 results,
                                 generalScore,
                                 maxScore,
                                 minScore,
                                 base10Score,
                             }: ExportResultsData & { projectName: string }) => {
    const data = {
        projectName,
        results,
        generalScore,
        maxScore,
        minScore,
        base10Score,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(blob, `${projectName || "results"}.json`);
};

// Exporta los resultados a un archivo Markdown
export const exportToMarkdown = ({
                                     projectName,
                                     results,
                                     generalScore,
                                     maxScore,
                                     minScore,
                                     base10Score,
                                 }: ExportResultsData & { projectName: string }) => {
    const markdownRows = Object.entries(results)
        .map(([category, score]) => `- **${category}**: ${score.toFixed(2)} Points`)
        .join("\n");

    const markdownContent = `
# Results Report for "${projectName}"

## Detailed Scores
${markdownRows}

## Summary
- **Maximum Possible**: ${maxScore} Points
- **Minimum Possible**: ${minScore} Points
- **Obtained Score**: ${generalScore} Points
- **Rating**: ${base10Score}/10
  `;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    saveAs(blob, `${projectName || "results"}.md`);
};