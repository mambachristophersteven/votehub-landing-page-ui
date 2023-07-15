import Link from "next/link";
import styles from "../../styles/Signup.module.css";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../functions";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { toaster, Spinner } from "evergreen-ui";
import Headd from "../../components/Head";
import { BASE_URL } from "../../config/api";

export default function AddNominee({ data }) {
  // Page 1
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [category, setcategory] = useState(false);
  let { userContext, setuserContext } = useContext(UserContext);
  const router = useRouter();

  // console.log(router.query.id);

  useEffect(async () => {
    let res = await localStorage.getItem("user");
    const useRes = JSON.parse(res);
    // setuserContext(useRes);
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);

  let poll = data ? data?.poll : {};

  // console.log(poll);

  return (
    <main className={styles.main}>
      <Headd title="Dashboard" />
      <div className={styles.nav}>
        <Link href="/">
          <img
            alt="citsa vote"
            data-aos="zoom-in"
            src="/vote.png"
            className={styles.logo}
          />
        </Link>
        <div className={styles.navlinks}>
          {userContext?.name ? (
            <Link href={`/profile/voting/${poll?.id}`}>
              <text className={styles.navitem}>{poll?.name}</text>
            </Link>
          ) : (
            <Link href="/login">
              <text className={styles.navitem}>Login</text>
            </Link>
          )}
        </div>
        <Link href="/">
          <img alt="citsa vote" src="/back.png" className={styles.menu} />
        </Link>
      </div>

      <h1 className={styles.h1}>Add Nominee</h1>

      {userContext?.name ? (
        <>
          <text className={styles.text}>Basic Information</text>

          <text className={styles.label}>Nominee Name</text>
          <input
            className={styles.input1}
            placeholder="Enter nominee name"
            onChange={(value) => {
              setname(value.target.value);
            }}
            value={name}
          />

          <text className={styles.label}>Select Category</text>
          <select
            onChange={(e) => {
              setcategory(e.target.value);
            }}
            className={styles.inputd}
            value={category}
          >
            {poll?.categories?.map((item) => {
              return (
                <option label={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <div
            onClick={async () => {
              if (category && name) {
                setloading(true);
                let payload = {
                  name: name,
                  category: category,
                  pollID: poll?.id,
                };

                // console.log(payload);

                let response = await func.addNominee(payload);
                // console.log("USE RES>>>>>>> ", response);

                if (response.status) {
                  toaster.success("Nominee added successfully", {
                    duration: 5,
                  });
                  setloading(false);
                  router.push(`/profile/voting/${poll?.id}`);
                } else {
                  setloading(false);
                  toaster.danger("Something went wrong, Please try again");
                }
              } else {
                toaster.notify("Fill all fields");
              }
            }}
            className={styles.btn}
          >
            {loading ? "Loading" : "Add Nominee"}
          </div>
        </>
      ) : (
        <>
          <text className={styles.text}>Login to continue</text>
          <Link href="/login">
            <div className={styles.btn}>Login</div>
          </Link>
        </>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  let res = await fetch(BASE_URL + "/getPoll", {
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
