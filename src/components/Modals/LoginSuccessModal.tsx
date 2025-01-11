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
          className="px-6 py-2 rounded-full bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] text-white font-medium shadow-md"
          onClick={handleOkClick}
          style={{
            boxShadow: "rgba(234, 168, 159, 0.2) 0px 15px 20px",
          }}
        >
          Ok
        </button>
        <button
          className="px-6 py-2 rounded-full bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] text-white font-medium shadow-md"
          onClick={handleProfileClick}
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default LoginSuccessModal;
