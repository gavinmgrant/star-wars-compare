import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import FilmCard from "../FilmCard/FilmCard";
import { motion } from "framer-motion";

const Results = ({ commonFilms, firstCharacter, secondCharacter }) => {
  if (commonFilms.length === 0)
    return (
      <Typography className="center" margin="2rem">
        These Star Wars characters don't appear together.
      </Typography>
    );

  return (
    <Box marginTop="2rem" textAlign="center">
      <Typography marginBottom="1rem">
        {firstCharacter} and {secondCharacter} were seen together in{" "}
        {commonFilms.length === 1 ? "this" : `these ${commonFilms.length}`} Star
        Wars movies:
      </Typography>
      <Grid container spacing={1} columns={12}>
        {commonFilms.map((film, index) => {
          return (
            <Grid
              item
              key={film}
              xs={12}
              sm={commonFilms.length === 1 ? 12 : 6}
              justifyContent="center"
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
            >
              <FilmCard filmName={film} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Results;
