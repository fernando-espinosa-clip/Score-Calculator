export type ExportResultsData = {
    results: Record<string, number>; // Resultados por categoría (nombre y puntuación)
    generalScore: number;           // Puntuación total obtenida
    maxScore: number;               // Puntuación máxima posible
    minScore: number;               // Puntuación mínima posible
    base10Score: string;            // Puntuación normalizada en base 10
};