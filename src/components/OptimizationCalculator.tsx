import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Alert,
  Button,
} from "@mui/material";

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
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { scoreColors } from "../helpers/utils";
import { generateChartData, calculateResults } from "../helpers/calculationUtils";
import { exportToCSV, exportToJSON, exportToMarkdown } from "../helpers/exportUtils";
import CriteriaForm from "./CriteriaForm";

import { criteriaData } from "../data/criteriaData"; // Importamos los criterios
import { ChartOptions } from "../types/chartTypes";


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

// Opciones de la gráfica
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

const OptimizationCalculator: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [generalScore, setGeneralScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [minScore, setMinScore] = useState<number>(0);
  const [base10Score, setBase10Score] = useState<string>("0");

  // Maneja los cambios en las selecciones del usuario
  const handleSelection = (category: string, description: string, checked: boolean) => {
    setSelectedAnswers((prevState) => {
      const answersPerCategory = prevState[category] || [];
      if (checked) {
        return {
          ...prevState,
          [category]: [...answersPerCategory, description],
        };
      }
      return {
        ...prevState,
        [category]: answersPerCategory.filter((answer) => answer !== description),
      };
    });
  };

  // Calcula los puntajes
  const calculateScore = () => {
    const { general, max, min, normalizedScore, categoryResults, unselectedCategories } =
        calculateResults(criteriaData, selectedAnswers);

    if (unselectedCategories.length > 0) {
      setErrors(unselectedCategories);
      return;
    }

    setErrors([]);
    setResults(categoryResults || null);
    setGeneralScore(general ?? 0);
    setMaxScore(max ?? 0);
    setMinScore(min ?? 0);
    setBase10Score(normalizedScore ? normalizedScore.toFixed(2) : "0");
  };
  if (results) {
    console.log(generateChartData(results))
  }
  return (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          Project Optimization Calculator
        </Typography>
        <Box>
          <CriteriaForm
              criteria={criteriaData}
              selectedAnswers={selectedAnswers}
              handleSelection={handleSelection}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography>Please select at least one option in the following categories:</Typography>
              <ul>
                {errors.map((category) => (
                    <li key={category}>{category}</li>
                ))}
              </ul>
            </Alert>
        )}

        <Box textAlign="center" mb={4}>
          <Button variant="contained" color="primary" onClick={calculateScore}>
            Calculate Normalized Score
          </Button>
        </Box>

        {results && (
            <>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <CircularProgressWithLabel
                    value={parseFloat(base10Score)}
                    color={scoreColors[Math.trunc(parseFloat(base10Score)) - 1]}
                />
              </Box>
              <ul>
                {Object.entries(results).map(([category, score]) => (
                    <li key={category}>
                      <Typography>
                        <strong>{category}:</strong> {score.toFixed(2)} Points
                      </Typography>
                    </li>
                ))}
              </ul>
              <Divider sx={{ my: 4 }} />
              <ul>
                <li>
                  <Typography>
                    <strong>Maximum Possible:</strong> {maxScore} Points
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <strong>Minimum Possible:</strong> {minScore} Points
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <strong>Obtained Score:</strong> {generalScore} Points
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <strong>Rating:</strong>{" "}
                    <Typography component="span" sx={{ fontWeight: "bold", color: scoreColors[Math.trunc(parseFloat(base10Score)) - 1] }}>
                      {base10Score}
                    </Typography>
                    /10
                  </Typography>
                </li>
              </ul>
                <Box mt={4}>
                  hello
                <Line data={generateChartData(results)} options={chartOptions} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                <Button variant="contained" onClick={() => exportToCSV({ results, generalScore, maxScore, minScore, base10Score})}>
                  Export to CSV
                </Button>
                <Button variant="contained" onClick={() => exportToJSON({results, generalScore, maxScore, minScore, base10Score})}>
                  Export to JSON
                </Button>
                <Button variant="contained" onClick={() => exportToMarkdown({results, generalScore, maxScore, minScore, base10Score})}>
                  Export to Markdown
                </Button>
              </Box>
            </>
        )}
      </Container>
  );
};

export default OptimizationCalculator;