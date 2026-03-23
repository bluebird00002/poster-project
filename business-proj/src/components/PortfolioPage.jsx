import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { portfolio, portfolioCategories } from "../data/portfolio";
import { config } from "../config";
import "./PortfolioPage.css";

const formatTZS = (amount) => {
  if (!Number.isFinite(amount)) return "";
  // Keep it simple and readable for customers (TZS thousands formatting).
  return `TZS ${new Intl.NumberFormat("en-US").format(Math.round(amount))}`;
};

const getFinalPrice = (item) => {
  const discount = Number(item.discountPercent || 0);
  const base = Number(item.basePrice || 0);
  return base * (1 - discount / 100);
};

const daysBetween = (dateA, dateB) => {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
};

const IconTruck = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 7h12v10H3z" />
    <path d="M15 10h4l2 2v5h-6z" />
    <circle cx="7" cy="18" r="1.5" />
    <circle cx="18" cy="18" r="1.5" />
  </svg>
);

const IconClock = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

const IconTag = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.59 13.41 13.41 20.59a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z" />
    <circle cx="7.5" cy="7.5" r="1" />
  </svg>
);

const IconPlus = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const IconCheck = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const formatRelativeUpdated = (updatedAt) => {
  if (!updatedAt) return "Recently updated";
  const updatedMs = new Date(updatedAt).getTime();
  if (!Number.isFinite(updatedMs)) return "Recently updated";

  const diffMs = Date.now() - updatedMs;
  if (diffMs < 0) return "Recently updated";

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) {
    const m = Math.max(1, minutes);
    return `${m} min${m === 1 ? "" : "s"}`;
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hr${hours === 1 ? "" : "s"}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"}`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"}`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
};

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [priceMinInput, setPriceMinInput] = useState("");
  const [priceMaxInput, setPriceMaxInput] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [discountMin, setDiscountMin] = useState(10);
  const [offerOnly, setOfferOnly] = useState(false);
  const [turnaroundMax, setTurnaroundMax] = useState("any"); // days
  const [updatedWithin, setUpdatedWithin] = useState("any"); // days
  const [sortBy, setSortBy] = useState("recommended");

  const [selectedIds, setSelectedIds] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    if (modalProduct) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalProduct]);

  const priceMin = priceMinInput ? Number(priceMinInput) : null;
  const priceMax = priceMaxInput ? Number(priceMaxInput) : null;
  const turnaroundMaxDays = turnaroundMax === "any" ? null : Number(turnaroundMax);
  const updatedWithinDays = updatedWithin === "any" ? null : Number(updatedWithin);
  const q = query.trim().toLowerCase();

  const filteredPortfolio = useMemo(() => {
    let items = [...portfolio];

    if (activeCategory !== "All") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (q) {
      items = items.filter((item) => {
        const haystack = [
          item.title,
          item.category,
          (item.features || []).join(" "),
          item.specs,
          item.offerLabel,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    items = items.filter((item) => {
      const finalPrice = getFinalPrice(item);
      if (priceMin !== null && finalPrice < priceMin) return false;
      if (priceMax !== null && finalPrice > priceMax) return false;
      if (discountOnly) {
        if ((item.discountPercent || 0) < discountMin) return false;
      }
      if (offerOnly) {
        if (!item.offerLabel || !item.offerLabel.trim()) return false;
      }
      if (turnaroundMaxDays !== null) {
        if (Number(item.turnaroundDays || 0) > turnaroundMaxDays) return false;
      }
      if (updatedWithinDays !== null) {
        const daysOld = daysBetween(item.updatedAt, new Date());
        if (daysOld > updatedWithinDays) return false;
      }
      return true;
    });

    items.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (sortBy === "priceLow") {
        return getFinalPrice(a) - getFinalPrice(b);
      }
      if (sortBy === "discountHigh") {
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      }
      // recommended: discount + recency
      const aRecency = Math.max(0, 180 - daysBetween(a.updatedAt, new Date()));
      const bRecency = Math.max(0, 180 - daysBetween(b.updatedAt, new Date()));
      const aScore = (a.discountPercent || 0) * 2 + aRecency / 30;
      const bScore = (b.discountPercent || 0) * 2 + bRecency / 30;
      return bScore - aScore;
    });

    return items;
  }, [
    activeCategory,
    discountMin,
    discountOnly,
    offerOnly,
    priceMax,
    priceMin,
    q,
    sortBy,
    turnaroundMaxDays,
    updatedWithinDays,
  ]);

  const selectedProducts = useMemo(() => {
    const selectedSet = new Set(selectedIds);
    return portfolio.filter((p) => selectedSet.has(p.id));
  }, [selectedIds]);

  const buildWhatsAppMessage = (items) => {
    const lines = items.map((p) => {
      const finalPrice = getFinalPrice(p);
      return `• ${p.title} (${p.category}) - ${formatTZS(finalPrice)} per piece - Delivery: ${p.turnaroundLabel}`;
    });
    return `Hello ${config.businessName},\n\nI'm interested in the following designs:\n${lines.join(
      "\n"
    )}\n\nPlease share availability, payment details, and next steps.`;
  };

  const requestOrder = (items) => {
    if (!items || items.length === 0) return;
    const message = buildWhatsAppMessage(items);
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const placeOrderFromModal = () => {
    if (!modalProduct) return;
    const alreadySelected = selectedIds.includes(modalProduct.id);
    const ids = alreadySelected ? selectedIds : [...selectedIds, modalProduct.id];
    const items = portfolio.filter((p) => ids.includes(p.id));
    requestOrder(items);
    setModalProduct(null);
  };

  const closeModal = () => setModalProduct(null);

  const onCardAddClick = (e, item) => {
    // Stop propagation so clicking the card CTA doesn't open the product modal.
    e.stopPropagation();
    requestOrder([item]);
  };

  const totalCount = portfolio.length;
  const showingCount = filteredPortfolio.length;

  return (
    <>
      <Navbar />
      <section id="portfolio" className="portfolio-page">
        <div className="portfolio-container">
          <motion.div
            className="section-header"
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title">Our Products</h1>
            <p className="section-subtitle">
              Browse designs and request an order. All prices are per piece.
            </p>
          </motion.div>

          <div className="products-layout">
            <div className="products-main">
              {/* Filters */}
              <motion.div
                className="filters-panel"
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.55 }}
              >
                <div className="filters-top">
                  <div className="search-wrap">
                    <label className="control-label" htmlFor="portfolio-search">
                      Search
                    </label>
                    <div className="search-input-wrap">
                      <input
                        id="portfolio-search"
                        className="control-input"
                        placeholder="Search by title, category, features..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sort-wrap">
                    <label className="control-label" htmlFor="portfolio-sort">
                      Sort
                    </label>
                    <select
                      id="portfolio-sort"
                      className="control-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="newest">Newest</option>
                      <option value="priceLow">Lowest Price</option>
                      <option value="discountHigh">Highest Discount</option>
                    </select>
                  </div>
                </div>

                <div className="category-bar" aria-label="Product categories">
                  {portfolioCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`category-btn ${activeCategory === category ? "active" : ""}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="filters-grid">
                  <div className="control">
                    <label className="control-label" htmlFor="price-min">
                      Price min (TZS per piece)
                    </label>
                    <input
                      id="price-min"
                      className="control-input"
                      inputMode="numeric"
                      placeholder="10000"
                      value={priceMinInput}
                      onChange={(e) => setPriceMinInput(e.target.value.replace(/[^\d]/g, ""))}
                    />
                  </div>

                  <div className="control">
                    <label className="control-label" htmlFor="price-max">
                      Price max (TZS per piece)
                    </label>
                    <input
                      id="price-max"
                      className="control-input"
                      inputMode="numeric"
                      placeholder="100000"
                      value={priceMaxInput}
                      onChange={(e) => setPriceMaxInput(e.target.value.replace(/[^\d]/g, ""))}
                    />
                  </div>

                  <div className="control">
                    <label className="control-label" htmlFor="discount-min">
                      Min discount
                    </label>
                    <select
                      id="discount-min"
                      className="control-select"
                      value={discountMin}
                      onChange={(e) => setDiscountMin(Number(e.target.value))}
                    >
                      <option value={0}>Any</option>
                      <option value={10}>10%+</option>
                      <option value={15}>15%+</option>
                      <option value={20}>20%+</option>
                    </select>
                  </div>

                  <div className="control toggle">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={discountOnly}
                        onChange={(e) => setDiscountOnly(e.target.checked)}
                      />
                      Show discounted only
                    </label>
                  </div>

                  <div className="control toggle">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={offerOnly}
                        onChange={(e) => setOfferOnly(e.target.checked)}
                      />
                      Has offer label
                    </label>
                  </div>

                  <div className="control">
                    <label className="control-label" htmlFor="turnaround-max">
                      Max delivery time
                    </label>
                    <select
                      id="turnaround-max"
                      className="control-select"
                      value={turnaroundMax}
                      onChange={(e) => setTurnaroundMax(e.target.value)}
                    >
                      <option value="any">Any</option>
                      <option value={3}>Up to 3 days</option>
                      <option value={5}>Up to 5 days</option>
                      <option value={7}>Up to 7 days</option>
                      <option value={14}>Up to 14 days</option>
                    </select>
                  </div>

                  <div className="control">
                    <label className="control-label" htmlFor="updated-within">
                      Recently updated
                    </label>
                    <select
                      id="updated-within"
                      className="control-select"
                      value={updatedWithin}
                      onChange={(e) => setUpdatedWithin(e.target.value)}
                    >
                      <option value="any">Any time</option>
                      <option value={30}>Last 30 days</option>
                      <option value={90}>Last 90 days</option>
                      <option value={180}>Last 180 days</option>
                    </select>
                  </div>
                </div>

                <div className="filters-footer">
                  <div className="results-hint">
                    Showing <strong>{showingCount}</strong> of <strong>{totalCount}</strong> products
                  </div>
                  <div className="filters-footer-actions">
                    {selectedProducts.length > 0 && (
                      <button
                        type="button"
                        className="request-selected-btn"
                        onClick={() => requestOrder(selectedProducts)}
                      >
                        Request {selectedProducts.length} quote
                      </button>
                    )}
                    <button
                      type="button"
                      className="clear-filters-btn"
                      onClick={() => {
                        setActiveCategory("All");
                        setQuery("");
                        setPriceMinInput("");
                        setPriceMaxInput("");
                        setDiscountOnly(false);
                        setDiscountMin(10);
                        setOfferOnly(false);
                        setTurnaroundMax("any");
                        setUpdatedWithin("any");
                        setSortBy("recommended");
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Grid */}
              <motion.div
                className="products-grid"
                layout
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {filteredPortfolio.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-title">No products match your filters.</div>
                    <div className="empty-subtitle">Try a different category, price, or delivery time.</div>
                    <button type="button" className="empty-reset" onClick={() => setQuery("")}>
                      Clear search
                    </button>
                  </div>
                ) : (
                  filteredPortfolio.map((item) => {
                    const finalPrice = getFinalPrice(item);
                    const hasDiscount = (item.discountPercent || 0) > 0;
                    const updatedLabel = formatRelativeUpdated(item.updatedAt);
                    return (
                      <motion.div
                        key={item.id}
                        className="product-card"
                        layout
                        whileHover={{ y: -6 }}
                        onClick={() => setModalProduct(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setModalProduct(item);
                        }}
                      >
                        <div className="product-media">
                          <img src={item.image} alt={item.title} loading="lazy" />
                          <div className="product-media-gradient" />

                          <div className="product-badges">
                            <span className="badge badge-category">{item.category}</span>
                            {hasDiscount ? (
                              <span className="badge badge-discount">Save {item.discountPercent}%</span>
                            ) : item.offerLabel ? (
                              <span className="badge badge-offer">{item.offerLabel}</span>
                            ) : (
                              <span className="badge badge-discount badge-discount--none">No Discount</span>
                            )}
                          </div>
                        </div>

                        <div className="product-info">
                          <div className="product-price">
                            <div className="price-now">
                              <span className="btn-icon" style={{ color: "rgba(249, 115, 22, 0.95)" }}>
                                <IconTag className="" />
                              </span>
                              {formatTZS(finalPrice)}
                              <span className="price-unit"> per piece</span>
                            </div>
                            {hasDiscount ? (
                              <div className="price-original">{formatTZS(item.basePrice)} per piece</div>
                            ) : null}
                          </div>

                          <div className="product-meta">
                            <span className="meta-pill">
                              <span className="meta-k">
                                <span className="meta-icon">
                                  <IconTruck />
                                </span>
                                Delivery:
                              </span>{" "}
                              {item.turnaroundLabel}
                            </span>
                            <span className="meta-pill">
                              <span className="meta-k">
                                <span className="meta-icon">
                                  <IconClock />
                                </span>
                                Updated:
                              </span>{" "}
                              {updatedLabel}
                            </span>
                          </div>

                          <div className="product-title">{item.title}</div>

                          <div className="product-actions">
                            <button
                              type="button"
                              className="order-add-btn"
                              onClick={(e) => onCardAddClick(e, item)}
                            >
                              <span className="btn-icon">
                                <IconPlus />
                              </span>
                              Place Order
                            </button>
                            <div className="product-secondary-action">View details</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
          </div>
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {modalProduct && (
            <motion.div
              className="popup-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="popup-content"
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.86, opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="popup-grid">
                  <div className="popup-media">
                    <img src={modalProduct.image} alt={modalProduct.title} />
                    <div className="popup-media-gradient" />
                    <div className="popup-media-badges">
                      <span className="badge badge-category">{modalProduct.category}</span>
                      {(modalProduct.discountPercent || 0) > 0 ? (
                        <span className="badge badge-discount">
                          Save {modalProduct.discountPercent}%
                        </span>
                      ) : modalProduct.offerLabel ? (
                        <span className="badge badge-offer">{modalProduct.offerLabel}</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="popup-details">
                    <div className="popup-title">{modalProduct.title}</div>

                    <div className="popup-price-row">
                      <div className="popup-price-now">
                        {formatTZS(getFinalPrice(modalProduct))}
                        <span className="price-unit"> per piece</span>
                      </div>
                      {(modalProduct.discountPercent || 0) > 0 ? (
                        <div className="popup-price-original">
                          {formatTZS(modalProduct.basePrice)} per piece
                        </div>
                      ) : null}
                    </div>

                    <div className="popup-meta">
                      <div className="popup-meta-pill">
                        <span className="meta-k">Delivery:</span> {modalProduct.turnaroundLabel}
                      </div>
                      <div className="popup-meta-pill">
                        <span className="meta-k">Updated:</span>{" "}
                        {formatRelativeUpdated(modalProduct.updatedAt)}
                      </div>
                    </div>

                    <div className="popup-actions">
                      <button type="button" className="popup-primary-btn" onClick={placeOrderFromModal}>
                        Place Order
                      </button>
                      <button type="button" className="popup-cancel-btn" onClick={closeModal}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default PortfolioPage;
