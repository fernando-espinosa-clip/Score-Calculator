import { useState } from "react";

interface Criterion {
    category: string;
    importance: number;
    max: number;
    min: number;
    aspects: { description: string; value: number }[];
}

const useOptimizationCalculator = (criteria: Criterion[]) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
    const [errors, setErrors] = useState<string[]>([]);
    const [results, setResults] = useState<Record<string, number> | null>(null);
    const [generalScore, setGeneralScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [minScore, setMinScore] = useState(0);
    const [base10Score, setBase10Score] = useState<string | null>(null);

    const handleSelection = (category: string, description: string, checked: boolean) => {
        setSelectedAnswers((prevState) => {
            const answersPerCategory = prevState[category] || [];
            if (checked) {
                return {
                    ...prevState,
                    [category]: [...answersPerCategory, description],
                };
            } else {
                return {
                    ...prevState,
                    [category]: answersPerCategory.filter((answer) => answer !== description),
                };
            }
        });
    };

    const calculateScore = () => {
        let score = 0;
        let max = 0;
        let min = 0;

        // Identify unselected categories
        const unselectedCategories = criteria
            .filter((criterion) => {
                const answers = selectedAnswers[criterion.category] || [];
                return answers.length === 0;
            })
            .map((criterion) => criterion.category);

        // Stop if any errors
        if (unselectedCategories.length > 0) {
            setErrors(unselectedCategories);
            return;
        }

        setErrors([]);

        const resultsByCategory: Record<string, number> = {};

        criteria.forEach((criterion) => {
            const answers = selectedAnswers[criterion.category] || [];
            const subtotal = answers.reduce((acc, answer) => {
                const aspect = criterion.aspects.find((a) => a.description === answer);
                return acc + (aspect ? aspect.value : 0);
            }, 0);

            const truncatedSubtotal =
                Math.max(criterion.min, Math.min(criterion.max, subtotal)) *
                criterion.importance;

            resultsByCategory[criterion.category] = truncatedSubtotal;
            score += truncatedSubtotal;
            max += criterion.max * criterion.importance;
            min += criterion.min * criterion.importance;
        });

        const normalizedScore = (
            0 +
            ((score - min) * 10) / (max - min)
        ).toFixed(2);

        setGeneralScore(score);
        setMaxScore(max);
        setMinScore(min);
        setBase10Score(normalizedScore);
        setResults(resultsByCategory);
    };

    return {
        selectedAnswers,
        errors,
        results,
        generalScore,
        maxScore,
        minScore,
        base10Score,
        handleSelection,
        calculateScore,
    };
};

export default useOptimizationCalculator;