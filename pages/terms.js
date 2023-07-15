import Head from "../components/Head";
import Link from "next/link";
import styles from "../styles/Terms.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

export default function Terms() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head title="Terms & Conditions" />

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

        <h1 className={styles.h1}>Terms and Conditions</h1>

        <text className={styles.text}>Last Updated: 5th December, 2021</text>

        <text className={styles.h2}>General</text>
        <text className={styles.text}>
          You must be 18 years or older to use VoteHub. <br />
          <br />
          By using or visiting the VoteHub platform, you expressly agree to be
          bound by these Terms and to follow these Terms and all applicable laws
          and regulations governing Deadalus System & Intelligence. <br />
          <br />
          VoteHub reserves the right to change these Terms at any time,
          effective immediately upon posting on the VoteHub platform. To ensure
          you are aware of the latest Terms and Conditions of use, please check
          this page of the VoteHub platform periodically. The latest date of
          issue will be posted at the top of this page.
        </text>

        <text className={styles.h2}>Our Site</text>
        <text className={styles.text}>
          VoteHub products, features, and offerings are available (a) online
          through VoteHub.africa, webpages, and subdomains "Site" (b) offline at
          events s (c) through mobile applications, application programming
          interfaces. (a), (b), and (c) are collectively referred to as our
          "Services" or "VoteHub Properties".
        </text>

        <text className={styles.h2}>Our Role</text>
        <text className={styles.text}>
          We provide a platform that sells tickets and collects payments on
          behalf of Event Organizers. VoteHub is NOT directly involved with the
          operations of event listed on VoteHub Properties. This means, among
          other things, that we have no influence on the quality of the event,
          the decision to modify an event in any way, or the enforcement of
          Organizer’s rules. <br />
          <br />
          If you are unhappy in any way with the event itself, you'll need to
          take the matter up directly with the Organizer; they are the ones who
          can address your concerns—and the ones who can issue refunds, at their
          discretion. <br />
          <br />
          By using our Services, you agree not to bring any claims against us
          for issues you have with an Organizer’s terms or services.
        </text>

        <text className={styles.h2}>Permitted Use of Our Services</text>
        <text className={styles.text}>
          You agree that you are only authorised to visit, view and to retain a
          copy of VoteHub Properties to buy and sell event tickets. You can’t
          duplicate, download, publish, modify or otherwise distribute the
          material on VoteHub Properties for any purpose other than to review an
          event and its promotional information, for personal use, or to
          purchase tickets for your personal use, unless otherwise specifically
          authorised by VoteHub to do so.
        </text>

        <text className={styles.h2}>
          Unauthorised Use Of The VoteHub Platform
        </text>
        <text className={styles.text}>
          Illegal and/or unauthorised uses of the VoteHub platform, whether for
          unauthorised ticket sales, unauthorised framing of or linking to the
          VoteHub platform will be investigated and appropriate legal action
          will be taken. In essence, don’t use our Site to do illegal things or
          make it look like we’re doing illegal things.
        </text>

        <text className={styles.h2}>Pricing and Availability</text>
        <text className={styles.text}>
          Organizers using VoteHub set the number of tickets available for an
          event, and their pricing. Pricing and availability may change at any
          time and without notice. <br />
          <br />
          Once you've successfully added tickets to VoteHub’s checkout, the
          price and number of tickets you've selected are reserved within the
          time remaining on the checkout timer. If the time expires, you'll have
          to begin the process again.
        </text>

        <text className={styles.h2}>Errors</text>
        <text className={styles.text}>
          If, due to human error or our Service's malfunction, you purchase a
          ticket at a time or price not approved by the Event Organizer owner
          then we have the right to cancel the transaction and refund the full
          amount you paid.
        </text>

        <text className={styles.h2}>Links</text>
        <text className={styles.text}>
          Event Organizer’s on VoteHub may link to other websites and social
          media pages that are not under our control. We are not responsible for
          any other website's content, nor by linked to it are we implying any
          sort of endorsement of that website or its operators.
        </text>

        <text className={styles.h2}>Payments</text>
        <text className={styles.text}>
          VoteHub processes your credit card depending upon the methods accepted
          by the event Organizer which may include: Visa, MasterCard, Mobile
          Money, and Bank Transfers. At no point in time does your entire credit
          card number get collected by VoteHub, or stored in VoteHub’s system or
          available to the event Organizer. Our payment gateway is PCI compliant
          (the highest and most stringent in the payment services industry) so
          you can be sure your transaction are secure. If you are still
          concerned about using your card online, consider using Mobile Money or
          bank transfer payment options if available.
        </text>

        <text className={styles.h2}>
          Limits On Tickets Purchased Per Customer
        </text>
        <text className={styles.text}>
          When purchasing tickets on VoteHub, you are limited to the maximum
          number of tickets set by the Event Organizer. If you try to circumvent
          the VoteHub platforms to purchase more than maximum specified tickets
          per attendee, the event Organizer may tell VoteHub to cancel
          additional bookings.
        </text>

        <text className={styles.h2}>Order Confirmation</text>
        <text className={styles.text}>
          After you purchase tickets on VoteHub Properties, you'll be emailed an
          order confirmation. <br />
          <br />
          If you do not receive a confirmation for your tickets, please contact
          us at VoteHub Support to check the status of your order. Let us know
          as many details as you can about the transaction, including your full
          name, order number, and a screen shot of the order confirmation if
          it’s available.
        </text>

        <text className={styles.h2}>Using Your Tickets</text>
        <text className={styles.text}>
          After you purchase a ticket, keep track of it. Don't let anyone else
          get a copy of your tickets or have access to your email account where
          they can print duplicates. VoteHub tickets use QR code to validate
          tickets at the event and the Organizer will only admit one of each
          unique ticket. If you purchase multiple tickets, each ticket will have
          its own unique QR code.
        </text>

        <text className={styles.h2}>Rescheduled & Cancelled Events</text>
        <text className={styles.text}>
          Any decision to cancel or reschedule the event is the Organizer’s and
          not in our control. By using VoteHub Properties, you agree to abide by
          the Organizer’s cancellation, refund, and rescheduling policies.{" "}
          <br />
          <br />
          If an event is cancelled or postponed, refunds will be determined by
          the Organizer(s). <br />
          <br />
          You will be notified by email or you can review notices posted on the
          Organizer’s website or contact the Organizer via the email address
          supplied on theOrganizer’s VoteHub listing. <br />
          <br />
          If the event was moved or rescheduled, the Event Organizer may set
          refund limitations. Contact the Organizer for exact instructions.
        </text>

        <text className={styles.h2}>Refunds</text>
        <text className={styles.text}>
          All purchases are final and cannot be exchanged for tickets for
          another event. Please be aware that a ticket is a revocable license.
          Admission can be refused at an Organizer’s discretion. A ticket cannot
          be redeemed for cash. <br />
          <br />
          If an event has been moved or rescheduled, and you qualify for a
          refund, please contact the Organizer directly to get full information
          and seek your refund. <br />
          <br />
          If you are eligible for a refund through VoteHub, we'll pay what you
          are due. We'll also notify you by email. <br />
          <br />
          Please note that VoteHub transaction charges are NON REFUNDABLE.
          Processing a transaction is a service in itself, which has been
          offered and charged for. Thus if you are due a refund of a ticket fee,
          you will be refund that amount less the transaction fees.
        </text>

        <text className={styles.h2}>Personal Information</text>
        <text className={styles.text}>
          VoteHub or its representatives will never request for your password,
          full card details (card number, pin, cvv, token) via email or
          telephone.
          <br />
          <br />
          Please see our privacy policy to learn about all the ways we protect
          your privacy and keep your data safe. <br />
          <br />
          All activity on your account is your responsibility. Do not use
          another user's account without explicit permission. If you see any
          unauthorized activity on your account, please contact us immediately
          at VoteHub Support.
        </text>

        <text className={styles.h2}>Unlawful Resale</text>
        <text className={styles.text}>
          We can ONLY guarantee the authenticity of only those tickets purchased
          directly on VoteHub Properties. Some event Organizers may limit
          transfer of tickets between individuals. If you choose to buy a ticket
          from the original purchaser, please use caution and make sure the
          ticket you are purchasing is valid and will be accepted by the event
          Organizer.
        </text>

        <text className={styles.h2}>Licenses</text>
        <text className={styles.text}>
          We grant you a limited, non-exclusive, non-transferable,
          non-sublicensable (except to sub-Users registered via the Services),
          revocable right to use our Services solely to (a) browse the Services
          and search for, view, register for or purchase tickets or
          registrations to an event listed on the Services; and/or (b) create
          event registration, organizer profile and other webpages to promote,
          market, manage, track, and collect sales proceeds for an event. <br />
          <br />
          Your use of the Services must be in compliance with these Terms and in
          compliance with all applicable local, state, national and other laws,
          rules and regulations. In addition, by using any search functionality
          or address auto-population tools, you are bound by the Google Maps
          Additional Terms of Service (including the Google Privacy Policy).
        </text>

        <text className={styles.h2}>Restrictions on Your License</text>
        <text className={styles.text}>
          Without limitations on other restrictions, limitations and
          prohibitions that we impose (in these Terms or elsewhere), you agree
          you will not directly or indirectly (a) copy, modify, reproduce,
          translate, localize, port or otherwise create derivatives of any part
          of the Services; (b) reverse engineer, disassemble, decompile or
          otherwise attempt to discover the source code or structure, sequence
          and organization of all or any part of the Services; (c) rent, lease,
          resell, distribute, use the Services for other commercial purposes not
          contemplated or otherwise exploit the Services in any unauthorized
          manner; (d) remove or alter any proprietary notices on the Services;
          or (e) engage in any activity that interferes with or disrupts the
          Services.
        </text>

        <text className={styles.h2}>Copyright Policy</text>
        <text className={styles.text}>
          You may only sell event tickets on VoteHub Properties where you have
          the rights to do so. In particular, you may not use VoteHub to
          unlawfully transmit copyrighted material without a license, express
          consent, valid defence or fair use exemption to do so. You must also
          ensure that the content you upload does not infringe the copyrights or
          other rights of third parties (such as privacy or publicity rights){" "}
          <br />
          <br />
          If you believe that anything displayed on VoteHub Properties is in
          violation of your intellectual property rights, please notify us at
          <Link href="mailto:support@VoteHub.africa">
            <span className={styles.a}>VoteHub Help</span>
          </Link>{" "}
          with proof, and we will make reasonable efforts to rectify the issue
          promptly.
        </text>

        <text className={styles.h2}>Termination</text>
        <text className={styles.text}>
          We reserve the right, without any liability to you or a third party,
          to modify, suspend, or discontinue any part of our Services at any
          time, with or without notice to you.
          <br />
          <br />
          If you decide you no longer want to have a VoteHub account, or if you
          no longer agree to our terms of service, you can cancel your account
          at any time. To cancel, contact{" "}
          <Link href="mailto:support@VoteHub.africa">
            <span className={styles.a}>VoteHub Help</span>
          </Link>
          .
          <br />
          <br />
          If we find that you've been violating any part of these terms of
          service or the law of the Federal Republic of Nigeria, we reserve the
          right to cancel your account. If so, we'll notify you of our decision
          by email.
        </text>

        <text className={styles.h2}>Disclaimers</text>
        <text className={styles.text}>
          VoteHub does not promise that the VoteHub Properties will be
          error-free, uninterrupted, nor that it will provide specific results
          from use of the VoteHub or any content, search or link on it. VoteHub
          and its content are delivered on an “as-is” and “as-available” basis.
          VoteHub can not ensure that files you download from the VoteHub
          platform will be free of viruses or contamination or destructive
          features however, we use the best security measures consistent with
          industry practices to safeguard our systems, and to ensure the
          security of your data. We therefore assume no liability for any
          problems that arise from the interception and misuse of information on
          our Services.
        </text>

        <text className={styles.h2}>Limitations of Liabilities</text>
        <text className={styles.text}>
          If you purchase a ticket with us, you assume all risks associated with
          attending the event, including but not limited to the risks of
          inclement weather, and waive any claims for personal injury or deaths
          against VoteHub.
          <br />
          <br />
          Use of our Services is also at your own risk and you agree to
          indemnify, defend, and hold us or our services partners, affiliates,
          successors, suppliers, attorneys, and advertisers, harmless from any
          liability, loss claim and expense, including reasonable attorney's
          fees, related to (a) your violation of these terms of services and/or
          (b) the accuracy, content, completeness, legality, and reliability of
          the information accessible on our Services.
          <br />
          <br />
          THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR
          AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL
          ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN.
          VoteHub AND/OR ITS AFFILIATES MAY MAKE IMPROVEMENTS AND/OR CHANGES TO
          THE SITE AT ANY TIME.
          <br />
          <br />
          VoteHub AND/OR OUR AFFILIATES MAKE NO REPRESENTATIONS ABOUT THE
          SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, OR ACCURACY OF THE
          INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS
          CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED
          BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES,
          AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR
          CONDITION OF ANY KIND. VoteHub AND/OR OUR AFFILIATES HEREBY DISCLAIM
          ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION,
          SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS, INCLUDING ALL
          IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          <br />
          <br />
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
          VoteHub AND/OR OUR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT,
          PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES
          WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS, INJURY,
          CLAIM, LIABILITY, LOSS OF USE, DATA, OR PROFITS, ARISING OUT OF OR IN
          ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, DELAY OR
          FAILURE IN PERFORMANCE BEYOND OUR CONTROL, WITH THE DELAY OR INABILITY
          TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO
          PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS,
          SERVICES, AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE
          ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT,
          NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF VoteHub OR ANY OF
          ITS AFFILIATES HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE
          SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE
          LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY
          PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND
          EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.
        </text>
      </main>

      <Footer styles={styles} />
    </div>
  );
}
