import Head from "../components/Head";
import Link from "next/link";
import styles from "../styles/Signup.module.css";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { toaster } from "evergreen-ui";
import func from "../functions";
import { setCookie } from "../functions/cookies";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { userContext, setuserContext } = useContext(UserContext);
  const router = useRouter();

  let signIn = async (email, password) => {
    let userRes = await func.authUser({
      email: email.toLowerCase(),
      password: password,
    });
    if (userRes.status) {
      // console.log(userRes);
      setCookie("auth", userRes.user.id, 7);
      setuserContext(userRes.user);
      router.push("/profile/voting");
      setLoading(false);
    } else {
      setLoading(false);
      toaster.danger(userRes.message);
    }
  };

  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head title="Login" />

      <main className={styles.main}>
        <div className={styles.nav}>
          <Link href="/">
            <img
              alt="citsa vote"
              data-aos="zoom-in"
              src="/vote.png"
              className={styles.logo}
            />
          </Link>
        </div>

        <h1 className={styles.h1}>Login</h1>

        <text className={styles.label}>Email</text>
        <input
          className={styles.input1}
          placeholder="Enter your email"
          onChange={(value) => {
            setemail(value.target.value);
          }}
        />

        <text className={styles.label}>Password</text>
        <input
          className={styles.input1}
          placeholder="Enter your password"
          onChange={(value) => {
            setpassword(value.target.value);
          }}
          type="password"
        />

        <div
          onClick={() => {
            if (email && password) {
              setLoading(true);
              signIn(email, password);
            }
          }}
          className={styles.btn}
        >
          {loading ? "Loading..." : "Login"}
        </div>

        <Link href="/signup">
          <text className={{}}>New? Create an account</text>
        </Link>

        <Link href="/signup">
          <text className={styles.navitem}>Create an account</text>
        </Link>
      </main>
    </div>
  );
}
