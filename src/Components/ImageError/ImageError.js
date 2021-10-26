import errorImage from '../images/error.jpg'
import s from './ImageError.module.css'
import PropTypes from 'prop-types'

export default function ImageError({ message }) {
  return (
    <div role="alert" className={s.AlertWrapper}>
      <img className={s.Img} src={errorImage} width="340" alt="sadcat" />
      <p className={s.Message}>There are no {message} images!</p>
    </div>
  )
}

ImageError.propTypes = {
  message: PropTypes.string,
}
