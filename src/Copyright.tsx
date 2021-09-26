import React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
interface CopyrightProps {
  sx?: SxProps<Theme>;
}
const Copyright: React.FC<CopyrightProps> = (sx) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...sx}>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
