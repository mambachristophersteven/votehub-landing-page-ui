import Head from "../../components/Head";
import Link from "next/link";
import styles from "../../styles/Discover.module.css";
import styles2 from "../../styles/Dashboard.module.scss";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import * as gtag from "../../lib/gtag";
import SideNav from "../../components/SideNav";

import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from "../../context";
import { useContext } from "react";
import func from "../../functions";

export default function StatID({ data }) {
  console.log(data);
  const [query, setquery] = useState("");
  const [nominees, setnominees] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });

    // console.log(data);
  }, []);

  const poll = data.poll;

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes);

    if (true) {
      let response = await func.getNomineesBy({
        id: poll?.id,
      });
      console.log(response);
      if (response.status) {
        setnominees(response.nominees ? response.nominees : []);
      } else {
        toaster.danger("Something went wrong, Please try again");
      }
    }

    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, [poll]);

  return (
    <div className={styles.container}>
      <Head title="Discover polls | citsa vote" />
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
          Results: {poll.name}
        </text>
        <text data-aos="zoom-in" className={styles.subText}>
          View realtime results and positions of your nominees
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
              placeholder="Search by nominee name or category"
            />
          </div>
        </div>
        {/* <div className={styles2.points}> */}
        {nominees?.length > 0 ? (
          <div className={styles2.sales}>
            <div className={styles2.graph}>
              <text>All Nominees</text>
            </div>
            <div className={styles2.table}>
              <text className={styles2.one}>Nominee</text>
              <text className={styles2.two}>Category</text>
              <text className={styles2.three}>Votes</text>
              <text className={styles2.four}>Share Code</text>
            </div>

            {nominees
              .filter((item) => {
                return (
                  item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                  item.category.toLowerCase().indexOf(query.toLowerCase()) !==
                    -1
                );
              })
              .map((item, index) => {
                return (
                  <div className={styles2.tableitems}>
                    <div className={styles2.one}>
                      <img
                        alt="citsa vote"
                        src={item?.imageURL ? item?.imageURL : "/photo.png"}
                      />
                      <div className={styles2.oneitem}>
                        <text className={styles2.eventname}>{item?.name}</text>
                        <text className={styles2.eventdate}></text>
                      </div>
                    </div>
                    <div className={styles2.two}>
                      <text className={styles2.eventname}>
                        {item?.category}
                      </text>
                    </div>
                    <div className={styles2.three}>
                      <text className={styles2.eventname}>{item?.votes}</text>
                    </div>
                    <div className={styles2.four}>
                      <Link href={`/vote/${item?.code}`}>
                        <div onClick={() => {}} className={styles2.fouritem}>
                          {item?.code}
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.emptycon}>
            <img
              alt="citsa vote"
              src="/empty.png"
              className={styles.emptyimg}
            />
            <text className={styles.empty}>No Nominees Available</text>
          </div>
        )}
        {/* </div> */}
        {/* <div className={styles.more}>View more</div> */}
      </main>

      {/* <Footer styles={styles} /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  let res = await fetch("https://VoteHub-backend.onrender.com/api/getPoll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  // console.log(res);
  let data = [];
  data = await res.json();

  // console.log(data);
  return { props: { data: data ? data : null } };
}
