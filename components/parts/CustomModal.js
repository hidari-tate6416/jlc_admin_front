import Modal from "react-modal";
import SmallButton from '../../components/parts/SmallButton.js';

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)"
  },
  content: {
    position: "absolute",
    top: "5rem",
    left: "3rem",
    right: "3rem",
    bottom: "5rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem"
  }
};

function CustomModal({children, modalShow, closeModalFunc}) {

  return (
    <Modal
      isOpen={ modalShow }
      onRequestClose={ closeModalFunc }
      style={ modalStyle }
    >
      <div class="float-right text-4xl">
        <button onClick={ closeModalFunc }>×</button>
      </div>
      <div class="">
        { children }
      </div>
    </Modal>
  )
}

export default CustomModal;