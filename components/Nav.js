import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import {
  CircleArrowRightIcon,
  EditIcon,
  LogOutIcon,
  Menu,
  PeopleIcon,
  Popover,
  Position,
  TrashIcon,
} from "evergreen-ui";
import func from "../functions";

export default function Nav({ data }) {
  const { userContext, setuserContext } = useContext(UserContext);

  // console.log(userContext);

  return (
    <div className={styles.nav}>
      <div className={styles.blur} />

      <img alt="citsa vote" className={styles.llogo} src="/vote.png" cl />

      <img
        alt="citsa vote"
        onClick={() => {
          document.getElementById("sidemenu").style.left = "0";
        }}
        src="/menu1.png"
        className={styles.menu}
      />

      {userContext ? (
        <div className={styles.rightbtn}>
          {/* <Link href="/signup">
            <div className={styles.sell3}>Contact Us</div>
          </Link> */}
          <Link href="/results">
            <div className={styles.sell3}>Results</div>
          </Link>
          <Link href="/profile">
            <div className={styles.sell}>Dashboard</div>
          </Link>

          <Popover
            position={Position.BOTTOM_RIGHT}
            content={
              <Menu>
                <Menu.Group>
                  {/* <Menu.Item icon={PeopleIcon}>Events</Menu.Item>
                  <Menu.Item icon={PeopleIcon}>Voting</Menu.Item>
                  <Menu.Item icon={PeopleIcon}>Create Poll</Menu.Item> */}
                  {/* <Menu.Item icon={CircleArrowRightIcon}>Move...</Menu.Item>
                  <Menu.Item icon={EditIcon} secondaryText="⌘R">
                    Rename...
                  </Menu.Item> */}
                </Menu.Group>
                {/* <Menu.Divider /> */}
                <Menu.Group>
                  <Menu.Item
                    onClick={() => {
                      func.signOut();
                      setuserContext(null);
                    }}
                    icon={LogOutIcon}
                    intent="danger"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <img
              alt="citsa vote"
              src={
                "https://avatars.dicebear.com/api/avataaars/" +
                userContext?.id +
                ".svg"
              }
            />
          </Popover>
        </div>
      ) : (
        <div className={styles.rightbtn}>
          <Link href="/results">
            <div className={styles.sell3}>Results</div>
          </Link>
          <Link href="/signup">
            <div className={styles.sell2}>Sign up</div>
          </Link>
          <Link href="/login">
            <div className={styles.sell}>Login</div>
          </Link>
        </div>
      )}
    </div>
  );
}
