export type Aspect = {
    description: string; // Descripción del aspecto
    value: number;       // Valor numérico del aspecto
};

export type Criteria = {
    category: string;      // Nombre de la categoría
    importance: number;    // Peso o importancia de la categoría
    max: number;           // Puntuación máxima permitida
    min: number;           // Puntuación mínima permitida
    aspects: Aspect[];     // Lista de aspectos asociados a la categoría
};