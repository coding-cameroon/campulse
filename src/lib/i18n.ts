import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ENGLISH LNG
import authEN from "@/i18n/en/auth.json";
import createEN from "@/i18n/en/create.json";
import eventsEN from "@/i18n/en/events.json";
import homeEN from "@/i18n/en/home.json";
import lostEN from "@/i18n/en/lost.json";
import onboardingEN from "@/i18n/en/onboarding.json";
import profileEN from "@/i18n/en/profile.json";
import signinEN from "@/i18n/en/signin.json";
import signupEN from "@/i18n/en/signup.json";
import wallEN from "@/i18n/en/wall.json";

// FRECH LNG
import authFR from "@/i18n/fr/auth.json";
import createFR from "@/i18n/fr/create.json";
import eventsFR from "@/i18n/fr/events.json";
import homeFR from "@/i18n/fr/home.json";
import lostFR from "@/i18n/fr/lost.json";
import onboardingFR from "@/i18n/fr/onboarding.json";
import profileFR from "@/i18n/fr/profile.json";
import signinFR from "@/i18n/fr/signin.json";
import signupFR from "@/i18n/fr/signup.json";
import wallFR from "@/i18n/fr/wall.json";

const resources = {
  en: {
    auth: authEN,
    home: homeEN,
    lost: lostEN,
    wall: wallEN,
    signin: signinEN,
    signup: signupEN,
    create: createEN,
    events: eventsEN,
    profile: profileEN,
    onboarding: onboardingEN,
  },
  fr: {
    auth: authFR,
    home: homeFR,
    lost: lostFR,
    wall: wallFR,
    signin: signinFR,
    signup: signupFR,
    create: createFR,
    events: eventsFR,
    profile: profileFR,
    onboarding: onboardingFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: [
    "auth",
    "home",
    "lost",
    "wall",
    "signin",
    "signup",
    "create",
    "events",
    "profile",
    "onboarding",
  ],
});
