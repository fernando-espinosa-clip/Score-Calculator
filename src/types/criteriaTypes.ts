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

/**
 * Define un conjunto de datos de criterios.
 * Es una lista de objetos de tipo Criteria.
 */
export type CriteriaData = Criteria[];