import styles from "../../../styles/Dashboard.module.scss";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../../functions";
import { UserContext } from "../../../context";
import dynamic from "next/dynamic";
import { toaster } from "evergreen-ui";
import Link from "next/link";
const DChart = dynamic(() => import("../../../components/Graph"), {
  ssr: false,
});

export default function Overview() {
  const [polls, setpolls] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);
  let { userContext } = useContext(UserContext);

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes); dd

    if (userContext) {
      let response = await func.getPollsAdmin();
      // console.log(response);
      if (response.status) {
        setpolls(response.polls ? response.polls : []);
      } else {
        toaster.danger("Something went wrong, Please try again");
      }
    }

    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);

  useEffect(() => {
    let tempData = [];
    let tempCat = [];
    polls.map((item) => {
      // console.log(item?.name);

      tempData.push(item?.totalVotes);
      tempCat.push(item?.name);

      setdata(tempData);
      setcategories(tempCat);
    });
  }, [polls]);

  return (
    <>
      <div className={styles.hlist}>
        <div className={styles.hlistitem}>
          <div>
            <img alt="citsa vote" src="/poll.png" />
            <text className={styles.hlistitemtext}>Polls</text>
          </div>
          <text className={styles.hlistitemtext1}>{polls?.length}</text>
        </div>
        <div className={styles.hlistitem}>
          <div>
            <img alt="citsa vote" src="/badge.png" />
            <text className={styles.hlistitemtext}>Total Votes</text>
          </div>
          <text className={styles.hlistitemtext1}>
            {polls.reduce((n, a) => n + (a.totalVotes || 0), 0)}
          </text>
        </div>
        <div className={styles.hlistitem}>
          <div>
            <img alt="citsa vote" src="/users.png" />
            <text className={styles.hlistitemtext}>Nominees</text>
          </div>
          <text className={styles.hlistitemtext1}>~</text>
        </div>
      </div>

      <div className={styles.graphcon}>
        <div className={styles.graph}>
          <text>Total Votes</text>
        </div>
        <DChart data={data} categories={categories} />
      </div>

      {polls.length > 0 ? (
        <div className={styles.sales}>
          <div className={styles.graph}>
            <text>Polls</text>

            <Link href="/profile/create-poll">
              <div className={styles.infobtn}>Create Poll</div>
            </Link>
          </div>
          <div className={styles.table}>
            <text className={styles.one}>Event</text>
            <text className={styles.two}>Status</text>
            <text className={styles.three}>Votes</text>
            <text className={styles.four}></text>
          </div>

          {polls.map((item, index) => {
            return (
              <div className={styles.tableitems}>
                <div className={styles.one}>
                  <img
                    alt="citsa vote"
                    src={item?.imageURL ? item?.imageURL : "/photo.png"}
                  />
                  <div className={styles.oneitem}>
                    <text className={styles.eventname}>{item?.name}</text>
                    <text className={styles.eventdate}></text>
                  </div>
                </div>
                <div className={styles.two}>
                  <text
                    style={{
                      backgroundColor: item?.avaliable
                        ? "#4beb88bb"
                        : "#eb4b76bb",
                    }}
                    className={styles.pollstatus}
                  >
                    {item?.avaliable ? "ACTIVE" : "CLOSED"}
                  </text>
                </div>
                <div className={styles.three}>
                  <text className={styles.eventsold}>{item?.totalVotes}</text>
                </div>
                <div className={styles.four}>
                  <Link href={`/profile/voting/${item?.id}`}>
                    <div onClick={() => {}} className={styles.fouritem}>
                      open
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.sales}>
          {/* No events, create a new event */}
          <div className={styles.info}>
            <img alt="citsa vote" src="/emptyf.png" />
            <text className={styles.infotxt}>
              No Polls in the system right now.
            </text>
          </div>
        </div>
      )}
    </>
  );
}
