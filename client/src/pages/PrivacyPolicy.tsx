/*
 * 7Band Financial Agency — Privacy Policy (/privacy-policy)
 * Covers 7bandfinancialagency.com and its strategy-session booking calendar only.
 * THE FLOW webinar site has its own Privacy Policy at theflow.7bandfinancialagency.com/privacy.
 * Includes the text-messaging (SMS) language A2P 10DLC reviewers require.
 * The SMS non-sharing sentences are GoHighLevel's required wording: keep them exact.
 */

import { Link } from "wouter";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/links";

const WEBSITE = "https://www.7bandfinancialagency.com";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        7Band Financial Agency ("7Band", "we", "us") is a life insurance agency led by Malik East, a licensed life
        insurance agent. Our website address is <a href={WEBSITE}>{WEBSITE}</a>. This Privacy Policy explains what
        information we collect through this website and our booking calendar, how we use it, and the choices you
        have. THE FLOW webinar has its own privacy policy on its website.
      </p>
    ),
  },
  {
    heading: "What personal data we collect and why",
    body: (
      <>
        <p>
          When you book a <a href={BOOKING_URL}>free 30-minute strategy session</a> or contact us, we collect the
          information you give us, such as your name, email address, phone number, and any details you choose to
          share.
        </p>
        <p>We use this information to:</p>
        <ul>
          <li>respond to your inquiry and schedule your call;</li>
          <li>send confirmations, reminders, and updates about your strategy session;</li>
          <li>provide the services you ask us for; and</li>
          <li>answer your questions and provide customer support.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Text messaging (SMS)",
    body: (
      <>
        <p>
          If you check the optional text-message consent box on our booking form, 7Band Financial Agency will send you
          text messages about your strategy session, such as confirmations, reminders, and updates. We do not send
          marketing or promotional text messages. Consent is not a condition of booking or of any purchase.
        </p>
        <p>
          Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out at any
          time, or <strong>HELP</strong> for help. You can also contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All
          the above categories exclude text messaging originator opt-in data and consent; this information will not be
          shared with any third parties, excluding aggregators and providers of the text message services.
        </p>
      </>
    ),
  },
  {
    heading: "Forms and calendar",
    body: (
      <p>
        Our booking calendar and form are provided through GoHighLevel (LeadConnector), the platform we use to
        schedule calls and send appointment messages. When you use them, your information is processed by
        that platform on our behalf, for the purposes described in this policy.
      </p>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        Our website itself does not use cookies to track you or to show you advertising. The booking calendar may use
        cookies that are needed for it to work.
      </p>
    ),
  },
  {
    heading: "Embedded content from other websites",
    body: (
      <p>
        Some content on this site comes from other websites, such as the fonts we display (Google Fonts), and our
        booking calendar is hosted by GoHighLevel. Embedded content behaves in the same way as if you had visited the other website,
        and those websites may collect data about your visit according to their own privacy policies.
      </p>
    ),
  },
  {
    heading: "Analytics",
    body: <p>We do not use analytics or advertising tracking tools on this website.</p>,
  },
  {
    heading: "Who we share your data with",
    body: (
      <>
        <p>We do not sell, rent, or trade your personal information. We share it only:</p>
        <ul>
          <li>with service providers that help us run our business, such as our booking and messaging platform, who may use it only to provide those services to us;</li>
          <li>when required by law, or to protect our rights or the safety of others.</li>
        </ul>
        <p>
          Text-messaging opt-in data and consent are never shared with third parties, as stated in the Text messaging
          (SMS) section above.
        </p>
      </>
    ),
  },
  {
    heading: "How long we retain your data",
    body: (
      <p>
        We keep your information for as long as we need it to provide our services and to meet our legal and business
        record-keeping obligations. You can ask us to delete it at any time (see "What rights you have over your data").
      </p>
    ),
  },
  {
    heading: "What rights you have over your data",
    body: (
      <p>
        You can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to
        delete it, except information we must keep for legal, administrative, or security purposes. To make a request,
        email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. To stop text messages, reply STOP at any time.
      </p>
    ),
  },
  {
    heading: "How we protect your data",
    body: (
      <p>
        Our website is served over a secure, encrypted connection (HTTPS). Information you submit when you book is
        stored in our booking platform, where access is limited to 7Band Financial Agency.
      </p>
    ),
  },
  {
    heading: "Children's privacy",
    body: (
      <p>
        Our website and services are intended for adults. We do not knowingly collect personal information from
        children under 18.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page shows when
        it was last changed.
      </p>
    ),
  },
  {
    heading: "Questions or concerns",
    body: (
      <p>
        7Band Financial Agency
        <br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <br />
        See also our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" lastUpdated="November 23, 2026" sections={sections} />;
}
