/**
 * Words for the site guide: the welcome card, the home-page tour, the page
 * list and the button glossary.
 *
 * Every visitor-facing sentence the guide shows lives here, so when a page
 * or button changes, this is the one file to update. Tour steps point at
 * elements tagged with data-tour="..." in the page components.
 */

export type GuideButton = { label: string; does: string };

export type GuideStep = {
  /** data-tour ids to highlight; the first one visible on screen is used. */
  targets: string[];
  title: string;
  body: string;
  buttons?: GuideButton[];
  /** Skip the step when none of its targets are on screen (e.g. on phones). */
  optional?: boolean;
};

export type GuidePage = {
  path: string;
  name: string;
  what: string;
  external?: boolean;
};

export const GUIDE_WELCOME = {
  title: "Welcome to 7Band Financial Agency",
  body:
    "This site explains how Malik East, a licensed life insurance agent, helps families " +
    "protect what they build, and how to start working with him. Take a one-minute tour, " +
    "or look around on your own. Tap Guide any time.",
};

const GUIDE_BUTTON_STEP: GuideStep = {
  targets: ["guide-button"],
  title: "Come back any time",
  body: "Tap Guide whenever you want this tour again, a list of every page, or a reminder of what each button does.",
};

const BOOK_CALL =
  "Opens Malik's booking calendar in a new tab, where you pick a time for a free 30-minute strategy session.";

export const HOME_TOUR: GuideStep[] = [
  {
    targets: ["nav", "menu"],
    title: "The menu",
    body: "Every page on the site is one click from here. On a phone, tap the menu button to open it.",
    buttons: [
      {
        label: "Lifetime LOC",
        does: "How the Lifetime LOC strategy works, with four short lessons.",
      },
      { label: "Roadmap", does: "The full plan, step by step." },
      { label: "About", does: "Who Malik East is and how he works." },
      { label: "Book", does: "The American Money Tree, Malik's book." },
      {
        label: "Event",
        does: "THE FLOW, the free weekly webinar. Opens in a new tab.",
      },
    ],
  },
  {
    targets: ["nav-cta"],
    optional: true,
    title: "Talk with Malik",
    body: "The main button on the site.",
    buttons: [{ label: "Talk with Malik", does: BOOK_CALL }],
  },
  {
    targets: ["hero"],
    title: "Start here",
    body: "What 7Band does, in one screen.",
    buttons: [
      { label: "Schedule a Conversation", does: BOOK_CALL },
      { label: "Explore Lifetime LOC", does: "Opens the Lifetime LOC page." },
    ],
  },
  {
    targets: ["services"],
    title: "Two places to start",
    body: "Most people begin with their credit or with life insurance.",
    buttons: [
      {
        label: "Start With the Foundation",
        does: "Opens Arise Credit Pro, the 7Band credit company, in a new tab.",
      },
      {
        label: "Learn About Lifetime LOC",
        does: "Opens the Lifetime LOC page.",
      },
    ],
  },
  {
    targets: ["roadmap"],
    title: "The roadmap",
    body: "The order things happen in, and why the order matters.",
    buttons: [
      { label: "View the Roadmap", does: "Opens the full plan, step by step." },
    ],
  },
  {
    targets: ["guide"],
    title: "Your guide",
    body: "Meet Malik East, the licensed life insurance agent behind 7Band.",
    buttons: [{ label: "Meet Malik East", does: "Opens the About page." }],
  },
  {
    targets: ["contact"],
    title: "Ready when you are",
    body: "When you want to talk it through with Malik.",
    buttons: [{ label: "Schedule a Conversation", does: BOOK_CALL }],
  },
  {
    targets: ["footer"],
    title: "Bottom of the page",
    body: "Links to every page and to the other 7Band businesses.",
  },
  GUIDE_BUTTON_STEP,
];

export const GUIDE_PAGES: GuidePage[] = [
  { path: "/", name: "Home", what: "Start here: what 7Band does." },
  {
    path: "/lifetime-loc",
    name: "Lifetime LOC",
    what: "How the Lifetime LOC strategy works.",
  },
  {
    path: "/lesson-1",
    name: "Lessons",
    what: "Four short lessons on the Lifetime LOC.",
  },
  { path: "/game-map", name: "Roadmap", what: "The full plan, step by step." },
  { path: "/about", name: "About", what: "Malik East, your guide." },
  { path: "/the-book", name: "Book", what: "The American Money Tree." },
];

export const GUIDE_BUTTONS: GuideButton[] = [
  {
    label:
      "Talk with Malik · Schedule a Conversation · Talk Through the Roadmap",
    does: "All of these book a free 30-minute strategy call with Malik. They open Malik's booking calendar in a new tab, where you pick a time.",
  },
  {
    label: "Event",
    does: "THE FLOW, the free weekly webinar. Opens in a new tab.",
  },
  {
    label: "Start With the Foundation",
    does: "Opens Arise Credit Pro, the 7Band credit company, in a new tab.",
  },
  {
    label: "Explore / Learn About Lifetime LOC",
    does: "Opens the Lifetime LOC page.",
  },
  { label: "View the Roadmap", does: "Opens the Roadmap." },
  { label: "Meet Malik East", does: "Opens the About page." },
];
