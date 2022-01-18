import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

export const IssueGrid = styled(Grid)(({ theme }) => {
  return {
    margin: "auto",
    maxWidth: "626px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "90vw",
      height: "auto",
    },
    [theme.breakpoints.down("lg")]: {
      width: "500px",
    },
  };
});
