import { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import s from './App.module.css'
import Searchbar from '../Searchbar/Searchbar'
import ImageGallery from '../ImageGallery/ImageGallery'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'
import ImageError from '../ImageError/ImageError'
import fetchImagesApi from '../../services/Api/images-api'

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    loading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state
    if (query !== prevState.query) {
      this.fetchImages().catch((err) => {
        console.log(err)
      })
    }
  }

  fetchImages = () => {
    const { query, page } = this.state
    this.setState({ loading: true })
    return fetchImagesApi(query, page)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      })
      .finally(() => this.setState({ loading: false }))
  }

  loadMore = () => {
    this.setState({ loading: true })
    this.fetchImages()
      .then(() => {
        this.scrollWindow()
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ loading: false }))
  }

  scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  handleFormSubmit = (query) => {
    this.setState({ query, page: 1, images: [] })
  }

  render() {
    const { handleFormSubmit, loadMore } = this
    const { images, query, loading } = this.state
    const loadMoreImages = images.length > 0 && images.length >= 12
    const imagesListEmpty = query !== ''

    return (
      <div className={s.App}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={handleFormSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          imagesListEmpty && <ImageError message={query} />
        )}
        {loadMoreImages && <Button onLoadMore={loadMore} />}
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}

export default App
