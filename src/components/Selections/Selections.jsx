import React from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const Selections = ({
  people,
  firstCharacter,
  secondCharacter,
  handleCharacterSelect,
  handleCompare,
}) => {
  if (people.length === 0) return <Loader />;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography marginBottom="1.5rem">
        Select two Star Wars characters below to see if they ever lived or were
        seen together in a movie.
      </Typography>
      <Grid container spacing={1} columns={{ xs: 6, sm: 12 }}>
        <Grid item xs={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="first-character">First Character</InputLabel>
            <Select
              labelId="first-character"
              id="first-character-select"
              value={firstCharacter || ""}
              label="First Character"
              onChange={(e) => handleCharacterSelect(e, 1)}
            >
              {people.map((person) => {
                return (
                  <MenuItem
                    key={person.name}
                    value={person}
                    disabled={person.name === secondCharacter?.name}
                  >
                    {person.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="second-character">Second Character</InputLabel>
            <Select
              labelId="second-character"
              id="second-character-select"
              value={secondCharacter || ""}
              label="Second Character"
              onChange={(e) => handleCharacterSelect(e, 2)}
            >
              {people.map((person) => {
                return (
                  <MenuItem
                    key={person.name}
                    value={person}
                    disabled={person.name === firstCharacter?.name}
                  >
                    {person.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box textAlign="center" marginTop="1rem">
        <Button
          variant="contained"
          onClick={handleCompare}
          size="large"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!firstCharacter || !secondCharacter}
        >
          Compare
        </Button>
      </Box>
    </Box>
  );
};

export default Selections;
