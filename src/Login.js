import React, { useState } from "react";
import { data } from "./data";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    data.forEach((res) => {
      if (input.username === res.username && input.password === res.password) {
        navigate("/quiz");
      } else {
        alert("Username or password is invalid");
      }
    });
  };
  return (
    <section id="login-form">
      <div className="w-full md:container lg:w-1/2 mx-auto px-12">
        <div className="border p-8 mt-28 shadow-md rounded-md">
          <h2 className="text-center text-lg font-bold mb-5">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Username: </label>
              <input
                type="text"
                value={input.username}
                onChange={handleInput}
                className="border mt-2 rounded-md py-1 px-2"
                name="username"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label>Password: </label>
              <input
                value={input.password}
                onChange={handleInput}
                type="password"
                className="border mt-2 rounded-md py-1 px-2"
                name="password"
              />
            </div>

            <button
              type="submit"
              className="mt-6 border py-2 px-5 rounded-md bg-violet-500 text-white font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
