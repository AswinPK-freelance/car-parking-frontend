import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SlotList from "./components/SlotList";
import styles from "./App.module.css";
import { ApiCall } from "./service/ApiCall";
import { getSlotsUrl } from "./service/Baseurl";

const App = () => {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = async () => {
    const slots = await ApiCall("get", getSlotsUrl);
    if (slots?.status) {
      setSlots(slots?.message?.data ?? []);
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <h2>Available Parking Slots</h2>
        <SlotList slots={slots} getFun={getSlots} />
        <b> Rs 5 Will be charged for 1 Minute</b>
      </main>
    </div>
  );
};

export default App;
