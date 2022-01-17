import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import RepositoryItem from "../RepositoryItem";
import { EdgesRepository, Repositories } from "../../../utils/types";
import { useTheme } from "@mui/material";

export default function RepositoryList({
  repositories,
  fetchMore,
}: {
  repositories: Repositories;
  fetchMore: any;
}) {
  console.log("MY EDGES", repositories.edges);
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
      {repositories.edges.map(({ node }: EdgesRepository) => (
        <Grid item lg={6} key={node.id}>
          <RepositoryItem {...node}></RepositoryItem>
        </Grid>
      ))}
      {repositories.pageInfo.hasNextPage && (
        <Grid item xs={12}>
          <Button
            onClick={() => {
              fetchMore({
                variables: { cursor: repositories.pageInfo.endCursor },
              });
            }}
          >
            More Repositories
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
