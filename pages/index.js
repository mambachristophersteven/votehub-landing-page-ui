import Head from "../components/Head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import SideNav from "../components/SideNav";
import { useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context";
import Headd from "../components/Head";
import func from "../functions";

export default function Index() {
  const { userContext, setuserContext } = useContext(UserContext);
  return (
    <div>
      <Headd title={"Home"} />
      <div className="container">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
        <div className="circle5"></div>
        <div className="nav">
          <div className="logo">
            <img src="/images/logo.png" alt="volt logo" />
          </div>
          {userContext ? (
            <div className="menu-list">
              {/* <Link href="/login">
                <a>Create Poll</a>
              </Link> */}
              {/* <a>Pricing</a> */}
              <Link href="/results">
                <a>Results</a>
              </Link>
            </div>
          ) : (
            <div className="menu-list">
              <Link href="/login">
                <a>Create Poll</a>
              </Link>
              {/* <a>Pricing</a> */}
              <Link href="/results">
                <a>Polls</a>
              </Link>
            </div>
          )}
          {userContext ? (
            <div className="signlog">
              <Link href="/profile/voting">
                <a id="signup">Dashboard</a>
              </Link>
              <a
                onClick={() => {
                  func.signOut();
                  setuserContext(null);
                }}
              >
                <a id="signup">Logout</a>
              </a>
            </div>
          ) : (
            <div className="signlog">
              <Link href="/signup">
                <a id="signup">Sign Up</a>
              </Link>
              <Link href="/login">
                <a id="login">Login</a>
              </Link>
            </div>
          )}
          <div className="toggle-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 512 512"
            >
              <line x1="88" y1="152" x2="424" y2="152" />
              <line x1="88" y1="360" x2="424" y2="360" />
            </svg>
          </div>
        </div>
        <section className="landing" id="landing">
          <div className="content-box">
            <div className="welcome-talk">
              <h1>
                Secure and easy voting <br />
                <span>in seconds</span>
              </h1>
              <p>
                Create an election for your school, company or organization and
                get your results in no time. Make money whilst you are at it.
              </p>
              <div className="buttons">
                <Link href="/login">
                  <a id="create-a-poll-btn">Create a poll</a>
                </Link>
                <Link href="/vote">
                  <a id="vote-btn">Vote</a>
                </Link>
              </div>
            </div>
            <div className="welcome-picture">
              <img src="/images/svg.png" alt="ballot" />
            </div>
          </div>
        </section>
        <section className="test" id="test">
          <div className="evidence">
            <h4>
              "The whole process is so simple and enjoyable, from start to
              finish with <span>Volt</span>. It is our go to platform for all
              our elections"
            </h4>
            <h4 className="witness">
              <span>.</span> Mr Elliot Attipoe, University Of Cape Coast{" "}
              <span>.</span>
            </h4>
            <h3>~Anytime.Anywhere.Anybody~</h3>
          </div>
        </section>
      </div>
      <div className="container1">
        <div className="circle6"></div>
        <div className="circle7"></div>
        <div className="circle8"></div>
        <div className="circle9"></div>
        <div className="circle10"></div>
        <div className="circle11"></div>
        <section className="offering">
          <h1>What we offer?</h1>
          <br />
          <div className="offers">
            <div className="offer1">
              <img src="/images/Sparkles.png" alt="sparkles" />
              <h2>Make a poll with our ultimate poll maker</h2>
              <p>
                Secure and reliable voting polls that you can create anywhere
                and anytime for your polls and elections. Want to know <br />
                where to go for a trip this weekend or when to have your
                meeting? Just make a poll and share to your friends and get
                results <br />
                just as fast!
              </p>
              <div className="offer-buttons">
                <Link href="/login">
                  <a id="create-a-poll-button">create a poll</a>
                </Link>
                <Link href="/vote">
                  <a id="vote-button">vote</a>
                </Link>
              </div>
            </div>
            <div className="offer2">
              <img src="/images/Squares.png" alt="sparkles" />
              <h2>Track vote count</h2>
              <p>
                Get an admin dashboard just for you to keep track of all
                categories and vote count. See live results on the go and share
                the results anytime. Allow voters to watch live results if you
                want.
              </p>
              <div className="offer-buttons"></div>
            </div>
            <div className="offer3">
              <img src="/images/triangle.png" alt="sparkles" />
              <h2>Affordable rates</h2>
              <p>
                Get the cheapest rate in the market, we only take 10%. Cool,
                right? Create a poll and get started now
              </p>
              {/* <div className="offer-buttons">
                        
                    </div>  */}
            </div>
          </div>
        </section>
      </div>
      <div className="container2">
        <div className="circle20"></div>
        <div className="circle3"></div>
        <div className="circle1"></div>
        <div className="circle4"></div>
        <div className="circle11"></div>
        <br />
        <section id="features" className="features">
          <h2 className="customized">Customized elections just as you want</h2>
        </section>
        <section id="explain" className="explain">
          <h1 className="explain-heading">Polls are simple and safe</h1>
          <p id="explain-paragraph" className="explain-paragraph">
            You can specify everything concerning your polls including number of
            categpries, aspirants, name and title of your election as many times
            as you want
          </p>
        </section>
        <br />
        <section id="tools" className="tools">
          <div className="tool-slots">
            <div className="tool">
              <img src="/images/shield.png" alt="shield" />
              <h1>Secured Voting</h1>
              <p>Elections are secured from double voting and bots</p>
            </div>
            <div className="tool">
              <img src="/images/Settings.png" alt="shield" />
              <h1>Custom Settings</h1>
              <p>
                Choose your election structure, details and mode of payments.
                Specify what you want the voters to see and do
              </p>
            </div>
          </div>
          <br />
          <div className="tool-slots-single">
            <div className="tool">
              <img src="/images/eye.png" alt="shield" />
              <h1>Watch Everything</h1>
              <p>
                Know everything concerning your polls in real time. See results
                on the go.
              </p>
            </div>
          </div>
          <br />
          <div className="tool-slots">
            <div className="tool">
              <img src="/images/document.png" alt="shield" />
              <h1>Get Documentation</h1>
              <p>
                Have a record of the poll even after the end of the election
              </p>
            </div>
            <div className="tool">
              <img src="/images/watch.png" alt="shield" />
              <h1>On Time Events</h1>
              <p>Elections follow through, opening and closing on time</p>
            </div>
          </div>
        </section>
      </div>
      <div className="container3">
        <div className="circle1"></div>
        <div className="circle8"></div>
        <div className="circle17"></div>
        <section id="starter" className="starter">
          <div className="starter-talk">
            <h1>Want to get a poll running?</h1>
            <p>
              With Volt, you will be using the ultimate voting platform. Simple,
              reliable and convenient
            </p>
          </div>
          <div className="starter-buttons">
            <Link href="/login">
              <a id="create-button">Create a poll</a>
            </Link>
          </div>
        </section>
        <section id="faq" className="faq">
          <div className="faqs">
            <div className="question">
              <img
                className="faq-img"
                src="/images/faq icon.png"
                alt="faq icon"
              />
              <h2>Who can use Volt?</h2>
              <img
                className="plus-icon"
                src="/images/add-circle 1.png"
                alt=""
              />
            </div>
            <div className="question">
              <img
                className="faq-img"
                src="/images/faq icon.png"
                alt="faq icon"
              />
              <h2>How Many polls can i create?</h2>
              <img
                className="plus-icon"
                src="/images/add-circle 1.png"
                alt=""
              />
            </div>
            <div className="question">
              <img
                className="faq-img"
                src="/images/faq icon.png"
                alt="faq icon"
              />
              <h2>How much do i pay and earn?</h2>
              <img
                className="plus-icon"
                src="/images/add-circle 1.png"
                alt=""
              />
            </div>
            <div className="question">
              <img
                className="faq-img"
                src="/images/faq icon.png"
                alt="faq icon"
              />
              <h2>How do i withdraw my money?</h2>
              <img
                className="plus-icon"
                src="/images/add-circle 1.png"
                alt=""
              />
            </div>
            <div className="question">
              <img
                className="faq-img"
                src="/images/faq icon.png"
                alt="faq icon"
              />
              <h2>How do i make people vote?</h2>
              <img
                className="plus-icon"
                src="/images/add-circle 1.png"
                alt=""
              />
            </div>
          </div>
        </section>
        <section id="footer" className="footer">
          <div className="footer-body">
            <div className="contact-footer">
              <p>© Volt Citsa UCC 2023</p>
              <p id="email">voltcitsaucc@gmail.com</p>
              <p>+233 59 210 6300</p>
              <div className="social-footer">
                <a>
                  <img src="/images/logo-facebook 1.png" alt="" />
                </a>
                <a>
                  <img src="/images/logo-twitter 1.png" alt="" />
                </a>
                <a>
                  <img src="/images/logo-instagram 1.png" alt="" />
                </a>
                <a>
                  <img src="/images/logo-github 1.png" alt="" />
                </a>
              </div>
            </div>
            <div className="links-footer">
              <a>Discover</a>
              <a>Results</a>
              <a>Vote</a>
              <a>Terms and Conditions</a>
              <a>Privacy</a>
            </div>
            <div className="volt-footer">
              <p>
                Number one voting platfrom with simple configuration, <br />
                ussd feature and security
              </p>
              <p>Vote with Volt</p>
              <img src="/images/logo.png" alt="volt logo" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
