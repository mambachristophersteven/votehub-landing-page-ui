import styles from "../../../styles/Dashboard.module.scss";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../../functions";
import { UserContext } from "../../../context";
import dynamic from "next/dynamic";
import { SegmentedControl, toaster } from "evergreen-ui";
import DashboardLayout from "../../../components/DashboardLayout";
import Link from "next/link";
import Head from "../../../components/Head";
const DChart = dynamic(() => import("../../../components/Graph"), {
  ssr: false,
});

export default function Users() {
  const [users, setusers] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes); dd

    if (userContext) {
      let response = await func.getUsersAdmin();
      // console.log(response);
      if (response.status) {
        setusers(response.users ? response.users : []);
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
    users.map((item) => {
      // console.log(item?.name);

      tempData.push(item?.totalVotes);
      tempCat.push(item?.name);

      setdata(tempData);
      setcategories(tempCat);
    });
  }, [users]);

  const [options] = useState([
    { label: "Overview", value: "Overview" },
    { label: "Transactions", value: "Transactions" },
    { label: "Approvals", value: "Approvals" },
  ]);
  const [value, setValue] = useState("Overview");

  return (
    <>
      {users.length > 0 ? (
        <div className={styles.sales}>
          <div className={styles.graph}>
            <text>Users ({users.length})</text>
          </div>
          <div className={styles.table}>
            <text className={styles.one}>Name</text>
            <text className={styles.two}>Email</text>
            <text className={styles.three}>USER ID</text>
            <text className={styles.four}></text>
          </div>

          {users.map((item, index) => {
            return (
              <div className={styles.tableitems}>
                <div className={styles.one}>
                  <img
                    alt="citsa vote"
                    src={item?.imageURL ? item?.imageURL : "/photo.png"}
                  />
                  <div className={styles.oneitem}>
                    <text className={styles.eventname}>{item?.name}</text>
                    <text className={styles.eventdate}>{item?.email}</text>
                  </div>
                </div>
                <div className={styles.two}>
                  <text className={styles.eventname}>{item?.phone}</text>
                </div>
                <div className={styles.three}>
                  <text className={styles.eventsold}>
                    {String(item?.id).substring(0, 12)}...
                  </text>
                </div>
                <div className={styles.four}>
                  {/* <Link href={`/profile/voting/${item?.id}`}>
                    <div onClick={() => {}} className={styles.fouritem}>
                      open
                    </div>
                  </Link> */}
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
            <text className={styles.infotxt}>No users in the system</text>
          </div>
        </div>
      )}
    </>
  );
}
