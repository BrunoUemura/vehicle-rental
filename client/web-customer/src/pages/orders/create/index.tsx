import Link from "next/link";
import Router from "next/router";
import { FormEvent, useState } from "react";
import styles from "./styles.module.css";

export default function Create() {
  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    const request = {
      customerId,
      vehicleId,
      startDate,
      endDate,
    };

    const res = await fetch("/api/order/create", {
      method: "POST",
      body: JSON.stringify(request),
    });
    const data = await res.json();

    if (data.status === 201) {
      Router.back();
    } else {
      alert("Failed creating order");
    }
  };

  return (
    <div>
      <form className={styles.form}>
        <h1>Create Order</h1>
        <div className="mb-3 mt-3">
          <label className="form-label">Customer Id</label>
          <input type="text" onChange={(e) => setCustomerId(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Vehicle Id</label>
          <input type="text" onChange={(e) => setVehicleId(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="text" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input type="text" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={handleCreate}
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
