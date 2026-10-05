/**
 * Words for the site guide: the welcome card, the home-page tour, the page
 * list and the button glossary, for both Simple View and Player 1.
 *
 * Every visitor-facing sentence the guide shows lives here, so when a page
 * or button changes, this is the one file to update. Tour steps point at
 * elements tagged with data-tour="..." in the page components.
 */

import type { ViewMode } from "@/contexts/ViewModeContext";

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

export type GuidePage = { path: string; name: string; what: string; external?: boolean };

export const GUIDE_WELCOME = {
  title: "Welcome to 7Band Financial Agency",
  body:
    "This site explains how Malik East helps families build wealth in the right order, " +
    "and how to start working with him. You can read it two ways. Same information, " +
    "same buttons. Pick the one that suits you, and switch any time.",
};

export const VIEW_INFO: Record<ViewMode, { name: string; summary: string }> = {
  simple: {
    name: "Simple View",
    summary: "Plain language and a calm layout. The quickest way to understand what 7Band does.",
  },
  player: {
    name: "Player 1",
    summary:
      "The same story told as a game: a quest through seven levels, with bosses to beat and a map to follow.",
  },
};

const VIEWS_STEP = (mode: ViewMode): GuideStep => ({
  targets: ["views"],
  title: "Two ways to see this site",
  body:
    mode === "simple"
      ? "You're in Simple View: plain language, no game. Player 1 tells the same story as a quest. " +
        "The site remembers which one you choose."
      : "You're in Player 1: the story told as a game. Simple View says the same things in plain language. " +
        "The site remembers which one you choose.",
  buttons: [
    { label: "Simple View", does: "Switches to the plain-language version." },
    { label: "Player 1", does: "Switches to the game version." },
  ],
});

const GUIDE_BUTTON_STEP: GuideStep = {
  targets: ["guide-button"],
  title: "Come back any time",
  body: "Tap Guide whenever you want this tour again, a list of every page, or a reminder of what each button does.",
};

const BOOK_CALL = "Opens Malik's booking calendar in a new tab to book a free 30-minute strategy call.";

