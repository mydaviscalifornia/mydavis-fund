import React, { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// DATA
// ============================================================
const CAMPAIGNS = [
  /* ACAI FRESH - HIDDEN FOR NOW
  {
    id: "acai-fresh-expansion",
    brand: "Acai Fresh",
    brandColor: "#7B2D8E",
    accentColor: "#D4A017",
    tagline: "Fuel the Fresh Movement",
    title: "Acai Fresh Expands: UC Davis Silo & Rocklin Nugget Center",
    subtitle: "Two new locations — bring organic açaí bowls to 40,000 Aggies and Placer County's newest shopping destination",
    heroEmoji: "🫐",
    story: `Since opening at 431 G Street in downtown Davis, Acai Fresh has become the go-to spot for authentic açaí bowls made from organic soft-serve — not the watery, blended imitations you'll find elsewhere. Every bowl comes out of our custom soft serve machine with the perfect texture, topped with fruit we cut fresh daily. No fillers, no corn syrup, just real organic açaí.

Now we're making two major moves at once.

First, we're bringing Acai Fresh to the UC Davis Silo — the central hub where 40,000+ students eat every day. The Silo is the heartbeat of campus dining, and right now there's no dedicated açaí bowl option for students. We've heard from Aggies since day one: "Why aren't you on campus?" That changes now.

Second, we're expanding beyond Davis for the first time — into the brand-new Nugget Markets center in Rocklin at 1051 Whitney Ranch Parkway. This 95,000-square-foot shopping center is being built from the ground up by Engstrom Properties and anchored by a new Nugget Market opening in 2026. It's designed to be the gathering place of the Whitney Ranch community, and Acai Fresh will be right there alongside a fellow Davis-born brand that shares our values of quality and local sourcing.

Instead of taking on big institutional debt or giving away equity to outside investors, we're turning to the community that already loves what we do. Your support keeps ownership local, decisions local, and quality exactly where it is.`,
    goal: 250000,
    raised: 0,
    backerCount: 0,
    daysLeft: 60,
    location: "Davis & Rocklin, CA",
    category: "Food & Beverage",
    founded: "2024",
    currentLocation: "431 G Street, Downtown Davis",
    owner: "Lee Pflugrath",
    highlights: [
      { icon: "🎓", label: "UC Davis Silo", detail: "Açaí bowls for 40,000+ Aggies on campus" },
      { icon: "🛒", label: "Rocklin Nugget Center", detail: "1051 Whitney Ranch Pkwy — opening 2026" },
      { icon: "🌱", label: "100% Organic", detail: "Same soft-serve quality, no fillers, no compromise" },
      { icon: "👥", label: "20+ New Jobs", detail: "Hiring across both new locations" },
    ],
    useOfFunds: [
      { label: "UC Davis Silo Build-out & Lease", amount: 75000, pct: 30 },
      { label: "Rocklin Location Build-out & Lease", amount: 80000, pct: 32 },
      { label: "Soft Serve Machines & Equipment (×2)", amount: 45000, pct: 18 },
      { label: "Initial Inventory & Fresh Supplies", amount: 25000, pct: 10 },
      { label: "Branding, Signage & Marketing", amount: 15000, pct: 6 },
      { label: "Working Capital", amount: 10000, pct: 4 },
    ],
    rewards: [
      { id: "af-1", title: "Community Supporter", amount: 25, description: "Shout-out on our community wall at all 3 locations + exclusive Acai Fresh sticker pack", claimed: 0, limit: null, emoji: "💜" },
      { id: "af-2", title: "Bowl Believer", amount: 50, description: "All of the above + 2 free bowls at each new location on opening week (4 bowls total)", claimed: 0, limit: 500, emoji: "🥣" },
      { id: "af-3", title: "Fresh Crew", amount: 100, description: "All of the above + exclusive Acai Fresh t-shirt + 5 free bowls redeemable at any location", claimed: 0, limit: 300, emoji: "👕" },
      { id: "af-4", title: "Purple Circle", amount: 250, description: "All of the above + VIP soft opening invitation (your choice: Silo or Rocklin) + 1 free bowl per week for 3 months at any location", claimed: 0, limit: 100, emoji: "🟣" },
      { id: "af-5", title: "Founding Patron", amount: 500, description: "All of the above + name on permanent Founding Patrons plaque at both new locations + 1 free bowl per week for 6 months + annual tasting events", claimed: 0, limit: 50, emoji: "🏆" },
      { id: "af-6", title: "Community Champion", amount: 1000, description: "All of the above + custom bowl named after you on the menu for 1 year at all locations + monthly business updates from Lee + private grand opening dinner", claimed: 0, limit: 25, emoji: "👑" },
    ],
    updates: [
      { date: "Feb 23, 2026", title: "Two Locations Announced!", text: "We're officially going for it — Acai Fresh is expanding to the UC Davis Silo and the new Nugget Center in Rocklin. Two locations, zero compromise on quality. Thank you for believing in fresh." },
    ],
  },
  END ACAI FRESH */
  {
    id: "yoloberry-expansion",
    brand: "YoloBerry Yogurt",
    brandColor: "#E84393",
    accentColor: "#00B894",
    tagline: "Davis's Sweetest Investment",
    title: "YoloBerry Hits Campus — 17 Years Strong",
    subtitle: "Bring Davis's favorite frozen yogurt to the UC Davis Silo and renovate our downtown flagship",
    heroEmoji: "🍦",
    heroImage: "/berry_icon_large.png",
    story: `YoloBerry Yogurt has been a Davis institution since 2008. Located at 316 C Street, right across from Central Park, we've served hundreds of thousands of bowls, hosted countless first dates (four couples have gotten married because of us!), and watched a generation of Davis kids grow up choosing their favorite toppings from our 101+ selection.

Now, after 17 years downtown, YoloBerry is going to campus. We're opening a location inside the UC Davis Silo — the central dining hub where 40,000+ students, faculty, and staff eat every day. The Silo currently has no frozen yogurt or acai optoins. That's about to change. Davis students have been walking or biking downtown to get their YoloBerry fix for nearly two decades — now we'll be right where they are.

We're also building out our catering and events operation so YoloBerry can show up at campus events, community gatherings, and private parties across the Davis and our local area.

We've always been community-first. That's why we're asking our community to help us write the next chapter. Every dollar stays local. Every decision stays with the people who've been here since day one.`,
    goal: 80000,
    raised: 0,
    backerCount: 0,
    daysLeft: 108,
    location: "Davis, CA",
    category: "Food & Beverage",
    founded: "2008",
    currentLocation: "316 C Street, Downtown Davis",
    owner: "Lee & Laura Pflugrath",
    highlights: [
      { icon: "🎓", label: "UC Davis Silo", detail: "Frozen yogurt for 40,000+ Aggies on campus" },
      { icon: "🔨", label: "Downtown Renovation", detail: "Refreshing our flagship 316 C St location" },
      { icon: "🎪", label: "Events & Catering", detail: "Mobile yogurt bar for campus & community events" },
      { icon: "💚", label: "17 Years Local", detail: "Keeping ownership in Davis, where it belongs" },
    ],
    useOfFunds: [
      { label: "UC Davis Silo Build-out", pct: 40 },
      { label: "310 C st Downtown Flagship Renovation", pct: 25 },
      { label: "New Equipment & Machines", pct: 15 },
      { label: "Catering & Events Setup", pct: 10 },
      { label: "Marketing & Grand Opening", pct: 6 },
      { label: "Grand Opening VIP Party Fund", pct: 4 },
    ],
    rewards: [
      { id: "yb-1", title: "Yogurt Fan", amount: 25, description: "Thank-you on our community board at downtown & Silo locations + YoloBerry sticker pack", claimed: 0, limit: null, emoji: "🩷" },
      { id: "yb-2", title: "Toppings Club", amount: 50, description: "All of the above + $10 gift card valid at any location + exclusive toppings preview access", claimed: 0, limit: 500, emoji: "🍓" },
      { id: "yb-3", title: "Berry VIP", amount: 100, description: "All of the above + limited-edition YoloBerry hoodie + $25 gift card valid at any location", claimed: 0, limit: 300, emoji: "🧥" },
      { id: "yb-4", title: "Sweet Circle", amount: 250, description: "All of the above + VIP Silo grand opening party + free yogurt weekly for 3 months at any location", claimed: 0, limit: 100, emoji: "🎉" },
      { id: "yb-5", title: "Legacy Supporter", amount: 500, description: "All of the above + name on Legacy Wall at both locations + free yogurt weekly for 6 months + annual appreciation dinner", claimed: 0, limit: 50, emoji: "⭐" },
      { id: "yb-6", title: "Founding Family", amount: 1000, description: "All of the above + custom flavor named after you at both locations + permanent Founding Family plaque + monthly updates from Lee & Laura", claimed: 0, limit: 25, emoji: "👨‍👩‍👧‍👦" },
    ],
    updates: [
      { date: "Feb 23, 2026", title: "YoloBerry Goes to Campus!", text: "After 17 years serving Davis from downtown, we're bringing YoloBerry to the UC Davis Silo! Plus a full renovation of our flagship C Street location. Help us make frozen yogurt a campus staple." },
    ],
  },
];

// ============================================================
// PAYPAL
// ============================================================
const PAYPAL_CLIENT_ID = "AUBqvRPtHi9jvG48HBlDn-7nTwjZk1XVPk30H0mOaJLnR6mc7UAYEfx9DMhSLAFrFA8tCFaLLbUDYeq9";

function usePayPalScript() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.paypal) { setLoaded(true); return; }
    const existing = document.querySelector('script[src*="paypal.com/sdk"]');
    if (existing) { existing.addEventListener("load", () => setLoaded(true)); return; }
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    s.async = true;
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, []);
  return loaded;
}

