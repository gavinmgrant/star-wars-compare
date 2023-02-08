import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Selections from "../Selections/Selections";
import Results from "../Results/Results";

const Main = () => {
  const [people, setPeople] = useState([]);
  const [films, setFilms] = useState([]);
  const [firstCharacter, setFirstCharacter] = useState(null);
  const [secondCharacter, setSecondCharacter] = useState(null);
  const [commonFilms, setCommonFilms] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [compareButtonDisabled, setCompareButtonDisabled] = useState(true);

  const handleCharacterSelect = (event, number) => {
    setShowResults(false);

    if (commonFilms.length > 0) setCommonFilms([]);

    if (number === 1) {
      setFirstCharacter(event.target.value);
    } else {
      setSecondCharacter(event.target.value);
    }
  };

  // utility function that takes two arrays as arguments and returns true if they share values
  const compareArrays = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) return true;
    }
    return false;
  };

  const handleCompare = () => {
    setCompareButtonDisabled(true);
    const filmUrls = [];
    const filmTitles = [];

    for (let i = 0; i < firstCharacter.films.length; i++) {
      const film = firstCharacter.films[i];
      const shareFilm = secondCharacter.films.includes(film);
      // add the film to the common list of films but prevent duplicates
      const addFilm = () => !filmUrls.includes(film) && filmUrls.push(film);

      if (shareFilm) {
        if (secondCharacter.homeworld === firstCharacter.homeworld) {
          addFilm();
        }
        if (
          compareArrays(firstCharacter.starships, secondCharacter.starships)
        ) {
          addFilm();
        }
        if (compareArrays(firstCharacter.vehicles, secondCharacter.vehicles)) {
          addFilm();
        }
      }
    }

    // convert film urls to film titles
    films.forEach((film) => {
      if (filmUrls.includes(film.url)) {
        filmTitles.push(film.title);
      }
    });

    setCommonFilms(filmTitles);
    setShowResults(true);
  };

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // recursively create a promise resolve chain to fetch all people from the API
  const getAllPeople = (
    progress,
    url = "https://swapi.dev/api/people/",
    people = []
  ) => {
    return new Promise((resolve, reject) =>
      fetch(url, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            throw `${response.status}: ${response.statusText}`;
          }
          response
            .json()
            .then((data) => {
              people = people.concat(data.results);

              if (data.next) {
                progress && progress(people);
                getAllPeople(progress, data.next, people)
                  .then(resolve)
                  .catch(reject);
              } else {
                resolve(people);
              }
            })
            .catch(reject);
        })
        .catch(reject)
    );
  };

  useEffect(() => {
    getAllPeople(() => {})
      .then((people) => {
        setPeople(people);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/", requestOptions)
      .then((response) => response.json())
      .then((data) => setFilms(data.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (firstCharacter && secondCharacter) {
      setCompareButtonDisabled(false);
    }
  }, [firstCharacter, secondCharacter]);

  return (
    <Container maxWidth="md">
      <Header />
      <Selections
        people={people}
        firstCharacter={firstCharacter}
        secondCharacter={secondCharacter}
        handleCharacterSelect={handleCharacterSelect}
        handleCompare={handleCompare}
        compareButtonDisabled={compareButtonDisabled}
      />
      {showResults && (
        <Results
          commonFilms={commonFilms}
          firstCharacter={firstCharacter.name}
          secondCharacter={secondCharacter.name}
        />
      )}
    </Container>
  );
};

export default Main;
