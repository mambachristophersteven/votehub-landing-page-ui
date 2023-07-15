import Footer from "./Footer";
import Nav from "./Nav";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main>{children}</main>
      {/* <Footer styles={styles} /> */}
    </div>
  );
}
