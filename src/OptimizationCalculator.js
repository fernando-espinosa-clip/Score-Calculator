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
import { scoreColors } from "./utils";

// Registrar elementos para Chart.js
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
      text: "Puntos Optimizador",
    },
  },
};

// Configuración de criterios
const criterios = [
  {
    categoria: "Service Workers",
    importancia: 4, // Muy importante
    maximo: 5,
    minimo: -3,
    aspectos: [
      { descripcion: "No esta implementado", valor: -3 },
      { descripcion: "Están configurados en Webpack", valor: 2 },
      {
        descripcion: "Tiene archivos de configuración para manejo de cache",
        valor: 2,
      },
      { descripcion: "Está implementado", valor: 3 },
    ],
  },
  {
    categoria: "Design System",
    importancia: 4, // Muy importante
    maximo: 2,
    minimo: -3,
    aspectos: [
      { descripcion: "No tiene librería de DS de Clip", valor: 0 },
      { descripcion: "Maneja una librería de DS de Clip", valor: 2 },
      { descripcion: "Maneja dos librerías de DS de Clip", valor: -2 },
      { descripcion: "Maneja tres librerías de DS de Clip", valor: -3 },
    ],
  },
  {
    categoria: "Librería de Iconos",
    importancia: 3, //Importante
    maximo: 0,
    minimo: -3,
    aspectos: [
      { descripcion: "No tiene librería de Iconos", valor: 0 },
      { descripcion: "Tiene una librería de Iconos", valor: 0 },
      { descripcion: "Tiene dos librerías de Iconos", valor: -2 },
      { descripcion: "Tiene tres librerías de Iconos", valor: -3 },
    ],
  },
  {
    categoria: "Librerías de Estilos",
    importancia: 3, //Importante
    maximo: 2,
    minimo: -3,
    aspectos: [
      { descripcion: "Maneja una librería de estilos", valor: 2 },
      { descripcion: "Maneja dos librerías de estilos", valor: -2 },
      { descripcion: "Maneja tres librerías de estilos", valor: -3 },
    ],
  },
  {
    categoria: "Librerías extras de MUI",
    importancia: 3, // Importante
    maximo: 0,
    minimo: -4,
    aspectos: [
      { descripcion: "Ninguna", valor: 0 },
      { descripcion: "Tiene la librería System", valor: -2 },
      { descripcion: "Tiene la librería Labs", valor: -2 },
    ],
  },
  {
    categoria: "Librerías de manejo de llamadas asíncronas y cache",
    importancia: 4, // Muy importante
    maximo: 2,
    minimo: -2,
    aspectos: [
      { descripcion: "No tiene librería", valor: -2 },
      {
        descripcion: "Tiene librería pero no la tiene implementada",
        valor: -2,
      },
      { descripcion: "Tiene librería y está implementada", valor: 2 },
    ],
  },
  {
    categoria: "Librerías de router",
    importancia: 4, // Muy importante
    maximo: 2,
    minimo: -3,
    aspectos: [
      {
        descripcion: "Implementa rutas en la aplicación mediana/grande",
        valor: 2,
      },
      {
        descripcion: "No implementa rutas en aplicación mediana/grande",
        valor: -2,
      },
      { descripcion: "No implementa rutas en aplicación pequeña", valor: 0 },
      {
        descripcion: "Utiliza librerías que no son react-router o NextJS",
        valor: -2,
      },
    ],
  },
  {
    categoria: "Versión de React",
    importancia: 1, // Poco importante
    maximo: 2,
    minimo: -2,
    aspectos: [
      { descripcion: "16", valor: -2 },
      { descripcion: "17", valor: 2 },
      { descripcion: "18", valor: 2 },
      { descripcion: "19", valor: -2 },
    ],
  },
  {
    categoria: "Code Split",
    importancia: 3, // Importante
    maximo: 2,
    minimo: -3,
    aspectos: [
      { descripcion: "Utiliza React lazy y suspense", valor: 2 },
      { descripcion: "Utiliza Loadable Components", valor: 2 },
      { descripcion: "Utiliza en exceso el code split", valor: -2 },
      {
        descripcion: "No utiliza code split en aplicación mediana/grande",
        valor: -2,
      },
    ],
  },
  {
    categoria: "Fuentes tipográficas web",
    importancia: 4, // Muy importante
    maximo: 4,
    minimo: -3,
    aspectos: [
      { descripcion: "Utiliza una fuente", valor: 2 },
      { descripcion: "Utiliza dos fuentes", valor: -2 },
      { descripcion: "Utiliza tres fuentes", valor: -3 },
      {
        descripcion:
          "Utiliza preconnect y prefetch en la fuente principal en el HTML",
        valor: 2,
      },
    ],
  },
  {
    categoria: "Optimización de imágenes",
    importancia: 4, // Muy importante
    maximo: 2,
    minimo: -2,
    aspectos: [
      { descripcion: "Optimizadas", valor: 2 },
      { descripcion: "No optimizadas", valor: -2 },
    ],
  },
  {
    categoria: "Optimización de fuentes tipográficas",
    importancia: 3, // Importante
    maximo: 3,
    minimo: -2,
    aspectos: [
      { descripcion: "Optimizadas", valor: 3 },
      { descripcion: "No optimizadas", valor: -2 },
    ],
  },
  {
    categoria: "Optimización de bundle de la aplicación",
    importancia: 4, // Muy importante
    maximo: 4,
    minimo: -4,
    aspectos: [
      { descripcion: "Comprime con Gzip", valor: 2 },
      { descripcion: "Comprime con Brotli", valor: 2 },
      { descripcion: "No comprime con Gzip", valor: -2 },
      { descripcion: "No comprime con Brotli", valor: -2 },
    ],
  },
  {
    categoria: "Obtiene datos comunes desde el contenedor",
    importancia: 3, // Importante
    maximo: 2,
    minimo: -2,
    aspectos: [
      { descripcion: "Obtiene datos comunes desde APIs", valor: -2 },
      { descripcion: "Obtiene datos comunes desde el contenedor", valor: 2 },
    ],
  },
  {
    categoria: "Manejo de headers de caché en Amplify para assets estáticos",
    importancia: 4, // Muy importante
    maximo: 2,
    minimo: -2,
    aspectos: [
      { descripcion: "Sí tiene configuración de caché", valor: 2 },
      { descripcion: "No tiene configuración de caché", valor: -2 },
    ],
  },
];

