import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../features/authentication/authThunk";
import { clearError } from "../../features/authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { companyLogo } from "../../assets/assets";
import { HashLoader } from "react-spinners";

const SigninForm = ({ setShowSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signInUser(form)).unwrap(); // waits for thunk success
      navigate("/Homepage"); // navigate after success
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Optional: if token/user is restored from localStorage on first load, you can still auto-redirect:
  useEffect(() => {
    if (token && user) navigate("/Homepage");
  }, [token, user, navigate]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => dispatch(clearError()), 5000);
    return () => clearTimeout(t);
  }, [error, dispatch]);

  // Fullscreen spinner while auth request is in-flight
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#5271ff" size={80} />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mx-10 mb-4 rounded-lg border border-red-300 bg-red-50 text-red-800 p-3 flex items-start justify-between text-center">
          <div className="flex-1">
            <p className="font-semibold">ورود ناموفق</p>
            <p className="text-sm">!اطلاعات وارد شده درست نیست</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearError())}
            aria-label="Close"
            className="ml-3 text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <form
        dir="rtl"
        onSubmit={handleSubmit}
        className="grid grid-rows-6 grid-flow-col items-center justify-items-start mx-10"
      >
        <div className="row-span-4 row-start-2 text-4xl text-right">
          <img src={companyLogo} alt="companyLogo" />
          مرکز آزمون تایر
          <div className="pt-10 pr-20">
            <label className="text-sm font-sans font-medium">نام کاربری</label>
            <input
              type="text"
              name="email"
              placeholder="احتمالا باید ایمیل شما باشد"
              onChange={handleChange}
              required
              className="w-full bg-black py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            />
          </div>
          <div className="pt-2 pr-20">
            <label className="text-sm font-sans font-medium">رمز عبور</label>
            <input
              type="password"
              name="password"
              placeholder="رمز خود را بنویسید"
              onChange={handleChange}
              required
              className="w-full bg-black py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            />
            <a
              href="#"
              className="text-sm font-sans font-medium text-gray-600 underline block mt-2"
            >
              !رمزم را فراموش کردم
            </a>
          </div>
          <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
            <button
              type="submit"
              disabled={isLoading}
              className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <HashLoader color="#fff" size={24} /> : "وارد شو"}
            </button>
          </div>
        </div>

        <div className="text-sm font-sans font-medium text-gray-400 underline text-right pr-20">
          <button type="button" onClick={() => setShowSignup(true)}>
            قبلا ثبت نام نکردید؟{" "}
            <span className="text-blue-500 text-xl">پس کلیک کنید</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
