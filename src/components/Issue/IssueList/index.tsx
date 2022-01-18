import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { GET_ISSUES_OF_REPOSITORY } from "../../../api/requests";
import IssueItem from "../IssueItem";
import { Issues as TypeIssues } from "../../../utils/types";

export default function Issues({
  repositoryOwner,
  repositoryName,
}: {
  repositoryOwner: string;
  repositoryName: string;
}) {
  const { loading, error, data } = useQuery(GET_ISSUES_OF_REPOSITORY, {
    variables: { repositoryName, repositoryOwner },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: Something happened</Typography>;

  const { repository } = data;

  if (!repository.issues.edges.length) {
    return <Typography>NO issues here</Typography>;
  }

  return <IssueList issues={repository.issues} />;
}

function IssueList({ issues }: { issues: TypeIssues }) {
  return (
    <Box sx={{ my: "1rem" }}>
      <Typography variant="h5" gutterBottom component="div">
        Issues
      </Typography>
      {issues.edges.map(({ node }) => (
        <IssueItem key={node.id} issue={node} />
      ))}
    </Box>
  );
}
