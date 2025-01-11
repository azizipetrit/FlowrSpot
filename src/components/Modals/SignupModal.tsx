import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../utils/api";
import { useModal } from "../../contexts/ModalContext";
import SignupSuccessModal from "./SignupSuccessModal";
import CloseIcon from "../../assets/CloseIcon.svg";

const SignupModal = () => {
  const { hideModal, showModal } = useModal();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post("/account/register", values);
        if (response.status === 201) {
          showModal(<SignupSuccessModal />);
        }
      } catch (error) {
        console.error("Signup failed", error);
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
      <section className="relative bg-[#FFFFFF] [&_button]:rounded-[3.2px] grid place-items-start justify-center h-[470px] w-[440px] rounded-[3.2px] shadow-[0px 15px 30px 0px #0000000D]">
        <button onClick={handleCloseClick} className="absolute top-4 right-4">
          <img src={CloseIcon} alt="Close" />
        </button>
        <div className="max-w-[400px] m-[5px] text-[#334144]">
          <h2 className="m-[30px] text-center text-[20px] leading-none block h-[20px] font-[500] text-[#334144]">
            Create Account
          </h2>
          <form className="flex flex-wrap" onSubmit={formik.handleSubmit}>
            <div className="w-[50%] pr-[5px]">
              <div>
                <label
                  htmlFor="firstName"
                  className="relative z-10 block mb-[-10px] text-[#949EA0] text-[10px] leading-none h-[10px] pt-[10px] pl-[15px]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="pt-[12px] pl-[15px] block w-full h-[50px] rounded-[3.2px] bg-[#DFE5EA] text-[13px] color-[#334144]"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <div className="min-h-[16px] !min-w-[200px]">
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.firstName}
                    </div>
                  ) : (
                    <div className="invisible !h-4">Placeholder</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[50%] pl-[5px]">
              <div>
                <label
                  htmlFor="lastName"
                  className="relative z-10 block mb-[-10px] text-[#949EA0] text-[10px] leading-none h-[10px] pt-[10px] pl-[15px]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="pt-[12px] pl-[15px] block w-full h-[50px] rounded-[3.2px] bg-[#DFE5EA] text-[13px] color-[#334144]"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                <div className="min-h-[16px] !min-w-[200px]">
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.lastName}
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
                  htmlFor="dateOfBirth"
                  className="relative z-10 block mb-[-10px] text-[#949EA0] text-[10px] leading-none h-[10px] pt-[10px] pl-[15px]"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="pt-[12px] pl-[15px] block w-full h-[50px] rounded-[3.2px] bg-[#DFE5EA] text-[13px] color-[#334144]"
                  name="dateOfBirth"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBirth}
                />
                <div className="min-h-[16px] !min-w-[200px]">
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.dateOfBirth}
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
                  htmlFor="email"
                  className="relative z-10 block mb-[-10px] text-[#949EA0] text-[10px] leading-none h-[10px] pt-[10px] pl-[15px]"
                >
                  Email Address
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
                Create Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupModal;
