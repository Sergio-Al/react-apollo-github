import { ApolloError } from "@apollo/client";
import Typography from "@mui/material/Typography";

export default function Error({ error }: { error: ApolloError }) {
  return (
    <Typography variant="overline" display="block" color="secondary">
      {error.toString()}
    </Typography>
  );
}
