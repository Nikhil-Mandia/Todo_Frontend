import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/actions/todoActions";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const error = useSelector((state) => state.auth.error);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (authStatus === "success" && token) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
  }, [authStatus, token, navigate]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    isLogin: true,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    username: Yup.lazy((value, { parent }) => {
      if (!parent.isLogin) {
        return Yup.string().required("Username is required for registration");
      }
      return Yup.string();
    }),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (values.isLogin) {
      dispatch(login(values.email, values.password));
    } else {
      dispatch(register(values.username, values.email, values.password));
      toast.success("Registration successful!");
      resetForm();
    }
  };

  const toggleForms = (values, resetForm) => {
    resetForm();
    values.isLogin = !values.isLogin;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg flex">
        <div className="w-full md:w-1/2 p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ values, touched, errors, resetForm }) => (
              <Form className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">
                  {values.isLogin ? "Welcome Back!" : "Create an Account!"}
                </h2>
                {!values.isLogin && (
                  <div>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      className={`w-full p-3 border ${
                        touched.username && errors.username
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full p-3 border ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`w-full p-3 border ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {values.isLogin ? "Sign In" : "Sign Up"}
                </button>
                {values.isLogin && (
                  <p className="text-right">
                    <a href="#" className="text-blue-500 hover:underline">
                      Forgot password?
                    </a>
                  </p>
                )}
                <p className="text-center mt-4">
                  {values.isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <a
                    href="#"
                    onClick={() => toggleForms(values, resetForm)}
                    className="text-blue-500 hover:underline ml-1"
                  >
                    {values.isLogin ? "Sign Up" : "Sign In"}
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center">
          <div className="p-6">
            <p className="text-blue-700 text-lg font-semibold mt-4">
              Manage your tasks in an easy and efficient way with Tasky.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
