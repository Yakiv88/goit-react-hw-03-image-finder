import axios from 'axios'

const key = '23205731-7fb91d1243025876effb63184'
axios.defaults.baseURL = 'https://pixabay.com/api/'
const params = 'image_type=photo&orientation=horizontal&per_page=12'

async function fetchImagesApi(query, page) {
  const {
    data: { hits },
  } = await axios.get(`?&q=${query}&page=${page}&key=${key}&${params}`)
  return hits
}

export default fetchImagesApi
