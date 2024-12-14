import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SlotList from "./components/SlotList";
import styles from "./App.module.css";
import { ApiCall } from "./service/ApiCall";
import { getSlotsUrl } from "./service/Baseurl";

const App = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = async () => {
    setloading(true);
    const slots = await ApiCall("get", getSlotsUrl);
    setloading(false);
    if (slots?.status) {
      setSlots(slots?.message?.data ?? []);
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <h2>Available Parking Slots</h2>
        {loading ? (
          <b> Loading Your Slots ...</b>
        ) : (
          <>
            <SlotList slots={slots} getFun={getSlots} />
            <b> Rs 5 Will be charged for 1 Minute</b>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
