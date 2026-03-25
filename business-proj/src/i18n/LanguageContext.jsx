import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANG_STORAGE_KEY = "site-language";

const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navProducts: "Products",
    navWorks: "Portfolio",
    navContact: "Contact",
    language: "Language",
    switchToSw: "Switch to Swahili",
    switchToEn: "Switch to English",

    heroBadge: "Best Of Arts",
    heroTitleStart: "We Print. We",
    heroTitleAccent: "Brand.",
    heroTitleEnd: "We Deliver.",
    heroSubtitle:
      "Professional printing and branding solutions that bring your vision to life with quality, creativity, and precision.",
    heroCta: "See Our Work",

    aboutLabel: "About Us",
    aboutTitle: "Your Creative Partner in Print & Branding",
    aboutP1:
      "Since 2019, RicRaphix Studio has been helping businesses in Tanzania tell their stories through exceptional printing and branding solutions. We combine creativity, quality, and professionalism to deliver results that exceed expectations.",
    aboutP2:
      "Our team of experienced designers and print specialists work closely with each client to understand their unique needs and bring their vision to life with precision and passion.",
    aboutImageAlt: "About Us",

    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive printing and branding solutions tailored to your business needs",
    servicesCta: "View Products",

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

    productsTitle: "Our Products",
    productsSubtitle: "Browse designs and request an order. All prices are per piece.",
    search: "Search",
    searchPlaceholder: "Search by title, category, features...",
    sort: "Sort",
    sortRecommended: "Recommended",
    sortNewest: "Newest",
    sortPriceLow: "Lowest Price",
    sortDiscountHigh: "Highest Discount",
    productCategories: "Product categories",
    priceMin: "Price min (TZS per piece)",
    priceMax: "Price max (TZS per piece)",
    minDiscount: "Min discount",
    any: "Any",
    showDiscountedOnly: "Show discounted only",
    hasOfferLabel: "Has offer label",
    maxDeliveryTime: "Max delivery time",
    upTo3Days: "Up to 3 days",
    upTo5Days: "Up to 5 days",
    upTo7Days: "Up to 7 days",
    upTo14Days: "Up to 14 days",
    recentlyUpdated: "Recently updated",
    anyTime: "Any time",
    last30Days: "Last 30 days",
    last90Days: "Last 90 days",
    last180Days: "Last 180 days",
    showingProducts: ({ showing, total }) => `Showing ${showing} of ${total} products`,
    requestQuote: ({ count }) => `Request ${count} quote`,
    reset: "Reset",
    noProductsTitle: "No products match your filters.",
    noProductsSubtitle: "Try a different category, price, or delivery time.",
    clearSearch: "Clear search",
    savePercent: ({ value }) => `Save ${value}%`,
    noDiscount: "No Discount",
    perPiece: "per piece",
    delivery: "Delivery:",
    updated: "Updated:",
    placeOrder: "Place Order",
    viewDetails: "View details",
    cancel: "Cancel",
    helloBusiness: ({ name }) => `Hello ${name},`,
    interestInDesigns: "I'm interested in the following designs:",
    shareAvailability: "Please share availability, payment details, and next steps.",

    worksTitle: "Our Works",
    worksSubtitle: "A showcase of the projects we have delivered so far.",
    interestInWork: "I'm interested in the following work:",
    workTag: "Works",
  },
  sw: {
    navHome: "Nyumbani",
    navAbout: "Kuhusu",
    navServices: "Huduma",
    navProducts: "Bidhaa",
    navWorks: "Portfolio",
    navContact: "Mawasiliano",
    language: "Lugha",
    switchToSw: "Badili kwenda Kiswahili",
    switchToEn: "Badili kwenda Kiingereza",

    heroBadge: "Sanaa yenye ubora",
    heroTitleStart: "Tunachapisha. Tunakuza",
    heroTitleAccent: "Brandi.",
    heroTitleEnd: "Tunawasilisha.",
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
    servicesCta: "Tazama Bidhaa",

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

    productsTitle: "Bidhaa Zetu",
    productsSubtitle: "Chunguza miundo yetu kisha weka oda. Bei zote zinaoneshwa kwa kila kipande.",
    search: "Tafuta",
    searchPlaceholder: "Tafuta kwa jina, aina, au vipengele...",
    sort: "Panga",
    sortRecommended: "Zilizopendekezwa",
    sortNewest: "Mpya zaidi",
    sortPriceLow: "Bei kuanzia chini",
    sortDiscountHigh: "Punguzo kuanzia kubwa",
    productCategories: "Aina za bidhaa",
    priceMin: "Bei ya chini (TZS kwa kipande)",
    priceMax: "Bei ya juu (TZS kwa kipande)",
    minDiscount: "Kiwango cha chini cha punguzo",
    any: "Yoyote",
    showDiscountedOnly: "Onyesha zenye punguzo pekee",
    hasOfferLabel: "Onyesha zilizo na ofa",
    maxDeliveryTime: "Muda wa juu wa kukamilisha",
    upTo3Days: "Hadi siku 3",
    upTo5Days: "Hadi siku 5",
    upTo7Days: "Hadi siku 7",
    upTo14Days: "Hadi siku 14",
    recentlyUpdated: "Iliyoboreshwa hivi karibuni",
    anyTime: "Wakati wowote",
    last30Days: "Siku 30 zilizopita",
    last90Days: "Siku 90 zilizopita",
    last180Days: "Siku 180 zilizopita",
    showingProducts: ({ showing, total }) => `Unaona bidhaa ${showing} kati ya ${total}`,
    requestQuote: ({ count }) => `Omba bei ya bidhaa ${count}`,
    reset: "Anza upya",
    noProductsTitle: "Hakuna bidhaa zinazolingana na vichujio vyako.",
    noProductsSubtitle: "Jaribu kubadilisha aina, bei au muda wa kukamilisha.",
    clearSearch: "Futa kutafuta",
    savePercent: ({ value }) => `Punguzo ${value}%`,
    noDiscount: "Hakuna punguzo",
    perPiece: "kwa kipande",
    delivery: "Uwasilishaji:",
    updated: "Imesasishwa:",
    placeOrder: "Weka Oda",
    viewDetails: "Angalia maelezo",
    cancel: "Ghairi",
    helloBusiness: ({ name }) => `Habari ${name},`,
    interestInDesigns: "Ninavutiwa na miundo ifuatayo:",
    shareAvailability: "Naomba mnitumie upatikanaji, utaratibu wa malipo, pamoja na hatua zinazofuata.",

    worksTitle: "Kazi Zetu",
    worksSubtitle: "Mfano wa miradi tuliyokwisha kuwasilisha kwa sasa.",
    interestInWork: "Ninavutiwa na kazi ifuatayo:",
    workTag: "Kazi",
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

