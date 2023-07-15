import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Discover.module.css";
import func from "../functions";

export default function SideNav() {
  const router = useRouter();
  return (
    <div id="sidemenu" className={styles.sidemenu}>
      <div className={styles.nav}>
        <Link href="/">
          <img
            alt="citsa vote"
            data-aos="zoom-in"
            src="/vote.png"
            className={styles.logo}
          />
        </Link>

        <img
          alt="citsa vote"
          onClick={() => {
            document.getElementById("sidemenu").style.left = "-100vw";
          }}
          src="/close.png"
          className={styles.menu}
        />
      </div>
      <div className={styles.left}>
        <text className={styles.quicklink}></text>
        <text className={styles.quicklink}></text>

        <text className={styles.quicklink}></text>

        {/* <Link href="/discover">
          <text className={styles.link}>Discover</text>
        </Link> */}
        <Link href="/results">
          <text className={styles.link}>Results</text>
        </Link>
        <Link href="/vote">
          <text className={styles.link}>Vote</text>
        </Link>
        {/* <Link href="/overview">
          <text className={styles.link}>How it works</text>
        </Link> */}
        <text className={styles.quicklink}></text>
        {/* <Link href="/terms">
          <text className={styles.link}>Terms & Conditions</text>
        </Link>
        <Link href="/privacy">
          <text className={styles.link}>Privacy Policy</text>
        </Link> */}
        <text className={styles.quicklink}></text>
        {/* <Link href="mailto:VoteHub@gmail.com">
          <text className={styles.link}>hello@VoteHub.africa</text>
        </Link>
        <Link href="tel:+233208589528">
          <text className={styles.link}>+233208589528</text>
        </Link> */}
        {/* <div className={styles.socials}>
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
        </div> */}
      </div>
    </div>
  );
}
