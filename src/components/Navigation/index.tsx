import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import * as routes from "../../constants/routes";
const RouterLink = ({ children, to }: { children?: JSX.Element; to: any }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    {children}
  </Link>
);

function OrganizationSearch({
  defaultSearch,
  onSubmitForm,
}: {
  defaultSearch: string;
  onSubmitForm: (newValue: string) => void;
}) {
  const [localSearch, setLocalSearch] = useState(defaultSearch);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitForm(localSearch.trim());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalSearch(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          "& > *:not(:last-child)": { mr: 1 },
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue={localSearch}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>
    </form>
  );
}

export default function Navigation({
  defaultSearch,
  onSubmit,
}: {
  defaultSearch: string;
  onSubmit: (newValue: string) => void;
}) {
  const location = useLocation();
  console.log(location);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4,
      }}
    >
      <ButtonGroup
        sx={{ "& > *:not(:last-child)": { mr: 4 } }}
        variant="outlined"
        aria-label="outlined button group"
      >
        <RouterLink to={routes.PROFILE}>
          <Button>Profile</Button>
        </RouterLink>
        <RouterLink to={routes.ORGANIZATION}>
          <Button>Organization</Button>
        </RouterLink>
      </ButtonGroup>
      {location.pathname !== "/profile" && (
        <OrganizationSearch
          onSubmitForm={onSubmit}
          defaultSearch={defaultSearch}
        />
      )}
    </Box>
  );
}
