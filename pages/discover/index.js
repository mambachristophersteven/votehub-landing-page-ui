import Head from "../../components/Head";
import Link from "next/link";
import styles from "../../styles/Discover.module.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import * as gtag from "../../lib/gtag";
import SideNav from "../../components/SideNav";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Home({ data }) {
  const [query, setquery] = useState("");
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });

    // console.log(data);
  }, []);

  const events = data.events;
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className={styles.container}>
      <Head title="Discover Events | citsa vote" />
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
          Discover events
        </text>
        <text data-aos="zoom-in" className={styles.subText}>
          Browse and discover events that you can attend with friends this
          weekend.
          <br />
        </text>
      </main>
      <main className={styles.main2}>
        <div className={styles.search}>
          <div>
            <img alt="citsa vote" src="/searchw.png" />
            <input
              onChange={(e) => {
                setquery(e.target.value);
              }}
              placeholder="Search by name or venue"
            />
          </div>
        </div>
        <div className={styles.points}>
          {events.length > 0 ? (
            events
              .filter((item) => {
                return (
                  item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                  item.venue.toLowerCase().indexOf(query.toLowerCase()) !== -1
                );
              })
              .map((item) => {
                return (
                  <Link
                    href={{
                      pathname: `${item.slug}`,
                    }}
                  >
                    <div
                      onClick={() => {
                        gtag.event({
                          action: "OPENED_EVENT",
                          category: "Events",
                          label: item.name,
                          value: item.name,
                        });
                      }}
                      key={item.id}
                      style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.9)), url(${item.imageURL})`,
                        backgroundSize: "cover",
                      }}
                      className={styles.point}
                    >
                      {/* <img alt="citsa vote" src={item.imageURL} /> */}
                      <div className={styles.head}>
                        <text className={styles.h2}>{item.date.day}</text>
                        <text className={styles.text}>
                          {months[item.date.month - 1]}
                        </text>
                      </div>
                      <text className={styles.h2}>
                        {item.name} <br />
                        <text className={styles.text}>{item.venue}</text>
                      </text>
                      {item.totalTickets == item.ticketsBought ? (
                        <div className={styles.rubber_stamp}>SOLD OUT</div>
                      ) : null}
                    </div>
                  </Link>
                );
              })
          ) : (
            <div className={styles.emptycon}>
              <img
                alt="citsa vote"
                src="/empty.png"
                className={styles.emptyimg}
              />
              <text className={styles.empty}>No Events Available</text>
            </div>
          )}
        </div>
        {/* <div className={styles.more}>View more</div> */}
      </main>

      <Footer styles={styles} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let res = await fetch(process.env.ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();
  return { props: { data: data } };
}