export const HOME_TOUR: Record<ViewMode, GuideStep[]> = {
  player: [
    VIEWS_STEP("player"),
    {
      targets: ["nav", "menu"],
      title: "The menu",
      body: "Every page on the site is one click from here. On a phone, tap the menu button to open it.",
      buttons: [
        { label: "Lifetime LOC", does: "How the Lifetime LOC strategy works, with four short lessons." },
        { label: "Game Map", does: "The full plan, level by level." },
        { label: "About", does: "Who Malik East is and how he works." },
        { label: "The Book", does: "The American Money Tree, Malik's book." },
        { label: "Event", does: "THE FLOW, the free weekly webinar. Opens in a new tab." },
      ],
    },
    {
      targets: ["nav-cta"],
      optional: true,
      title: "Begin Quest",
      body: "The main button on the site. Begin Quest means: book a free strategy call with Malik.",
      buttons: [{ label: "Begin Quest", does: BOOK_CALL }],
    },
    {
      targets: ["hero"],
      title: "Start here",
      body: "The big idea of the whole site, on one screen.",
      buttons: [
        { label: "Begin Your Quest", does: BOOK_CALL },
        { label: "Unlock Lifetime LOC", does: "Opens the Lifetime LOC page." },
      ],
    },
    {
      targets: ["problem"],
      title: "The problem",
      body: "Why money sitting in a regular bank account tends to work for the bank instead of for you. Nothing to click here; just read.",
    },
    {
      targets: ["guide"],
      title: "Your guide",
      body: "Meet Malik East, the licensed life insurance agent behind 7Band.",
      buttons: [
        { label: "View Full Profile", does: "Opens the About page." },
        { label: "Schedule Session", does: BOOK_CALL },
      ],
    },
    {
      targets: ["blueprint"],
      title: "The plan",
      body: "The whole plan in three phases. Each phase sets up the next one.",
      buttons: [{ label: "View the Full Game Map", does: "Opens the map of every level, step by step." }],
    },
    {
      targets: ["compare"],
      title: "Two strategies, side by side",
      body:
        "The usual way of handling money next to the 7Band way. \"NPC\" is a gaming word for a " +
        "background character who just follows the script; \"Player 1\" is the one making the moves.",
    },
    {
      targets: ["warning"],
      title: "The cost of waiting",
      body: "What can happen if nothing changes.",
      buttons: [{ label: "Yes, Begin My Quest", does: BOOK_CALL }],
    },
    {
      targets: ["winning"],
      title: "Where this leads",
      body: "The goal the whole plan is working toward.",
      buttons: [{ label: "Lock In Your Character", does: BOOK_CALL }],
    },
    {
      targets: ["footer"],
      title: "Bottom of the page",
      body: "Links to every page, the other 7Band businesses, Malik's YouTube channel, and his email address.",
    },
    GUIDE_BUTTON_STEP,
  ],
  simple: [
    VIEWS_STEP("simple"),
    {
      targets: ["nav", "menu"],
      title: "The menu",
      body: "Every page on the site is one click from here. On a phone, tap the menu button to open it.",
      buttons: [
        { label: "Lifetime LOC", does: "How the Lifetime LOC strategy works, with four short lessons." },
        { label: "Roadmap", does: "The full plan, step by step." },
        { label: "About", does: "Who Malik East is and how he works." },
        { label: "Book", does: "The American Money Tree, Malik's book." },
        { label: "Event", does: "THE FLOW, the free weekly webinar. Opens in a new tab." },
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
        { label: "Start With the Foundation", does: "Opens Arise Credit Pro, the 7Band credit company, in a new tab." },
        { label: "Learn About Lifetime LOC", does: "Opens the Lifetime LOC page." },
      ],
    },
    {
      targets: ["roadmap"],
      title: "The roadmap",
      body: "The order things happen in, and why the order matters.",
      buttons: [{ label: "View the Roadmap", does: "Opens the full plan, step by step." }],
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
  ],
};

export const GUIDE_PAGES: Record<ViewMode, GuidePage[]> = {
  player: [
    { path: "/", name: "Home", what: "Start here: the big picture." },
    { path: "/lifetime-loc", name: "Lifetime LOC", what: "How the Lifetime LOC strategy works." },
    { path: "/lesson-1", name: "The Manual", what: "Four short lessons on the Lifetime LOC." },
    { path: "/game-map", name: "Game Map", what: "The full plan, level by level." },
    { path: "/about", name: "About", what: "Malik East, your guide." },
    { path: "/the-book", name: "The Book", what: "The American Money Tree." },
  ],
  simple: [
    { path: "/", name: "Home", what: "Start here: what 7Band does." },
    { path: "/lifetime-loc", name: "Lifetime LOC", what: "How the Lifetime LOC strategy works." },
    { path: "/lesson-1", name: "Lessons", what: "Four short lessons on the Lifetime LOC." },
    { path: "/game-map", name: "Roadmap", what: "The full plan, step by step." },
    { path: "/about", name: "About", what: "Malik East, your guide." },
    { path: "/the-book", name: "Book", what: "The American Money Tree." },
  ],
};

export const GUIDE_BUTTONS: Record<ViewMode, GuideButton[]> = {
  player: [
    {
      label: "Begin Quest · Begin Your Quest · Schedule Session · Yes, Begin My Quest · Lock In Your Character",
      does: "All of these book a free 30-minute strategy call with Malik. They open his booking calendar in a new tab.",
    },
    { label: "Event", does: "THE FLOW, the free weekly webinar. Opens in a new tab." },
    { label: "Unlock Lifetime LOC", does: "Opens the Lifetime LOC page." },
    { label: "View the Full Game Map", does: "Opens the Game Map." },
    { label: "View Full Profile", does: "Opens the About page." },
    { label: "Simple View · Player 1", does: "Switch between the plain-language and game versions of the site." },
  ],
  simple: [
    {
      label: "Talk with Malik · Schedule a Conversation · Talk Through the Roadmap",
      does: "All of these book a free 30-minute strategy call with Malik. They open his booking calendar in a new tab.",
    },
    { label: "Event", does: "THE FLOW, the free weekly webinar. Opens in a new tab." },
    { label: "Start With the Foundation", does: "Opens Arise Credit Pro, the 7Band credit company, in a new tab." },
    { label: "Explore / Learn About Lifetime LOC", does: "Opens the Lifetime LOC page." },
    { label: "View the Roadmap", does: "Opens the Roadmap." },
    { label: "Meet Malik East", does: "Opens the About page." },
    { label: "Simple View · Player 1", does: "Switch between the plain-language and game versions of the site." },
  ],
};
