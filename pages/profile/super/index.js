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
import Overview from "./Overview";
import Transactions from "../../../components/Transactions";
import Transactions_ from "./Transactions";
import Approvals from "./Approvals";
import Users from "./Users";
const DChart = dynamic(() => import("../../../components/Graph"), {
  ssr: false,
});

export default function Super() {
  const [polls, setpolls] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);

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

  const [options] = useState([
    { label: "Overview", value: "Overview" },
    { label: "Users", value: "Users" },
    { label: "Transactions", value: "Transactions" },
    { label: "Approvals", value: "Approvals" },
  ]);
  const [value, setValue] = useState("Overview");

  return (
    <DashboardLayout sidebar={false}>
      <Head title="Dashboard" />

      <main className={styles.main}>
        <div className={styles.top}>
          <text className={styles.toptxt1}>Hello {userContext?.name}</text>
          <text className={styles.toptxt}>
            Super admin - Only users users with clearance can access this
            dashboard
          </text>
        </div>

        <SegmentedControl
          marginTop={30}
          height={45}
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
        />

        {value == "Overview" ? (
          <Overview />
        ) : value == "Transactions" ? (
          <Transactions_ />
        ) : value == "Approvals" ? (
          <Approvals />
        ) : value == "Users" ? (
          <Users />
        ) : null}
      </main>
      <section className={styles.rightbar}>
        <div className={styles.searchcon}>
          <input placeholder="Search for your events" />
          <img alt="citsa vote" src="/loupe.png" />
        </div>

        <div className={styles.card}>
          <text className={styles.cardtitle}>Balance</text>
          <text className={styles.balance}>
            GHS{" "}
            {Number(polls.reduce((n, a) => n + (a.balance || 0), 0)).toFixed(2)}
          </text>

          {/* <div className={styles.withdraw}>Withdraw</div> */}
        </div>

        <Transactions poll={"all"} />
      </section>
    </DashboardLayout>
  );
}
