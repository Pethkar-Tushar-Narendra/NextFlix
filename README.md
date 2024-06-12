ENV file will require following keys:
1. NEXTAUTH_URL
2. MONGODB_URI
3. TMDB_API_KEY
4. NEXTAUTH_SECRET

NextFlix - Movie Catalogue Application
Description:
NextFlix is a movie catalogue application built with Next.js, allowing users to browse, search, and discover movies and TV shows. It leverages The Movie Database (TMDb) API to fetch movie information, ratings, reviews, and more. Users can explore popular movies, view trending TV shows, and create watchlists.
Features:
Movie & TV Show Catalogue:
Fetch popular movies and trending TV shows from TMDb API.
Display movie details including title, poster, release date, genres, synopsis, and ratings.
Enable users to browse through different categories such as trending, top-rated, upcoming, etc.
Search Functionality:
Implement a search bar to allow users to search for movies and TV shows by title, genre, or keywords.
Display search results in real-time as users type their query.
User Authentication:
Provide user registration, login, and logout functionalities.
Secure user authentication using JWT (JSON Web Tokens).
Allow users to create personalized profiles and save their preferences.
Watchlists and Favorites:
Return watchlist and favourites
Enable users to create watchlists and mark movies or TV shows as favorites.
Implement functionality to add or remove items from watchlists and favorites.
Movie Details Page:
Show detailed information about each movie, including cast, crew, runtime, trailer, and reviews.
Display similar movies or recommended titles based on the current selection.
User Ratings and Reviews:
Allow authenticated users to rate and review movies.
Display average ratings and user reviews for each movie or TV show.
Implement sorting and filtering options for reviews.
Responsive Design:
Ensure the application is responsive and accessible across various devices and screen sizes.
Utilize responsive design techniques to optimize user experience on desktops, tablets, and smartphones.
The Movie Database (TMDb) API Details:
The project will utilize various endpoints from The Movie Database (TMDb) API to fetch movie and TV show information. Some of the essential endpoints include:
Discover Endpoint:
Endpoint: https://api.themoviedb.org/3/discover/movie
Use this endpoint to fetch lists of popular, trending, top-rated, and upcoming movies.
Parameters such as sort_by, vote_average.gte, with_genres, etc., can be used for filtering.
Search Endpoint:
Endpoint: https://api.themoviedb.org/3/search/movie
Use this endpoint to search for movies by title, keywords, or genre.
Parameters include query, page, etc.
Movie Details Endpoint:
Endpoint: https://api.themoviedb.org/3/movie/{movie_id}
Retrieve detailed information about a specific movie, including cast, crew, synopsis, release date, etc.
Movie Reviews Endpoint:
Endpoint: https://api.themoviedb.org/3/movie/{movie_id}/reviews
Fetch user reviews for a specific movie.
Configuration Endpoint:
Endpoint: https://api.themoviedb.org/3/configuration
Retrieve the base URL for fetching images such as posters, backdrops, etc.
Technologies:
Next.js: React framework for building server-side rendered and statically generated web applications.
Tailwind CSS: Utility-first CSS framework for quickly styling the application with responsive and customizable components.
MongoDB: NoSQL database to store user profiles, movie ratings, watchlists, etc.
JWT (JSON Web Tokens): Token-based authentication mechanism for secure user authentication and authorization.
The Movie Database (TMDb) API: External API for fetching movie and TV show information.
Axios: HTTP client library for making API requests from the Next.js application.
