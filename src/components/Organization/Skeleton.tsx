import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonOrganization() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          "& > *:not(:last-child)": { mr: "20px" },
          justifyContent: "center",
        }}
      >
        <Skeleton animation="wave" variant="text" width={100} />
        <Skeleton animation="wave" variant="text" width={100} />
      </Box>
    </>
  );
}