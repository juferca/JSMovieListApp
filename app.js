// Movie Class: Represents a Movie (Creates a movie object)
class Movie {
  constructor(title, releaseDate, sku) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.sku = sku;
  }
}

// UI Class: Handle UI Tasks (Movie displays on a list, removes, shows an alert)
class UI {
  static displayMovies() {
    const StoredMovies = [
      {
        title: 'Movie One',
        releaseDate: '1982',
        sku: '3434434'
      },
      {
        title: 'Movie Two',
        releaseDate: '1992',
        sku: '45545'
      }
    ];

    const movies = StoredMovies;

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector('#movie-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.releaseDate}</td>
      <td>${movie.sku}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#release-date').value = '';
    document.querySelector('#sku').value = '';
  }
}

// Store Class: Handles storage (Local storage within the browser, doesn't go away until it is cleared)

// Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a Movie
document.querySelector('#movie-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const releaseDate = document.querySelector('#release-date').value;
  const sku = document.querySelector('#sku').value;

  // Instantiated Movie
  const movie = new Movie(title, releaseDate, sku);

  // Add Movie to UI
  UI.addMovieToList(movie);

  // Clear fields
  UI.clearFields();

});

// Event: Remove a Movie

// Stopped at 25:00
