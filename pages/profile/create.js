import Link from "next/link";
import styles from "../../styles/Signup.module.css";
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import func from "../../functions";
import Ad from "../../components/Ad";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { toaster, Spinner } from "evergreen-ui";
import fauth from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Headd from "../../components/Head";

export default function Create() {
  // Page 1
  const [type, setype] = useState("live");
  const [name, setname] = useState("");
  const [about, setabout] = useState("");
  const [location, setlocation] = useState("");
  const [country, setcountry] = useState({
    name: "Ghana",
    currency: "GHS",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/255px-Flag_of_Ghana.svg.png",
  });
  const [category, setcategory] = useState("concert");
  // Page 2
  const [date, sedate] = useState("");
  const [fakedate, setfakedate] = useState("");
  const [time, settime] = useState("");
  // Page 3
  const [image, setimage] = useState("");
  const [slug, setslug] = useState("");
  // Page 4
  const [tickets, settickets] = useState([]);
  const [ticketname, setticketname] = useState("");
  const [ticketprice, seticketprice] = useState(0);
  const [ticketquantity, setticketquantity] = useState("");
  const [benefits, sebenefits] = useState("");
  const [progress, setprogress] = useState(0);
  const [loading, setloading] = useState(false);
  const [isslugging, setisslugging] = useState(false);
  const [ispaid, setispaid] = useState(true);
  const [hidetix, sethidetix] = useState(false);
  const [passfee, setpassfee] = useState(false);

  const [page, setpage] = useState(1);
  const storage = getStorage();
  let { userContext, setuserContext } = useContext(UserContext);
  const router = useRouter();

  function add(accumulator, a) {
    return accumulator + Number(a.quantity);
  }

  const countries = [
    {
      name: "Ghana",
      currency: "GHS",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/255px-Flag_of_Ghana.svg.png",
    },
    // {
    //   name: "Nigeria",
    //   currency: "NRN",
    //   flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/2560px-Flag_of_Nigeria.svg.png",
    // },
    // {
    //   name: "South Africa",
    //   currency: "ZAR",
    //   flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/255px-Flag_of_South_Africa.svg.png",
    // },
  ];

  const pickImage = async (img) => {
    // console.log(img);
    // const response = await fetch(img);
    // const blob = await response.blob();

    const storageRef = ref(storage, "event" + Date.now() + "abcdefghifk");

    const upload = uploadBytesResumable(storageRef, img);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(Math.round(progress));
        // console.log(progress)
      },
      (error) => {
        toaster.danger("Error occuried when uploading picture, try again.");
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setimage(downloadURL);
        });
      }
    );
  };

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

      <h1 className={styles.h1}>Create Event</h1>

      {userContext?.name ? (
        page == 1 ? (
          <>
            <text className={styles.text}>Event Information</text>

            <text className={styles.label}>Event Type</text>
            <div className={styles.types}>
              <div
                onClick={() => {
                  setype("live");
                }}
                style={{
                  border: type == "live" ? "#015cef solid 2px" : "none",
                }}
                className={styles.type}
              >
                Live Event
              </div>
              <div
                onClick={() => {
                  toaster.notify("Online events are currently not supported.", {
                    duration: 5,
                  });
                }}
                style={{
                  border: type == "online" ? "#015cef solid 2px" : "none",
                }}
                className={styles.type}
              >
                Online Event
              </div>
            </div>

            <text className={styles.text}>
              {" "}
              <br />
              <br />
              Basic Information
            </text>

            <text className={styles.label}>Event Name</text>
            <input
              className={styles.input1}
              placeholder="Enter event name"
              onChange={(value) => {
                setname(value.target.value);
              }}
              value={name}
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

            <text className={styles.label}>Location of Event</text>
            <input
              className={styles.input1}
              placeholder="Enter venue for your event"
              onChange={(value) => {
                setlocation(value.target.value);
              }}
              value={location}
            />

            <text className={styles.label}>Select Country</text>
            <select
              onChange={(e) => {
                setcountry(JSON.parse(e.target.value));
                // console.log(ticket);
              }}
              className={styles.inputd}
              value={JSON.stringify(country)}
            >
              {countries.map((item) => {
                return (
                  <option value={JSON.stringify(item)}>{item.name}</option>
                );
              })}
            </select>

            <text className={styles.label}>Event Category</text>
            <select
              onChange={(e) => {
                setcategory(e.target.value);
                // console.log(ticket);
              }}
              className={styles.inputd}
              value={category}
            >
              <option label="concert" value="Concert">
                Concert
              </option>
              <option label="arts & culture" value="Arts & Culture">
                arts & culture
              </option>
              <option label="business" value="Business">
                business
              </option>
              <option label="charity & aid" value="Charity & Aid">
                charity & aid
              </option>
              <option label="children & youth" value="Children & Youth">
                children & youth
              </option>
              <option label="community" value="Community">
                community
              </option>
              <option label="outdoor & party" value="Outdoor & Party">
                outdoor & party
              </option>
              <option label="film / media" value="Film / Media">
                film / media
              </option>
              <option label="music" value="Music">
                music
              </option>
              <option label="school & education" value="School & Education">
                school & education
              </option>
              <option label="startups" value="Startups">
                startups
              </option>
              <option label="technology" value="Technology">
                technology
              </option>
            </select>

            <div
              onClick={() => {
                if (type && name && about && location && country && category) {
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
              <text className={styles.text}>Event Time & Date</text>
              <img
                alt="citsa vote"
                onClick={() => {
                  setpage(page - 1);
                }}
                src="/back.png"
                className={styles.back}
              />
            </div>

            <text className={styles.label}>Event Date</text>
            <input
              className={styles.inputdd}
              placeholder="Date"
              onChange={(value) => {
                let dateobj = {
                  day: new Date(value.target.valueAsNumber).getDate(),
                  month: new Date(value.target.valueAsNumber).getMonth() + 1,
                  year: new Date(value.target.valueAsNumber).getFullYear(),
                  timestamp: value.target.valueAsNumber,
                  datestring: new Date(value.target.valueAsNumber),
                };
                sedate(dateobj);
                setfakedate(value.target.value);
                // console.log(dateobj);
              }}
              type="date"
              value={fakedate}
            />

            <text className={styles.label}>Event Time</text>
            <input
              className={styles.inputdt}
              placeholder="Time"
              onChange={(value) => {
                settime(value.target.value);
                // console.log(value.target.value);
              }}
              type="time"
              value={time}
            />

            <div
              onClick={() => {
                if (date && time) {
                  setpage(3);
                } else {
                  toaster.notify("Fill all fields");
                }
              }}
              className={styles.btn}
            >
              Next
            </div>
          </>
        ) : page == 3 ? (
          <>
            <div className={styles.head}>
              <text className={styles.text}>Cover Image & URL</text>
              <img
                alt="citsa vote"
                onClick={() => {
                  setpage(page - 1);
                }}
                src="/back.png"
                className={styles.back}
              />
            </div>

            <text className={styles.label}>Cover Image</text>

            <div className={styles.fcon}>
              <input
                onChange={(value) => {
                  pickImage(value.target.files[0]);

                  // console.log(value.target.files[0])
                }}
                className={styles.inputf}
                type="file"
                accept="image/*"
              />
              {progress < 100 && progress > 0 ? (
                <Spinner size={30} />
              ) : image ? (
                <img alt="citsa vote" src={image} className={styles.upimg} />
              ) : null}
            </div>
            <text className={styles.label1}>
              {progress ? "Uploading: " + progress : null}
            </text>

            <text className={styles.label}>Custom URL (optional)</text>
            <div className={styles.inputz}>
              <input
                className={styles.inputx}
                placeholder="VoteHub.africa/"
                disabled
              />
              <input
                className={styles.inputy}
                placeholder="Type here"
                onChange={(value) => {
                  setslug(value.target.value);
                }}
              />
            </div>
            <text className={styles.label1}>
              * This will be sharable link for your event. Example
              www.VoteHub.africa/bhimconcert
            </text>

            <div
              onClick={async () => {
                if (image) {
                  if (slug) {
                    setisslugging(true);
                    let response = await func.checkSlug({ id: slug });
                    // console.log("USE RES>>>>>>> ", response);
                    if (response.status) {
                      setpage(4);
                      setisslugging(false);
                    } else {
                      setisslugging(false);
                      toaster.danger(response.message);
                    }
                  } else {
                    setpage(4);
                  }
                } else {
                  toaster.notify("Fill all fields");
                }
              }}
              className={styles.btn}
            >
              {isslugging ? "Checking" : "Next"}
            </div>
          </>
        ) : page == 4 ? (
          <>
            <div className={styles.head}>
              <text className={styles.text}>Add Tickets</text>
              <img
                alt="citsa vote"
                onClick={() => {
                  setpage(page - 1);
                }}
                src="/back.png"
                className={styles.back}
              />
            </div>
            <div className={styles.types}>
              <div
                onClick={() => {
                  setispaid(true);
                }}
                style={{
                  border: ispaid ? "#015cef solid 2px" : "none",
                }}
                className={styles.type}
              >
                Paid Event
              </div>
              <div
                onClick={() => {
                  setispaid(false);
                  seticketprice("0");
                }}
                style={{
                  border: !ispaid ? "#015cef solid 2px" : "none",
                }}
                className={styles.type}
              >
                Free Event
              </div>
            </div>

            <text className={styles.label}>Tickets</text>

            {tickets.length > 0 ? (
              tickets.map((item, index) => {
                return (
                  <div className={styles.displatticket}>
                    <div className={styles.task}>
                      <div className={styles.icon}>{index + 1}</div>
                      <div>
                        <div className={styles.tickettext}>{item.name}</div>
                        <div className={styles.text}> x {item.quantity} </div>
                      </div>
                    </div>

                    <div className={styles.status}>
                      <div className={styles.iconoff}> </div>
                      <div className={styles.text}>
                        {" "}
                        GHS {Number(item.price).toFixed(2)}{" "}
                      </div>
                    </div>

                    <img
                      alt="citsa vote"
                      src="/close.png"
                      alt="remove"
                      className={styles.removeticket}
                      onClick={() => {
                        let arr = tickets;
                        const inx = index;
                        if (inx > -1) {
                          arr.splice(inx, 1);
                        }

                        settickets([...arr]);
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <text>no tickets added</text>
            )}

            {hidetix && !(tickets.length == 0) ? (
              <div
                onClick={() => {
                  sethidetix(false);
                }}
                className={styles.btn1}
              >
                Create a Ticket
              </div>
            ) : (
              <div className={styles.cont}>
                <text className={styles.label}>Ticket Name/Type</text>
                <input
                  className={styles.input1}
                  placeholder="Enter event name or type"
                  onChange={(value) => {
                    setticketname(value.target.value);
                  }}
                  value={ticketname}
                />

                {!ispaid ? null : (
                  <>
                    <text className={styles.label}>Price Price</text>
                    <div className={styles.inputz}>
                      <input
                        className={styles.inputx}
                        placeholder="GHS"
                        disabled
                      />
                      <input
                        className={styles.inputy}
                        placeholder="Type amount here"
                        onChange={(value) => {
                          seticketprice(value.target.value);
                          // console.log(typeof value.target.value);
                        }}
                        type="number"
                        inputMode="numeric"
                        value={ticketprice}
                      />
                    </div>
                  </>
                )}

                <div className={styles.charge}>
                  <text className={styles.chargetext}>
                    Pass fee to customer?
                  </text>
                  <label className={styles.switch}>
                    <input
                      onChange={(val) => {
                        if (passfee == false) {
                          setpassfee(true);
                        } else {
                          setpassfee(false);
                        }
                        console.log(passfee);
                      }}
                      value={passfee}
                      className={styles.inputs}
                      type="checkbox"
                    />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                  </label>
                </div>

                <text className={styles.label}>Ticket Quantity</text>
                <input
                  className={styles.input1}
                  placeholder="Enter event name or type"
                  onChange={(value) => {
                    setticketquantity(value.target.value);
                  }}
                  type="number"
                  inputMode="numeric"
                  value={ticketquantity}
                />

                <text className={styles.label}>Benefits or Perks</text>
                <input
                  className={styles.input1}
                  placeholder="Enter perks here"
                  onChange={(value) => {
                    sebenefits(value.target.value);
                  }}
                  value={benefits}
                />

                <div
                  onClick={() => {
                    if (ticketname && ticketprice && ticketquantity) {
                      let arr = tickets;
                      arr.push({
                        name: ticketname,
                        price: Number(ticketprice),
                        quantity: String(ticketquantity),
                        benefits: benefits,
                      });
                      settickets([...arr]);

                      setticketname("");
                      setticketquantity("");
                      sebenefits("");
                      seticketprice("");

                      sethidetix(true);
                    } else {
                      toaster.notify("Fill all fields");
                    }
                  }}
                  className={styles.btn1}
                >
                  Add Ticket
                </div>
              </div>
            )}

            <div
              onClick={async () => {
                if (tickets.length > 0) {
                  setloading(true);
                  let payload = {
                    name: name,
                    time: time,
                    date: date,
                    timestamp: String(date.timestamp),
                    about: about,
                    userid: userContext?.id,
                    ticket: tickets,
                    venue: location,
                    imageurl: image,
                    type: category,
                    organizer: userContext?.organizer,
                    totaltickets: tickets.reduce(add, 0),
                    ticketsbought: 0,
                    approved: false,
                    country: country,
                    slug: slug,
                    passfee: passfee,
                  };

                  // console.log(payload);

                  let response = await func.createEvent(payload);
                  // console.log("USE RES>>>>>>> ", response);
                  if (response.status) {
                    toaster.success(
                      "Your event has been submitted for review.",
                      { duration: 5 }
                    );
                    setloading(false);
                    router.push("/profile");
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
