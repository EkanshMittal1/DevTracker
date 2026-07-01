import { useState } from "react";
import { login as loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login({onSwitch}) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await loginApi({
        email,
        password,
      });

      login(res.data.token, res.data.user);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-96 border rounded-lg p-6 space-y-4"
      >

        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white rounded p-2"
        >
          Login
        </button>

        <p className="text-center mt-5 text-sm">
            Don't have an account?{" "}
         <button
          type="button"
         className="text-blue-600"
         onClick={onSwitch}
               >
             Register
        </button>
        </p>

      </form>
         

    </div>
  );
}