import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import poster from "/assets/img/poster.png";
import { LockIcon, PasswordLoginIcon } from "../../svg";
// import { loginUserAction } from "../../../redux/slices/users/usersSlices";

//Form schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      // dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  //redirect
  const store = useSelector((state) => state?.users);
  const { userAuth, loading, serverErr, appErr } = store;
  // if (userAuth) {
  //   navigate("/profile");
  // }
  return (
    <>
      <section className="min-h-screen relative py-20 2xl:py-40 bg-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 lg:bottom-0 h-full lg:h-auto w-full lg:w-4/12 bg-violet-500 lg:overflow-hidden">
          <img
            className="hidden lg:block h-full w-full object-cover"
            src={poster}
            alt=""
          />
        </div>
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-2/5 px-4">
                <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white shadow-lg rounded-lg">
                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className="mb-10 text-2xl font-bold font-heading">
                      {/* Header */}
                      Login to your Account
                    </h3>
                    {/* display err */}
                    {serverErr || appErr ? (
                      <h2 className="text-red-500">
                        {serverErr} - {appErr}
                      </h2>
                    ) : null}
                    <div className="flex items-center pl-6 mb-3 border border-gray-50 bg-white rounded-full">
                      <span className="inline-block pr-3 border-r border-gray-50">
                        <LockIcon />
                      </span>
                      {/* Email */}
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                        type="email"
                        placeholder="enter email"
                      />
                    </div>
                    {/* Err message */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div className="flex items-center pl-6 mb-6 border border-gray-50 bg-white rounded-full">
                      <span className="inline-block pr-3 border-r border-gray-50">
                        <PasswordLoginIcon />
                      </span>
                      {/* Password */}
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                        type="password"
                        placeholder=" Password"
                      />
                    </div>
                    {/* Err msg */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    {/* Login btn */}
                    {loading ? (
                      <button
                        disabled
                        className="py-4 w-full bg-gray-500 text-white font-bold rounded-full transition duration-200"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
                      >
                        Login
                      </button>
                    )}
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0 order-first lg:order-last">
                <span className="flex mb-10 mx-auto items-center justify-center h-20 w-20 bg-blue-500 rounded-lg"></span>
                <h2 className="mb-10 text-center text-6xl lg:text-7xl text-gray-300 font-bold font-heading">
                  Ready to start? Login Now.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
