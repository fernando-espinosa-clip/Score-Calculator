import { Criteria } from "../types/criteriaTypes";
import { ScaleValueParams } from "../types/utilsTypes";
import { ChartData } from "chart.js"; // Importamos el tipo ChartData
import { scoreColors } from "./utils"; // Colores adaptados a los resultados

// Normaliza un valor a una nueva escala
export const calculateNewScaleValue = ({
                                           value,
                                           min,
                                           max,
                                           newScaleMin = 0,
                                           newScaleMax = 10,
                                       }: ScaleValueParams): number => {
    return newScaleMin + ((value - min) * (newScaleMax - newScaleMin)) / (max - min);
};

// Cálculo principal de resultados basado en los criterios
export const calculateResults = (
    criteria: Criteria[],
    selectedAnswers: Record<string, string[]>
) => {
    let generalScore = 0;
    let maxScore = 0;
    let minScore = 0;

    const unselectedCategories = criteria
        .filter((criterion) => !selectedAnswers[criterion.category]?.length)
        .map((criterion) => criterion.category);

    // Retorna un error indicando qué categorías no se seleccionaron
    if (unselectedCategories.length > 0) {
        return { unselectedCategories };
    }

    const categoryResults: Record<string, number> = {};

    criteria.forEach((criterion) => {
        const answers = selectedAnswers[criterion.category] || [];
        const subtotal = answers.reduce((acc, answer) => {
            const aspect = criterion.aspects.find((a) => a.description === answer);
            return acc + (aspect ? aspect.value : 0);
        }, 0);

        const truncatedSubtotal = Math.max(criterion.min, Math.min(criterion.max, subtotal)) * criterion.importance;

        generalScore += truncatedSubtotal;
        maxScore += criterion.max * criterion.importance;
        minScore += criterion.min * criterion.importance;

        categoryResults[criterion.category] = truncatedSubtotal;
    });

    const normalizedScore = calculateNewScaleValue({
        value: generalScore,
        min: minScore,
        max: maxScore,
    });

    return {
        general: generalScore,
        max: maxScore,
        min: minScore,
        normalizedScore,
        categoryResults,
        unselectedCategories: [],
    };
};

/**
 * Genera los datos para Chart.js a partir de los resultados calculados.
 *
 * @param results - Un objeto con los resultados por categoría (clave: categoría, valor: puntuación).
 * @returns Un objeto con los datos formateados para el gráfico.
 */
export const generateChartData = (
    results: Record<string, number>
): ChartData <"line">  => {

    const labels = Object.keys(results); // Categorías como etiquetas
    const data = Object.values(results); // Valores por categoría

    return {
        labels, // Asigna las etiquetas de categoría
        datasets: [
            {
                label: "Points", // Etiqueta del gráfico
                data, // Valores de las categorías
                backgroundColor: data.map((score) => scoreColors[Math.trunc(score) - 1] || "rgba(75, 192, 192, 0.6)"), // Color de fondo dinámico según los resultados
                borderColor: "rgba(75, 192, 192, 1)", // Color del borde
                borderWidth: 1, // Grosor del borde
            },
        ],
    };
};