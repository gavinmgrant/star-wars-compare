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

  const handleCharacterSelect = (event, number) => {
    setShowResults(false);

    if (commonFilms.length > 0) setCommonFilms([]);

    if (number === 1) {
      setFirstCharacter(event.target.value);
    } else {
      setSecondCharacter(event.target.value);
    }
  };

  const compareArrays = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        return true;
      }
    }
    return false;
  };

  const addFilmTitle = () => {
    // iterate over films to determine the shared film titles
    films.map((film) => {
      if (
        film.characters.includes(firstCharacter.url) &&
        film.characters.includes(secondCharacter.url) &&
        // prevent adding a duplicate title to the array of common films
        !commonFilms.includes(film.title)
      )
        setCommonFilms((commonFilms) => [...commonFilms, film.title]);
    });
  };

  const handleCompare = () => {
    // check if the characters shared a home planet
    if (compareArrays(firstCharacter.homeworld, secondCharacter.homeworld)) {
      addFilmTitle();
    }

    // check if the characters shared a starship
    if (compareArrays(firstCharacter.starships, secondCharacter.starships)) {
      addFilmTitle();
    }

    // check if the characters shared a vehicle
    if (compareArrays(firstCharacter.vehicles, secondCharacter.vehicles)) {
      addFilmTitle();
    }

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

  return (
    <Container maxWidth="md">
      <Header />
      <Selections
        people={people}
        firstCharacter={firstCharacter}
        secondCharacter={secondCharacter}
        handleCharacterSelect={handleCharacterSelect}
        handleCompare={handleCompare}
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
