export type ScaleValueParams = {
    value: number;         // Valor actual
    min: number;           // Valor mínimo
    max: number;           // Valor máximo
    newScaleMin?: number;  // Escala mínima a la que se normaliza (por defecto: 0)
    newScaleMax?: number;  // Escala máxima a la que se normaliza (por defecto: 10)
};