import React from "react";
import { Line } from "react-chartjs-2";
import {
    BarElement,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { ChartOptions } from "../types/chartTypes"; // Opciones tipadas del gráfico
import { generateChartData } from "../helpers/calculationUtils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Definimos las opciones del gráfico
export const chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Optimization Points",
        },
    },
};

// Definimos los tipos para las props del componente
type LineChartProps = {
    results: Record<string, number>; // Resultados -> clave: categoría, valor: puntuación
};

// Componente funcional LineChart
export const LineChart: React.FC<LineChartProps> = ({ results }) => {
    const chartData = generateChartData(results);

    return <Line data={chartData} options={chartOptions} />;
};

export default LineChart