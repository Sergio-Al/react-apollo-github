import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { IssueGrid } from "./styles";
import { NodeIssues } from "../../../utils/types";

export default function IssueItem({ issue }: { issue: NodeIssues }) {
  return (
    <Paper
      sx={{
        my: "1rem",
        py: "1rem",
        borderRadius: "30px",
        mx: "auto",
        maxWidth: "626px",
      }}
    >
      <IssueGrid container wrap="nowrap" spacing={2}>
        <Grid sx={{ margin: "0 auto", padding: 0 }} item>
          <Typography mb={2}>{issue.title}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            State: {issue.state}
          </Typography>
          <Link
            underline="none"
            target="_blank"
            rel="noreferrer"
            href={issue.url}
          >
            <Button variant="contained">Visit</Button>
          </Link>
        </Grid>
      </IssueGrid>
    </Paper>
  );
}
