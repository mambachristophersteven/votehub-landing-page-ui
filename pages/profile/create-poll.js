import Link from "next/link";
import styles from "../../styles/Signup.module.css";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../functions";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { toaster, Spinner } from "evergreen-ui";

export default function CreatePoll() {
  // Page 1
  const [name, setname] = useState("");
  const [initials, setinitials] = useState("");
  const [about, setabout] = useState("");

  // Page 2
  // Page 4
  const [categories, setcategories] = useState([]);
  const [ticketname, setticketname] = useState("");
  const [voteprice, sevoteprice] = useState(0);
  const [progress, setprogress] = useState(0);
  const [loading, setloading] = useState(false);
  const [hidetix, sethidetix] = useState(false);

  const [page, setpage] = useState(1);
  let { userContext, setuserContext } = useContext(UserContext);
  const router = useRouter();

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
  return (
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
        <div className={styles.navlinks}>
          {userContext?.name ? (
            <Link href="/profile">
              <text className={styles.navitem}>Dashboard</text>
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

      <h1 className={styles.h1}>Create Poll</h1>

      {userContext?.name ? (
        page == 1 ? (
          <>
            <text className={styles.text}>Poll Information</text>

            <text className={styles.label}>Event Name</text>
            <input
              className={styles.input1}
              placeholder="Enter event name"
              onChange={(value) => {
                setname(value.target.value);
              }}
              value={name}
            />

            <text className={styles.label}>Initials</text>
            <input
              className={styles.input1}
              placeholder="Enter event initials"
              onChange={(value) => {
                setinitials(value.target.value);
              }}
              value={initials}
              maxLength={2}
            />

            <text className={styles.label}>About</text>
            <textarea
              className={styles.textarea}
              placeholder="Describe event"
              onChange={(value) => {
                setabout(value.target.value);
              }}
              value={about}
            />

            <text className={styles.label}>Cost per vote(GHS)</text>
            {/* List of buttons with price */}
            <div className={styles.prices}>
              <div
                className={styles.price}
                onClick={() => {
                  sevoteprice(0.5);
                }}
                style={{
                  backgroundColor: voteprice == 0.5 ? "#0155ef" : "#a6b9eb",
                }}
              >
                50p
              </div>
              <div
                className={styles.price}
                onClick={() => {
                  sevoteprice(0.7);
                }}
                style={{
                  backgroundColor: voteprice == 0.7 ? "#0155ef" : "#a6b9eb",
                }}
              >
                70p
              </div>
              <div
                className={styles.price}
                onClick={() => {
                  sevoteprice(1);
                }}
                style={{
                  backgroundColor: voteprice == 1 ? "#0155ef" : "#a6b9eb",
                }}
              >
                1 GHS
              </div>
            </div>

            <div
              onClick={() => {
                if (name && about && voteprice) {
                  setpage(2);
                } else {
                  toaster.notify("Fill all fields");
                }
              }}
              className={styles.btn}
            >
              Next
            </div>
          </>
        ) : page == 2 ? (
          <>
            <div className={styles.head}>
              <text className={styles.text}>Add Categories</text>
              <img
                alt="citsa vote"
                onClick={() => {
                  setpage(page - 1);
                }}
                src="/back.png"
                className={styles.back}
              />
            </div>

            <text className={styles.label}>Categories</text>

            {categories.length > 0 ? (
              categories.map((item, index) => {
                return (
                  <div className={styles.displatticket}>
                    <div className={styles.task}>
                      <div className={styles.icon}>{index + 1}</div>
                      <div>
                        <div className={styles.tickettext}>{item}</div>
                      </div>
                    </div>

                    <img
                      alt="citsa vote"
                      src="/close.png"
                      alt="remove"
                      className={styles.removeticket}
                      onClick={() => {
                        let arr = categories;
                        const inx = index;
                        if (inx > -1) {
                          arr.splice(inx, 1);
                        }

                        setcategories([...arr]);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <text>No categories added yet</text>
            )}

            {hidetix && !(categories.length == 0) ? (
              <div
                onClick={() => {
                  sethidetix(false);
                }}
                className={styles.btn1}
              >
                Add a new category
              </div>
            ) : (
              <div className={styles.cont}>
                <text className={styles.label}>Category Name</text>
                <input
                  className={styles.input1}
                  placeholder="Enter category"
                  onChange={(value) => {
                    setticketname(value.target.value);
                  }}
                  value={ticketname}
                />

                <div
                  onClick={() => {
                    if (ticketname) {
                      let arr = categories;
                      arr.push(ticketname);
                      setcategories([...arr]);
                      setticketname("");
                      sethidetix(true);
                    } else {
                      toaster.notify("Fill all fields");
                    }
                  }}
                  className={styles.btn1}
                >
                  Add Category
                </div>
              </div>
            )}

            <div
              onClick={async () => {
                if (categories.length > 0) {
                  let date = Date.now();
                  setloading(true);
                  let payload = {
                    name: name,
                    // timestamp: String(date.timestamp),
                    about: about,
                    userid: userContext?.id,
                    categories: categories,
                    costPerVote: voteprice,
                    // approved: false,
                    initials: initials.toUpperCase(),
                  };

                  // console.log(payload);

                  let response = await func.createPoll(payload);
                  // console.log("USE RES>>>>>>> ", response);

                  if (response.status) {
                    toaster.success(
                      "Your event has been submitted for review.",
                      { duration: 5 }
                    );
                    setloading(false);
                    router.push("/profile/voting");
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
              {loading ? "Loading" : "Publish"}
            </div>
          </>
        ) : null
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