let puntuacionGeneral = 0;
let puntuacionMaxima = 0;
let puntuacionMinima = 0;
let puntuacionBase10 = 0;

const calcularValorNuevaEscala = (
  valor,
  minimo,
  maximo,
  minimoNuevaEscala = 0,
  maximoNuevaEscala = 10
) =>
  minimoNuevaEscala +
  ((valor - minimo) * maximoNuevaEscala) / (maximo - minimo);

const CalculadoraOptimizacion = () => {
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
  const [errores, setErrores] = useState([]);
  const [resultados, setResultados] = useState(null); // Resultados finales normalizados

  // Manejar las selecciones del usuario
  const manejarSeleccion = (categoria, descripcion, checked) => {
    setRespuestasSeleccionadas((prevState) => {
      const respuestasPorCategoria = prevState[categoria] || [];
      if (checked) {
        return {
          ...prevState,
          [categoria]: [...respuestasPorCategoria, descripcion],
        };
      } else {
        return {
          ...prevState,
          [categoria]: respuestasPorCategoria.filter(
            (respuesta) => respuesta !== descripcion
          ),
        };
      }
    });
  };

  // Calcular puntuación total y por categoría
  const calcularPuntuacion = () => {
    puntuacionGeneral = 0;
    puntuacionMaxima = 0;
    puntuacionMinima = 0;
    puntuacionBase10 = 0;

    const categoriasSinSeleccion = criterios
      .filter((criterio) => {
        const respuestas = respuestasSeleccionadas[criterio.categoria] || [];
        return respuestas.length === 0;
      })
      .map((criterio) => criterio.categoria);

    if (categoriasSinSeleccion.length > 0) {
      setErrores(categoriasSinSeleccion);
      return;
    }

    setErrores([]);

    const resultadosPorCategoria = {};

    criterios.forEach((criterio) => {
      const respuestas = respuestasSeleccionadas[criterio.categoria] || [];
      const subtotal = respuestas.reduce((acc, respuesta) => {
        const aspecto = criterio.aspectos.find(
          (a) => a.descripcion === respuesta
        );
        return acc + (aspecto ? aspecto.valor : 0);
      }, 0);

      // Aplicar límites
      const subtotalTruncado =
        Math.max(criterio.minimo, Math.min(criterio.maximo, subtotal)) *
        criterio.importancia;

      // Guardar resultados de la categoría
      resultadosPorCategoria[criterio.categoria] = subtotalTruncado;
      puntuacionGeneral += subtotalTruncado;
      puntuacionMaxima += criterio.maximo * criterio.importancia;
      puntuacionMinima += criterio.minimo * criterio.importancia;
    });

    puntuacionBase10 = calcularValorNuevaEscala(
      puntuacionGeneral,
      puntuacionMinima,
      puntuacionMaxima
    ).toFixed(2);
    setResultados(resultadosPorCategoria);
  };

  // Preparar datos para la gráfica
  const generarDatosGrafica = () => {
    if (!resultados) return null;

    const labels = Object.keys(resultados);
    const data = Object.values(resultados);

    return {
      labels,
      datasets: [
        {
          label: "Puntos",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  console.log(respuestasSeleccionadas);
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Calculadora de Optimización del Proyecto
      </Typography>
      <Box>
        {criterios.map((criterio) => (
          <Paper elevation={3} key={criterio.categoria} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6">
              {criterio.categoria}
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: "normal", ml: 2 }}
              >
                <strong>[Pondera x{criterio.importancia}]</strong> - (Máximo:{" "}
                {criterio.maximo}, Mínimo: {criterio.minimo})
              </Typography>
            </Typography>
            <FormControl component="fieldset">
              {criterio.aspectos.map((aspecto) => (
                <Box
                  key={aspecto.descripcion}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "background.default",
                  }}
                >
                  {/* Checkbox y descripción */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          respuestasSeleccionadas[criterio.categoria]?.includes(
                            aspecto.descripcion
                          ) || false
                        }
                        onChange={(e) =>
                          manejarSeleccion(
                            criterio.categoria,
                            aspecto.descripcion,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={aspecto.descripcion}
                  />
                  {/* Valor resaltado */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color:
                        aspecto.valor > 0
                          ? "green"
                          : aspecto.valor < 0
                          ? "red"
                          : "gray",
                    }}
                  >
                    {aspecto.valor > 0
                      ? `+${aspecto.valor}`
                      : `${aspecto.valor}`}
                  </Typography>
                </Box>
              ))}
            </FormControl>
          </Paper>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {errores.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body1">
            Por favor selecciona al menos una opción en las siguientes
            categorías:
          </Typography>
          <ul>
            {errores.map((categoria) => (
              <li key={categoria}>{categoria}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={calcularPuntuacion}
        >
          Calcular Puntuación Normalizada
        </Button>
      </Box>
      <Divider sx={{ my: 4 }} />

      {resultados && (
        <>
          <CircularProgressWithLabel
            value={puntuacionBase10}
            color={scoreColors[Math.trunc(puntuacionBase10) - 1]}
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              Reporte de Calificaciones Normalizadas
            </Typography>
            <ul>
              {Object.entries(resultados).map(([categoria, calificacion]) => (
                <li key={categoria}>
                  <Typography variant="body1">
                    <strong>{categoria}: </strong> {calificacion.toFixed(2)}{" "}
                    Puntos
                  </Typography>
                </li>
              ))}
            </ul>
            <Divider sx={{ my: 4 }} />
            <ul>
              <li>
                <Typography variant="body1">
                  <strong>Maxima posible: </strong> {puntuacionMaxima} Puntos
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Minima posible: </strong> {puntuacionMinima} Puntos
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Puntuacion obtenida : </strong> {puntuacionGeneral}{" "}
                  Puntos
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Calificacion :</strong>{" "}
                  <Typography
                    component="strong"
                    sx={{
                      color: scoreColors[Math.trunc(puntuacionBase10 - 1)],
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {puntuacionBase10}
                  </Typography>
                  /10
                </Typography>
              </li>
            </ul>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box mt={4}>
            <Line data={generarDatosGrafica()} options={options} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default CalculadoraOptimizacion;
