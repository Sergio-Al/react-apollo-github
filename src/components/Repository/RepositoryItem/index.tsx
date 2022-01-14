import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { NodeEdgesRepository } from "../../../utils/types";
import { useTheme } from "@mui/system";

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
  height: "384px",
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
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    alignItems: "start",
    "& > *": { mb: "20px" },
  },
  [theme.breakpoints.up("md")]: {
    flexDireciton: "row",
    justifyContent: "space-between",
  },
}));

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
    <CustomBox>
      <Box>
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
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: "300",
            fontSize: "24px",
            lineHeight: "28px",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
        </Typography>
      </Box>

      <CustomInfoBox>
        <Link>
          <Button variant="contained" sx={{ width: "166px", height: "45px" }}>
            VISIT
          </Button>
        </Link>
        <Link href={owner.url}>Owner</Link>
        {stargazers.totalCount}
        <Typography variant="body1">
          {viewerHasStarred ? "is Starred" : "not starred"}
        </Typography>
        <Typography variant="body1">{viewerSubscription}</Typography>
        <Typography variant="body2">{watchers.totalCount}</Typography>
      </CustomInfoBox>
    </CustomBox>
  );
}
