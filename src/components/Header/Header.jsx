import React from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJedi } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      marginTop="1rem"
      marginBottom="2rem"
    >
      <FontAwesomeIcon icon={faJedi} size="2x" />
      <Typography variant="h5" marginLeft="1rem">
        Star Wars Compare
      </Typography>
    </Box>
  );
};

export default Header;
