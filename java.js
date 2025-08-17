    function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}
    
    const apiKey = "e16f3220"; // Replace with your OMDb API key
    let movies = [];

    async function searchMovies() {
      const query = document.getElementById("searchInput").value;
      if (!query) return alert("Please enter a movie title!");

      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
          movies = data.Search;
          displayResults(movies);
        } else {
          document.getElementById("results").innerHTML = `<p>No results found.</p>`;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    function displayResults(list) {
      const container = document.getElementById("results");
      container.innerHTML = "";
      list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="Poster">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
          <p>IMDb ID: ${movie.imdbID}</p>
        `;
        container.appendChild(card);
      });
    }

    function sortResults() {
      const filter = document.getElementById("sortFilter").value;
      if (!filter) return;

      movies.sort((a, b) => {
        if (filter === "Year") {
          return parseInt(a.Year) - parseInt(b.Year);
        }
        return a[filter].localeCompare(b[filter]);
      });
      displayResults(movies);
    }
