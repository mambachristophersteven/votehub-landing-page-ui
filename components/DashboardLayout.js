import Link from "next/link";
import styles from "../styles/Dashboard.module.scss";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import Head from "../components/Head";
import { UserContext } from "../context";
import { useContext } from "react";
import { Badge } from "evergreen-ui";

export default function DashboardLayout({ children, sidebar = true }) {
  let { userContext, setuserContext } = useContext(UserContext);

  const router = useRouter();
  let pathname = router.pathname;

  // console.log(pathname);

  return (
    <div className={styles.container}>
      <Head title="Dashboard" />
      <section className={styles.sidebar}>
        <Link href="/">
          <div className={styles.logo}>
            <img alt="citsa vote" src="/vote.png" />
            <text>| Organizer</text>
          </div>
        </Link>

        <div className={styles.menus}>
          {/* <Link href="/profile">
            <div
              className={`${
                pathname == "/profile" ? styles.menuitem : styles.menuitem2
              }`}
            >
              {pathname == "/profile" ? (
                <img alt="citsa vote" src="/dashboard.png" />
              ) : (
                <img alt="citsa vote" src="/dashboard1.png" />
              )}
              <text>
                Events{" "}
               
              </text>
            </div>
          </Link> */}
          <Link href="/profile/voting">
            <div
              className={`${
                pathname.includes("/profile/voting")
                  ? styles.menuitem
                  : styles.menuitem2
              }`}
            >
              {pathname.includes("/profile/voting") ? (
                <img alt="citsa vote" src="/vote2.png" />
              ) : (
                <img alt="citsa vote" src="/vote1.png" />
              )}
              <text>Voting</text>
            </div>
          </Link>
          {/* <Link href="/profile/sms">
            <div
              className={`${
                pathname.includes("/profile/sms")
                  ? styles.menuitem
                  : styles.menuitem2
              }`}
            >
              {pathname.includes("/profile/sms") ? (
                <img
                  style={{
                    transform: "scale(1.3)",
                  }}
                  alt="citsa vote"
                  src="/chatting.png"
                />
              ) : (
                <img
                  style={{
                    transform: "scale(1.3)",
                  }}
                  alt="citsa vote"
                  src="/chatting2.png"
                />
              )}
              <text>SMS</text>
            </div>
          </Link> */}
          {userContext?.admin ? (
            <Link href="/profile/super">
              <div
                className={`${
                  pathname.includes("profile/super")
                    ? styles.menuitem
                    : styles.menuitem2
                }`}
              >
                {pathname.includes("profile/super") ? (
                  <img alt="citsa vote" src="/admin.png" />
                ) : (
                  <img alt="citsa vote" src="/admin2.png" />
                )}
                <text>Super Admin</text>
              </div>
            </Link>
          ) : null}
          {/* <Link href="/profile/notification">
            <div
              className={`${
                pathname == "notification" ? styles.menuitem : styles.menuitem2
              }`}
            >
              {pathname == "/profile/notification" ? (
                <img alt="citsa vote" src="/notification1.png" />
              ) : (
                <img alt="citsa vote" src="/notification.png" />
              )}
              <text>Notifications</text>
            </div>
          </Link>
          <Link href="/profile/setting">
            <div
              className={`${
                pathname == "/profile/setting"
                  ? styles.menuitem
                  : styles.menuitem2
              }`}
            >
              {pathname == "/profile/setting" ? (
                <img alt="citsa vote" src="/setting1.png" />
              ) : (
                <img alt="citsa vote" src="/setting.png" />
              )}
              <text>Settings</text>
            </div>
          </Link> */}
        </div>
      </section>

      {children}

      {!sidebar ? null : (
        <section className={styles.rightbar}>
          <div className={styles.searchcon}>
            <input placeholder="Search for your events" />
            <img alt="citsa vote" src="/loupe.png" />
          </div>

          <div className={styles.card}>
            <text className={styles.cardtitle}>Balance</text>
            <text className={styles.balance}>GHS 0.00</text>

            {/* <div className={styles.withdraw}>Withdraw</div> */}
          </div>
        </section>
      )}
    </div>
  );
}
