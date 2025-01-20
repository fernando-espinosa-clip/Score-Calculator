import React from "react";
import {
    Paper,
    Typography,
    Checkbox,
    FormControl,
    FormControlLabel,
    Box,
} from "@mui/material";

interface Aspect {
    description: string;
    value: number;
}

interface CriterionProps {
    criterion: {
        category: string;
        importance: number;
        max: number;
        min: number;
        aspects: Aspect[];
    };
    selectedAnswers: Record<string, string[]>;
    onSelectionChange: (category: string, description: string, checked: boolean) => void;
}

const Criterion: React.FC<CriterionProps> = ({
                                                 criterion,
                                                 selectedAnswers,
                                                 onSelectionChange,
                                             }) => {
    const { category, importance, max, min, aspects } = criterion;

    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6">
                {category}
                <Typography
                    variant="body2"
                    component="span"
                    sx={{ fontWeight: "normal", ml: 2 }}
                >
                    <strong>[Weight x{importance}]</strong> - (Max: {max}, Min: {min})
                </Typography>
            </Typography>
            <FormControl component="fieldset">
                {aspects.map((aspect) => (
                    <Box
                        key={aspect.description}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bgcolor: "background.default",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        selectedAnswers[category]?.includes(aspect.description) || false
                                    }
                                    onChange={(e) =>
                                        onSelectionChange(category, aspect.description, e.target.checked)
                                    }
                                />
                            }
                            label={aspect.description}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: "bold",
                                color: aspect.value > 0 ? "green" : aspect.value < 0 ? "red" : "gray",
                            }}
                        >
                            {aspect.value > 0 ? `+${aspect.value}` : `${aspect.value}`}
                        </Typography>
                    </Box>
                ))}
            </FormControl>
        </Paper>
    );
};

export default Criterion;