import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Paper,
  Alert,
} from "@mui/material";
import { saveAs } from "file-saver";

import { Bar, Line } from "react-chartjs-2";

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

// Register Chart.js components
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

export const options = {
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

// Configuration for evaluation criteria
const criteria = [
  {
    category: "Service Workers",
    importance: 4, // Very important
    max: 5,
    min: -3,
    aspects: [
      { description: "Not implemented", value: -3 },
      { description: "Configured in Webpack", value: 2 },
      {
        description: "Contains configuration files for cache handling",
        value: 2,
      },
      { description: "Implemented", value: 3 },
    ],
  },
  {
    category: "Design System",
    importance: 4, // Very important
    max: 2,
    min: -3,
    aspects: [
      { description: "Does not have Clip's DS library", value: 0 },
      { description: "Uses one of Clip's DS libraries", value: 2 },
      { description: "Uses two of Clip's DS libraries", value: -2 },
      { description: "Uses three of Clip's DS libraries", value: -3 },
    ],
  },
  {
    category: "Icon Libraries",
    importance: 3, // Important
    max: 0,
    min: -3,
    aspects: [
      { description: "Does not have an icon library", value: 0 },
      { description: "Has one icon library", value: 0 },
      { description: "Has two icon libraries", value: -2 },
      { description: "Has three icon libraries", value: -3 },
    ],
  },
  {
    category: "Style Libraries",
    importance: 3, // Important
    max: 2,
    min: -3,
    aspects: [
      { description: "Uses one style library", value: 2 },
      { description: "Uses two style libraries", value: -2 },
      { description: "Uses three style libraries", value: -3 },
    ],
  },
  {
    category: "Extra MUI Libraries",
    importance: 3, // Important
    max: 0,
    min: -4,
    aspects: [
      { description: "None", value: 0 },
      { description: "Uses the System library", value: -2 },
      { description: "Uses the Labs library", value: -2 },
    ],
  },
  {
    category: "Libraries for Async Calls & Caching",
    importance: 4, // Very important
    max: 2,
    min: -2,
    aspects: [
      { description: "Does not use a library", value: -2 },
      {
        description: "Has a library but not implemented",
        value: -2,
      },
      { description: "Has a library and is implemented", value: 2 },
    ],
  },
  {
    category: "Router Libraries",
    importance: 4, // Very important
    max: 2,
    min: -3,
    aspects: [
      {
        description: "Implements routes in medium/large applications",
        value: 2,
      },
      {
        description: "Does not implement routes in medium/large applications",
        value: -2,
      },
      { description: "No routes for small applications", value: 0 },
      {
        description: "Uses libraries other than react-router or NextJS",
        value: -2,
      },
    ],
  },
  {
    category: "React Version",
    importance: 1, // Less important
    max: 2,
    min: -2,
    aspects: [
      { description: "16", value: -2 },
      { description: "17", value: 2 },
      { description: "18", value: 2 },
      { description: "19", value: -2 },
    ],
  },
  {
    category: "Code Splitting",
    importance: 3, // Important
    max: 2,
    min: -3,
    aspects: [
      { description: "Uses React lazy and suspense", value: 2 },
      { description: "Uses Loadable Components", value: 2 },
      { description: "Overuses code splitting", value: -2 },
      {
        description: "Does not use code splitting in medium/large applications",
        value: -2,
      },
    ],
  },
  {
    category: "Web Fonts",
    importance: 4, // Very important
    max: 4,
    min: -3,
    aspects: [
      { description: "Uses one font", value: 2 },
      { description: "Uses two fonts", value: -2 },
      { description: "Uses three fonts", value: -3 },
      {
        description:
            "Uses preconnect and prefetch for the main font in the HTML",
        value: 2,
      },
    ],
  },
];


// Variables for general, max, and min scores
let generalScore = 0;
let maxScore = 0;
let minScore = 0;
let base10Score = 0;

// Utility function to normalize values to a new scale
const calculateNewScaleValue = (
    value,
    min,
    max,
    newScaleMin = 0,
    newScaleMax = 10
) =>
    newScaleMin +
    ((value - min) * newScaleMax) / (max - min);

const OptimizationCalculator = () => {
  // Hook to manage selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // Hook to manage errors (missing categories)
  const [errors, setErrors] = useState([]);
  // Hook to store the final normalized results by category
  const [results, setResults] = useState(null);

  // Handle user selections for each category and aspect
  const handleSelection = (category, description, checked) => {
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
          [category]: answersPerCategory.filter(
              (answer) => answer !== description
          ),
        };
      }
    });
  };

  // Calculate total, maximum, and minimum scores
  const calculateScore = () => {
    generalScore = 0;
    maxScore = 0;
    minScore = 0;
    base10Score = 0;

    // Identify unselected categories
    const unselectedCategories = criteria
        .filter((criterion) => {
          const answers = selectedAnswers[criterion.category] || [];
          return answers.length === 0;
        })
        .map((criterion) => criterion.category);

    // If there are unselected categories, display errors
    if (unselectedCategories.length > 0) {
      setErrors(unselectedCategories);
      return;
    }

    // Reset errors if all categories are selected
    setErrors([]);

    const resultsByCategory = {};

    // Process each criterion
    criteria.forEach((criterion) => {
      const answers = selectedAnswers[criterion.category] || [];
      const subtotal = answers.reduce((acc, answer) => {
        const aspect = criterion.aspects.find(
            (a) => a.description === answer
        );
        return acc + (aspect ? aspect.value : 0);
      }, 0);

      // Apply score limits (min and max)
      const truncatedSubtotal =
          Math.max(criterion.min, Math.min(criterion.max, subtotal)) *
          criterion.importance;

      // Save results per category
      resultsByCategory[criterion.category] = truncatedSubtotal;
      generalScore += truncatedSubtotal;
      maxScore += criterion.max * criterion.importance;
      minScore += criterion.min * criterion.importance;
    });

    // Normalize the general score to a 0-10 scale
    base10Score = calculateNewScaleValue(
        generalScore,
        minScore,
        maxScore
    ).toFixed(2);
    setResults(resultsByCategory);
  };

  // Prepare chart data for visualization
  const generateChartData = () => {
    if (!results) return null;

    const labels = Object.keys(results);
    const data = Object.values(results);

    return {
      labels,
      datasets: [
        {
          label: "Points",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  console.log(selectedAnswers);
  return (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          Project Optimization Calculator
        </Typography>
        <Box>
          {criteria.map((criterion) => (
              <Paper elevation={3} key={criterion.category} sx={{ p: 2, my: 2 }}>
                <Typography variant="h6">
                  {criterion.category}
                  <Typography
                      variant="body2"
                      component="span"
                      sx={{ fontWeight: "normal", ml: 2 }}
                  >
                    <strong>[Weight x{criterion.importance}]</strong> - (Max:{" "}
                    {criterion.max}, Min: {criterion.min})
                  </Typography>
                </Typography>
                <FormControl component="fieldset">
                  {criterion.aspects.map((aspect) => (
                      <Box
                          key={aspect.description}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bgcolor: "background.default",
                          }}
                      >
                        {/* Checkbox for user selection */}
                        <FormControlLabel
                            control={
                              <Checkbox
                                  checked={
                                      selectedAnswers[criterion.category]?.includes(
                                          aspect.description
                                      ) || false
                                  }
                                  onChange={(e) =>
                                      handleSelection(
                                          criterion.category,
                                          aspect.description,
                                          e.target.checked
                                      )
                                  }
                              />
                            }
                            label={aspect.description}
                        />
                        {/* Show corresponding aspect value with colors */}
                        <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color:
                                  aspect.value > 0
                                      ? "green"
                                      : aspect.value < 0
                                          ? "red"
                                          : "gray",
                            }}
                        >
                          {aspect.value > 0
                              ? `+${aspect.value}`
                              : `${aspect.value}`}
                        </Typography>
                      </Box>
                  ))}
                </FormControl>
              </Paper>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="body1">
                Please select at least one option in the following categories:
              </Typography>
              <ul>
                {errors.map((category) => (
                    <li key={category}>{category}</li>
                ))}
              </ul>
            </Alert>
        )}

        <Box textAlign="center" mb={4}>
          <Button
              variant="contained"
              color="primary"
              onClick={calculateScore}
          >
            Calculate Normalized Score
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />

        {results && (
            <>
              <CircularProgressWithLabel
                  value={base10Score}
                  color={scoreColors[Math.trunc(base10Score) - 1]}
              />
              <Box>
                <Typography variant="h5" gutterBottom>
                  Normalized Score Report
                </Typography>
                <ul>
                  {Object.entries(results).map(([category, score]) => (
                      <li key={category}>
                        <Typography variant="body1">
                          <strong>{category}: </strong> {score.toFixed(2)} Points
                        </Typography>
                      </li>
                  ))}
                </ul>
                <Divider sx={{ my: 4 }} />
                <ul>
                  <li>
                    <Typography variant="body1">
                      <strong>Maximum Possible: </strong> {maxScore} Points
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Minimum Possible: </strong> {minScore} Points
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Obtained Score: </strong> {generalScore} Points
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Rating:</strong>{" "}
                      <Typography
                          component="strong"
                          sx={{
                            color: scoreColors[Math.trunc(base10Score - 1)],
                            fontWeight: "bold",
                          }}
                      >
                        {" "}
                        {base10Score}
                      </Typography>
                      /10
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Divider sx={{ my: 4 }} />
              <Box mt={4}>
                <Line data={generateChartData()} options={options} />
              </Box>
            </>
        )}
      </Container>
  );
};

export default OptimizationCalculator;