import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "@apollo/client";
import { GET_ISSUES_OF_REPOSITORY } from "../../../api/requests";
import IssueItem from "../IssueItem";
import {
  EdgesIssues,
  Issues as TypeIssues,
  ISSUE_STATES,
} from "../../../utils/types";

const isShow = (issueState: ISSUE_STATES) => issueState !== "NONE";

export default function Issues({
  repositoryOwner,
  repositoryName,
}: {
  repositoryOwner: string;
  repositoryName: string;
}) {
  const [issueState, setIssueState] = useState<ISSUE_STATES>("NONE");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { loading, error, data } = useQuery(GET_ISSUES_OF_REPOSITORY, {
    variables: { repositoryName, repositoryOwner },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (state: ISSUE_STATES) => {
    setIssueState(state);
    handleClose();
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: Something happened</Typography>;

  const { repository } = data;

  const filteredRepositories = {
    issues: {
      edges: repository.issues.edges.filter(
        (issue: EdgesIssues) => issue.node.state === issueState
      ),
    },
  };

  return (
    <Box sx={{ my: "1rem" }}>
      <Button
        id="state-button"
        aria-controls={open ? "state-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
        onClick={handleClick}
        sx={{ my: "1rem" }}
      >
        {issueState} - Issues
      </Button>
      <Menu
        id="state-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "state-button" }}
      >
        <MenuItem onClick={() => handleSelection("OPEN")}>OPEN</MenuItem>
        <MenuItem onClick={() => handleSelection("CLOSED")}>CLOSE</MenuItem>
        <MenuItem onClick={() => handleSelection("NONE")}>NONE</MenuItem>
      </Menu>
      {isShow(issueState) && <IssueList issues={filteredRepositories.issues} />}
    </Box>
  );
}

function IssueList({ issues }: { issues: TypeIssues }) {
  if (!issues.edges.length) {
    return <Typography>NO issues here</Typography>;
  }

  return (
    <Box sx={{ my: "1rem" }}>
      {issues.edges.map(({ node }) => (
        <IssueItem key={node.id} issue={node} />
      ))}
    </Box>
  );
}
