import styles from "../../styles/Dashboard.module.scss";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../functions";
import { UserContext } from "../../context";
import dynamic from "next/dynamic";
import { Alert, Dialog, Link, TextInputField, toaster } from "evergreen-ui";
import DashboardLayout from "../../components/DashboardLayout";
const DChart = dynamic(() => import("../../components/Graph"), { ssr: false });

export default function Profile() {
  const [events, setevents] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);

  const [isShownWithdraw, setisShownWithdraw] = useState(false);
  const [bank, setbank] = useState("");
  const [name, setname] = useState("");
  const [account, setaccount] = useState("");
  const [comment, setcomment] = useState("");
  const [loading, setloading] = useState(false);

  // console.log(userContext);

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // console.log(useRes);

    // setuserContext(useRes);

    if (userContext) {
      let response = await func.getEventsBy({
        id: userContext?.organizer?.id,
      });
      // console.log(response);
      if (response.status) {
        setevents(response.events ? response.events : []);
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
    events.map((item) => {
      // console.log(item?.name);

      tempData.push({
        y: item?.ticketsBought,
        x: item?.name,
        goals: [
          {
            name: "Total Tickets",
            value: item?.totalTickets,
            strokeColor: "#775DD0",
          },
        ],
      });
      tempCat.push(item?.name);

      setdata(tempData);
      setcategories(tempCat);
    });
  }, [events]);

  const handleWithdraw = async () => {
    if (loading) {
      return;
    }
    if (!name && !bank && !account) {
      toaster.danger("Enter your details");
      return;
    }
    setloading(true);
    let response = await func.withdraw({
      bank: bank,
      name: name,
      accountnumber: account,
      comment: comment,
      user: userContext,
      status: false,
      id: userContext?.id,
      timestamp: String(Date.now()),
      amount: userContext?.organizer?.balance,
    });
    // console.log(response);
    if (response.status) {
      toaster.success("Withdrawal request sent successfully.");
      setisShownWithdraw(false);
      setloading(false);
    } else {
      toaster.danger("Something went wrong, Please try again");
      setloading(false);
    }
  };

  return (
    <DashboardLayout sidebar={false}>
      <main className={styles.main}>
        {/* <Alert
          marginBottom={30}
          intent="warning"
          title="This is a Beta version for Event Ticketing"
        >
          Please note that Our Event Ticketing Platform is currently in Beta.
          Somethings may not work as expected. Please give us feedback on what
          should be improved on VoteHub@gmail.com
        </Alert> */}

        <div className={styles.top}>
          <text className={styles.toptxt1}>Hello {userContext?.name}</text>
          <text className={styles.toptxt}>
            Here you can manage your tickets
          </text>
        </div>

        <div className={styles.hlist}>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="calendar2.png" />
              <text className={styles.hlistitemtext}>Events</text>
            </div>
            <text className={styles.hlistitemtext1}>{events?.length}</text>
          </div>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="ticket.png" />
              <text className={styles.hlistitemtext}>Tickets Sold</text>
            </div>
            <text className={styles.hlistitemtext1}>
              {events.reduce((n, a) => n + (a.ticketsBought || 0), 0)}
            </text>
          </div>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="users.png" />
              <text className={styles.hlistitemtext}>Customers</text>
            </div>
            <text className={styles.hlistitemtext1}>~</text>
          </div>
        </div>

        <div className={styles.graphcon}>
          <div className={styles.graph}>
            <text>Total Sale</text>
          </div>
          <DChart data={data} categories={categories} />
        </div>

        {events.length > 0 ? (
          <div className={styles.sales}>
            <div className={styles.graph}>
              <text>Your Events</text>
              <Link href="/profile/create">
                <div className={styles.infobtn}>Create Poll</div>
              </Link>
            </div>
            <div className={styles.table}>
              <text className={styles.one}>Event</text>
              <text className={styles.two}>Status</text>
              <text className={styles.three}>Sold</text>
              <text className={styles.four}>Revenue</text>
            </div>

            {events.map((item, index) => {
              return (
                <div className={styles.tableitems}>
                  <div className={styles.one}>
                    <img alt="citsa vote" src={item?.imageURL} />
                    <div className={styles.oneitem}>
                      <text className={styles.eventname}>{item?.name}</text>
                      <text className={styles.eventdate}>
                        {new Date(
                          Number(item?.date.timestamp / 1000)
                        ).toUTCString()}
                      </text>
                    </div>
                  </div>
                  <Link href="/results">
                    <div className={styles.two}>
                      <text
                        style={{
                          backgroundColor: item?.approved
                            ? "#4beb88bb"
                            : "#eb4b76bb",
                          cursor: "pointer",
                        }}
                        className={styles.pollstatus}
                      >
                        {item?.approved ? "LIVE" : "PENDING"}
                      </text>
                    </div>
                  </Link>
                  <div className={styles.three}>
                    <text className={styles.eventsold}>
                      {item?.ticketsBought + "/" + item?.totalTickets}
                    </text>
                  </div>
                  <div className={styles.four}>
                    <text className={styles.eventsold}>~</text>
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
                You have no events, create a new event
              </text>
              <Link href="/profile/create">
                <div className={styles.infobtn}>Create Event</div>
              </Link>
            </div>
          </div>
        )}
      </main>
      <section className={styles.rightbar}>
        <div className={styles.searchcon}>
          <input placeholder="Search for your events" />
          <img alt="citsa vote" src="/loupe.png" />
        </div>

        <div className={styles.card}>
          <text className={styles.cardtitle}>Balance</text>
          <text className={styles.balance}>
            GHS {Number(userContext?.organizer?.balance).toFixed(2)}
          </text>

          <div
            onClick={() => setisShownWithdraw(true)}
            className={styles.withdraw}
          >
            Withdraw
          </div>
        </div>

        {/* <Transactions poll={poll} /> */}
      </section>

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
          <text className={styles.dialogtext}>Withdrawal Request</text>
          <text className={styles.dialogtext2}>
            Funds will be sent to the account provided in less than 2 hours
          </text>
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Provider"
            required
            description="Mobile Money Network or Bank"
            value={bank}
            onChange={(e) => setbank(e.target.value)}
            marginTop={20}
            autoFocus={true}
          />
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Account Number"
            required={true}
            description="Mobile Money or Bank Account Number"
            value={account}
            onChange={(e) => setaccount(e.target.value)}
          />
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Account Name"
            required
            description="Name on the account"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Comment"
            description="Any comment or instruction"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          />

          <text className={styles.dialogtext2}>
            *We take 10% fee on withdrawal
          </text>
          <div onClick={handleWithdraw} className={styles.infobtn2}>
            {loading ? "Loading..." : "Withdraw"}
          </div>
        </div>
      </Dialog>
    </DashboardLayout>
  );
}
