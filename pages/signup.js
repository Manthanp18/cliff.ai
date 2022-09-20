import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/subscription");
        }
      });
  }
  return (
    <div className="h-screen flex ">
      <div
        className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder
relative
before:absolute
before:w-full
before:h-full
before:-z-10
before:bg-gradient-to-r
before:from-[#ad84d8]
before:to-[#ad69a4]
before:left-0
before:top-0
before:blur-[5px] py-10 px-16"
      >
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Signup to your account 🔐
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Signup
            </button>
            {signupError && <p style={{ color: "red" }}>{signupError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
