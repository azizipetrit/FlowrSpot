import { useModal } from "@/contexts/ModalContext";
import CloseIcon from "@/assets/CloseIcon.svg";

const LoginSuccessModal = () => {
  const { hideModal } = useModal();

  const handleCloseClick = () => {
    hideModal();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <section className="relative bg-[#FFFFFF] grid place-items-start justify-center h-[210px] w-[420px] p-6 rounded-[3.2px] shadow-[0px 15px 30px 0px #0000000D]">
        <button onClick={handleCloseClick} className="absolute top-4 right-4">
          <img src={CloseIcon} alt="Close" />
        </button>
        <div className="max-w-[380px] m-[5px] text-[#334144] text-center">
          <h2 className="m-[30px] text-[20px] leading-none block h-[20px] font-[500] text-[#334144]">
            Welcome Back!
          </h2>
          <p className="mb-6">You have successfully logged in to FlowrSpot!</p>
          <button
            className="px-6 py-2 rounded-full bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] text-white font-medium shadow-md"
            onClick={handleCloseClick}
          >
            OK
          </button>
        </div>
      </section>
    </div>
  );
};

export default LoginSuccessModal;
