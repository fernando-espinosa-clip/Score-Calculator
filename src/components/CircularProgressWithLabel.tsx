import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CircularProgressWithLabelProps = {
    value?: number; // Valor del progreso normalizado (0-10)
    color?: string; // Color del componente circular
    size?: number;  // Tamaño del componente
};

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
                                                                                 value = 0,
                                                                                 color = "red",
                                                                                 size = 150,
                                                                             }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant="determinate"
                size={size}
                value={value * 10} // Se escala a 0-100 para el progresivo
                sx={{ color }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: "text.secondary", fontSize: "20px" }}
                >
                    {`${Math.round(value * 10)}%`} {/* Escalado y redondeado */}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;