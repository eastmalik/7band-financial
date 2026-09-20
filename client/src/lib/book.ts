/**
 * Details for "The American Money Tree".
 *
 * Both Player 1 and Simple View read from here so the two versions of the
 * book page never drift apart. Update these values as the book moves
 * through review and toward release.
 */

export const BOOK_TITLE = "The American Money Tree";
export const BOOK_SUBTITLE =
  "A Plain-Language Owner's Manual for Indexed Universal Life Insurance";
export const BOOK_AUTHOR = "Malik East";

export const BOOK_COVER = "/manus-storage/american-money-tree-cover.png";

/** Shown as the release status. Change when a date is confirmed. */
export const BOOK_STATUS = "In final review · Release date to be announced";

/** Where "notify me" goes until a signup form is connected. */
export const BOOK_NOTIFY_MAILTO =
  "mailto:malik@7bandfinancialagency.com" +
  "?subject=Notify%20me%20-%20The%20American%20Money%20Tree" +
  "&body=Please%20let%20me%20know%20when%20The%20American%20Money%20Tree%20is%20released.%0A%0AName%3A%0A";

export const BOOK_PITCH =
  "Most explanations of this product are written to sell it. This one is " +
  "written to be understood. It covers how the policy works, what it " +
  "costs, who it suits, who it does not, what can go wrong, and how the " +
  "agent in the room gets paid.";

/** The ten chapters, as they appear in the manuscript. */
export const BOOK_CHAPTERS: { n: number; title: string; blurb: string }[] = [
  { n: 1, title: "What This Actually Is", blurb: "The two parts of the policy, and where each premium dollar really goes." },
  { n: 2, title: "Is This Right For You?", blurb: "An honest fit test — including the situations where the answer is no." },
  { n: 3, title: "How the Money Grows", blurb: "Floors, caps, participation rates, and what the floor does not protect." },
  { n: 4, title: "Putting Money In", blurb: "The funding window, the federal tests, and the MEC line you cannot cross." },
  { n: 5, title: "Getting Money Out", blurb: "Withdrawals versus loans, and the mechanics behind each." },
  { n: 6, title: "What's Included", blurb: "Riders, what they actually do, and how to verify what you have." },
  { n: 7, title: "What Can Go Wrong", blurb: "The troubleshooting chapter. Deliberately the most detailed in the book." },
  { n: 8, title: "Care and Maintenance", blurb: "The annual review, and the one number worth tracking every year." },
  { n: 9, title: "Questions to Ask Before You Sign", blurb: "Fifteen questions to take into any meeting, with any agent." },
  { n: 10, title: "How Your Agent Is Paid", blurb: "Commission, structure, and why the honest design often pays less." },
];

/** Straight from Chapter 2 — the book's own fit test. */
export const BOOK_GOOD_FIT = [
  "You can commit money consistently for five to ten years or more",
  "Your emergency savings are already in place somewhere liquid",
  "You are already capturing any employer retirement match",
  "You actually want or need life insurance",
  "You want a place for money that behaves differently from a 401(k) or IRA",
];

export const BOOK_POOR_FIT = [
  "Your budget is tight and the premium would be hard to maintain",
  "You may need the money back within the first several years",
  "You are being asked to cash out a retirement account to fund it",
  "You are shopping purely for the cheapest death benefit — term does that better",
  "You want guaranteed returns. This is not that.",
  "You would rather never think about it again",
];

/** Required disclosure shown on the page. */
export const BOOK_DISCLOSURE =
  "This book is educational. It is not a contract, an illustration, an " +
  "offer, a solicitation, or a recommendation to purchase any product. " +
  "Indexed universal life is life insurance; guarantees are backed solely " +
  "by the financial strength and claims-paying ability of the issuing " +
  "company. Policies are not bank deposits, are not FDIC insured, and are " +
  "not guaranteed by any bank or government agency. Neither the agency nor " +
  "its representatives provide tax or legal advice.";
