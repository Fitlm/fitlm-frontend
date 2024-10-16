import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    const {
      email,
      password,
      name,
      userNickname,
      height,
      weight,
      muscleMass,
      bodyFatPercentage,
    } = data;
    const body = {
      email,
      password,
      name,
      userNickname,
      profile: {
        height,
        weight,
        muscleMass,
        bodyFatPercentage,
      },
    };

    dispatch(registerUser(body));
    reset();
    setStep(1);
    navigate("/login");
  };

  const validationRules = {
    email: {
      required: "필수 필드입니다.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "유효한 이메일 주소를 입력하세요.",
      },
    },
    name: {
      required: "필수 필드입니다.",
      minLength: { value: 2, message: "최소 2자입니다." },
      maxLength: { value: 8, message: "최대 8자입니다." },
    },
    password: {
      required: "필수 필드입니다.",
      minLength: { value: 6, message: "최소 6자입니다." },
    },
    userNickname: {
      required: "필수 필드입니다.",
      minLength: { value: 3, message: "최소 3자입니다." },
      maxLength: { value: 10, message: "최대 10자입니다." },
    },
    height: {
      required: "필수 필드입니다.",
      pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "cm 기준입니다." },
    },
    weight: {
      required: "필수 필드입니다.",
      pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "kg 기준입니다." },
    },
    muscleMass: {
      required: "필수 필드입니다.",
      pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "kg 기준입니다." },
    },
    bodyFatPercentage: {
      required: "필수 필드입니다.",
      pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "% 기준입니다." },
    },
  };

  const handleNextStep = async () => {
    const isValid = await trigger([
      "email",
      "name",
      "password",
      "userNickname",
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6  bg-custom-bg rounded-md shadow-md">
        <h1 className="text-xl font-semibold text-center">Create an account</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("email", validationRules.email)}
                />
                {errors?.email && (
                  <div>
                    <span className="text-red-500">{errors.email.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("name", validationRules.name)}
                />
                {errors?.name && (
                  <div>
                    <span className="text-red-500">{errors.name.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("password", validationRules.password)}
                />
                {errors?.password && (
                  <div>
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="userNickname"
                  className="text-sm font-semibold text-gray-800"
                >
                  Nickname
                </label>
                <input
                  type="text"
                  id="userNickname"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("userNickname", validationRules.nickname)}
                />
                {errors?.userNickname && (
                  <div>
                    <span className="text-red-500">
                      {errors.userNickname.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className=" text-gray-800 hover:text-gray-600"
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => navigate("/login")}
                >
                  login
                </button>
                <button
                  type="button"
                  className=" text-gray-800 hover:text-gray-600"
                  style={{ backgroundColor: "transparent" }}
                  onClick={handleNextStep}
                >
                  {"->"} Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-2">
                <label
                  htmlFor="height"
                  className="text-sm font-semibold text-gray-800"
                >
                  Height (cm)
                </label>
                <input
                  type="text"
                  id="height"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("height", validationRules.height)}
                />
                {errors?.height && (
                  <div>
                    <span className="text-red-500">
                      {errors.height.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="weight"
                  className="text-sm font-semibold text-gray-800"
                >
                  Weight (kg)
                </label>
                <input
                  type="text"
                  id="weight"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("weight", validationRules.weight)}
                />
                {errors?.weight && (
                  <div>
                    <span className="text-red-500">
                      {errors.weight.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="muscleMass"
                  className="text-sm font-semibold text-gray-800"
                >
                  Muscle Mass (kg)
                </label>
                <input
                  type="text"
                  id="muscleMass"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register("muscleMass", validationRules.muscleMass)}
                />
                {errors?.muscleMass && (
                  <div>
                    <span className="text-red-500">
                      {errors.muscleMass.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="bodyFatPercentage"
                  className="text-sm font-semibold text-gray-800"
                >
                  Body Fat Percentage (%)
                </label>
                <input
                  type="text"
                  id="bodyFatPercentage"
                  className="w-full px-4 py-2 mt-2 bg-color4 border-3 border-custom-stroke rounded-20"
                  {...register(
                    "bodyFatPercentage",
                    validationRules.bodyFatPercentage
                  )}
                />
                {errors?.bodyFatPercentage && (
                  <div>
                    <span className="text-red-500">
                      {errors.bodyFatPercentage.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className=" text-gray-800 hover:text-gray-600"
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => setStep(1)}
                >
                  {"<-"} Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-gray-800 duration-200 bg-[#FCF5F3] rounded-20 hover:bg-gray-200"
                >
                  Create
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
