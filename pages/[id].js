import Head from "../components/Head";
import styles from "../styles/Id.module.css";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { toaster } from "evergreen-ui";
import func from "../functions";

export default function Home(data) {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });

    if (data.data.status == false) {
      const router = useRouter();
      router.push("/404");
    }
  }, []);

  let event = data.data.event;
  // console.log(event.ticket);

  const [ticket, setticket] = useState(event?.ticket[0]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [modal, setmodal] = useState(false);
  const [imagemodal, setimagemodal] = useState(false);
  const [loading, setloading] = useState(false);

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.container}>
      <Head
        title={"Buy tickets for" + event.name + " | VoteHub"}
        image={event.imageURL}
      />

      <div className={styles.top}>
        <div className={styles.nav} data-aos="fade-down">
          <>
            <Link href="/">
              <img alt="citsa vote" src="/vote.png" className={styles.logo} />
            </Link>
            <Link href="/">
              <img alt="citsa vote" src="/vote.png" className={styles.logo1} />
            </Link>
          </>

          <div className={styles.imgs}>
            {/* <img alt="citsa vote" src="/ios.png" className={styles.app} /> */}
            <Link href="https://play.google.com/store/apps/details?id=africa.VoteHub.organizer">
              <img
                alt="citsa vote"
                src="/playstore.png"
                className={styles.app1}
              />
            </Link>
          </div>
        </div>
        <div className={styles.imgcon}>
          <img
            alt="citsa vote"
            data-aos="zoom-in"
            src={event.imageURL}
            className={styles.imagebg}
          />
          <img
            alt="citsa vote"
            // data-aos="zoom-in"
            src={event.imageURL}
            className={styles.image}
          />
          <div className={styles.overlay} />
          {event.totalTickets == event.ticketsBought ? (
            <div className={styles.rubber_stamp}>SOLD OUT</div>
          ) : null}
          <div
            data-aos="zoom-in"
            onClick={() => {
              setimagemodal(true);
            }}
            className={styles.openimage}
          >
            <text>open image</text>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          {/* <div className={styles.wrapper}>
            <h1 data-heading="event:">event:</h1>
          </div> */}
          <text className={styles.title}>{event.name}</text>
          <text className={styles.head}>About</text>
          <text className={styles.about}>{event.about}</text>
          <text className={styles.head}>Venue</text>
          <text className={styles.about}>
            {event.venue}
            <br />
            {event.country.name}{" "}
          </text>
          <text className={styles.head}>Date</text>
          <text className={styles.about}>
            {event.date.day +
              " " +
              months[Number(event.date.month - 1)] +
              ", " +
              event.date.year}
          </text>
          <text className={styles.head}>Time</text>
          <text className={styles.about}>{event.time}</text>

          <div className={styles.organizer}>
            <img
              alt="citsa vote"
              src={event.organizer.profileURL}
              className={styles.organizerImage}
            />
            <text className={styles.about}>{event.organizer.name}</text>
          </div>
        </div>
        <div className={styles.right}>
          {Date.now() > event.date.timestamp ? (
            <>
              <text className={styles.h1}>Event Ended</text>
              <div className={styles.wrapper}>
                <h1 data-heading="Passed">Passed</h1>
              </div>
            </>
          ) : (
            <>
              <text className={styles.h1}>Ticket</text>
              {/* <div className={styles.wrapper}>
            <h1 data-heading="ticket">ticket</h1>
          </div> */}
              <text className={styles.head}>Select a ticket</text>

              <select
                onChange={(e) => {
                  setticket(JSON.parse(e.target.value));
                  // console.log(JSON.parse(e.target.value));
                }}
                className={styles.select}
              >
                {event.ticket.map((item) => {
                  return (
                    <option value={JSON.stringify(item)}>{item.name}</option>
                  );
                })}
              </select>
              <text className={styles.head}>Price: </text>
              {ticket.price == 0 ? (
                <text className={styles.about}>FREEE</text>
              ) : (
                <text className={styles.about}>
                  <img
                    alt="citsa vote"
                    src={event.country.flag}
                    width={20}
                    height={14}
                  />
                  {event.country.currency +
                    " " +
                    Number(ticket.price).toFixed(2)}
                </text>
              )}
              <text className={styles.head}>Benefits: </text>
              <text className={styles.about}>{ticket.benefits}</text>

              {Number(ticket.quantity) == ticket.ticketsBought ? (
                <div className={styles.buy2}>SOLD OUT</div>
              ) : (
                <div
                  onClick={() => {
                    // console.log(ticket);
                    setmodal(true);
                  }}
                  className={styles.buy}
                >
                  Buy Ticket
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer ligth={true} styles={styles} />

      {modal ? (
        <div className={styles.modalcon} data-aos="zoom-in">
          <div className={styles.modal}>
            <img
              alt="citsa vote"
              onClick={() => {
                setmodal(false);
              }}
              className={styles.close}
              src="/close.png"
            />
            <text className={styles.h1}>Checkout</text>
            <text className={styles.head}>Total </text>

            <text className={styles.price}>
              {ticket.price == 0
                ? "FREE"
                : event.country.currency +
                  " " +
                  Number(ticket.price).toFixed(2)}
            </text>
            <text className={styles.about}>Proceed to pay</text>

            <input
              className={styles.input1}
              placeholder="Your Name"
              onChange={(value) => {
                setname(value.target.value);
              }}
            />
            <input
              className={styles.input1}
              placeholder="Email Address"
              type="email"
              onChange={(value) => {
                setemail(value.target.value);
              }}
            />
            <input
              className={styles.input}
              placeholder="Phone Number"
              type="tel"
              onChange={(value) => {
                setphone(value.target.value);
              }}
            />
            <text className={styles.head}>
              Please note that your ticket will be sent to this email address.
              Please provide a valid email address.
            </text>

            <div
              onClick={async () => {
                if (ticket && email && phone) {
                  setloading(true);

                  let payload = {
                    id: String(Date.now() * 123442456),
                    user: {
                      id: "P4I5r7LujihLZFsdbrnLHQX34Ec2",
                      email: email,
                      phone: phone,
                      name: name,
                    },
                    ticket: ticket,
                    event: event,
                    timestamp: String(Date.now()),
                  };

                  let response = await func.buyTicket(payload);

                  // console.log(response);

                  let url = await response?.data?.data?.authorization_url;
                  if (response.status) {
                    if (ticket.price == 0) {
                      window.open(await response.data, "_self");
                      setloading(false);
                    } else {
                      if (response.data?.status) {
                        window.open(await url, "_self");
                        setloading(false);
                      } else {
                        setloading(false);
                        if (response?.data?.message) {
                          toaster.notify(response?.data?.message);
                        }
                      }
                    }
                  } else {
                    if (ticket.price == 0) {
                      window.open(await response.data, "_self");
                      setloading(false);
                    } else {
                      setloading(false);
                      toaster.danger("Something went wrong, Please try again");
                    }
                  }
                } else {
                  toaster.notify(
                    "Please select a ticket first and enter your email address"
                  );
                }
              }}
              className={styles.buy}
            >
              {loading ? "Loading..." : "Pay"}
            </div>

            <text className={styles.head}>
              Payment Secured by <strong>Paystack</strong>{" "}
            </text>
          </div>
        </div>
      ) : null}
      {imagemodal ? (
        <div className={styles.modalcon} data-aos="zoom-in">
          <div className={styles.imgmodal}>
            <img
              alt="citsa vote"
              onClick={() => {
                setimagemodal(false);
              }}
              className={styles.close}
              src="/close.png"
            />
            <img
              alt="citsa vote"
              onClick={() => {
                setmodal(false);
              }}
              className={styles.imgm}
              src={event.imageURL}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  //   console.log(id);

  let res = await fetch(
    "https://VoteHub-backend.onrender.com/api/getEventsById",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }
  );

  let data = await res.json();
  if (data.status == false) {
    context.res.setHeader("Location", "/404");
    context.res.statusCode = 302;
    context.res.end();
  }
  return { props: { data: data } };
}
