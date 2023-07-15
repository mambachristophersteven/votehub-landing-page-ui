import styles from "../../../styles/SMS.module.scss";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../../functions";
import { UserContext } from "../../../context";
import dynamic from "next/dynamic";
import { Dialog, TextInputField, TextareaField, toaster } from "evergreen-ui";
import DashboardLayout from "../../../components/DashboardLayout";
import Link from "next/link";
import Head from "../../../components/Head";
const DChart = dynamic(() => import("../../../components/Graph"), {
  ssr: false,
});

export default function SMS() {
  const [polls, setpolls] = useState([]);
  const [data, setdata] = useState([]);
  const [categories, setcategories] = useState([]);

  const [amount, setamount] = useState(0);
  const [email, setemail] = useState("");

  const [message, setmessage] = useState("");
  const [recipients, setrecipients] = useState([]);
  const [msgCount, setMsgCount] = useState(0);
  const [isShownWithdraw, setisShownWithdraw] = useState(false);
  const [isShownCredit, setisShownCredit] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadingCredit, setloadingCredit] = useState(false);

  let { userContext, setuserContext } = useContext(UserContext);

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes); dd

    if (userContext) {
      let response = await func.getSMS({
        id: userContext?.id,
      });
      // console.log(response);
      if (response.status) {
        setpolls(response.sms ? response.sms : []);
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

  const handleSend = async () => {
    if (userContext) {
      setloading(true);
      let response = await func.sendSMS({
        userid: userContext?.id,
        message: message,
        recipients: recipients,
      });
      // console.log(response);
      if (response.status) {
        setloading(false);
        // setpolls(response.sms ? response.sms : []);
        toaster.success(response?.message);
        setisShownWithdraw(false);
      } else {
        setloading(false);
        toaster.danger(response?.message);
      }
    }
  };

  const handleBuy = async () => {
    if (userContext) {
      setloadingCredit(true);
      let response = await func.buyCredit({
        userid: userContext?.id,
        amount: parseFloat(amount),
        email: email,
      });
      // console.log(response);
      let url = await response?.data?.data?.authorization_url;
      if (response.status) {
        setloadingCredit(false);
        // setpolls(response.sms ? response.sms : []);
        // toaster.success(response?.message);
        if (response.data?.status) {
          setloading(false);
          window.open(await url, "_self");
        } else {
          setloading(false);
          if (response?.data?.message) {
            toaster.notify(response?.data?.message);
          }
        }
        // setisShownCredit(false);
      } else {
        setloadingCredit(false);
        toaster.danger(response?.message);
      }
    }
  };

  return (
    <DashboardLayout sidebar={false}>
      <Head title="Dashboard" />
      <main className={styles.main}>
        <div className={styles.top}>
          <text className={styles.toptxt1}>Hello {userContext?.name}</text>
          <text className={styles.toptxt}>Send single and bulk SMS here</text>
        </div>

        <div className={styles.hlist}>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="/poll.png" />
              <text className={styles.hlistitemtext}>Total SMS</text>
            </div>
            <text className={styles.hlistitemtext1}>{polls?.length}</text>
          </div>
          <div className={styles.hlistitem}>
            <div>
              <img alt="citsa vote" src="/badge.png" />
              <text className={styles.hlistitemtext}>Credits Spent</text>
            </div>
            <text className={styles.hlistitemtext1}>
              GHS{" "}
              {polls.reduce((n, a) => n + (a.recipients.length || 0), 0) * 0.03}
            </text>
          </div>
          <Link href="/results">
            <div className={styles.hlistitem}>
              <div>
                <img alt="citsa vote" src="/pie-chart.png" />
                <text className={styles.hlistitemtext}>All Contacts</text>
              </div>
              <text className={styles.hlistitemtext1}>
                {polls.reduce((n, a) => n + (a.recipients.length || 0), 0)}
              </text>
            </div>
          </Link>
        </div>

        {/* <div className={styles.graphcon}>
          <div className={styles.graph}>
            <text>History</text>
          </div>
          <DChart data={data} categories={categories} />
        </div> */}

        {polls.length > 0 ? (
          <div className={styles.sales}>
            <div className={styles.graph}>
              <text>All SMS Sent</text>

              {/* <Link href="/profile/create-poll"> */}
              <div
                onClick={() => setisShownWithdraw(true)}
                className={styles.infobtn}
              >
                Send SMS
              </div>
              {/* </Link> */}
            </div>
            <div className={styles.table}>
              <text className={styles.one}>Receiver</text>
              <text className={styles.two}>Message</text>
              <text className={styles.three}>Status</text>
              <text className={styles.four}>Date</text>
            </div>

            {polls.map((item, index) => {
              return (
                <div className={styles.tableitems}>
                  <div className={styles.one}>
                    <div className={styles.oneitem}>
                      <text className={styles.eventname}>
                        {item?.recipients.length > 1
                          ? item?.recipients.length + " contacts"
                          : item?.recipients[0]}
                      </text>
                    </div>
                  </div>
                  <div className={styles.two}>
                    <text className={styles.eventsold}>{item?.message}</text>
                  </div>
                  <div className={styles.three}>
                    <text
                      style={{
                        backgroundColor: item?.status
                          ? "#4beb88bb"
                          : "#eb4b76bb",
                      }}
                      className={styles.pollstatus}
                    >
                      {item?.status ? "Sent" : "Failed"}
                    </text>
                  </div>
                  <div className={styles.four}>
                    <text className={styles.eventdate}>
                      {Date(item?.timestamp).substring(0, 16)}
                    </text>
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
                You have no SMS sent, create a new one
              </text>
              {/* <Link href="/profile/create-poll"> */}
              <div
                onClick={() => setisShownWithdraw(true)}
                className={styles.infobtn}
              >
                Send SMS
              </div>
              {/* </Link> */}
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
          <text className={styles.cardtitle}>Credit</text>
          <text className={styles.balance}>
            {Number(userContext?.smscredit).toFixed(2)}
          </text>

          <div
            onClick={() => setisShownCredit(true)}
            className={styles.withdraw}
          >
            Buy
          </div>
        </div>
      </section>

      <Dialog
        isShown={isShownWithdraw}
        onCloseComplete={() => {
          setisShownWithdraw(false);
          setrecipients([]);
          setmessage("");
        }}
        hasFooter={false}
        hasHeader={false}
        width="60%"
      >
        <div className={styles.dialogcon}>
          <text className={styles.dialogtext}>Compose Message</text>
          <text className={styles.dialogtext2}>
            Send instant SMS to Recipients
          </text>

          <TextareaField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Message"
            required
            description={message.length + "/" + msgCount + " SMS"}
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
              if (message) {
                let no = message.length / 156;
                setMsgCount(Math.ceil(no));
              }
            }}
            marginTop={20}
            autoFocus={true}
            hint="Note: The 'enter' key and other characters copied from Word or from your browser may count as more than one character."
          />
          <TextareaField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Recipients"
            required={true}
            description={recipients.length + " recipients"}
            value={recipients}
            onChange={(e) => {
              setrecipients(String(e.target.value).split(","));
            }}
            hint="Note: Mobile numbers without country codes will be assumed to be local numbers of Ghana. Numbers must be separated with a comma (e.g: 024XXXXXXX,020XXXXXXX,026XXXXXXX)"
          />

          <div onClick={handleSend} className={styles.infobtn2}>
            {loading ? "Loading..." : "Proceed"}
          </div>
        </div>
      </Dialog>

      <Dialog
        isShown={isShownCredit}
        onCloseComplete={() => {
          setisShownCredit(false);
          setamount([]);
          setemail("");
        }}
        hasFooter={false}
        hasHeader={false}
        width="60%"
      >
        <div className={styles.dialogcon}>
          <text className={styles.dialogtext}>Buy Credit</text>
          <text className={styles.dialogtext2}>Buy credit to send SMS</text>

          <TextInputField
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Amount"
            required
            description={"Credit: " + Number(amount / 0.03).toFixed(1)}
            value={amount}
            onChange={(e) => {
              setamount(e.target.value);
            }}
            marginTop={20}
            autoFocus={true}
            hint="Note: One message is GHS 0.030"
            type="number"
          />
          <TextInputField
            type="email"
            borderColor={"gray"}
            borderWidth={0.4}
            width="50vw"
            label="Email"
            required={true}
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            // hint="Note: Mobile numbers without country codes will be assumed to be local numbers of Ghana. Numbers must be separated with a comma (e.g: 024XXXXXXX,020XXXXXXX,026XXXXXXX)"
          />

          <div onClick={handleBuy} className={styles.infobtn2}>
            {loadingCredit ? "Loading..." : "Proceed"}
          </div>
        </div>
      </Dialog>
    </DashboardLayout>
  );
}
