import React, { FormEvent, useState, useTransition } from "react";
import { AlertCircle, Eye, EyeOff, MoveLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { LoginSchema } from "../schema";
import delay from "./components/delay";
import { useUserContext } from "../UserContext";
import { Navigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [params] = useSearchParams();
  const callback = params.get("callback");
  if (callback == "/") return <Navigate to="/dashboard" />;
  const { login, user, ready } = useUserContext();
  const [pending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    account: "",
  });
  const [formData, setFormData] = useState({
    email: "adityasubham03@gmail.com",
    password: "12345678",
  });
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit");
    startTransition(async () => {
      try {
        LoginSchema.validateSync(formData, { abortEarly: false });
        console.log("validation success!!!");
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "/api/auth/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: formData,
        };
        const response = await axios.request(config);
        console.log(response.data);
        setFormData({ email: "", password: "" });
        toast.success("Login Successful", {
          style: {
            border: "1px solid",
            padding: "16px",
            color: "#1ccb5b",
          },
          iconTheme: {
            primary: "#1ccb5b",
            secondary: "#FFFAEE",
          },
        });
        login(response.data.backendTokens);
        await delay(3000);
      } catch (error) {
        // Validation failed
        const fieldErrors = {};
        if (error.inner) {
          error.inner.forEach((err) => {
            fieldErrors[err.path] = err.message;
          });
          setFormError(fieldErrors);
        }

        if (axios.isAxiosError(error)) {
          if (error?.response?.status == 404)
            setFormError({
              ...formError,
              account: "Unable to find an account connected to this Email-Id!! Please Signup!!",
            });
          else if (error?.response?.status == 406)
            setFormError({
              ...formError,
              account: "Unable to generate Session tokens!! Try reloading the page!!",
            });
          else if (error?.response?.status == 401)
            setFormError({
              ...formError,
              account: "Your password is incorrect!! Please try again or reset your password!!",
            });
          else if (error?.response?.status == 500)
            setFormError({
              ...formError,
              account: `Internal server error!${error.response.data.message}. Please try again later!`,
            });
          else if (error?.message === "Network Error") {
            console.log("Unable to contact servers! Please try again later");
            toast.error("Unable to contact servers! Please try again later", {
              style: {
                border: "1px solid",
                padding: "16px",
                color: "#fa776c",
              },
              iconTheme: {
                primary: "#fa776c",
                secondary: "#FFFAEE",
              },
            });
          }
        }
      }
    });
  };

  if (user && ready) {
    if (callback) {
      return <Navigate to={callback} />;
    }
    return <Navigate to="/dashboard" />;
  }
  if (!user && ready) {
    return (
      <>
        <div className="">
          <Toaster position="bottom-right" reverseOrder={true} />
        </div>
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 sm:px-4 lg:px-8">
          <div className="mb-1 hidden sm:mx-auto sm:w-full sm:max-w-sm md:block">
            <a href="/">
              <p className="flex gap-2">
                <MoveLeft />
                Back to Home
              </p>
            </a>
          </div>

          <div className="mx-auto md:rounded-md md:border md:border-gray-300 md:p-6 md:shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <a href="/">
                <img
                  className="mx-auto h-10 w-auto"
                  src="/assets/images/logo.svg"
                  alt="Evently"
                  width={128}
                  height={40}
                />
              </a>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
              {formError?.account && (
                <div className="mb-3">
                  <div
                    className="rounded-b border-t-4 border-red-500 bg-red-100 px-4 py-3 text-red-900 shadow-md"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="mr-4 h-6 w-6 fill-current text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Account Error</p>
                        <p className="text-sm">{formError?.account}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!formError.account && (
                <div className="mb-3">
                  <div
                    className="rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-2 text-teal-900 shadow-md"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="mr-4 h-6 w-6 fill-current text-teal-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">Our systems are still in beta!</p>
                        <p className="text-sm">
                          Please contact{" "}
                          <a href="mailto:support@adityachoudhury.com">
                            support@adityachoudhury.com
                          </a>{" "}
                          if you face any issues!!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your E-Mail"
                      value={formData.email}
                      disabled={pending}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setFormError({ ...formError, email: "" });
                      }}
                      className="block w-full rounded-md border-0 px-5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formError.email && <p className="mx-auto text-red-600">{formError.email}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="/forget"
                        className="font-semibold text-indigo-600 hover:text-red-400"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="relative mr-2 flex-grow">
                      <input
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        autoComplete="current-password"
                        disabled={pending}
                        placeholder="Enter your Password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                          setFormError({ ...formError, password: "" });
                        }}
                        className="w-full rounded-md border-0 px-5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      />
                      <div
                        onClick={toggleShow}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-black"
                      >
                        {show ? <Eye /> : <EyeOff />}
                      </div>
                    </div>
                  </div>
                  {formError.password && (
                    <p className="mx-auto text-red-600">{formError.password}</p>
                  )}
                </div>

                <div>
                  <button
                    disabled={pending}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-red-400 hover:text-indigo-600"
                >
                  Signup Here
                </a>
              </p>
            </div>
            <div className="m-3 flex  justify-center sm:mx-auto sm:w-full sm:max-w-sm md:hidden">
              <a href="/">
                <p className="flex gap-2">
                  <MoveLeft />
                  Back to Home
                </p>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
