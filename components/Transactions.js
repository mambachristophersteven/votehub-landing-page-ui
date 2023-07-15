import { toaster } from "evergreen-ui";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import func from "../functions";
import styles from "../styles/Dashboard.module.scss";

export default function Transactions({ poll = "all" }) {
  const [polls, setpolls] = useState([]);
  let { userContext, setuserContext } = useContext(UserContext);

  useEffect(async () => {
    let res = localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes); dd

    if (userContext) {
      let response =
        poll == "all"
          ? await func.getTransactionsAdmin()
          : await func.getTransactions({
              id: poll.id,
            });
      // console.log(response);
      if (response.status) {
        setpolls(response.transactions ? response.transactions : []);
      } else {
        // toaster.danger("Something went wrong, Please try again");
      }
    }
  }, []);
  return (
    <div
      style={{
        display: polls == null || polls.length > 0 ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <div className={styles.transactionsh}>
        <text>Transactions</text>
      </div>

      {polls.map((item) => {
        return (
          <div className={styles.transaction}>
            <div className={styles.row}>
              <div className={styles.transactionimg}>
                <img alt="citsa vote" src="/send-money.png" />
              </div>
              <div className={styles.transactiontxt}>
                <div className={styles.hlistitemtext1}>
                  | {item?.accountnumber}
                </div>
                <div className={styles.hlistitemtext}>
                  Account: {String(item?.bank).toLocaleUpperCase()}
                </div>
              </div>
            </div>
            <div className={styles.transactiontxt}>
              <div className={styles.hlistitemtext1}>
                GHS {Number(item?.amount).toFixed(2)}
              </div>
              <div
                style={{
                  color: item?.status ? "green" : "red",
                }}
                className={styles.hlistitemtext}
              >
                {item?.status ? "Processed" : "Pending"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
