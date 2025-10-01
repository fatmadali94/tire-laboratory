import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../features/authentication/authThunk";
import { clearError } from "../../features/authentication/authSlice";
import { companyLogo } from "../../assets/assets";
import { HashLoader } from "react-spinners";

const SignupForm = ({ setShowSignup }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    position: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const [key, val] of Object.entries(form)) {
      if (key === "image") {
        if (val) formData.append("image", val); // only append if chosen
      } else {
        formData.append(key, val);
      }
    }

    try {
      await dispatch(signUpUser(formData)).unwrap();
      alert("ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.");
      setShowSignup(false);
    } catch (err) {
      // err is whatever you passed to rejectWithValue
      // Slice should already set `error`, so no need to manage local loading
      // Optional: toast or keep alert
      alert("Signup failed: " + (err?.message || "Unknown error"));
    }
  };

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => dispatch(clearError()), 5000);
    return () => clearTimeout(t);
  }, [error, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader size={80} />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mx-10 mb-4 rounded-lg border border-red-300 bg-red-50 text-red-800 p-3 flex items-start justify-between">
          <div className="flex-1">
            <p className="font-semibold">ثبت نام ناموفق</p>
            <p className="text-sm">{error}</p>
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
        className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start mx-10"
      >
        <div className="row-span-4 row-start-2 text-4xl">
          <img src={companyLogo} alt="companyLogo" />
          ثبت نام در مرکز آزمون تایر
          <div className="pt-4 pr-20">
            <label className="text-sm font-sans font-medium">
              نام و نام خانوادگی
            </label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              required
              className="w-full bg-black py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            />
          </div>
          <div className="pt-2 pr-20">
            <label className="text-sm font-sans font-medium">ایمیل</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              className="w-full bg-black py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            />
          </div>
          <div className="pt-2 pr-20">
            <label className="text-sm font-sans font-medium">رمز عبور</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="w-full bg-black py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            />
          </div>
          <div className="pt-2 pr-20">
            <label className="text-sm font-sans font-medium">موبایل</label>
            <input
              name="mobile"
              type="tel"
              onChange={handleChange}
              className="w-full bg-black py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            />
          </div>
          <div className="pt-2 pr-20">
            <label className="text-sm font-sans font-medium">
              سمت (Position)
            </label>
            <select
              name="position"
              onChange={handleChange}
              required
              className="w-full bg-black text-white py-3 px-12 border hover:border-gray-500 rounded shadow text-base font-sans"
            >
              <option value="">انتخاب کنید...</option>
              <option value="Depository">انباردار</option>
              <option value="Receptor">پذیرش</option>
              <option value="Laborator">آزمونگر</option>
            </select>
          </div>
          <div className="pt-2 pr-20">
            <label className="text-sm font-sans font-medium">عکس شما</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="text-white text-sm"
            />
          </div>
          <div className="text-sm font-sans font-medium w-full pr-20 pt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="text-center w-full py-4 bg-green-700 hover:bg-green-400 rounded-md text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <HashLoader color="#fff" size={25} />
              ) : (
                "من را ثبت نام کن"
              )}
            </button>
          </div>
        </div>

        <div className="text-sm font-sans font-medium text-gray-400 underline">
          <button type="button" onClick={() => setShowSignup(false)}>
            قبلا ثبت نام کرده‌اید؟{" "}
            <span className="text-blue-500 text-xl">پس کلیک کنید</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
