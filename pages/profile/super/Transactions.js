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

export default function Transactions() {
  const [transactions, settransactions] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes); dd

    if (userContext) {
      let response = await func.getTransactionsAdmin();
      console.log(response);
      if (response.status) {
        settransactions(response.transactions ? response.transactions : []);
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
    transactions.map((item) => {
      // console.log(item?.name);

      tempData.push(item?.totalVotes);
      tempCat.push(item?.name);

      setdata(tempData);
      setcategories(tempCat);
    });
  }, [transactions]);

  const [options] = useState([
    { label: "Overview", value: "Overview" },
    { label: "Transactions", value: "Transactions" },
    { label: "Approvals", value: "Approvals" },
  ]);
  const [value, setValue] = useState("Overview");

  return (
    <>
      {transactions.length > 0 ? (
        <div className={styles.sales}>
          <div className={styles.graph}>
            <text>Transactions</text>
          </div>
          <div className={styles.table}>
            <text className={styles.one}>Details</text>
            <text className={styles.two}>Name</text>
            <text className={styles.three}>Amount GHS</text>
            <text className={styles.four}></text>
          </div>

          {transactions.map((item, index) => {
            return (
              <div className={styles.tableitems}>
                <div className={styles.one}>
                  <img
                    alt="citsa vote"
                    src={item?.imageURL ? item?.imageURL : "/photo.png"}
                  />
                  <div className={styles.oneitem}>
                    <text className={styles.eventname}>{item?.poll?.name}</text>
                    <text className={styles.eventdate}>
                      Account: {item?.accountnumber}
                    </text>
                    <text className={styles.eventdate}>
                      Provider: {item?.bank}
                    </text>
                  </div>
                </div>
                <div className={styles.two}>
                  <text className={styles.eventname}>{item?.name}</text>
                </div>
                <div className={styles.three}>
                  <text className={styles.eventsold}>{item?.amount}</text>
                </div>
                <div className={styles.four}>
                  <Link href={`/profile/voting/${item?.id}`}>
                    <div
                      style={{
                        backgroundColor: item?.status
                          ? "#4beb88bb"
                          : "#eb4b76bb",
                      }}
                      onClick={() => {}}
                      className={styles.fouritem}
                    >
                      {item?.status ? "PAID" : "NOT PAID"}
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
            <text className={styles.infotxt}>No Transactions</text>
          </div>
        </div>
      )}
    </>
  );
}
