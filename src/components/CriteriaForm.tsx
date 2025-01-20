import React from "react";
import { Paper, Typography, FormControl, FormControlLabel, Checkbox, Box } from "@mui/material";
import { Criteria } from "../types/criteriaTypes";

type CriteriaFormProps = {
    criteria: Criteria[];
    selectedAnswers: Record<string, string[]>;
    handleSelection: (category: string, description: string, checked: boolean) => void;
};

const CriteriaForm: React.FC<CriteriaFormProps> = ({ criteria, selectedAnswers, handleSelection }) => (
    <>
        {criteria.map((criterion) => (
            <Paper elevation={3} key={criterion.category} sx={{ p: 2, my: 2 }}>
                <Typography variant="h6">
                    {criterion.category}
                    <Typography variant="body2" component="span" sx={{ fontWeight: "normal", ml: 2 }}>
                        <strong>[Weight x{criterion.importance}]</strong> - (Max: {criterion.max}, Min: {criterion.min})
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAnswers[criterion.category]?.includes(aspect.description) || false}
                                        onChange={(e) => handleSelection(criterion.category, aspect.description, e.target.checked)}
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
        ))}
    </>
);

export default CriteriaForm;