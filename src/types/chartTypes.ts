export type ChartOptions = {
    responsive: boolean; // Indica si el gráfico se debe ajustar al contenedor
    plugins: {
        legend: {
            position: "top" | "bottom" | "left" | "right"; // Posición de la leyenda
        };
        title: {
            display: boolean; // Indica si mostrar un título
            text: string;     // Texto del título
        };
    };
};