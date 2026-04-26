import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANG_STORAGE_KEY = "site-language";

const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navWorks: "Portfolio",
    navContact: "Contact",
    language: "Language",
    switchToSw: "Switch to Swahili",
    switchToEn: "Switch to English",

    heroBadge: "Best Of Arts",
    heroTitleStart: "We Design, We Print,",
    heroTitleAccent: "We Brand",
    heroTitleEnd: "",
    heroSubtitle:
      "Professional printing and branding solutions that bring your vision to life with quality, creativity, and precision.",
    heroCta: "See Our Work",

    aboutLabel: "ABOUT US",
    aboutTitle: "RicRaphix is a modern graphic design and printing company committed to helping brands speak with clarity, creativity, and impact.",
    aboutP1:
      "We specialise in producing visually compelling designs and high-quality printed materials that elevate businesses and strengthen communication. We deliver designs that stand out and prints that last.",
    aboutP2:
      "We work with start-ups, SMEs, corporates, NGOs, schools, event planners, and individuals seeking impactful design and precise printing solutions.",
    aboutImageAlt: "About Us",

    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive printing and branding solutions tailored to your business needs",


    portfolioTitle: "Our Portfolio",
    portfolioSubtitle: "Featured Designs",
    portfolioCta: "View more works",

    reviewsTitle: "Real Client Stories",
    reviewsSubtitle: "Don't just take our word for it - see what our clients have to say about their experience",
    reviewsPrev: "Previous reviews",
    reviewsNext: "Next reviews",

    contactTitle: "Get In Touch",
    contactSubtitle: "Have a project in mind? We'd love to hear from you and help bring your vision to life.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactLocation: "Location",
    contactHours: "Working Hours",
    chatOnWhatsApp: "Chat on WhatsApp",

    footerQuickLinks: "Quick Links",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    footerCredit: "Built with passion for African businesses",



    worksTitle: "Our Works",
    worksSubtitle: "A showcase of the projects we have delivered so far.",
    interestInWork: "I'm interested in the following work:",
    workTag: "Works",
    catBusinessCard: "Business Card",
    catFlyer: "Flyer & Brochure",
    catBanner: "Roll-up Banner",
    catOutdoor: "Outdoor Branding",
    catStationary: "Stationary",
    catSignage: "Signage & Office",
    catLogo: "Logo Design",
    catBranding: "Corporate Branding",
  },
  sw: {
    navHome: "Nyumbani",
    navAbout: "Kuhusu",
    navServices: "Huduma",
    navWorks: "Portfolio",
    navContact: "Mawasiliano",
    language: "Lugha",
    switchToSw: "Badili kwenda Kiswahili",
    switchToEn: "Badili kwenda Kiingereza",

    heroBadge: "Sanaa yenye ubora",
    heroTitleStart: "Tunabuni, Tunachapisha,",
    heroTitleAccent: "Tunakuza Brandi",
    heroTitleEnd: "",
    heroSubtitle:
      "Tunatoa huduma za kitaalamu za uchapishaji na utambulisho wa biashara ili kuyafanya maono yako kuwa halisi kwa ubora, ubunifu na umakini.",
    heroCta: "Tazama Kazi Zetu",

    aboutLabel: "Kuhusu Sisi",
    aboutTitle: "Mshirika Wako wa Ubunifu katika Uchapishaji na Utambulisho wa Biashara",
    aboutP1:
      "Tangu mwaka 2019, RicRaphix Studio imekuwa ikizisaidia biashara mbalimbali Tanzania kuwasilisha chapa zao kwa huduma bora za uchapishaji na utambulisho wa biashara. Tunachanganya ubunifu, ubora na weledi ili kutoa matokeo yanayokidhi na kuzidi matarajio.",
    aboutP2:
      "Timu yetu ya wabunifu na wataalamu wa uchapishaji hufanya kazi kwa ukaribu na kila mteja ili kuelewa mahitaji yake na kutekeleza maono yake kwa usahihi na uangalifu.",
    aboutImageAlt: "Kuhusu Sisi",

    servicesTitle: "Huduma Zetu",
    servicesSubtitle: "Suluhisho jumuishi za uchapishaji na utambulisho wa biashara zinazoendana na mahitaji ya biashara yako",


    portfolioTitle: "Kazi Zetu",
    portfolioSubtitle: "Miundo Iliyochaguliwa",
    portfolioCta: "Tazama kazi zaidi",

    reviewsTitle: "Ushuhuda wa Wateja",
    reviewsSubtitle: "Soma maoni ya wateja wetu kuhusu huduma na matokeo waliyopata",
    reviewsPrev: "Maoni yaliyotangulia",
    reviewsNext: "Maoni yanayofuata",

    contactTitle: "Wasiliana Nasi",
    contactSubtitle: "Una wazo la kazi au mradi? Tuko tayari kukusikiliza na kukusaidia kuutekeleza kwa ubora.",
    contactPhone: "Simu",
    contactEmail: "Barua Pepe",
    contactLocation: "Mahali",
    contactHours: "Saa za Kazi",
    chatOnWhatsApp: "Ongea nasi kupitia WhatsApp",

    footerQuickLinks: "Viungo vya Haraka",
    footerContact: "Mawasiliano",
    footerRights: "Haki zote zimehifadhiwa.",
    footerCredit: "Imeandaliwa kwa shauku kwa biashara za Afrika",



    worksTitle: "Kazi Zetu",
    worksSubtitle: "Mfano wa miradi tuliyokwisha kuwasilisha kwa sasa.",
    interestInWork: "Ninavutiwa na kazi ifuatayo:",
    workTag: "Kazi",
    catBusinessCard: "Kadi za Biashara",
    catFlyer: "Flyer na Vipeperushi",
    catBanner: "Roll-up Banner",
    catOutdoor: "Branding ya Nje",
    catStationary: "Stationary",
    catSignage: "Signage na Ofisi",
    catLogo: "Ubunifu wa Logo",
    catBranding: "Corporate Branding",
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === "sw" ? "sw" : "en";
  });

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, language);
    document.documentElement.lang = language === "sw" ? "sw" : "en";
  }, [language]);

  const value = useMemo(() => {
    const t = (key, params) => {
      const entry = translations[language]?.[key] ?? translations.en[key] ?? key;
      return typeof entry === "function" ? entry(params || {}) : entry;
    };

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "sw" : "en")),
      t,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

