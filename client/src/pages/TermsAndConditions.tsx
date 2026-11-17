/*
 * 7Band Financial Agency — Terms & Conditions (/terms-and-conditions)
 * Copied from East Consulting LLC's Terms & Conditions (owner's request), with 7Band's facts.
 * Includes the text-messaging (SMS) program terms A2P 10DLC reviewers require.
 * The opt-in described here must match the consent checkbox on the GoHighLevel forms.
 */

import { Link } from "wouter";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BOOKING_URL, CONTACT_EMAIL, EVENT_URL } from "@/lib/links";

const WEBSITE = "https://www.7bandfinancialagency.com";

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <p>
        These Terms &amp; Conditions apply to your use of <a href={WEBSITE}>{WEBSITE}</a> and{" "}
        <a href={EVENT_URL}>{EVENT_URL}</a>, and to the services provided by 7Band Financial Agency ("7Band", "we",
        "us"). By using these websites, booking a call, registering for THE FLOW webinar, or opting in to our text
        messages, you agree to these terms.
      </p>
    ),
  },
  {
    heading: "Age requirement (18+)",
    body: (
      <p>
        You must be at least 18 years old to use this website, book a call, register for the webinar, or opt in to our
        text messages. By using our website or services, you confirm that you are 18 or older.
      </p>
    ),
  },
  {
    heading: "Our services",
    body: (
      <>
        <p>
          7Band Financial Agency is a life insurance agency led by a licensed life insurance agent. We also provide
          financial education, including THE FLOW webinar and free calls to help you find your next step.
        </p>
        <p>
          Our content is educational. It is not financial, legal, or tax advice. For advice about your specific
          situation, please consult a licensed professional.
        </p>
      </>
    ),
  },
  {
    heading: "Calls and booking",
    body: (
      <p>
        You can request a call through our <a href={BOOKING_URL}>free call form</a> and then choose a time on our
        calendar. If you need to reschedule or cancel, please contact us as early as you can at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
  {
    heading: "No guarantees",
    body: (
      <p>
        Life insurance products are subject to underwriting, and approvals are decided by the insurance carriers, not
        by us. Results vary. We do not guarantee any particular outcome or timeline.
      </p>
    ),
  },
  {
    heading: "Text messaging (SMS) terms",
    body: (
      <>
        <p>
          <strong>Who sends the messages.</strong> Text messages are sent by 7Band Financial Agency.
        </p>
        <p>
          <strong>How you opt in.</strong> You opt in by checking the optional text-message consent box on our{" "}
          <a href={BOOKING_URL}>free call form</a> or THE FLOW webinar registration form. The box is not pre-checked.
          Consent is not a condition of booking, registering, or any purchase. You must be 18 or older to opt in.
        </p>
        <p>
          <strong>What we send.</strong> Confirmations, reminders, and updates about your call or the webinar you
          registered for. We do not send marketing or promotional text messages.
        </p>
        <p>
          <strong>Message frequency and rates.</strong> Message frequency varies. Message and data rates may apply.
        </p>
        <p>
          <strong>How to opt out.</strong> Reply <strong>STOP</strong> to any message to stop receiving texts. We will
          send one message confirming that you have been unsubscribed, and then no further texts. To join again, reply{" "}
          <strong>START</strong> or opt in again on one of our forms.
        </p>
        <p>
          <strong>How to get help.</strong> Reply <strong>HELP</strong> to any message, or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          <strong>Carriers.</strong> Mobile carriers are not liable for delayed or undelivered messages.
        </p>
        <p>
          <strong>Privacy.</strong> Your phone number and text-message consent are never shared with third parties for
          marketing. See our <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    heading: "Use of this website",
    body: (
      <p>
        You agree to use this website only for lawful purposes. The content of this website, including text, logo, and
        design, belongs to 7Band Financial Agency and may not be copied or reused without our permission.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        This website and its content are provided for general information. To the fullest extent permitted by law,
        7Band Financial Agency is not liable for any indirect or consequential loss arising from your use of this
        website.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the state in which 7Band Financial Agency is organized, and the laws of
        the United States.
      </p>
    ),
  },
  {
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these Terms &amp; Conditions from time to time. The "Last updated" date at the top of this page
        shows when they were last changed.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        7Band Financial Agency
        <br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  return <LegalPage title="Terms & Conditions" lastUpdated="November 17, 2026" sections={sections} />;
}
