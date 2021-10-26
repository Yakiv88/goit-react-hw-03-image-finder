import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";
import PropTypes from "prop-types";
import ImageError from "../ImageError/ImageError";

class ImageGallery extends Component {
  state = {
    showModal: false,
    modalImg: "",
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImgClick = (e) => {
    const { img } = e.target.dataset;

    this.setState({ modalImg: img });
    this.toggleModal();
  };

  render() {
    let imageListContent;
    const { images } = this.props;
    const { onImgClick, toggleModal } = this;
    const { showModal, modalImg } = this.state;

    if (images) {
      imageListContent = (
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              largeImageURL={largeImageURL}
              key={id}
              previewImg={webformatURL}
              tags={tags}
              onToggleModal={toggleModal}
              showModal={showModal}
              onImgClick={onImgClick}
              modalImg={modalImg}
            />
          ))}
        </ul>
      );
    } else {
      <ImageError />;
    }

    return <div>{imageListContent}</div>;
  }
}

ImageGallery.propTypes = {
  onImgClick: PropTypes.func,
  onToggleModal: PropTypes.func,
  showModal: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};

export default ImageGallery;
