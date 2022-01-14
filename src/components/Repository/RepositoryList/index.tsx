import Grid from "@mui/material/Grid";
import RepositoryItem from "../RepositoryItem";
import { EdgesRepository, Repositories } from "../../../utils/types";
import { useTheme } from "@mui/material";

export default function RepositoryList({ edges }: Repositories) {
  console.log("MY EDGES", edges);
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        [theme.breakpoints.down("lg")]: {
          justifyContent: "center",
        },
      }}
    >
      {edges.map(({ node }: EdgesRepository) => (
        <Grid item lg={6} key={node.id}>
          <RepositoryItem {...node}></RepositoryItem>
        </Grid>
      ))}
    </Grid>
  );
}
