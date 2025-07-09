import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
} from "@mui/material";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { scoreColors } from "@/helpers/utils";
import { calculateResults } from "@/helpers/calculationUtils";
import { exportToCSV, exportToJSON, exportToMarkdown } from "@/helpers/exportUtils";
import CriteriaForm from "./CriteriaForm";
import LineChart from "./LineChart";
import ValidationDialog from "./ValidationDialog"; // Importamos el nuevo componente

import { criteriaData } from "@/data/criteriaData"; // Importamos los criterios

const OptimizationCalculator: React.FC = () => {
  const [projectName, setProjectName] = useState<string>(""); // Nuevo estado para guardar el nombre del proyecto
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [generalScore, setGeneralScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [minScore, setMinScore] = useState<number>(0);
  const [base10Score, setBase10Score] = useState<string>("0");
  const [showModal, setShowModal] = useState<boolean>(false); // Nueva variable para controlar el estado del diálogo modal
  const [modalMessage, setModalMessage] = useState<string>(""); // Nuevo estado para el mensaje dentro del diálogo modal
  const [devAccessToken, setDevAccessToken] = useState<string>("NO COOKIE"); // Estado para almacenar el valor de la cookie

  // Función para obtener el valor de una cookie por su nombre
  const getCookie = (name: string): string | null => {
    return document.cookie;
    /*const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;*/
  };

  // Obtener el valor de la cookie al cargar el componente
  useEffect(() => {
    const cookieValue = getCookie('dev_access_token');
    if (cookieValue) {
      setDevAccessToken(cookieValue);
    }
  }, []);

  // Maneja los cambios en el campo del nombre del proyecto
  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  // Valida el nombre del proyecto antes de realizar cálculos o exportaciones
  const validateProjectName = (): boolean => {
    if (projectName.trim().length < 5) {
      setModalMessage("⚠️ The project name is required and must be at least 5 characters long.");
      setErrors([]); // No hay errores en categorías aquí
      setShowModal(true); // Muestra el diálogo modal en caso de error
      return false;
    }
    return true;
  };

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
    if (!validateProjectName()) {
      return;
    }

    const { general, max, min, normalizedScore, categoryResults, unselectedCategories } =
        calculateResults(criteriaData, selectedAnswers);

    if (unselectedCategories.length > 0) {
      setModalMessage("⚠️ Please select at least one option in the following categories:");
      setErrors(unselectedCategories); // Carga las categorías vacías
      setShowModal(true);
      return;
    }

    setErrors([]);
    setResults(categoryResults || null);
    setGeneralScore(general ?? 0);
    setMaxScore(max ?? 0);
    setMinScore(min ?? 0);
    setBase10Score(normalizedScore ? normalizedScore.toFixed(2) : "0");
  };

  return (
      <Container maxWidth="md">
        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
          dev_access_token: {devAccessToken}
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
          Project Optimization Calculator
        </Typography>

        {/* Campo de texto para ingresar el nombre del proyecto */}
        <Box sx={{ my: 4 }}>
          <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              value={projectName}
              onChange={handleProjectNameChange}
              helperText="Enter the name of your project for reference."
          />
        </Box>

        <Box>
          <CriteriaForm
              criteria={criteriaData}
              selectedAnswers={selectedAnswers}
              handleSelection={handleSelection}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

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
                    <Typography
                        component="span"
                        sx={{ fontWeight: "bold", color: scoreColors[Math.trunc(parseFloat(base10Score)) - 1] }}
                    >
                      {base10Score}
                    </Typography>
                    /10
                  </Typography>
                </li>
              </ul>
              <Box mt={4}>
                <LineChart results={results} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={() =>
                    validateProjectName() &&
                    exportToCSV({
                      projectName,
                      results,
                      generalScore,
                      maxScore,
                      minScore,
                      base10Score,
                      selectedAnswers, // Añade las respuestas seleccionadas
                    })
                }
                  >
                  Export to CSV
              </Button>
              <Button
                  variant="contained"
                  onClick={() =>
                      validateProjectName() &&
                      exportToJSON({
                        projectName,
                        results,
                        generalScore,
                        maxScore,
                        minScore,
                        base10Score,
                        selectedAnswers, // Añade las respuestas seleccionadas
                      })
                  }
              >
                Export to JSON
              </Button>
              <Button
                  variant="contained"
                  onClick={() =>
                      validateProjectName() &&
                      exportToMarkdown({
                        projectName,
                        results,
                        generalScore,
                        maxScore,
                        minScore,
                        base10Score,
                        selectedAnswers, // Añade las respuestas seleccionadas
                      })
                  }
              >
                Export to Markdown
              </Button>
              </Box>
            </>
        )}

        {/* Usamos el componente ValidationDialog */}
        <ValidationDialog
            open={showModal}
            onClose={() => setShowModal(false)}
            message={modalMessage}
            errors={errors}
        />
      </Container>
  );
};

export default OptimizationCalculator;
