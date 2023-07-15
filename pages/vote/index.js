import Head from "../../components/Head";
import Link from "next/link";
import styles from "../../styles/Discover.module.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import * as gtag from "../../lib/gtag";
import SideNav from "../../components/SideNav";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Vote({ data }) {
  console.log(data);
  const [query, setquery] = useState("");
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });

    // console.log(data);
  }, []);
  return (
    <div className={styles.container}>
      <Head title="Vote | citsa vote" />
      <main className={styles.main}>
        <div className={styles.nav}>
          <Link href="/">
            <img
              alt="citsa vote"
              data-aos="zoom-in"
              src="/vote.png"
              className={styles.logo}
            />
          </Link>

          <div className={styles.navlinks}>
            {/* <text className={styles.navitem}>Download</text> */}
          </div>
          <img
            alt="citsa vote"
            onClick={() => {
              document.getElementById("sidemenu").style.left = "0";
            }}
            src="/menu.png"
            className={styles.menu}
          />
        </div>

        <SideNav />

        <text data-aos="zoom-in" className={styles.mainText}>
          Vote
        </text>
        <text data-aos="zoom-in" className={styles.subText}>
          Vote for your favorite nominees
          <br />
        </text>
      </main>
      <main className={styles.main2}>
        <div className={styles.search}>
          <div>
            {/* <img alt="citsa vote" src="/searchw.png" /> */}
            <input
              onChange={(e) => {
                setquery(e.target.value);
              }}
              placeholder="Enter nominee code"
            />
          </div>
        </div>

        <Link href={`/vote/${query.toUpperCase()}`}>
          <div className={styles.more}>Vote</div>
        </Link>
      </main>

      {/* <Footer styles={styles} /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  let res = await fetch("https://VoteHub-backend.onrender.com/admin/getPolls", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  return { props: { data: data } };
}
