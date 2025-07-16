import axios from 'axios';

const API_BASE_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';

export const fetchIdeas = async ({ page = 1, size = 10, sort = '-published_at' }) => {
  const res = await axios.get(API_BASE_URL, {
    params: {
      'page[number]': page,
      'page[size]': size,
      'append[]': ['small_image', 'medium_image'],
      sort: sort,
    },
    headers: {
      Accept: 'application/json', // ⬅️ ini penting!
    },
  });

  return res.data;
};
