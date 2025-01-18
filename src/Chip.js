import * as React from "react";
import MuiChip from "@mui/material/Chip";

const defaultNullfuction = () => null;

const fontSize = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "20px",
};

export const Chip = (props) => {
  const { onDelete, onClick, startIcon, endIcon } = props;
  return (
    <MuiChip
      sx={{
        padding: "4px 8px",
        borderRadius: "8px",
        border: "1px solid #63666A",
        backgroundColor: "#FFFFFF",
        ...fontSize,
        "& .MuiChip-icon": {
          fontSize: "20px",
          color: "inherit",
          marginLeft: 0,
        },
        "& .MuiChip-deleteIcon": {
          fontSize: "20px",
          color: "inherit",
          marginRight: 0,
          "&:hover": { color: "inherit" },
        },
      }}
      clickable={!!onClick}
      onClick={onClick}
      icon={startIcon}
      label="With Icon"
      deleteIcon={endIcon}
      onDelete={onDelete || onClick || defaultNullfuction}
    />
  );
};

export default Chip;
