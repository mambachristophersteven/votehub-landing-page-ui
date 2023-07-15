import Head from "../components/Head";
import Link from "next/link";
import styles from "../styles/Signup.module.css";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../functions";
import { UserContext } from "../context";

import router from "next/router";
import { toaster } from "evergreen-ui";
import Footer from "../components/Footer";

export default function Signup() {
  const [type, setype] = useState("individual");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  let { userContext, setuserContext } = useContext(UserContext);

  let signUp = async (type, name, email, phone, password) => {
    const ref = func.generateQuickGuid();

    let response = await func.createUser({
      name: name,
      email: email.toLowerCase(),
      phone: phone,
      password: password,
      id: ref,
      isorganizer: true,
      organizer: {
        id: ref + "events",
        name: name,
        email: email.toLowerCase(),
        phone: phone,
        userid: ref,
        type: type,
        profileurl: `https://avatars.dicebear.com/api/adventurer/${email}.svg`,
        balance: 0,
      },
    });
    // console.log(response);
    if (response?.status) {
      localStorage.setItem("user", JSON.stringify(response.user));
      setuserContext(response.user);
      router.push("/profile/voting");
      setLoading(false);
    } else {
      toaster.notify("Hmm... What went wrong?");
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
      <Head title="Sign Up" />

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

        <h1 className={styles.h1}>Sign Up</h1>

        <text className={styles.text}>Organizer Information</text>

        <text className={styles.label}>Account Type</text>
        <div className={styles.types}>
          <div
            onClick={() => {
              setype("individual");
            }}
            style={{
              border: type == "individual" ? "#015cef solid 2px" : "none",
            }}
            className={styles.type}
          >
            Individual
          </div>
          <div
            onClick={() => {
              setype("organization");
            }}
            style={{
              border: type == "organization" ? "#015cef solid 2px" : "none",
            }}
            className={styles.type}
          >
            Organization
          </div>
        </div>

        <text className={styles.text}>
          {" "}
          <br />
          <br />
          Basic Information
        </text>

        <text className={styles.label}>Username</text>
        <input
          className={styles.input1}
          placeholder="Enter your username"
          onChange={(value) => {
            setname(value.target.value);
          }}
        />

        <text className={styles.label}>Email</text>
        <input
          className={styles.input1}
          placeholder="Enter your email"
          onChange={(value) => {
            setemail(value.target.value);
          }}
        />

        <text className={styles.label}>Phone</text>
        <input
          className={styles.input1}
          placeholder="Enter your phone number"
          onChange={(value) => {
            setphone(value.target.value);
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
            if (type && name && email && phone && password) {
              setLoading(true);
              signUp(type, name, email, phone, password);
            }
          }}
          className={styles.btn}
        >
          {loading ? "Loading..." : "Signup"}
        </div>
        <text style={{ marginTop: "-1vw" }} className={styles.label}>
          *By signing up you have a agreed to our{" "}
          <Link href="/terms">
            <a style={{ color: "#03b5d2" }}>Terms & Conditions</a>
          </Link>{" "}
          and{" "}
          <Link href="/privacy">
            <a style={{ color: "#03b5d2" }}>Privacy Policy</a>
          </Link>
          .
        </text>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
