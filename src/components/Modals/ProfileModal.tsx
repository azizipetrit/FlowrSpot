import { useEffect } from "react";
import ProfileHolder from "@/assets/profile-holder.svg";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "@/contexts/ModalContext";
import { AppDispatch, RootState } from "@/store";
import { fetchUserInfo, logout } from "@/store/userSlice";

const ProfileModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const { hideModal } = useModal();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    hideModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <section className="bg-[#FFFFFF] grid place-items-start h-auto w-[440px] p-6 rounded-[3.2px] shadow-[0px 15px 30px 0px #0000000D]">
        <div className="max-w-[400px] w-full text-[#334144]">
          <div className="flex items-center">
            <img
              src={user.pictureUrl || ProfileHolder}
              alt="Profile"
              className="w-[80px] h-[80px] rounded-full shadow-[0px 4px 8px rgba(0,0,0,0.1)] mb-4"
            />
            <div className="flex flex-col items-start ml-4">
              <h2 className="text-[20px] font-medium leading-none mb-2">
                {`${user.firstName} ${user.lastName}`}
              </h2>
              <p className="text-[#949EA0] text-[14px]">{`${user.sightingsNum} sightings`}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-[#949EA0] text-[12px] mb-1">
                First Name
              </label>
              <p className="rounded-[3.2px] p-[12px] text-[13px]">
                {user.firstName || "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-[#949EA0] text-[12px] mb-1">
                Last Name
              </label>
              <p className="rounded-[3.2px] p-[12px] text-[13px]">
                {user.lastName || "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-[#949EA0] text-[12px] mb-1">
                Date of Birth
              </label>
              <p className="rounded-[3.2px] p-[12px] text-[13px]">
                {user.dateOfBirth || "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-[#949EA0] text-[12px] mb-1">
                Email Address
              </label>
              <p className="rounded-[3.2px] p-[12px] text-[13px]">
                {user.email || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="w-[147.5px] h-[50px] mt-[10px] bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] font-[500] text-[#FFFFFF] rounded-[3.2px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileModal;
