import Head from "next/head";
import Link from "next/link";
import styles2 from "../styles/Home.module.css";

export default function Footer({ styles = styles2, ligth }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {ligth == true ? (
          <img alt="citsa vote" src="/vote.png" className={styles.logob} />
        ) : (
          <img alt="citsa vote" src="/vote.png" className={styles.logob} />
        )}
        <text className={styles.text}>
          All-in-one event ticketing system.
          <br />
          We give organizers the toolkit needed to manage, promote and sell
          tickets for any type of event - All for free.
          <br />
          <br />
          &copy; citsa vote 2022
          <br />
          Deadalus Intelligence & Systems
          <br />
          <br />
          <img
            alt="citsa vote"
            src="https://paystack.com/assets/img/icon/flags/4x3/gh.svg"
            className={styles.gh}
          />
          <img
            alt="citsa vote"
            src="https://paystack.com/assets/img/icon/flags/4x3/ng.svg"
            className={styles.gh}
          />
          <img
            alt="citsa vote"
            src="https://paystack.com/assets/img/icon/flags/4x3/za.svg"
            className={styles.gh}
          />
        </text>
      </div>
      <div className={styles.left}>
        <text className={styles.quicklink}></text>
        <Link href="/discover">
          <text className={styles.link}>Discover</text>
        </Link>
        <Link href="/results">
          <text className={styles.link}>Results</text>
        </Link>
        <Link href="/vote">
          <text className={styles.link}>Vote</text>
        </Link>
        <Link href="/overview">
          <text className={styles.link}>How it works</text>
        </Link>
        <Link href="/terms">
          <text className={styles.link}>Terms & Conditions</text>
        </Link>
        <Link href="/privacy">
          <text className={styles.link}>Privacy Policy</text>
        </Link>
        <text className={styles.quicklink}></text>
        <Link href="mailto:VoteHub@gmail.com">
          <text className={styles.link}>VoteHub@gmail.com</text>
        </Link>
        <Link href="tel:+233208589528">
          <text className={styles.link}>+233208589528</text>
        </Link>
        {ligth ? (
          <div className={styles.socials}>
            <Link href="https://twitter.com/VoteHub">
              <img alt="citsa vote" src="/tw2.png" className={styles.soc} />
            </Link>
            <Link href="https://facebook.com/VoteHub">
              <img alt="citsa vote" src="/fb2.png" className={styles.soc} />
            </Link>
            <Link href="https://www.instagram.com/VoteHub/">
              <img alt="citsa vote" src="/ig2.png" className={styles.soc} />
            </Link>
            <img alt="citsa vote" style={{ width: 30, height: 0 }} />
            <Link href="https://play.google.com/store/apps/details?id=africa.VoteHub.organizer">
              <img alt="citsa vote" src="/google.png" className={styles.soc} />
            </Link>
            {/* <Link href="https://www.instagram.com/VoteHub/">
              <img alt="citsa vote" src="/appstore.png" className={styles.soc} />
            </Link> */}
          </div>
        ) : (
          <div className={styles.socials}>
            <Link href="https://twitter.com/VoteHub">
              <img alt="citsa vote" src="/tw.png" className={styles.soc} />
            </Link>
            <Link href="https://facebook.com/VoteHub">
              <img alt="citsa vote" src="/fb.png" className={styles.soc} />
            </Link>
            <Link href="https://www.instagram.com/VoteHub/">
              <img alt="citsa vote" src="/ig.png" className={styles.soc} />
            </Link>
            <img alt="citsa vote" style={{ width: 30, height: 0 }} />
            <Link href="https://play.google.com/store/apps/details?id=africa.VoteHub.organizer">
              <img alt="citsa vote" src="/google.png" className={styles.soc} />
            </Link>
            {/* <Link href="/">
              <img alt="citsa vote" src="/appstore.png" className={styles.soc} />
            </Link> */}
          </div>
        )}
      </div>
    </footer>
  );
}
