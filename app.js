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
    // const StoredMovies = [
    //   {
    //     title: 'Movie One',
    //     releaseDate: '1982',
    //     sku: '3434434'
    //   },
    //   {
    //     title: 'Movie Two',
    //     releaseDate: '1992',
    //     sku: '45545'
    //   }
    // ];
    //
    // const movies = StoredMovies;
    const movies = Store.getMovies();

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

  static deleteMovie(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#movie-form');
    container.insertBefore(div, form);

    // Vanish in 2 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#release-date').value = '';
    document.querySelector('#sku').value = '';
  }
}

// Store Class: Handles storage (Local storage within the browser, doesn't go away until it is cleared)
class Store {
  static getMovies() {
    let movies;
    if(localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static removeMovie(sku) {
    const movies = Store.getMovies();

    movies.forEach((movie, index) => {
      if(movie.sku === sku) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

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

  // Validate
  if(title === '' || releaseDate === '' || sku === '') {
    UI.showAlert('Please fill in all the fields', 'danger');
  } else {

    // Instantiated Movie
    const movie = new Movie(title, releaseDate, sku);

    // Add Movie to UI
    UI.addMovieToList(movie);

    // Add Movie to store
    Store.addMovie(movie);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
  // Remove Movie from  UI
  UI.deleteMovie(e.target);

  // Remove Movie from Store
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});
