import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37602273-ee76d535e0302dd8a6c170e2a';
export const getApi = async ({ query, page }) => {
  const {
    data: { hits, total },
  } = await axios(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return { hits, total };
};
