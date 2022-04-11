import Link from "next/link";
import styles from "./styles.module.css";

export default function Sigin() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Sign In</h1>
        <div className="mb-3 mt-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
        <Link href={"/signup"}>
          <a>Not registered yet? Click here to SingUp.</a>
        </Link>
      </form>
    </div>
  );
}
