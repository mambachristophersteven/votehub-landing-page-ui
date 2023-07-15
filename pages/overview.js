import Head from "../components/Head";
import Link from "next/link";
import styles from "../styles/Overview.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";

export default function Overview() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head title="How It Works" />

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
            <Link href="/discover">
              <text className={styles.navitem}>Discover</text>
            </Link>
            {/* <text className={styles.navitem}>Download</text> */}
          </div>
          <img
            alt="citsa vote"
            onClick={() => {
              document.getElementById("sidemenu").style.left = "0";
            }}
            src="/menu.png"
            className={styles.menu}
          />
        </div>

        <SideNav />
        <text data-aos="zoom-in" className={styles.mainText}>
          Grow your events
        </text>
        <text data-aos="zoom-in" className={styles.subText}>
          VoteHub gives you the toolkit you need to take your events to the next
          level.
          <br />
          <br />
          <strong>How VoteHub works</strong>
        </text>
      </main>
      <main className={styles.main2}>
        <text className={styles.h1}>Create professional listings</text>
        <text className={styles.text2}>
          Create a professional, seamless experience for your attendees at every
          stage of your event.
        </text>
        <div className={styles.points} data-aos="fade-up">
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Event Creation</text>
            </div>
            <text className={styles.text}>
              Download and create an account on our mobile app, then proceed to
              request an organizer acount to access the dashboard.
              <br />
              The straightforward dashboard enables you to add and maintain your
              event listings and manage ticket sales and much more.
            </text>
          </div>
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Promote & Sell</text>
            </div>
            <text className={styles.text}>
              You can incentivise your customers with our in-app promotions
              which makes sure your events are shown first.
              <br />
              You also get social media campaignes for your events for FREE.
              <br />
              Customers can choose to book online, instantly and securely with
              payment by Mobile money or credit & debit card.
            </text>
          </div>
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Check-ins</text>
            </div>
            <text className={styles.text}>
              Keep track of entry progress by scanning and validating ticket
              barcodes with our iOS and Android apps, or employ us to handle all
              your check-in process for your event.
              <br />
              Our personnels will be at your event to help check-in guests.
            </text>
          </div>
        </div>
      </main>
      <main className={styles.main2}>
        <text className={styles.h1}>Make data-driven decisions</text>
        <text className={styles.text2}>
          Focus your time and budget on what's working best with real-time,
          actionable insights into how your events are performing, where your
          attendees find you, and more.
        </text>
        <div className={styles.points} data-aos="fade-up">
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Analytics</text>
            </div>
            <text className={styles.text}>
              Discover where sales are coming from and what marketing efforts
              are working best with real-time insights. <br />
              Monitor real-time sale and ticket count.
            </text>
          </div>
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Report</text>
            </div>
            <text className={styles.text}>
              Get detailed information about your ticket buyers, ticket sales,
              event attendance, and more.
              <br />
              Get notified when someone buys your ticket.
            </text>
          </div>
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Organizer App</text>
            </div>
            <text className={styles.text}>
              Monitor ticket sales and check-ins in real-time from your phone
              with our easy-to-use mobile app.
              <br />
              <br></br>
              <Link href="/">Download</Link>
            </text>
          </div>
        </div>
      </main>
      <main className={styles.main2}>
        <text className={styles.h1}>Build your community</text>
        <text className={styles.text2}>
          Reach new customers, drive demand, and build relationships with our
          powerful, built-in marketing and communication tools.
        </text>
        <div className={styles.points} data-aos="fade-up">
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Integrate</text>
            </div>
            <text className={styles.text}>
              Sell tickets from your own website.
              <br /> Embed the full VoteHub checkout experience on your own
              website to make it easier for your customers to discover your
              event.
            </text>
          </div>
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Custom Links</text>
            </div>
            <text className={styles.text}>
              Share your event with your peer on social media with your custom
              and short links.
              <br />
              With your custom link, your customers can easly by tickets without
              having to download our app or create account to access your event.
            </text>
          </div>
          <div className={styles.point}>
            <div className={styles.head}>
              <img alt="citsa vote" src="/mark.png" className={styles.check} />
              <text className={styles.h2}>Seating Plan</text>
            </div>
            <text className={styles.text}>
              Create venue seating plans to allow your customers choose their
              prefered sitting postion in advance.
              <br></br>
              <Link href="/">Contact us</Link> to build this feature for your
              event.
            </text>
          </div>
        </div>
      </main>

      <div className={styles.faq} data-aos="zoom-in">
        <text className={styles.h1}>FAQ</text>
        <div className={styles.accordion}>
          <div className={styles.accordionitem}>
            <button
              id="accordionbutton1"
              aria-expanded="false"
              onClick={() => {
                const itemToggle = document
                  .getElementById("accordionbutton1")
                  .getAttribute("aria-expanded");

                document
                  .getElementById("accordionbutton1")
                  .setAttribute("aria-expanded", "false");

                if (itemToggle == "false") {
                  document
                    .getElementById("accordionbutton1")
                    .setAttribute("aria-expanded", "true");
                }
              }}
            >
              <span className={styles.accordiontitle}>
                Who can use citsa vote?
              </span>
              <span className={styles.icon} aria-hidden="true"></span>
            </button>
            <div className={styles.accordioncontent}>
              <p>
                VoteHub is available to anyone to discover and buy tickets or to
                create events with our event management tools.
              </p>
            </div>
          </div>
          <div className={styles.accordionitem}>
            <button
              id="accordionbutton2"
              aria-expanded="false"
              onClick={() => {
                const itemToggle = document
                  .getElementById("accordionbutton2")
                  .getAttribute("aria-expanded");

                document
                  .getElementById("accordionbutton2")
                  .setAttribute("aria-expanded", "false");

                if (itemToggle == "false") {
                  document
                    .getElementById("accordionbutton2")
                    .setAttribute("aria-expanded", "true");
                }
              }}
            >
              <span className={styles.accordiontitle}>
                How many events can I create?
              </span>
              <span className={styles.icon} aria-hidden="true"></span>
            </button>
            <div className={styles.accordioncontent}>
              <p>
                You are at liberty to create as many events as you want, our
                tools will help you management them like a PRO.
              </p>
            </div>
          </div>
          <div className={styles.accordionitem}>
            <button
              id="accordionbutton3"
              aria-expanded="false"
              onClick={() => {
                const itemToggle = document
                  .getElementById("accordionbutton3")
                  .getAttribute("aria-expanded");

                document
                  .getElementById("accordionbutton3")
                  .setAttribute("aria-expanded", "false");

                if (itemToggle == "false") {
                  document
                    .getElementById("accordionbutton3")
                    .setAttribute("aria-expanded", "true");
                }
              }}
            >
              <span className={styles.accordiontitle}>
                How much does it cost to create events?
              </span>
              <span className={styles.icon} aria-hidden="true"></span>
            </button>
            <div className={styles.accordioncontent}>
              <p>
                Creating events is totally free, however we take 2% payment
                processing fee + 3% service charge for all tickets sold. Free
                events are always free.
              </p>
            </div>
          </div>
          <div className={styles.accordionitem}>
            <button
              id="accordionbutton4"
              aria-expanded="false"
              onClick={() => {
                const itemToggle = document
                  .getElementById("accordionbutton4")
                  .getAttribute("aria-expanded");

                document
                  .getElementById("accordionbutton4")
                  .setAttribute("aria-expanded", "false");

                if (itemToggle == "false") {
                  document
                    .getElementById("accordionbutton4")
                    .setAttribute("aria-expanded", "true");
                }
              }}
            >
              <span className={styles.accordiontitle}>
                How can i withdraw my money?
              </span>
              <span className={styles.icon} aria-hidden="true"></span>
            </button>
            <div className={styles.accordioncontent}>
              <p>
                You can request for your monies at anytime and we will deposit
                it into the account you will provide. This usually takes less
                than 24 hours.
              </p>
            </div>
          </div>
          <div className={styles.accordionitem}>
            <button
              id="accordionbutton5"
              aria-expanded="false"
              onClick={() => {
                const itemToggle = document
                  .getElementById("accordionbutton5")
                  .getAttribute("aria-expanded");

                document
                  .getElementById("accordionbutton5")
                  .setAttribute("aria-expanded", "false");

                if (itemToggle == "false") {
                  document
                    .getElementById("accordionbutton5")
                    .setAttribute("aria-expanded", "true");
                }
              }}
            >
              <span className={styles.accordiontitle}>
                How do I admit people to my event?
              </span>
              <span className={styles.icon} aria-hidden="true"></span>
            </button>
            <div className={styles.accordioncontent}>
              <p>
                We provide a ticket scanner in the app that you can use to
                verify tickets before letting people in.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer styles={styles} />
    </div>
  );
}
