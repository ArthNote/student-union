import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { User } from '../models/User';
import { addDoc, collection } from "firebase/firestore";



function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const UsersCollection = collection(db, "Users");

  const register = async () => {
    if (!email || !password || !name) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const newUser: User = {
        name,
        email,
        password,
      };
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(UsersCollection, newUser);
      navigate("/admin-events");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="login">
      <h1>Welcome Here</h1>
      <h4>Please enter your details</h4>
      <form action="">
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button click={register}>Register</Button>
      </form>
      <h4>
        Already have an account? <Link to="/login">Login now</Link>
      </h4>
    </section>
  );
}

export default Register