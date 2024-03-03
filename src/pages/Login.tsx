import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/Login.css"
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-events");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <section className="login">
        <h1>Welcome Back</h1>
        <h4>Please enter your details</h4>
        <form action="">
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button click={login}>Login</Button>
        </form>
        <h4>
          Don't have an account? <Link to="/register">Register now</Link>
        </h4>
      </section>
    </>
  );
}

export default Login