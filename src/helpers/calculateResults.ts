import { Criteria } from "../types/criteriaTypes";
import { ScaleValueParams } from "../types/utilsTypes";

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