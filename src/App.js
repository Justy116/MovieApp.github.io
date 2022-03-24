import { useEffect, useState } from "react";
import Movie from "./components/Movie.js";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e5a10c321bbd6c822e0ff030e4b57604";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=e5a10c321bbd6c822e0ff030e4b57604&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then(data => {
        setMovies(data.results);
      })
  }, []);

  const handleOnSubmit = (e) =>{
      e.preventDefault();

      if(searchTerm){
        fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then(data => {
          setMovies(data.results);
          console.log(data);
        })
      }
  }

  const handleOnChange = (e) =>{
    setSearchTerm(e.target.value);
}

  return (
    <div>
      <header className="header">
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="search" placeholder="Search..." value={searchTerm} onChange={handleOnChange}/>
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) =>
          <Movie key={movie.id} {...movie} />
        )}
      </div>
    </div>

  );
}

export default App;
