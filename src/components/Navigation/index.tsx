import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import * as routes from "../../constants/routes";
import { StringValueNode } from "graphql";

const RouterLink = ({ children, to }: { children?: JSX.Element; to: any }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    {children}
  </Link>
);

function OrganizationSearch({
  search,
  setSearch,
  onSubmitForm,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSubmitForm: React.FormEventHandler<HTMLFormElement>;
}) {
  //const [search, setSearch] = useState("");
  // const myTemporaly = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(`Sending ${search}`);
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <form onSubmit={onSubmitForm}>
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
          defaultValue={search}
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
  search,
  setSearch,
  onSubmit,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
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
          setSearch={setSearch}
          search={search}
        />
      )}
    </Box>
  );
}
