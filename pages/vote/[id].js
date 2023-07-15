import Head from "../../components/Head";
import Link from "next/link";
import styles from "../../styles/Vote.module.scss";
import stylesid from "../../styles/Id.module.css";
import { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../components/Footer";
import { UserContext } from "../../context";
import func from "../../functions";
import { useRouter } from "next/router";
import { toaster } from "evergreen-ui";
import { BASE_URL } from "../../config/api";

export default function Vote({ data }) {
  let { userContext, setuserContext } = useContext(UserContext);
  const [numOfVotes, setNumOfVotes] = useState(0);
  const [phoneNumber, setphoneNumber] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  let nominee = data ? data?.nominee[0] : {};
  let poll = data ? data?.poll : {};

  const handleVote = async () => {
    if (!numOfVotes && !phoneNumber) return;

    setloading(true);
    let response = await func.castVote({
      nominee: nominee,
      poll: poll,
      numberOfVotes: Number(numOfVotes),
      email: phoneNumber + "@VoteHub.africa",
      timestamp: String(Date.now()),
    });

    // console.log(response);
    let url = await response?.data?.data?.authorization_url;
    if (response.status) {
      if (response.data?.status) {
        setloading(false);
        window.open(await url, "_self");
      } else {
        setloading(false);
        if (response?.data?.message) {
          toaster.notify(response?.data?.message);
        }
      }
    } else {
      setloading(false);
      toaster.danger("Something went wrong, Please try again");
    }
  };

  // console.log(data);
  useEffect(async () => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head
        title={`Vote ${nominee?.name} for ${nominee?.category}  -  ${poll?.name}`}
      />

      <main class={styles.main}>
        <h1 className={styles.h1}>Vote {nominee?.name}</h1>
        <text className={styles.text2}>
          {nominee?.category + " - " + poll?.name}{" "}
        </text>

        {/* <text className={styles.h2}>General</text> */}
        <text className={styles.text}></text>

        {poll?.avaliable ? (
          <div className={stylesid.modal}>
            <text className={stylesid.about}>
              Cast Vote ({poll?.costPerVote}GHC per vote)
            </text>

            <input
              className={stylesid.input1}
              placeholder="Number of Votes"
              onChange={(value) => {
                setNumOfVotes(value.target.value);
              }}
              type="number"
            />
            <input
              className={stylesid.input1}
              placeholder="Your Phone Number"
              type="text"
              onChange={(value) => {
                setphoneNumber(value.target.value);
              }}
            />

            <div onClick={handleVote} className={stylesid.buy}>
              {loading ? "Loading..." : "Vote"}
            </div>

            <text className={stylesid.head}>
              Payment Secured by <strong>Paystack</strong>{" "}
            </text>
            <div className={styles.nav}>
              <text className={styles.text}>Powered by:</text>
              <Link href="/">
                <img
                  alt="citsa vote"
                  data-aos="zoom-in"
                  src="/vote.png"
                  className={styles.logo}
                />
              </Link>
            </div>
          </div>
        ) : (
          <text className={styles.text2}>This event is closed</text>
        )}
      </main>

      {/* <Footer styles={styles} /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  let res = await fetch(BASE_URL + "/getNominee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  // console.log(res);
  let data = [];
  data = await res.json();

  // console.log(data);
  return { props: { data: data ? data : null } };
}
