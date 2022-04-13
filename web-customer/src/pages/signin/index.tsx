import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import styles from "./styles.module.css";
// import { AuthContext } from "../../context/AuthContext";

export default function Sigin() {
  // const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    const request = { email, password };
    // await signIn(request);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Sign In</h1>
        <div className="mb-3 mt-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={handleSignIn}
        >
          Submit
        </button>
        <Link href={"/signup"}>
          <a>Not registered yet? Click here to SingUp.</a>
        </Link>
      </form>
    </div>
  );
}
