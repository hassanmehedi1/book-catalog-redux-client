/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLoginMutation } from "../redux/features/user/userApiSlice";
import { toast } from "react-toastify";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-500/10" />
      </div>
    );
  }

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setPasswordErr("");
      setEmailErr("");
      const response = await loginMutation(data);
      //@ts-ignore
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken); // Store the access token in a cookie
      }

      await login({ email: data.email, password: data.password }).unwrap();
      navigate("/");

      toast.success("Login successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Closing the toast after 3 seconds
        hideProgressBar: true,
      });
    } catch (error) {
      //@ts-ignore
      if (error?.data?.message === "Password is incorrect") {
        setPasswordErr("Password is incorrect");
        //@ts-ignore
      } else if (error?.data?.message === "User does not exist") {
        setEmailErr("User does not exist");
      }
    }
  };

  return (
    <section className="w-full h-full md:h-[80vh] flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography className="flex justify-center text-blue-600 text-3xl font-semibold">
          Login
        </Typography>
        <Typography className="flex justify-center text-gray-600 text-base mt-5">
          Enter your credentials to login
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {emailErr && !errors.email && (
              <span className="text-red-500">{emailErr}</span>
            )}
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <Input
              type="password"
              size="lg"
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {passwordErr && !errors.password && (
              <span className="text-red-500">{passwordErr}</span>
            )}
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <Button
            className="mt-6"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}
