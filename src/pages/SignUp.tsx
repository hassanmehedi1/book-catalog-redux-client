/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase.init";
import useToken from "../hooks/useToken";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Spinner } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!isVisible);
  };
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  type RegisterFormValues = {
    email: string;
    password: string;
    name: string;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormValues>();

  const [token] = useToken(user || googleUser);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (token) {
      navigate("/media");
    }
  }, [token, navigate]);
  //   if (user || googleUser) {
  //     navigate("/home");
  //   }
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
      <div className="p-10 w-[30%] bg-base-100 shadow-xl">
        <div className="p-2 items-center ">
          <h2 className="text-center text-2xl text-blue-700 font-semibold pb-5">
            Sign Up
          </h2>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-[20px] ">
              <div className="relative ">
                <input
                  id="fname"
                  type="text"
                  className="peer h-10 w-full  text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                  placeholder="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />

                <label
                  htmlFor="fname"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Full Name
                </label>
              </div>

              <hr />
              <label className="label text-start">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.name.message as string}
                  </span>
                )}
              </label>
            </div>

            <div className="relative mt-5">
              <input
                id="email"
                type="email"
                className="peer h-10 w-full  text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="name"
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
                  {errors.email.message as string}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="label-text-alt text-red-600">
                  {errors.email.message as string}
                </span>
              )}
            </label>

            <div className="relative flex justify-end items-center mt-5">
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
                  {errors.password.message as string}
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="label-text-alt text-red-600">
                  {errors.password.message as string}
                </span>
              )}
            </label>

            {signInError}
            <input
              type="submit"
              className="p-2 my-8 bg-blue-600 w-full text-white rounded-2xl cursor-pointer"
              value="Sign Up"
            />
          </form>
          <p className="text-base pt-2 text-center my-3">
            Already have an Account?{" "}
            <Link className="text-cyan-600" to="/login">
              Please Login
            </Link>
          </p>

          <hr />

          <button
            className="border rounded-xl p-3 bg-blue-400 text-white w-full mt-3 flex justify-center items-center"
            onClick={() => signInWithGoogle()}
          >
            <FcGoogle /> <span className="ml-3">Continue With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
