import React from "react";
import styles from "./Slot.module.css";
import { ApiCall } from "../service/ApiCall";
import { createParkingUrl, endParkingUrl } from "../service/Baseurl";

const Slot = ({ id, occupied, name, enteringTime, getFun }) => {
  const createParking = async (id) => {
    console.log(id);
    const response = await ApiCall("post", createParkingUrl, { slot: id });
    if (response?.status) {
      alert("Your parking slot booked succesfully!");
      getFun();
    }
  };

  const endParking = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to leave from the parking?"
    );

    if (isConfirmed) {
      const response = await ApiCall("post", endParkingUrl, { slot: id });
      if (response?.status) {
        console.log(response);
        const minutes = (
          parseFloat(response?.message?.data?.parkedDuration) || 0
        ).toFixed(2);
        const charge = (parseFloat(minutes) * 5).toFixed(2);
        window.alert(`Your charge for ${minutes} Minutes is ${charge} Rs`);

        getFun();
      }
    }
  };
  return (
    <div
      className={`${styles.slot} ${
        occupied ? styles.occupied : styles.available
      }`}
      onClick={() => (occupied ? endParking(id) : createParking(id))}
    >
      <span className={styles.slotId}>{name}</span>
      {occupied ? (
        <>
          <span className={styles.status}>Occupied</span> <br />
          <span className={styles.status}>
            {new Date(enteringTime).toLocaleString()}
          </span>
        </>
      ) : (
        <span className={styles.status}>Available</span>
      )}
    </div>
  );
};

export default Slot;
