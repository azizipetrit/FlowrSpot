import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useModal } from "@/contexts/ModalContext";
import LoginSuccessModal from "@/components/Modals/LoginSuccessModal";
import { AppDispatch } from "@/store";
import { fetchUserInfo, login } from "@/store/userSlice";
import api from "@/utils/api";
import CloseIcon from "@/assets/CloseIcon.svg";

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { hideModal, showModal } = useModal();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post("/account/login", values);
        if (response.status === 201) {
          dispatch(
            login({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          await dispatch(fetchUserInfo());
          hideModal();
          showModal(<LoginSuccessModal />);
        }
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  const handleCloseClick = () => {
    hideModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <section className="relative bg-[#FFFFFF] [&_button]:rounded-[3.2px] grid place-items-start justify-center h-[320px] w-[420px] rounded-[3.2px] shadow-[0px 15px 30px 0px #0000000D]">
        <button onClick={handleCloseClick} className="absolute top-4 right-4">
          <img src={CloseIcon} alt="Close" />
        </button>
        <div className="max-w-[380px] m-[5px] text-[#334144]">
          <h2 className="m-[30px] text-center text-[20px] leading-none block h-[20px] font-[500] text-[#334144]">
            Welcome Back
          </h2>
          <form className="flex flex-wrap" onSubmit={formik.handleSubmit}>
            <div className="w-[100%]">
              <div>
                <label
                  htmlFor="email"
                  className="relative z-10 block mb-[-10px] text-[#949EA0] text-[10px] leading-none h-[10px] pt-[10px] pl-[15px]"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="pt-[12px] pl-[15px] block w-full h-[50px] rounded-[3.2px] bg-[#DFE5EA] text-[13px] color-[#334144]"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <div className="min-h-[16px] !min-w-[200px]">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.email}
                    </div>
                  ) : (
                    <div className="invisible !h-4">Placeholder</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[100%] mt-[10px]">
              <div>
                <label
                  htmlFor="password"
                  className="relative z-10 block mb-[-10px] text-[#949EA0] text-[10px] leading-none h-[10px] pt-[10px] pl-[15px]"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="pt-[12px] pl-[15px] block w-full h-[50px] rounded-[3.2px] bg-[#DFE5EA] text-[13px] color-[#334144]"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <div className="min-h-[16px] min-w-[200px]">
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.password}
                    </div>
                  ) : (
                    <div className="invisible !h-4">Placeholder</div>
                  )}
                </div>
              </div>
              <button
                className="w-full h-[50px] mt-[10px] mb-[30px] bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] font-[500] text-[#FFFFFF]"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Login to your Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginModal;
