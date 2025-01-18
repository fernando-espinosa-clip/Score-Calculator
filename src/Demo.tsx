import * as React from "react";
import Chip from "./Chip";
import Stack from "@mui/material/Stack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

export default function IconChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        startIcon={<ImageOutlinedIcon />}
        label="With Icon"
        endIcon={<ClearOutlinedIcon />}
        onDelete={() => alert("aqui borro el chip")}
      />
      <Chip
        startIcon={<ImageOutlinedIcon />}
        label="With Icon"
        endIcon={<ArrowDropDownOutlinedIcon />}
        onClick={() =>
          alert("este es el evento del click aunque sea en on delete")
        }
      />
    </Stack>
  );
}
