import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_OF_CURRENT_USER } from "../../api/requests";
import Typography from "@mui/material/Typography";
import SkeletonProfile from "./Skeleton";
import RepositoryList from "../Repository/RepositoryList";
import { Box } from "@mui/material";

export default function Profile() {
  const { loading, error, data } = useQuery(GET_REPOSITORIES_OF_CURRENT_USER);

  if (loading) return <SkeletonProfile />;
  if (error) return <Typography>An Error have ocurred</Typography>;
  console.log(data);

  let { viewer } = data;
  return (
    <Box>
      <RepositoryList edges={viewer.repositories.edges} />
    </Box>
  );
}
