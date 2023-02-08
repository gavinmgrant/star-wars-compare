import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const FilmCard = ({ filmName }) => {
  const [url, setUrl] = useState("");

  const getMovieUrl = (film) => {
    const baseUrl = "https://www.rottentomatoes.com/m/";

    switch (film) {
      case "A New Hope":
        setUrl(baseUrl + "star_wars_a_new_hope");
        break;
      case "The Empire Strikes Back":
        setUrl(baseUrl + "star_wars_the_empire_strikes_back");
        break;
      case "Return of the Jedi":
        setUrl(baseUrl + "star_wars_episode_vi_return_of_the_jedi");
        break;
      case "The Phantom Menace":
        setUrl(baseUrl + "star_wars_episode_i_the_phantom_menace");
        break;
      case "Attack of the Clones":
        setUrl(baseUrl + "star_wars_episode_ii_attack_of_the_clones");
        break;
      case "Revenge of the Sith":
        setUrl(baseUrl + "star_wars_episode_iii_revenge_of_the_sith");
        break;
    }
  };

  useEffect(() => {
    getMovieUrl(filmName);
  }, []);

  return (
    <Card sx={{ minWidth: 250, border: "1px solid #f5f5f5" }}>
      <CardContent className="center" sx={{ padding: "0.5rem 0.5rem 0 0.5rem" }}>
        <Typography variant="h6">{filmName}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={url} target="_blank">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default FilmCard;
