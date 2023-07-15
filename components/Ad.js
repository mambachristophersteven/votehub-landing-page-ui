import styles from "../styles/Signup.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Ad() {
  const [show, setShow] = useState(true);
  return (
    <div style={{ display: show ? "flex" : "none" }} className={styles.ad}>
      <img
        alt="citsa vote"
        onClick={() => {
          setShow(false);
        }}
        src="/close.png"
        className={styles.x}
      />
      <text className={styles.adhead}>Install VoteHub</text>
      <text className={styles.adtext}>
        Download the mobile app for more functionalities to manage your event
        and ticket sales.
      </text>
      <div className={styles.imgs}>
        {/* <img alt="citsa vote" src="/ios.png" className={styles.app} /> */}

        <Link href="https://play.google.com/store/apps/details?id=africa.VoteHub.organizer">
          <img alt="citsa vote" src="/playstore.png" className={styles.app1} />
        </Link>
      </div>
    </div>
  );
}
