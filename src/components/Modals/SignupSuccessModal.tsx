import LoginModal from "./LoginModal";
import { useModal } from "../../contexts/ModalContext";
import CloseIcon from "../../assets/CloseIcon.svg";

const SignupSuccessModal = () => {
  const { hideModal, showModal } = useModal();

  const handleOkClick = () => {
    hideModal();
    showModal(<LoginModal />);
  };

  const handleCloseClick = () => {
    hideModal();
  };

  return (
    <div className="modal relative">
      <button onClick={handleCloseClick} className="absolute top-4 right-4">
        <img src={CloseIcon} alt="Close" />
      </button>
      <h2>Congratulations!</h2>
      <p>You have successfully signed up for FlowrSpot!</p>
      <button
        className="px-6 py-2 rounded-full bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] text-white font-medium shadow-md"
        onClick={handleOkClick}
      >
        OK
      </button>
    </div>
  );
};

export default SignupSuccessModal;
