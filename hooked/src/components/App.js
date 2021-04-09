import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours


const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
          //jsonResponse.Search　配列1 10要素
          //0:{
          //      Title:Iron Man
          //      Year:2008
          //      imdbID:tt0371746
          //      Type:movie
          //      Poster:https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg
          //    }
          setMovies(jsonResponse.Search);
          setLoading(false);
        });
  }, []);

const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          //console.log(jsonResponse.Search)
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
//console.log(movies)
    
    return (
     <div className="App">
        <Header text="HOOKED" />
        <Search search={search} />
        <p className="App-intro">Sharing a few of our favourite movies</p>

        <div className="movies">
          {loading && !errorMessage ? (
            <span>loading...</span>
            ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>

      </div>
  );
};


export default App;