function PayPalButton({ amount, description, onSuccess, onError }) {
  const ref = useRef(null);
  const rendered = useRef(false);
  useEffect(() => {
    if (!window.paypal || !ref.current || rendered.current) return;
    rendered.current = true;
    ref.current.innerHTML = "";
    window.paypal.Buttons({
      style: { layout: "vertical", color: "black", shape: "rect", label: "donate", height: 45 },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{ amount: { value: amount.toFixed(2), currency_code: "USD" }, description }],
      }),
      onApprove: (data, actions) => actions.order.capture().then(details => onSuccess(details)),
      onError: err => { console.error(err); onError?.(err); },
    }).render(ref.current);
    return () => { rendered.current = false; };
  }, [amount, description, onSuccess, onError]);
  return <div ref={ref} style={{ minHeight: 50, marginTop: 12 }} />;
}

// ============================================================
// HELPERS
// ============================================================
function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}
function pct(raised, goal) {
  return Math.min(100, Math.round((raised / goal) * 100));
}

// ============================================================
// PROGRESS BAR
// ============================================================
function ProgressBar({ raised, goal, color, height = 12 }) {
  const p = pct(raised, goal);
  return (
    <div style={{ position: "relative", width: "100%", height, borderRadius: height, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{
        width: `${p}%`, height: "100%", borderRadius: height,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: `0 0 20px ${color}44`,
      }} />
      {p > 5 && (
        <div style={{
          position: "absolute", right: `${100 - p}%`, top: "50%", transform: "translate(50%, -50%)",
          width: height + 4, height: height + 4, borderRadius: "50%",
          background: color, border: "2px solid #0c0f14",
          boxShadow: `0 0 12px ${color}66`,
        }} />
      )}
    </div>
  );
}

// ============================================================
// FUND ALLOCATION CHART
// ============================================================
function FundAllocation({ items, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#ccc" }}>{item.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#999" }}>{formatCurrency(item.amount)} ({item.pct}%)</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
            <div style={{
              width: `${item.pct}%`, height: "100%", borderRadius: 3,
              background: `linear-gradient(90deg, ${color}88, ${color})`,
              transition: "width 0.8s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// REWARD CARD
// ============================================================
function RewardCard({ reward, color, onSelect, selected }) {
  const soldOut = reward.limit && reward.claimed >= reward.limit;
  return (
    <button
      onClick={() => !soldOut && onSelect(reward)}
      disabled={soldOut}
      style={{
        width: "100%", textAlign: "left", padding: 24, borderRadius: 16,
        border: `2px solid ${selected ? color : "rgba(255,255,255,0.06)"}`,
        background: selected ? `${color}0a` : "rgba(255,255,255,0.02)",
        cursor: soldOut ? "not-allowed" : "pointer",
        opacity: soldOut ? 0.5 : 1,
        transition: "all 0.25s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {soldOut && (
        <div style={{
          position: "absolute", top: 12, right: -30, transform: "rotate(45deg)",
          background: "#ff4757", padding: "4px 40px",
          fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 700,
          color: "#fff", textTransform: "uppercase", letterSpacing: 1.5,
        }}>Sold Out</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>{reward.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{reward.title}</div>
            {reward.limit && (
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#888", marginTop: 2 }}>
                {reward.limit - reward.claimed} of {reward.limit} remaining
              </div>
            )}
          </div>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color,
          padding: "4px 14px", borderRadius: 10, background: `${color}12`,
        }}>
          ${reward.amount}
        </div>
      </div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#999", lineHeight: 1.6, margin: 0 }}>
        {reward.description}
      </p>
    </button>
  );
}

// ============================================================
// CHECKOUT MODAL
// ============================================================
function CheckoutModal({ campaign, reward, customAmount, onClose, onSuccess }) {
  const [step, setStep] = useState("confirm");
  const [errorMsg, setErrorMsg] = useState("");
  const paypalLoaded = usePayPalScript();
  const amount = reward ? reward.amount : customAmount;
  const desc = reward
    ? `${campaign.brand} — ${reward.title} Reward ($${amount})`
    : `${campaign.brand} — Community Contribution ($${amount})`;

  const handleSuccess = useCallback((details) => {
    setStep("success");
    onSuccess(amount, reward);
  }, [amount, reward, onSuccess]);

  if (step === "success") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#14142a", borderRadius: 24, padding: 40, maxWidth: 460, width: "92%", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: "#fff", margin: "0 0 8px" }}>Thank You!</h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "#aaa", lineHeight: 1.6, margin: "0 0 8px" }}>
            Your {formatCurrency(amount)} contribution to <strong style={{ color: campaign.brandColor }}>{campaign.brand}</strong> has been received.
          </p>
          {reward && (
            <div style={{
              padding: "14px 20px", borderRadius: 12, margin: "16px 0",
              background: `${campaign.brandColor}10`, border: `1px solid ${campaign.brandColor}30`,
            }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: campaign.brandColor, fontWeight: 600 }}>
                {reward.emoji} {reward.title} Reward Unlocked
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#888", marginTop: 4 }}>
                You'll receive details via email after the campaign closes.
              </div>
            </div>
          )}
          <button onClick={onClose} style={{
            marginTop: 16, padding: "14px 40px", borderRadius: 14, border: "none",
            background: `linear-gradient(135deg, ${campaign.brandColor}, ${campaign.brandColor}cc)`,
            color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, cursor: "pointer",
          }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#14142a", borderRadius: 24, padding: 36, maxWidth: 480, width: "92%", border: "1px solid rgba(255,255,255,0.08)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#fff", margin: 0 }}>Complete Your Contribution</h2>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#888", width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>

        <div style={{
          padding: "20px 24px", borderRadius: 16, marginBottom: 24,
          background: `${campaign.brandColor}08`, border: `1px solid ${campaign.brandColor}20`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#888" }}>{campaign.brand}</div>
              {reward && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#fff", fontWeight: 600, marginTop: 2 }}>{reward.emoji} {reward.title}</div>}
              {!reward && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#fff", fontWeight: 600, marginTop: 2 }}>Custom Contribution</div>}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: campaign.brandColor }}>
              {formatCurrency(amount)}
            </div>
          </div>
        </div>

        <div style={{
          padding: "14px 18px", borderRadius: 12, marginBottom: 20,
          background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.1)",
        }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#aa8844", lineHeight: 1.6, margin: 0 }}>
            <strong>Note:</strong> This is a reward-based contribution supporting {campaign.brand}'s expansion, not an equity investment. Contributors receive rewards as described, not ownership shares. Contributions are donations that support mydaviscalifornia.com community businesses and are non-refundable.
          </p>
        </div>

        {paypalLoaded ? (
          <PayPalButton
            key={`${amount}-${reward?.id || "custom"}`}
            amount={amount}
            description={desc}
            onSuccess={handleSuccess}
            onError={() => setErrorMsg("Payment failed. Please try again.")}
          />
        ) : (
          <div style={{ textAlign: "center", padding: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 24, border: "2px solid rgba(255,255,255,0.1)", borderTopColor: campaign.brandColor, borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#666", marginTop: 8 }}>Loading payment...</div>
          </div>
        )}

        {errorMsg && (
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#ff4757", textAlign: "center", marginTop: 12 }}>{errorMsg}</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CAMPAIGN PAGE
// ============================================================
function CampaignPage({ campaign, onBack, onContribute }) {
  const [activeTab, setActiveTab] = useState("story");
  const [selectedReward, setSelectedReward] = useState(null);
  const [customAmt, setCustomAmt] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutReward, setCheckoutReward] = useState(null);
  const [checkoutCustom, setCheckoutCustom] = useState(0);

  const handleRewardSelect = (reward) => {
    setSelectedReward(reward.id === selectedReward?.id ? null : reward);
  };

  const handleContribute = () => {
    if (selectedReward) {
      setCheckoutReward(selectedReward);
      setCheckoutCustom(0);
      setShowCheckout(true);
    } else if (parseFloat(customAmt) >= 10) {
      setCheckoutReward(null);
      setCheckoutCustom(parseFloat(customAmt));
      setShowCheckout(true);
    }
  };

  const handleSuccess = (amount, reward) => {
    onContribute(campaign.id, amount, reward);
  };

  const tabs = [
    { id: "story", label: "Our Story" },
    { id: "rewards", label: "Rewards" },
    { id: "funds", label: "Use of Funds" },
    { id: "updates", label: `Updates (${campaign.updates.length})` },
  ];

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Back Button */}
      <button onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)", color: "#888",
        fontFamily: "'Outfit', sans-serif", fontSize: 13, cursor: "pointer",
        marginBottom: 24, transition: "all 0.2s",
      }}>
        ← All Campaigns
      </button>

      {/* Campaign Header */}
      <div style={{
        padding: "40px 36px", borderRadius: 24, marginBottom: 32,
        background: `linear-gradient(145deg, ${campaign.brandColor}15, ${campaign.brandColor}05)`,
        border: `1px solid ${campaign.brandColor}25`,
        position: "relative", overflow: "hidden",
      }}>
        {campaign.heroImage ? (
          <img src={campaign.heroImage} alt="" style={{ position: "absolute", top: -40, right: -20, width: 160, opacity: 0.08, transform: "rotate(15deg)", pointerEvents: "none" }} />
        ) : (
          <div style={{ position: "absolute", top: -40, right: -20, fontSize: 140, opacity: 0.06, transform: "rotate(15deg)" }}>{campaign.heroEmoji}</div>
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif", textTransform: "uppercase", letterSpacing: 1.5,
              background: `${campaign.brandColor}20`, color: campaign.brandColor,
            }}>
              {campaign.category}
            </span>
            <span style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              fontFamily: "'Outfit', sans-serif", background: "rgba(0,200,150,0.1)", color: "#00e6ac",
            }}>
              🟢 Active · {campaign.daysLeft} days left
            </span>
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: campaign.brandColor, fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>
            {campaign.brand}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 900, color: "#fff", margin: "0 0 8px", lineHeight: 1.15 }}>
            {campaign.title}
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "#999", margin: "0 0 28px", lineHeight: 1.5 }}>
            {campaign.subtitle}
          </p>

          {/* Progress */}
          <ProgressBar raised={campaign.raised} goal={campaign.goal} color={campaign.brandColor} height={10} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700, color: "#fff" }}>
                {formatCurrency(campaign.raised)}
              </span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#666", marginLeft: 8 }}>
                raised of {formatCurrency(campaign.goal)} goal
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: campaign.brandColor }}>
              {pct(campaign.raised, campaign.goal)}%
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: "#fff" }}>{campaign.backerCount}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#666" }}>backers</div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: "#fff" }}>{campaign.daysLeft}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#666" }}>days to go</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: "#aaa", marginTop: 4 }}>📍 {campaign.location}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#666" }}>Est. {campaign.founded}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 32 }}>
        {campaign.highlights.map((h, i) => (
          <div key={i} style={{
            padding: "18px 16px", borderRadius: 14,
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{h.icon}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: "#ddd", marginBottom: 2 }}>{h.label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#777" }}>{h.detail}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 20px", border: "none", background: "transparent",
            color: activeTab === tab.id ? "#fff" : "#666",
            fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
            cursor: "pointer", position: "relative",
            borderBottom: activeTab === tab.id ? `2px solid ${campaign.brandColor}` : "2px solid transparent",
            transition: "all 0.2s",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 480px", minWidth: 0 }}>
          {activeTab === "story" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              {campaign.story.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "#bbb", lineHeight: 1.8, margin: "0 0 20px" }}>
                  {para}
                </p>
              ))}
              <div style={{
                padding: "20px 24px", borderRadius: 16, marginTop: 24,
                background: `${campaign.brandColor}08`, border: `1px solid ${campaign.brandColor}15`,
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: campaign.brandColor, marginBottom: 8 }}>About the Owner</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#ccc" }}>
                  <strong>{campaign.owner}</strong> · {campaign.currentLocation}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>
                  Proudly serving Davis since {campaign.founded}
                </div>
              </div>
            </div>
          )}

          {activeTab === "rewards" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn 0.3s ease" }}>
              {campaign.rewards.map(r => (
                <RewardCard
                  key={r.id}
                  reward={r}
                  color={campaign.brandColor}
                  onSelect={handleRewardSelect}
                  selected={selectedReward?.id === r.id}
                />
              ))}
            </div>
          )}

          {activeTab === "funds" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#fff", margin: "0 0 8px" }}>Where Your Money Goes</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888", margin: "0 0 24px", lineHeight: 1.6 }}>
                Full transparency — here's exactly how we'll use every dollar raised.
              </p>
              <FundAllocation items={campaign.useOfFunds} color={campaign.brandColor} />
            </div>
          )}

          {activeTab === "updates" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.3s ease" }}>
              {campaign.updates.map((u, i) => (
                <div key={i} style={{
                  padding: "20px 24px", borderRadius: 16,
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#666", marginBottom: 4 }}>{u.date}</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{u.title}</div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#999", lineHeight: 1.6, margin: 0 }}>{u.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — Contribute */}
        <div style={{ flex: "0 0 280px", position: "sticky", top: 80, alignSelf: "flex-start" }}>
          <div style={{
            padding: 24, borderRadius: 20,
            background: "linear-gradient(145deg, #16162a, #12121f)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Back This Project
            </div>

            {selectedReward ? (
              <div style={{
                padding: "14px 16px", borderRadius: 12, marginBottom: 16,
                background: `${campaign.brandColor}10`, border: `1px solid ${campaign.brandColor}25`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff" }}>
                      {selectedReward.emoji} {selectedReward.title}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: campaign.brandColor }}>
                    ${selectedReward.amount}
                  </div>
                </div>
                <button onClick={() => setSelectedReward(null)} style={{
                  background: "none", border: "none", color: "#666", cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 11, padding: 0, marginTop: 6,
                }}>
                  ✕ Remove selection
                </button>
              </div>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 6 }}>
                  Custom Amount
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#666", fontFamily: "'JetBrains Mono', monospace", fontSize: 18 }}>$</span>
                  <input
                    value={customAmt}
                    onChange={e => setCustomAmt(e.target.value.replace(/[^0-9.]/g, ""))}
                    type="text" inputMode="decimal" placeholder="0"
                    style={{
                      width: "100%", padding: "14px 16px 14px 30px", borderRadius: 12,
                      border: `1px solid ${campaign.brandColor}30`, background: "rgba(255,255,255,0.03)",
                      color: "#fff", fontSize: 22, fontFamily: "'JetBrains Mono', monospace",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555", marginTop: 4 }}>
                  Minimum $10 · Or select a reward on the Rewards tab
                </div>
              </div>
            )}

            <button
              onClick={handleContribute}
              disabled={!selectedReward && (!customAmt || parseFloat(customAmt) < 10)}
              style={{
                width: "100%", padding: "16px 0", borderRadius: 14, border: "none",
                background: (selectedReward || parseFloat(customAmt) >= 10)
                  ? `linear-gradient(135deg, ${campaign.brandColor}, ${campaign.brandColor}cc)`
                  : "rgba(255,255,255,0.05)",
                color: (selectedReward || parseFloat(customAmt) >= 10) ? "#fff" : "#444",
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16,
                cursor: (selectedReward || parseFloat(customAmt) >= 10) ? "pointer" : "default",
                letterSpacing: 0.5, transition: "all 0.2s",
              }}
            >
              {selectedReward ? `Contribute ${formatCurrency(selectedReward.amount)}` :
                (parseFloat(customAmt) >= 10 ? `Contribute ${formatCurrency(parseFloat(customAmt))}` : "Select a Reward or Enter Amount")}
            </button>

            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#444", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
              Processed securely via PayPal.<br />
              Contributions support {campaign.brand}'s expansion.
            </p>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          campaign={campaign}
          reward={checkoutReward}
          customAmount={checkoutCustom}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

// ============================================================
// CAMPAIGN CARD (for listing page)
// ============================================================
function CampaignCard({ campaign, onOpen }) {
  return (
    <div
      onClick={() => onOpen(campaign)}
      style={{
        borderRadius: 24, overflow: "hidden", cursor: "pointer",
        background: "linear-gradient(145deg, #16162a 0%, #12121f 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)"; }}
    >
      {/* Hero */}
      <div style={{
        padding: "48px 32px", position: "relative", overflow: "hidden",
        background: `linear-gradient(145deg, ${campaign.brandColor}20, ${campaign.brandColor}08)`,
      }}>
        {campaign.heroImage ? (
          <img src={campaign.heroImage} alt="" style={{ position: "absolute", bottom: -20, right: -10, width: 140, opacity: 0.12, transform: "rotate(15deg)", pointerEvents: "none" }} />
        ) : (
          <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: 120, opacity: 0.1, transform: "rotate(15deg)" }}>{campaign.heroEmoji}</div>
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif", textTransform: "uppercase", letterSpacing: 1.2,
              background: "rgba(0,200,150,0.12)", color: "#00e6ac",
            }}>
              🟢 Active
            </span>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
              fontFamily: "'Outfit', sans-serif", background: "rgba(255,255,255,0.06)", color: "#888",
            }}>
              {campaign.daysLeft} days left
            </span>
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: campaign.brandColor, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>
            {campaign.brand}
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.2 }}>
            {campaign.title}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 32px 28px" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.6, margin: "0 0 20px" }}>
          {campaign.subtitle}
        </p>

        <ProgressBar raised={campaign.raised} goal={campaign.goal} color={campaign.brandColor} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10, marginBottom: 16 }}>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: "#fff" }}>{formatCurrency(campaign.raised)}</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#666", marginLeft: 6 }}>of {formatCurrency(campaign.goal)}</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: campaign.brandColor }}>{pct(campaign.raised, campaign.goal)}%</span>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: "#fff" }}>{campaign.backerCount}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555" }}>backers</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#aaa" }}>📍 {campaign.location}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555" }}>Est. {campaign.founded}</div>
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginTop: 20, padding: "14px 0", borderRadius: 14,
          background: `linear-gradient(135deg, ${campaign.brandColor}15, ${campaign.brandColor}08)`,
          border: `1px solid ${campaign.brandColor}20`,
        }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: campaign.brandColor }}>
            View Campaign →
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function CommunityFund() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleContribute = useCallback((campaignId, amount, reward) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId
      ? { ...c, raised: c.raised + amount, backerCount: c.backerCount + 1 }
      : c
    ));
    if (activeCampaign?.id === campaignId) {
      setActiveCampaign(prev => ({ ...prev, raised: prev.raised + amount, backerCount: prev.backerCount + 1 }));
    }
  }, [activeCampaign]);

  const openCampaign = (c) => {
    setActiveCampaign(c);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0c0f14", color: "#fff", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 40% at 30% -10%, rgba(123,45,142,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 90%, rgba(0,184,148,0.04) 0%, transparent 50%)" }} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100, padding: "14px 0",
        background: scrollY > 20 ? "rgba(12,15,20,0.92)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(20px)" : "none",
        borderBottom: scrollY > 20 ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="https://mydaviscalifornia.com" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #7B2D8E, #E84393)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 12, color: "#fff",
            }}>MDC</div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>mydaviscalifornia</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 1.5 }}>Community Fund</div>
            </div>
          </a>
          <a href="https://mydaviscalifornia.com" style={{
            padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)", color: "#888",
            fontFamily: "'Outfit', sans-serif", fontSize: 13, textDecoration: "none",
            fontWeight: 500, transition: "all 0.2s",
          }}>
            ← MyDavisCalifornia.com
          </a>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        {!activeCampaign ? (
          <>
            {/* Hero */}
            <div style={{ padding: "72px 0 56px", animation: "slideUp 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: "#7B2D8E", textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>
                Community-Powered Growth
              </div>
              <h1 style={{
                fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 900, color: "#fff",
                margin: "0 0 16px", lineHeight: 1.08, letterSpacing: -1.5,
              }}>
                Fund the businesses<br />
                <span style={{
                  background: "linear-gradient(135deg, #7B2D8E, #E84393, #00B894)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 6s ease infinite",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>you already love.</span>
              </h1>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, color: "#777", lineHeight: 1.65, margin: "0 0 36px", maxWidth: 600 }}>
                Skip the big banks and outside investors. Help your favorite Davis businesses expand — and get rewarded for it. Every dollar stays local.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  { icon: "🏘️", label: "100% Local", desc: "Ownership stays in Davis" },
                  { icon: "🎁", label: "Get Rewarded", desc: "Exclusive perks for backers" },
                  { icon: "🔒", label: "Secure Payments", desc: "Processed via PayPal" },
                  { icon: "📊", label: "Full Transparency", desc: "See where every dollar goes" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 18px", borderRadius: 14,
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: "#ddd" }}>{item.label}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#666" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Cards */}
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>
              Active Campaigns
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 48 }}>
              {campaigns.map((c, i) => (
                <div key={c.id} style={{ animation: `slideUp ${0.6 + i * 0.15}s cubic-bezier(0.22,1,0.36,1)` }}>
                  <CampaignCard campaign={c} onOpen={openCampaign} />
                </div>
              ))}
            </div>

            {/* Why Community Funding */}
            <div style={{
              padding: "36px 32px", borderRadius: 24, marginBottom: 48,
              background: "linear-gradient(145deg, rgba(123,45,142,0.06), rgba(0,184,148,0.04))",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>
                Why Community Funding?
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#888", lineHeight: 1.7, margin: "0 0 24px" }}>
                Davis businesses are the backbone of our community. When they grow, we all benefit — more jobs, more choices, more reasons to keep it local. But traditional funding comes with strings: outside investors who don't know Davis, institutional debt that forces cost-cutting, or chains that swallow local character.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {[
                  { title: "No Equity Given Away", desc: "Businesses keep 100% ownership. Your contribution earns rewards, not shares — no SEC red tape." },
                  { title: "No Institutional Debt", desc: "No banks, no interest payments, no strings attached. Just community support." },
                  { title: "Real Local Impact", desc: "Every dollar funds expansion, jobs, and growth right here in Davis." },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "20px 18px", borderRadius: 14,
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: "#ddd", marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#777", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 20 }}>Frequently Asked Questions</h2>
              {[
                { q: "Is this an investment?", a: "No. This is reward-based crowdfunding, similar to Kickstarter. You're making a contribution to support a local business's expansion and receiving rewards (like free products, merchandise, and experiences) in return. You do not receive equity, shares, or any ownership stake." },
                { q: "Are contributions refundable?", a: "Contributions are non-refundable donations that support community business growth. If a campaign does not reach its goal, all contributions will be refunded in full via PayPal." },
                { q: "When do I receive my rewards?", a: "Reward fulfillment timelines vary by tier. Most rewards (digital acknowledgments, stickers) ship within 30 days of the campaign closing. Experience-based rewards (VIP events, free product weeks) activate when the new location opens." },
                { q: "How is this different from GoFundMe?", a: "GoFundMe is primarily for personal causes and charitable donations. Our platform is specifically designed for Davis business expansion, with structured reward tiers, transparent fund allocation, and direct accountability from business owners you already know and trust." },
                { q: "Why not just get a bank loan?", a: "Bank loans and outside investors come with conditions that can compromise what makes these businesses special. Community funding keeps ownership 100% local, avoids debt obligations that force cost-cutting, and creates a deeper connection between businesses and the people they serve." },
              ].map((item, i) => (
                <details key={i} style={{
                  padding: "18px 22px", borderRadius: 14, marginBottom: 10,
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                }}>
                  <summary style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: "#ddd", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {item.q}
                    <span style={{ color: "#555", fontSize: 18, marginLeft: 12 }}>+</span>
                  </summary>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.6, margin: "12px 0 0" }}>{item.a}</p>
                </details>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: "32px 0 80px" }}>
            <CampaignPage
              campaign={activeCampaign}
              onBack={() => setActiveCampaign(null)}
              onContribute={handleContribute}
            />
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{
          padding: "16px 20px", borderRadius: 14,
          background: "rgba(255,215,0,0.02)", border: "1px solid rgba(255,215,0,0.06)",
        }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#554422", lineHeight: 1.6, margin: 0 }}>
            <strong>Disclaimer:</strong> Contributions through MyDavisCalifornia Community Fund are reward-based donations, not equity investments. Contributors do not receive ownership shares, dividends, or any financial return. All contributions are processed via PayPal and support the listed business's expansion plans. Rewards are fulfilled by the business owners. MyDavisCalifornia facilitates the platform but does not guarantee business outcomes. This is not a securities offering and is not registered with the SEC or any state securities regulator. Not affiliated with the City of Davis. All contributions are non-refundable unless a campaign fails to meet its minimum goal.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "24px 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#333", lineHeight: 1.8 }}>
            © 2026 mydaviscalifornia.com · Community Fund<br />
            <a href="/terms" style={{ color: "#555", textDecoration: "none" }}>Terms of Service</a>  ·  <a href="/privacy" style={{ color: "#555", textDecoration: "none" }}>Privacy Policy</a>  ·  <a href="/faq" style={{ color: "#555", textDecoration: "none" }}>FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

