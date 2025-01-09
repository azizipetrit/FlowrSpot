import { useModal } from "../../contexts/ModalContext";
import ProfileModal from "./ProfileModal";

const LoginSuccessModal = () => {
  const { hideModal, showModal } = useModal();

  const handleOkClick = () => {
    hideModal();
  };

  const handleProfileClick = () => {
    hideModal();
    showModal(<ProfileModal />);
  };

  return (
    <div className="modal">
      <h2>Congratulations!</h2>
      <p>You have successfully logged into FlowrSpot!</p>
      <div className="flex items-center space-x-4">
        <button
          className="bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] font-[500] text-[#FFFFFF]"
          onClick={handleOkClick}
        >
          OK
        </button>
        <button
          className="bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] font-[500] text-[#FFFFFF]"
          onClick={handleProfileClick}
        >
          PROFILE
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessModal;
