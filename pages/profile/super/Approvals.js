import styles from "../../../styles/Dashboard.module.scss";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../../functions";
import { UserContext } from "../../../context";
import dynamic from "next/dynamic";
import {
  Dialog,
  SegmentedControl,
  TextInputField,
  toaster,
} from "evergreen-ui";
import DashboardLayout from "../../../components/DashboardLayout";
import Link from "next/link";
import Head from "../../../components/Head";
const DChart = dynamic(() => import("../../../components/Graph"), {
  ssr: false,
});

export default function Approvals() {
  const [polls, setpolls] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);
  const [isShownWithdraw, setisShownWithdraw] = useState(false);
  const [bank, setbank] = useState("");
  const [loading, setloading] = useState(false);
  const [openEvent, setopenEvent] = useState("");

  const handleWithdraw = async () => {
    console.log({ id: openEvent, percentage: bank });
    if (loading) {
      return;
    }
    if (!name && !bank && !account) {
      toaster.danger("Enter your details");
      return;
    }
    setloading(true);
    let response = await func.approveEvent({
      id: openEvent,
      percentage: parseInt(bank),
    });
    console.log(response);
    if (response.status) {
      toaster.success("Event Approved");
      setisShownWithdraw(false);
      setloading(false);
      location.reload();
    } else {
      toaster.danger("Something went wrong, Please try again");
      setloading(false);
    }
  };

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes); dd

    if (userContext) {
      let response = await func.getApprovalsAdmin();
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
    <>
      {polls.length > 0 ? (
        <div className={styles.sales}>
          <div className={styles.graph}>
            <text>Polls</text>
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
                      backgroundColor: item?.available
                        ? "#4beb88bb"
                        : "#eb4b76bb",
                    }}
                    className={styles.pollstatus}
                  >
                    {item?.available ? "ACTIVE" : "CLOSED"}
                  </text>
                </div>
                <div className={styles.three}>
                  <text className={styles.eventsold}>{item?.totalVotes}</text>
                </div>
                <div className={styles.four}>
                  <div
                    onClick={() => {
                      setisShownWithdraw(true);
                      setopenEvent(item?.id);
                    }}
                    className={styles.fouritem}
                  >
                    Approve
                  </div>
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
            <text className={styles.infotxt}>No Polls for approval</text>
          </div>
        </div>
      )}

      <Dialog
        isShown={isShownWithdraw}
        onCloseComplete={() => {
          setisShownWithdraw(false);
        }}
        hasFooter={false}
        hasHeader={false}
        width="60%"
      >
        <div className={styles.dialogcon}>
          <text className={styles.dialogtext}>Approve this event</text>
          <text className={styles.dialogtext2}>
            Set the percentage for this event and approve
          </text>

          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Percentage"
            required
            description="Example: 10, 20, 30"
            value={bank}
            onChange={(e) => setbank(e.target.value)}
            marginTop={20}
            autoFocus={true}
            type="number"
          />

          <text className={styles.dialogtext2}>*About to approve</text>
          <div onClick={handleWithdraw} className={styles.infobtn2}>
            {loading ? "Loading..." : "Approve"}
          </div>
        </div>
      </Dialog>
    </>
  );
}
