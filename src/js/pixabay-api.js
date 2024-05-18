
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43803068-e4e7e851cef47a5cf0e066a7d';
export const PER_PAGE = 15;

import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

export const fetchPhoto = async (queryString = "flower", newPage = 1) => {
    const searchParams = await axios.get('', {
        params: {
            key: API_KEY,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: PER_PAGE,
            q: queryString,
            page: newPage,
        }
    })
    return searchParams.data;
};

