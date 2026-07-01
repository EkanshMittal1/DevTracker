import { useState } from "react";
import { register as registerApi } from "../api/auth";

export default function Register({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await registerApi({
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");

      onSwitch();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blend-darken-100">
      <form
        onSubmit={handleSubmit}
        className="bg-blend-hard-light shadow-lg rounded-xl p-8 w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white rounded-lg p-3"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600"
            onClick={onSwitch}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}