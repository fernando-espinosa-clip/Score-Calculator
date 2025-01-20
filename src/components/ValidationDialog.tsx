import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

interface ValidationDialogProps {
    open: boolean; // Controla si el modal está abierto o cerrado
    onClose: () => void; // Función para cerrar el modal
    title?: string; // Título del modal
    message?: string; // Mensaje principal
    errors?: string[]; // Lista de errores para mostrar
}

const ValidationDialog: React.FC<ValidationDialogProps> = ({
                                                               open,
                                                               onClose,
                                                               title = "Validation Error", // Título predeterminado
                                                               message,
                                                               errors = [],
                                                           }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ color: "error.main", fontWeight: "bold" }}>
                ⚠️ {title}
            </DialogTitle>
            <DialogContent>
                {message && <Typography variant="body1">{message}</Typography>}
                {errors.length > 0 && (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            The following items require attention:
                        </Typography>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>
                                    <Typography variant="body1" color="error">
                                        {error}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    autoFocus
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ValidationDialog;