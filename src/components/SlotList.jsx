import React from "react";
import Slot from "./Slot";
import styles from "./SlotList.module.css";

const SlotList = ({ slots, getFun }) => {
  return (
    <div className={styles.slotList}>
      {slots.map((slot) => (
        <Slot
          key={slot._id}
          id={slot._id}
          name={slot?.slot}
          occupied={slot.isOccupied}
          enteringTime={slot.enteringTime}
          getFun={getFun}
        />
      ))}
    </div>
  );
};

export default SlotList;
