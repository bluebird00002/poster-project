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
    aboutP1: "We specialise in producing visually compelling designs and high-quality printed materials that elevate businesses and strengthen communication. We deliver designs that stand out and prints that last.",
    aboutP2: "We work with start-ups, SMEs, corporates, NGOs, schools, event planners, and individuals seeking impactful design and precise printing solutions.",
    aboutImageAlt: "About Us",
    aboutCrafting: "Crafting Visual Excellence",
    aboutProjects: "Projects",
    aboutQuality: "Quality",
    aboutSupport: "Best",
    aboutSupportLabel: "Support",
    aboutPremium: "Premium Quality",
    aboutVisionTitle: "Our Vision",
    aboutVisionText: "To become a top creative and printing agency known for innovation, quality, and exceptional customer experience.",
    aboutMissionTitle: "Our Mission",
    aboutMission1: "Powerful design solutions that communicate clearly.",
    aboutMission2: "Reliable, high-quality printing at competitive prices.",
    aboutMission3: "Long-term partnerships through consistency and creativity.",
    aboutValuesTitle: "Core Values",
    aboutVal1Title: "Creativity",
    aboutVal1Desc: "Fresh ideas, bold concepts, and unique visual identity.",
    aboutVal2Title: "Quality",
    aboutVal2Desc: "Precision in design and excellence in print production.",
    aboutVal3Title: "Professionalism",
    aboutVal3Desc: "Timely delivery and consistent service.",
    aboutVal4Title: "Innovation",
    aboutVal4Desc: "Modern approaches, tools, and techniques.",
    aboutVal5Title: "Customer Focus",
    aboutVal5Desc: "Your brand goals guide our process.",

    servicesTitle: "Our Services",
    servicesSubtitle: "From concept to print — we bring your brand to life with precision, creativity, and quality.",
    servicesEyebrow: "What We Do",
    servicesDesignTitle: "Graphic Design",
    servicesDesignTagline: "Creative visuals that tell your story",
    servicesDesignItems: [
      "Logo design & brand identity",
      "Business cards, flyers & brochures",
      "Posters, banners & signage",
      "Social media graphics & ads",
      "Packaging & label design",
      "Company profiles and marketing materials",
    ],
    servicesPrintTitle: "Printing Services",
    servicesPrintTagline: "High-quality prints for every need",
    servicesPrintItems: [
      "Digital & offset printing",
      "Large format printing (banners, roll-ups, posters)",
      "Business stationery (cards, letterheads, envelopes)",
      "Flyers, brochures, stickers",
      "Branded merchandise (T-shirts, Caps, Mugs)",
      "Packaging prints",
    ],


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
    aboutTitle: "RicRaphix ni kampuni ya kisasa ya uchapishaji na ubunifu inayosaidia chapa kuwasiliana kwa uwazi na ubunifu wa hali ya juu.",
    aboutP1: "Tangu mwaka 2019, RicRaphix Studio imekuwa ikizisaidia biashara mbalimbali Tanzania kuwasilisha chapa zao kwa huduma bora za uchapishaji na utambulisho wa biashara. Tunachanganya ubunifu, ubora na weledi ili kutoa matokeo yanayokidhi na kuzidi matarajio.",
    aboutP2: "Timu yetu ya wabunifu na wataalamu wa uchapishaji hufanya kazi kwa ukaribu na kila mteja ili kuelewa mahitaji yake na kutekeleza maono yake kwa usahihi na uangalifu.",
    aboutImageAlt: "Kuhusu Sisi",
    aboutCrafting: "Tengeneza Ubora wa Taswira",
    aboutProjects: "Miradi",
    aboutQuality: "Ubora",
    aboutSupport: "Huduma",
    aboutSupportLabel: "Bora",
    aboutPremium: "Ubora wa Juu",
    aboutVisionTitle: "Maono Yetu",
    aboutVisionText: "Kuwa wakala bora wa ubunifu na uchapishaji unaojulikana kwa uvumbuzi, ubora, na huduma bora kwa wateja.",
    aboutMissionTitle: "Dhamira Yetu",
    aboutMission1: "Ubunifu wa miundo inayowasiliana kwa uwazi.",
    aboutMission2: "Uchapishaji wa kuaminika na wa hali ya juu kwa bei shindani.",
    aboutMission3: "Ujenzi wa ushirikiano wa muda mrefu kupitia uthabiti na ubunifu.",
    aboutValuesTitle: "Maadili Yetu",
    aboutVal1Title: "Ubunifu",
    aboutVal1Desc: "Mawazo mapya, dhana thabiti, na utambulisho wa kipekee wa taswira.",
    aboutVal2Title: "Ubora",
    aboutVal2Desc: "Umakini katika ubunifu na ubora katika uzalishaji wa chapa.",
    aboutVal3Title: "Weledi",
    aboutVal3Desc: "Uwasilishaji wa wakati na huduma thabiti.",
    aboutVal4Title: "Uvumbuzi",
    aboutVal4Desc: "Mbinu za kisasa, zana, na teknolojia mpya.",
    aboutVal5Title: "Lengo kwa Mteja",
    aboutVal5Desc: "Malengo ya chapa yako ndiyo mwongozo wa kazi zetu.",

    servicesTitle: "Huduma Zetu",
    servicesSubtitle: "Kuanzia wazo hadi uchapishaji - tunafanya chapa yako kuwa halisi kwa umakini, ubunifu, na ubora.",
    servicesEyebrow: "Tunachofanya",
    servicesDesignTitle: "Ubunifu wa Michoro",
    servicesDesignTagline: "Picha za kiubunifu zinazosimulia hadithi yako",
    servicesDesignItems: [
      "Ubunifu wa logo na utambulisho wa chapa",
      "Kadi za biashara, vipeperushi na brosha",
      "Posta, mabango na alama za ofisi",
      "Picha za mitandao ya kijamii na matangazo",
      "Ubunifu wa vifungashio na lebo",
      "Wasifu wa kampuni na vifaa vya masoko",
    ],
    servicesPrintTitle: "Huduma za Uchapishaji",
    servicesPrintTagline: "Chapa za hali ya juu kwa kila mahitaji",
    servicesPrintItems: [
      "Uchapishaji wa kidijitali na offset",
      "Uchapishaji wa fomati kubwa (mabango, roll-ups)",
      "Vifaa vya ofisi (kadi, barua, bahasha)",
      "Vipeperushi, stika",
      "Vifaa vya chapa (T-shati, Kofia, Vikombe)",
      "Uchapishaji wa vifungashio",
    ],


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

