import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    // console.log("Component did mount");
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log("Component will unmount");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onToggleModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    const { modalImg, tags } = this.props;
    const { handleBackdropClick } = this;
    return createPortal(
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
          <img src={modalImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onToggleModal: PropTypes.func,
  modalImg: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;
