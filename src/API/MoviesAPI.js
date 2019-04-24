import MoviesAxios from '../config/axios';

import * as CONFIG from '../config/config';

// Discover movies api
export const discover = (filters) => {
    return MoviesAxios.get(CONFIG.API_BASE_URL+"/discover/movie"+filters).then(response => {
        return response.data;
    })
    .catch((error) => {
        throw new Error("Error fetching movies!");
    });
}

// Fetch all popular movies
export const getPopularMovies = () => {
    return MoviesAxios.get(CONFIG.API_BASE_URL+"/trending/all/week").then(response => {
        return response.data;
    })
    .catch((error) => {
        throw new Error("Error fetching movies!");
    });
}

export const searchMovies = (string) => {
    return MoviesAxios.get(CONFIG.API_BASE_URL+"/search/movie?query="+string).then(response => {
        return response.data;
    })
    .catch((error) => {
        throw new Error("Error fetching movies!");
    });
}

export const movieDetails = (movieId) => {
    return MoviesAxios.get(CONFIG.API_BASE_URL+"/movie/"+movieId+"?append_to_response=credits,images,videos,reviews,similar&include_image_language=en").then(response => {
        return response.data;
    })
    .catch((error) => {
        throw new Error("Error fetching movie details");
    });
}

export const withGenre = (id) => {
    return MoviesAxios.get(CONFIG.API_BASE_URL+"/discover/movie?with_genres="+id).then(response => {
        return response.data;
    })
    .catch((error) => {
        throw new Error("Error fetching movies list");
    });
}