import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SnackBar from "@mui/material/Snackbar";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NodeEdgesRepository } from "../../../utils/types";
import { useTheme } from "@mui/system";
import {
  STAR_REPOSITORY,
  REMOVE_STAR_REPOSITORY,
  SUBSCRIBE_REPO,
  UNSUBSCRIBE_REPO,
  IGNORE_REPO,
} from "../../../api/requests";
import { useMutation } from "@apollo/client";

const MainTitle = styled(Typography)(({ theme }) => {
  return {
    marginBottom: "0px",
    transition: "0ms",
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  };
});

const CustomBox = styled(Box)(({ theme }) => ({
  padding: "54px 44px",
  maxWidth: "626px",
  width: "100%",
  minHeight: "384px",
  background: theme.palette.mode === "light" ? "#ffffff" : "#2b2561",
  boxShadow: "2px 10px 28px -1px rgba(0, 0, 0, 0.25)",
  borderRadius: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    maxWidth: "90vw",
    height: "auto",
  },
  [theme.breakpoints.down("lg")]: {
    width: "500px",
  },
}));

const CustomInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "18px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column-reverse",
    alignItems: "start",
    "& > *": { mb: "20px" },
  },
  [theme.breakpoints.up("lg")]: {
    flexDireciton: "row",
    justifyContent: "space-between",
  },
}));

function StarButton({
  onClick,
  icon,
  message,
  loading,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  message: string;
  loading: boolean;
}) {
  return (
    <Button onClick={onClick} disabled={loading}>
      <Box sx={{ display: "flex" }}>
        {icon}
        <Typography variant="body1" sx={{ marginLeft: "4px" }}>
          {message}
        </Typography>
      </Box>
    </Button>
  );
}

function SubscribeButton({
  id,
  message,
}: {
  id: string;
  message: "SUBSCRIBED" | "UNSUBSCRIBED" | "IGNORED";
}) {
  const [
    subscribeUpdate,
    { loading: loadingSubscribe, error: errorSubscribe },
  ] = useMutation(SUBSCRIBE_REPO);
  const [
    unsubscribeUpdate,
    { loading: loadingUnubscribe, error: errorUnsubscribe },
  ] = useMutation(UNSUBSCRIBE_REPO);
  const [ignoreRepoUpdate, { loading: loadingIgnore, error: errorIgnore }] =
    useMutation(IGNORE_REPO);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (errorSubscribe || errorUnsubscribe || errorIgnore) {
    return (
      <SnackBar
        open
        autoHideDuration={3000}
        message={`An error have ocurred ${
          errorSubscribe?.message ||
          errorUnsubscribe?.message ||
          errorIgnore?.message
        }`}
      />
    );
  }

  return (
    <>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
        disabled={loadingSubscribe || loadingUnubscribe || loadingIgnore}
      >
        <Typography variant="body1">{message}</Typography>
      </Button>
      <Menu
        id="subscribe-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "subscribe-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            subscribeUpdate({ variables: { id } });
          }}
        >
          Subscribe
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            unsubscribeUpdate({ variables: { id } });
          }}
        >
          Unsubscribe
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            ignoreRepoUpdate({ variables: { id } });
          }}
        >
          Ignores
        </MenuItem>
      </Menu>
    </>
  );
}

function AddStar({ id }: { id: string }) {
  const [addStar, { loading, error }] = useMutation(STAR_REPOSITORY);

  if (error)
    return (
      <SnackBar
        open
        autoHideDuration={3000}
        message={`An error have ocurred`}
      />
    );

  return (
    <>
      <StarButton
        onClick={(e) => addStar({ variables: { id } })}
        loading={loading}
        icon={<StarOutlineIcon />}
        message="Star"
      />
    </>
  );
}

function RemoveStar({ id }: { id: string }) {
  const [removeStar, { loading, error }] = useMutation(REMOVE_STAR_REPOSITORY);
  console.log("remove star fired!");

  if (error)
    return (
      <SnackBar
        open
        autoHideDuration={3000}
        message={`An error have ocurred`}
      />
    );

  return (
    <>
      <StarButton
        onClick={(e) => removeStar({ variables: { id } })}
        loading={loading}
        icon={<StarIcon />}
        message="Starred"
      />
    </>
  );
}

export default function RepositoryItem({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}: NodeEdgesRepository) {
  const theme = useTheme(); // for extract the theme.palette.mode in sx prop
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CustomBox>
        <Box textAlign="start">
          <Box sx={{ mb: "18px" }}>
            <MainTitle gutterBottom>{name}</MainTitle>
            <Typography
              variant="caption"
              sx={{
                fontSize: "18px",
                color: theme.palette.mode === "light" ? "#454545" : "#ffffff",
              }}
              gutterBottom
            >
              {primaryLanguage.name}
            </Typography>
          </Box>
          <Box
            sx={{
              fontStyle: "normal",
              fontWeight: "300",
              fontSize: "24px",
              lineHeight: "28px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
          </Box>
        </Box>

        <CustomInfoBox>
          <Link href={url} underline="none" target="_blank" rel="noreferrer">
            <Button variant="contained" sx={{ width: "166px", height: "45px" }}>
              VISIT
            </Button>
          </Link>
          <Link
            href={owner.url}
            underline="none"
            target="_blank"
            rel="noreferrer"
            sx={{
              color: "#8d6a00",
              transition: "50ms all ease-in",
              "&:hover": {
                transform: "scale(1.1)",
                fontWeight: "500",
                color: theme.palette.mode === "light" ? "#000" : "#fff",
              },
            }}
          >
            Owner
          </Link>
          {viewerHasStarred ? <RemoveStar id={id} /> : <AddStar id={id} />}
          <SubscribeButton id={id} message={viewerSubscription} />
          <Typography variant="body2">
            Watchers: {watchers.totalCount}
          </Typography>
        </CustomInfoBox>
      </CustomBox>
    </Box>
  );
}
