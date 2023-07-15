/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../lib/firebase.init";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Spinner } from "@material-tailwind/react";
import useToken from "../hooks/useToken";

const Login = () => {
  const [isVisible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!isVisible);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  type LoginFormValues = {
    email: string;
    password: string;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    void signInWithEmailAndPassword(data.email, data.password);
  };

  const [token] = useToken(user || googleUser);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  useEffect(() => {
    const errorMsg = error || googleError;
    if (errorMsg) {
      switch (errorMsg?.code) {
        case "auth/invalid-email":
          toast("Invalid email provided, please provide a valid email");
          break;

        case "auth/invalid-password":
          toast("Wrong password. Intruder!!");
          break;

        case "auth/wrong-password":
          toast("Wrong Password");
          break;

        case "auth/user-not-found":
          toast("User Not Found");
          break;

        default:
          toast("something went wrong");
      }
    }
  }, [error, googleError]);

  let signInError;
  if (error || googleError) {
    signInError = (
      <span className="text-red-500">
        {error?.message || googleError?.message}
      </span>
    );
  }
  if (loading || googleLoading) {
    return <Spinner className="h-16 w-16 text-blue-500/10" />;
  }

  return (
    <div className="flex lg:h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center ">
          <h2 className="card-title text-2xl">Login</h2>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative ">
              <input
                id="email"
                type="email"
                className="peer h-10 w-full  text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />

              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <hr />
            <label className="label text-center">
              {errors.email?.type === "required" && (
                <span className="label-text-alt text-red-600 ">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="label-text-alt text-red-600">
                  {errors.email.message}
                </span>
              )}
            </label>

            <div className="relative flex justify-end items-center">
              <input
                id="password"
                type={!isVisible ? "password" : "text"}
                className="peer h-10 w-full  text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="name"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be contains 6 characters",
                  },
                })}
              />
              <i className="pr-[1rem] cursor-pointer" onClick={toggle}>
                {isVisible ? <BsEyeFill /> : <BsEyeSlashFill />}
              </i>

              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <hr />
            <label className="label text-center">
              {errors.password?.type === "required" && (
                <span className="label-text-alt text-red-600 ">
                  {errors.password.message}
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="label-text-alt text-red-600">
                  {errors.password.message}
                </span>
              )}
            </label>

            {signInError}
            <input
              type="submit"
              className="btn btn-accent w-full mt-4 text-white"
              value="Login"
            />
          </form>
          <p className="text-sm pt-2">
            New to Book Verse?{" "}
            <Link className="text-sky-500" to="/signup">
              Create new account
            </Link>
          </p>

          <div className="divider">OR</div>
          <button
            className="btn btn-outline w-full"
            onClick={() => signInWithGoogle()}
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
