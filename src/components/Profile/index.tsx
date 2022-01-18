import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_OF_CURRENT_USER } from "../../api/requests";
import SkeletonProfile from "./Skeleton";
import RepositoryList from "../Repository/RepositoryList";
import { Box } from "@mui/material";
import Error from "../Error";

export default function Profile() {
  const { loading, error, data, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_CURRENT_USER
  );

  if (loading) return <SkeletonProfile />;
  if (error) return <Error error={error} />;
  let { viewer } = data;
  return (
    <Box>
      <RepositoryList
        repositories={viewer.repositories}
        fetchMore={fetchMore}
      />
    </Box>
  );
}
