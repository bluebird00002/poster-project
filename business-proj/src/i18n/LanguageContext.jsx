import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANG_STORAGE_KEY = "site-language";

const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navProducts: "Products",
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
    servicesCta: "Place an Order",

    portfolioTitle: "Our Portfolio",
    portfolioSubtitle: "Featured Designs",
    portfolioCta: "View Products",

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
  },
  sw: {
    navHome: "Nyumbani",
    navAbout: "Kuhusu",
    navServices: "Huduma",
    navProducts: "Bidhaa",
    navContact: "Mawasiliano",
    language: "Lugha",
    switchToSw: "Badili kwenda Kiswahili",
    switchToEn: "Badili kwenda Kiingereza",

    heroBadge: "Ubora wa Sanaa",
    heroTitleStart: "Tunachapisha. Tuna",
    heroTitleAccent: "Brandi.",
    heroTitleEnd: "Tunawasilisha.",
    heroSubtitle:
      "Huduma za kitaalamu za uchapishaji na uundaji wa brandi zinazobadilisha maono yako kuwa uhalisia kwa ubora, ubunifu na umakini.",
    heroCta: "Tazama Kazi Zetu",

    aboutLabel: "Kuhusu Sisi",
    aboutTitle: "Mshirika Wako wa Ubunifu Katika Uchapishaji na Brandi",
    aboutP1:
      "Tangu mwaka 2019, RicRaphix Studio imekuwa ikisaidia biashara Tanzania kusimulia hadithi zao kupitia huduma bora za uchapishaji na brandi. Tunachanganya ubunifu, ubora na weledi ili kutoa matokeo yanayozidi matarajio.",
    aboutP2:
      "Timu yetu ya wabunifu na wataalamu wa uchapishaji hufanya kazi kwa karibu na kila mteja kuelewa mahitaji yao na kutekeleza maono yao kwa usahihi na shauku.",
    aboutImageAlt: "Kuhusu Sisi",

    servicesTitle: "Huduma Zetu",
    servicesSubtitle: "Suluhisho kamili za uchapishaji na brandi zinazolingana na mahitaji ya biashara yako",
    servicesCta: "Weka Oda",

    portfolioTitle: "Portfolio Yetu",
    portfolioSubtitle: "Miundo Iliyoangaziwa",
    portfolioCta: "Tazama Bidhaa",

    reviewsTitle: "Maoni Halisi ya Wateja",
    reviewsSubtitle: "Usitegemee neno letu pekee - soma maoni ya wateja kuhusu uzoefu wao",
    reviewsPrev: "Maoni yaliyotangulia",
    reviewsNext: "Maoni yanayofuata",

    contactTitle: "Wasiliana Nasi",
    contactSubtitle: "Una wazo la mradi? Tunafurahi kusikia kutoka kwako na kukusaidia kulitekeleza.",
    contactPhone: "Simu",
    contactEmail: "Barua Pepe",
    contactLocation: "Mahali",
    contactHours: "Saa za Kazi",
    chatOnWhatsApp: "Ongea nasi WhatsApp",

    footerQuickLinks: "Viungo vya Haraka",
    footerContact: "Mawasiliano",
    footerRights: "Haki zote zimehifadhiwa.",
    footerCredit: "Imejengwa kwa shauku kwa biashara za Afrika",

    productsTitle: "Bidhaa Zetu",
    productsSubtitle: "Chagua miundo na uombe oda. Bei zote ni kwa kila kipande.",
    search: "Tafuta",
    searchPlaceholder: "Tafuta kwa jina, kundi, vipengele...",
    sort: "Panga",
    sortRecommended: "Inayopendekezwa",
    sortNewest: "Mpya zaidi",
    sortPriceLow: "Bei ndogo zaidi",
    sortDiscountHigh: "Punguzo kubwa zaidi",
    productCategories: "Makundi ya bidhaa",
    priceMin: "Bei ya chini (TZS kwa kipande)",
    priceMax: "Bei ya juu (TZS kwa kipande)",
    minDiscount: "Punguzo la chini",
    any: "Yoyote",
    showDiscountedOnly: "Onyesha zenye punguzo tu",
    hasOfferLabel: "Ina lebo ya ofa",
    maxDeliveryTime: "Muda wa juu wa uwasilishaji",
    upTo3Days: "Hadi siku 3",
    upTo5Days: "Hadi siku 5",
    upTo7Days: "Hadi siku 7",
    upTo14Days: "Hadi siku 14",
    recentlyUpdated: "Iliyosasishwa hivi karibuni",
    anyTime: "Wakati wowote",
    last30Days: "Siku 30 zilizopita",
    last90Days: "Siku 90 zilizopita",
    last180Days: "Siku 180 zilizopita",
    showingProducts: ({ showing, total }) => `Inaonyesha bidhaa ${showing} kati ya ${total}`,
    requestQuote: ({ count }) => `Omba nukuu ya ${count}`,
    reset: "Anza upya",
    noProductsTitle: "Hakuna bidhaa zinazolingana na vichujio vyako.",
    noProductsSubtitle: "Jaribu kundi, bei au muda wa uwasilishaji tofauti.",
    clearSearch: "Futa utafutaji",
    savePercent: ({ value }) => `Okoa ${value}%`,
    noDiscount: "Hakuna Punguzo",
    perPiece: "kwa kipande",
    delivery: "Uwasilishaji:",
    updated: "Imesasishwa:",
    placeOrder: "Weka Oda",
    viewDetails: "Tazama maelezo",
    cancel: "Ghairi",
    helloBusiness: ({ name }) => `Habari ${name},`,
    interestInDesigns: "Ninapenda miundo ifuatayo:",
    shareAvailability: "Tafadhali shiriki upatikanaji, malipo na hatua zinazofuata.",
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

