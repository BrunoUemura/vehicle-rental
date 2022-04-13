import { useState } from "react";
import styles from "./styles.module.css";

export default function Create() {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState(2010);
  const [type, setType] = useState("");
  const [kilometers, setKilometers] = useState(0);
  const [plate, setPlate] = useState("");

  const handleCreate = () => {};

  return (
    <div>
      <form className={styles.form}>
        <h1>Sign In</h1>
        <div className="mb-3 mt-3">
          <label className="form-label">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Model</label>
          <input type="text" onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">brand</label>
          <input type="text" onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">year</label>
          <input
            type="text"
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <input type="text" onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Kilometers</label>
          <input
            type="text"
            onChange={(e) => setKilometers(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Plate</label>
          <input type="text" onChange={(e) => setPlate(e.target.value)} />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={handleCreate}
        >
          Create
        </button>
      </form>
    </div>
  );
}
