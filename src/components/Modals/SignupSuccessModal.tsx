import React from "react";
import { useModal } from "../../contexts/ModalContext";
import LoginModal from "./LoginModal";

const SignupSuccessModal = () => {
  const { hideModal, showModal } = useModal();

  const handleOkClick = () => {
    hideModal();
    showModal(<LoginModal />);
  };

  return (
    <div className="modal">
      <h2>Congratulations!</h2>
      <p>You have successfully signed up for FlowrSpot!</p>
      <button
        className="bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] font-[500] text-[#FFFFFF]"
        onClick={handleOkClick}
      >
        OK
      </button>
    </div>
  );
};

export default SignupSuccessModal;
