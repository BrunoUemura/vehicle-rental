import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { VehicleType } from "../../types/VehicleType";
import styles from "./styles.module.css";

export const getServerSideProps = async ({
  req,
  res,
  params,
}: GetServerSidePropsContext) => {
  const data = await axios.get("/api/vehicle");
  return {
    props: { ...data },
  };
};

export default function Vehicle({ body }: VehicleType) {
  return (
    <div>
      {body?.map((vehicle) => (
        <div key={vehicle.vehicleId}>
          <span>{vehicle.name}</span>
          <span>{vehicle.model}</span>
          <span>{vehicle.brand}</span>
        </div>
      ))}
    </div>
  );
}
