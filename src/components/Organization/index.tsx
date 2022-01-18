import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_OF_ORGANIZATION } from "../../api/requests";
import RepositoryList from "../Repository";
import SkeletonOrganization from "./Skeleton";
import { Box } from "@mui/material";

export default function Organization({
  organizationName,
}: {
  organizationName: string;
}) {
  const { loading, error, data, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_ORGANIZATION,
    {
      variables: { organizationName },
      skip: organizationName === "",
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) {
    return <SkeletonOrganization />;
  }

  if (error) {
    return <Typography>Something happened</Typography>;
  }

  const { organization } = data;

  return (
    <Box>
      <RepositoryList
        repositories={organization.repositories}
        fetchMore={fetchMore}
      />
    </Box>
  );
}
