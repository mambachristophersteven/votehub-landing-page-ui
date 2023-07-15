import "../styles/globals.css";
import "../styles/style.css";
import "../styles/snip.css";
import styles from "../styles/App.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { getCookie } from "../functions/cookies";
import func from "../functions";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function MyApp({ Component, pageProps }) {
  const [userContext, setuserContext] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setloading] = useState(true);

  const router = useRouter();
  const path = useRouter().pathname;

  useEffect(() => {
    const run = async () => {
      setloading(true);
      let token = getCookie("auth");
      // console.log("auth" + token);

      if (!token) {
        if (path.includes("profile")) {
          router.push("/login").then(() => {
            setloading(false);
            setIsLogged(false);
          });
        }
        setloading(false);
        return;
      }

      let userRes = await func.getUser({
        id: token,
      });

      let data = userRes;

      if (!data.status) {
        setloading(false);
        setIsLogged(false);
      }

      if (data.status) {
        setIsLogged(true);
        // console.log(data.user);
        setuserContext(data.user);

        if (!data.user?.admin && path.includes("profile/super")) {
          router.push("/profile");
          setloading(false);
        }
        if (
          path.includes("profile") ||
          path.includes("create") ||
          path.includes("vote") ||
          path.includes("results")
        ) {
          setloading(false);
        } else if (path.includes("login") || path.includes("signup")) {
          router.push("/profile");
          setloading(false);
        } else {
          router.push("/").then(() => {
            setloading(false);
          });
        }
      } else {
        if (path !== "/" || path == "/terms" || path == "/privacy") {
          router.push("/login").then(() => {
            setloading(false);
            setIsLogged(false);
          });
        }
      }
    };

    run();
  }, []);

  if (loading) {
    return (
      <main className={styles.body}>
        <div className={styles.box}>
          {/* <img alt="citsa vote" src="/loader/1.png" className={styles.one} />
          <img alt="citsa vote" src="/loader/2.png" className={styles.two} />
          <img
            alt="citsa vote"
            src="/loader/3.png"
            className={styles.three}
          /> */}
          <img src="/vote.png" className={styles.logo} />
          Loading...
        </div>
      </main>
    );
  }

  return (
    <UserContext.Provider value={{ userContext, setuserContext }}>
      <div>
        <Component {...pageProps} />
        {/* {path.includes("profile") ? (
          <main className={styles.body2}>
            <img
              alt="citsa vote"
              src="/smartphone.png"
              className={styles.phone}
            />
            <text className={styles.infotxt}>
              {`Sorry! You can't use the Dashboard on a mobile phone, \npleasechange to desktop view or use a larger display`}
            </text>
          </main>
        ) : null} */}

        <FloatingWhatsApp
          phoneNumber="+233247956850"
          accountName="Sir. Sam"
          statusMessage="We reply instantly"
          avatar="/sam.jpeg"
        />
      </div>
    </UserContext.Provider>
  );
}

export default MyApp;
