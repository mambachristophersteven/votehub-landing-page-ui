import Head from "../components/Head";
import Link from "next/link";
import styles from "../styles/Terms.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

export default function Privacy() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head title="Privacy Policy" />

      <main class={styles.main}>
        <div className={styles.nav}>
          <Link href="/">
            <img
              alt="citsa vote"
              data-aos="zoom-in"
              src="/vote.png"
              className={styles.logo}
            />
          </Link>
        </div>

        <h1 className={styles.h1}>Privacy Policy</h1>

        <text className={styles.text}>Last Updated: 5th December, 2021</text>

        <text className={styles.h2}>How We collect Information about you?</text>
        <text className={styles.text}>
          Generally, we collect personal information when you use one of our
          Services. This could include any one of the following: <br />
          <br />
          make a purchase through our website <br />
          <br />
          register for a VoteHub account via our website;
          <br />
          <br />
          participate in a VoteHub survey or other marketing campaign; <br />
          <br />
          indicate that you wish to receive marketing material from VoteHub;{" "}
          <br />
          <br />
          make an inquiry or a complaint; <br />
          <br />
          have dealings with us via social media or in person, or via email when
          you write to us. <br />
          <br />
          Additional data is also collected by/for the following purposes:{" "}
          <br />
          <br />
          Displaying content from external platforms: This type of service
          allows you to view content hosted on external platforms directly from
          the pages of VoteHub and interact with them. For example, Google Maps
          widget (Google Inc.) on event pages <br />
          <br />
          Analytics: This type of services enable VoteHub to monitor and analyze
          web traffic and can be used to improve site performance. For example,
          Google Analytics (Google Inc.) <br />
          <br />
          Advertisement Tracking: This type of service connects data from the
          advertising network with actions performed on this website. For
          example, Facebook Inc. <br />
          <br />
          Handling Payments: Payment processing services enable us to process
          payments by debit card, USSD, bank transfer or other means. For
          example, Paystack.
        </text>

        <text className={styles.h2}>What Information We Collect</text>
        <text className={styles.text}>
          We may collect the following information but not limited to: <br />
          <br />
          1. Name and job title <br />
          <br />
          2. Bank details for payment settlements <br />
          <br />
          3. Contact information including email address <br />
          <br />
          4. Demographic information such as postcode, preferences and interests{" "}
          <br />
          <br />
          5. Other information relevant to customer surveys and/or offers <br />
          <br />
          We also collect information from third parties from time to time in
          the following situations <br />
          <br />
          When you connect third party plaftorms to your VoteHub account: For
          example, apps or providers such as Zoom, or when you register through
          a third party account (such as Google), we receive Personal
          Information that includes your username, profile picture, email
          address, time, location, calendar information, contact information
          from such third parties and any information you choose to upload to
          such third party platforms (“Platform Information”). <br />
          <br />
          When you make a payment: We receive transaction information from our
          payment processors Paystack and Flutterwave. <br />
          <br />
          When we receive it from other third parties: We may receive additional
          information about you, such as demographic or interest attributes from
          third parties such as data or marketing partners and combine it with
          other information we have about you.
        </text>

        <text className={styles.h2}>
          What We do with the Information We collect
        </text>
        <text className={styles.text}>
          We require this information to understand your needs and provide you
          with better service, and in particular but not limited to the
          following reasons: <br />
          <br />
          1. Internal record keeping <br />
          <br />
          2. We may use the information to improve our products and services{" "}
          <br />
          <br />
          3. We may periodically send promotional emails about new products,
          special offers or other information which we think you may find
          interesting using the email address which you have provided. If you do
          not want to receive these emails, you may opt out by clicking on the
          unsubscribe link in our promotional emails <br />
          <br />
          4. From time to time, we may also use your information to contact you
          for market research purposes <br />
          <br />
          5. We may contact you by email, phone or post <br />
          <br />
          6. We may use the information to customise the website according to
          your interests
        </text>

        <text className={styles.h2}>Security</text>
        <text className={styles.text}></text>

        <text className={styles.h2}>aaaaaaa</text>
        <text className={styles.text}>
          We are committed to ensuring that your information is secure. In order
          to prevent unauthorised access or disclosure, we have put in place
          suitable physical, electronic and managerial procedures to safeguard
          and secure the information we collect online.
        </text>

        <text className={styles.h2}>How We use Cookies</text>
        <text className={styles.text}>
          A cookie is a small file which asks permission to be placed on your
          computer's hard drive. Once you agree, the file is added and the
          cookie helps analyse web traffic or lets you know when you visit a
          particular site. Cookies allow web applications to respond to you as
          an individual. The web application can tailor its operations to your
          needs, likes and dislikes by gathering and remembering information
          about your preferences. <br />
          <br />
          We use traffic log cookies to identify which pages are being used.
          This helps us analyse data about web page traffic and improve our
          website in order to tailor it to customer needs. We only use this
          information for statistical analysis purposes and then the data is
          removed from the system. <br />
          <br />
          Overall, cookies help us provide you with a better website, by
          enabling us to monitor which pages you find useful and which you do
          not. A cookie in no way gives us access to your computer or any
          information about you, other than the data you choose to share with
          us. <br />
          <br />
          You can choose to accept or decline cookies. Most web browsers
          automatically accept cookies, but you can usually modify your browser
          setting to decline cookies if you prefer. However, this may prevent
          you from taking full advantage of the website.
        </text>

        <text className={styles.h2}>Links to other websites</text>
        <text className={styles.text}>
          Our website may contain links to other websites of interest. However,
          once you have used these links to leave our site, you should note that
          we do not have any control over that other website. Therefore, we
          cannot be responsible for the protection and privacy of any
          information which you provide whilst visiting such sites and such
          sites are not governed by this privacy statement. You should exercise
          caution and look at the privacy statement applicable to the website in
          question.
        </text>

        <text className={styles.h2}>Your Information with Us</text>
        <text className={styles.text}>
          If you believe that any information we are holding on you is incorrect
          or incomplete, email us as soon as possible, at the address below. We
          will promptly correct any information found to be incorrect. <br />
          <br />
          You also have the right to withdraw your consent at any time, to
          object to our use of your information (including for marketing
          purposes), to request the deletion or restriction of your information.
        </text>

        <text className={styles.h2}>Sharing with third parties</text>
        <text className={styles.text}>
          We share information with third parties that help us operate, provide,
          improve, integrate, customise, support and market our Services. These
          may include but are not limited to: <br />
          <br />
          Service Providers <br />
          <br />
          VoteHub Partners
          <br />
          <br />
          Promoters, venue operators and sponsors <br />
          <br />
          Third Party Apps & Widgets <br />
          <br />
          We share additional information about you with third parties when you
          give us your express consent to do so. <br />
          <br />
          Compliance with Enforcement Requests and Applicable Laws In
          exceptional circumstances, we may share information about you with a
          third party if we believe that sharing is reasonably necessary to (a)
          comply with any applicable law, regulation, legal process or
          governmental request, including to meet national security
          requirements, (b) enforce our agreements, policies and terms of
          service, (c) protect the security or integrity of our products and
          services, (d) protect VoteHub Technologies, our customers or the
          public from harm or illegal activities, or (e) respond to an emergency
          which we believe in good faith requires us to disclose information to
          assist in preventing the death or serious bodily injury of any person.{" "}
          <br />
          <br />
          Sharing with affiliated companies We share information we collect with
          affiliated companies and, in some cases, with prospective affiliates.
          Affiliated companies are companies owned or operated by us. The
          protections of this privacy policy apply to the information we share
          in these circumstances. <br />
          <br />
          VoteHub and Related Companies: We share information we have about you
          with other VoteHub corporate affiliates in order to operate and
          improve products and services and to offer other VoteHub affiliated
          services to you. This includes companies that own or operate the
          services listed here.
          <br />
          <br />
          Business Transfers: We may share or transfer information we collect
          under this privacy policy in connection with any merger, sale of
          company assets, financing, or acquisition of all or a portion of our
          business to another company. You will be notified via email and/or a
          prominent notice on the Services if a transaction takes place, as well
          as any choices you may have regarding your information.
        </text>

        <text className={styles.h2}>Persons under the age of 18</text>
        <text className={styles.text}>
          Our website and app is not intended for persons under 18 years of age.
          No one under age 18 may provide any personal information to or on the
          site. We do not knowingly collect personal information from persons
          under 18. If you are under 18, do not use or provide any information
          on this website or on or through any of its features, make any
          purchases through the site, use any of the interactive or public
          comment features of this site or provide any information about
          yourself to us, including your name, address, telephone number, e-mail
          address or any screen name or user name you may use. If we learn we
          have collected or received personal information from a person under
          18, we will delete that information. If you believe we might have any
          information from or about a child under 18, please contact{" "}
          <Link href="mailto:support@VoteHub.africa">
            <span className={styles.a}>VoteHub Help</span>
          </Link>
          .
        </text>

        <text className={styles.h2}>
          VoteHub Event Technology Limited Details
        </text>
        <text className={styles.text}>
          The full name of VoteHub is Deadalus System & Intelligence <br />
          <br />
          Deadalus System & Intelligence is registered in Ghana <br />
          <br />
          You can contact us by sending an email to{" "}
          <Link href="mailto:support@VoteHub.africa">
            <span className={styles.a}>VoteHub Help</span>
          </Link>
        </text>
      </main>

      <Footer styles={styles} />
    </div>
  );
}
