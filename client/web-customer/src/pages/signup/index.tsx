import Link from "next/link";
import styles from "./styles.module.css";

export default function Sigup() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Sign Up</h1>
        <div className="mb-2 mt-2">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Document Number</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" placeholder="Street" />
          <input type="text" className="form-control" placeholder="Number" />
          <input type="text" className="form-control" placeholder="District" />
          <input type="text" className="form-control" placeholder="City" />
          <input type="text" className="form-control" placeholder="State" />
          <input type="text" className="form-control" placeholder="Country" />
          <input type="text" className="form-control" placeholder="Zip Code" />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
        <Link href={"/signin"}>
          <a>Already registered? Click here to Signin.</a>
        </Link>
      </form>
    </div>
  );
}
