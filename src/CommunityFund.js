
import React, { useState, useEffect, useCallback, useRef } from "react";

const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbxzQYzxuf1vXu7STSM9wQ3pDl3T3Jk9Ye00ybDIIkGicNuhsh6QjSqObuEPP2kCUpOX/exec";

async function fetchTotals() {
  try {
    const res = await fetch(SHEETS_API_URL);
    const data = await res.json();
    if (data.success) return data.totals;
  } catch (e) { console.error("Failed to fetch totals:", e); }
  return null;
}

async function postContribution(info) {
  try {
    const res = await fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    if (data.success) return data.totals;
  } catch (e) { console.error("Failed to post:", e); }
  return null;
}

// ============================================================
// THEMES
// ============================================================
const THEMES = {
  dark: {
    bg: "#0c0f14",
    bgSecondary: "#14142a",
    bgCard: "linear-gradient(145deg, #16162a 0%, #12121f 100%)",
    bgInput: "rgba(255,255,255,0.03)",
    bgSubtle: "rgba(255,255,255,0.02)",
    bgOverlay: "rgba(0,0,0,0.8)",
    headerBg: "rgba(12,15,20,0.92)",
    text: "#fff",
    textSecondary: "#ccc",
    textMuted: "#888",
    textDim: "#666",
    textFaint: "#555",
    textGhost: "#444",
    textFooter: "#333",
    border: "rgba(255,255,255,0.06)",
    borderLight: "rgba(255,255,255,0.04)",
    borderInput: "rgba(255,255,255,0.08)",
    scrollThumb: "rgba(255,255,255,0.08)",
    gradientBgA: "rgba(123,45,142,0.05)",
    gradientBgB: "rgba(0,184,148,0.04)",
    noiseOpacity: 0.025,
    tagBg: "rgba(255,255,255,0.06)",
    disclaimerBg: "rgba(255,215,0,0.02)",
    disclaimerBorder: "rgba(255,215,0,0.06)",
    disclaimerText: "#554422",
    infoBg: "rgba(255,215,0,0.04)",
    infoBorder: "rgba(255,215,0,0.1)",
    infoText: "#aa8844",
    toggleBg: "rgba(255,255,255,0.06)",
    toggleIcon: "☀️",
  },
  light: {
    bg: "#f8f7f4",
    bgSecondary: "#ffffff",
    bgCard: "linear-gradient(145deg, #ffffff 0%, #f5f4f1 100%)",
    bgInput: "rgba(0,0,0,0.03)",
    bgSubtle: "rgba(0,0,0,0.02)",
    bgOverlay: "rgba(255,255,255,0.85)",
    headerBg: "rgba(248,247,244,0.95)",
    text: "#1a1a2e",
    textSecondary: "#333",
    textMuted: "#666",
    textDim: "#888",
    textFaint: "#aaa",
    textGhost: "#bbb",
    textFooter: "#999",
    border: "rgba(0,0,0,0.08)",
    borderLight: "rgba(0,0,0,0.05)",
    borderInput: "rgba(0,0,0,0.12)",
    scrollThumb: "rgba(0,0,0,0.12)",
    gradientBgA: "rgba(123,45,142,0.04)",
    gradientBgB: "rgba(0,184,148,0.03)",
    noiseOpacity: 0.015,
    tagBg: "rgba(0,0,0,0.05)",
    disclaimerBg: "rgba(255,215,0,0.06)",
    disclaimerBorder: "rgba(255,215,0,0.15)",
    disclaimerText: "#887744",
    infoBg: "rgba(255,215,0,0.08)",
    infoBorder: "rgba(255,215,0,0.2)",
    infoText: "#997733",
    toggleBg: "rgba(0,0,0,0.06)",
    toggleIcon: "🌙",
  },
};

// ============================================================
// DATA
// ============================================================
const CAMPAIGNS = [
 /*
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
 */
  {
    id: "yoloberry-expansion",
    brand: "YoloBerry Yogurt",
    brandColor: "#E84393",
    accentColor: "#00B894",
    tagline: "Davis's Sweetest Investment",
    title: "YoloBerry Hits Campus — 17 Years Strong",
    subtitle: "Bring Davis's favorite frozen yogurt to the UC Davis Silo and renovate our downtown flagship",
    heroEmoji: "🍦",
    story: `YoloBerry Yogurt has been a Davis institution since 2008. Located at 316 C Street, right across from Central Park, we've served hundreds of thousands of bowls, hosted countless first dates (four couples have gotten married because of us!), and watched a generation of Davis kids grow up choosing their favorite toppings from our 101+ selection.

Now, after 17 years downtown, YoloBerry is going to campus. We're opening a location inside the UC Davis Silo — the central dining hub where 40,000+ students, faculty, and staff eat every day. The Silo currently has burgers, crepes, and coffee, but no frozen yogurt. That's about to change. Davis students have been walking or biking downtown to get their YoloBerry fix for nearly two decades — now we'll be right where they are.

We're also investing in our flagship downtown location at 316 C Street with a full renovation — updated equipment, refreshed design, and better infrastructure to serve the community that's supported us since day one. Plus, we're building out a catering and events operation so YoloBerry can show up at campus events, community gatherings, and private parties across the region.

We've always been community-first. That's why we're asking our community — not banks, not chains, not private equity — to help us write the next chapter. Every dollar stays local. Every decision stays with the people who've been here since day one.`,
    goal: 100000,
    raised: 0,
    backerCount: 0,
    daysLeft: 60,
    location: "Davis, CA",
    category: "Food & Beverage",
    founded: "2008",
    currentLocation: "316 C Street, Downtown Davis",
    owner: "Lee Pflugrath & Laura Winton",
    highlights: [
      { icon: "🎓", label: "UC Davis Silo", detail: "Frozen yogurt for 40,000+ Aggies on campus" },
      { icon: "🔨", label: "Downtown Renovation", detail: "Refreshing our flagship 316 C St location" },
      { icon: "🎪", label: "Events & Catering", detail: "Mobile yogurt bar for campus & community events" },
      { icon: "💚", label: "17 Years Local", detail: "Keeping ownership in Davis, where it belongs" },
    ],
    useOfFunds: [
      { label: "UC Davis Silo Build Out", amount: 40000, pct: 40 },
      { label: "Downtown Flagship Renovation", amount: 25000, pct: 25 },
      { label: "New Equipment & Machines", amount: 15000, pct: 15 },
      { label: "Catering & Events Setup", amount: 10000, pct: 10 },
      { label: "Marketing & Grand Opening", amount: 6000, pct: 6 },
      { label: "Summer Community Celebration", amount: 4000, pct: 4 },
    ],
    rewards: [
      { id: "yb-1", title: "Yogurt Fan", amount: 25, description: "Thank-you on our community board at downtown & Silo locations + YoloBerry sticker pack", claimed: 0, limit: null, emoji: "🎁" },
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
      style: { layout: "vertical", color: "gold", shape: "rect", label: "donate", height: 45 },
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
// THEME TOGGLE BUTTON
// ============================================================
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 40, height: 40, borderRadius: 12, border: "none",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 18, transition: "all 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      <span style={{
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
        transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
        opacity: isDark ? 1 : 0,
        position: "absolute",
      }}>☀️</span>
      <span style={{
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
        transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
        opacity: isDark ? 0 : 1,
        position: "absolute",
      }}>🌙</span>
    </button>
  );
}

// ============================================================
// PROGRESS BAR
// ============================================================
function ProgressBar({ raised, goal, color, height = 12, t }) {
  const p = pct(raised, goal);
  return (
    <div style={{ position: "relative", width: "100%", height, borderRadius: height, background: t.bgSubtle, overflow: "hidden", border: `1px solid ${t.borderLight}` }}>
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
          background: color, border: `2px solid ${t.bg}`,
          boxShadow: `0 0 12px ${color}66`,
        }} />
      )}
    </div>
  );
}

// ============================================================
// FUND ALLOCATION
// ============================================================
function FundAllocation({ items, color, t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: t.textSecondary }}>{item.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: t.textMuted }}>{formatCurrency(item.amount)} ({item.pct}%)</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: t.bgSubtle, overflow: "hidden" }}>
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
function RewardCard({ reward, color, onSelect, selected, t }) {
  const soldOut = reward.limit && reward.claimed >= reward.limit;
  return (
    <button
      onClick={() => !soldOut && onSelect(reward)}
      disabled={soldOut}
      style={{
        width: "100%", textAlign: "left", padding: 24, borderRadius: 16,
        border: `2px solid ${selected ? color : t.border}`,
        background: selected ? `${color}0a` : t.bgSubtle,
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
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: t.text }}>{reward.title}</div>
            {reward.limit && (
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textMuted, marginTop: 2 }}>
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
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.6, margin: 0 }}>
        {reward.description}
      </p>
    </button>
  );
}

// ============================================================
// CHECKOUT MODAL
// ============================================================
function CheckoutModal({ campaign, reward, customAmount, onClose, onSuccess, t }) {
  const [step, setStep] = useState("confirm");
  const [errorMsg, setErrorMsg] = useState("");
  const paypalLoaded = usePayPalScript();
  const amount = reward ? reward.amount : customAmount;
  const desc = reward
    ? `${campaign.brand} — ${reward.title} Reward ($${amount})`
    : `${campaign.brand} — Community Contribution ($${amount})`;

  const handleSuccess = useCallback((details) => {
    const payer = details?.payer || {};
    postContribution({
      campaign_id: campaign.id,
      amount: amount,
      reward_tier: reward ? reward.title : "Custom",
      payer_email: payer.email_address || "",
      payer_name: [payer.name?.given_name, payer.name?.surname].filter(Boolean).join(" ") || "",
      paypal_order_id: details?.id || "",
    });
    setStep("success");
    onSuccess(amount, reward);
  }, [amount, reward, campaign, onSuccess]);

  if (step === "success") {
    return (
      <div style={{ position: "fixed", inset: 0, background: t.bgOverlay, backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{ background: t.bgSecondary, borderRadius: 24, padding: 40, maxWidth: 460, width: "92%", border: `1px solid ${t.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: t.text, margin: "0 0 8px" }}>Thank You!</h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: t.textMuted, lineHeight: 1.6, margin: "0 0 8px" }}>
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
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textMuted, marginTop: 4 }}>
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
    <div style={{ position: "fixed", inset: 0, background: t.bgOverlay, backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: t.bgSecondary, borderRadius: 24, padding: 36, maxWidth: 480, width: "92%", border: `1px solid ${t.border}`, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: t.text, margin: 0 }}>Complete Your Contribution</h2>
          <button onClick={onClose} style={{ background: t.bgSubtle, border: "none", color: t.textMuted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>

        <div style={{
          padding: "20px 24px", borderRadius: 16, marginBottom: 24,
          background: `${campaign.brandColor}08`, border: `1px solid ${campaign.brandColor}20`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: t.textMuted }}>{campaign.brand}</div>
              {reward && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: t.text, fontWeight: 600, marginTop: 2 }}>{reward.emoji} {reward.title}</div>}
              {!reward && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: t.text, fontWeight: 600, marginTop: 2 }}>Custom Contribution</div>}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: campaign.brandColor }}>
              {formatCurrency(amount)}
            </div>
          </div>
        </div>

        <div style={{
          padding: "14px 18px", borderRadius: 12, marginBottom: 20,
          background: t.infoBg, border: `1px solid ${t.infoBorder}`,
        }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.infoText, lineHeight: 1.6, margin: 0 }}>
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
            <span style={{ display: "inline-block", width: 24, height: 24, border: `2px solid ${t.border}`, borderTopColor: campaign.brandColor, borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: t.textDim, marginTop: 8 }}>Loading payment...</div>
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
function CampaignPage({ campaign, onBack, onContribute, t }) {
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
      <button onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderRadius: 10, background: t.bgSubtle,
        border: `1px solid ${t.border}`, color: t.textMuted,
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
        <div style={{ position: "absolute", top: -40, right: -20, fontSize: 140, opacity: 0.06, transform: "rotate(15deg)" }}>
          {campaign.heroEmoji}
        </div>
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
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 900, color: t.text, margin: "0 0 8px", lineHeight: 1.15 }}>
            {campaign.title}
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: t.textMuted, margin: "0 0 28px", lineHeight: 1.5 }}>
            {campaign.subtitle}
          </p>

          <ProgressBar raised={campaign.raised} goal={campaign.goal} color={campaign.brandColor} height={10} t={t} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700, color: t.text }}>
                {formatCurrency(campaign.raised)}
              </span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: t.textDim, marginLeft: 8 }}>
                raised of {formatCurrency(campaign.goal)} goal
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: campaign.brandColor }}>
              {pct(campaign.raised, campaign.goal)}%
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: t.text }}>{campaign.backerCount}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textDim }}>backers</div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: t.text }}>{campaign.daysLeft}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textDim }}>days to go</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: t.textSecondary, marginTop: 4 }}>📍 {campaign.location}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textDim }}>Est. {campaign.founded}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 32 }}>
        {campaign.highlights.map((h, i) => (
          <div key={i} style={{
            padding: "18px 16px", borderRadius: 14,
            background: t.bgSubtle, border: `1px solid ${t.border}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{h.icon}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: t.textSecondary, marginBottom: 2 }}>{h.label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textDim }}>{h.detail}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: `1px solid ${t.border}`, paddingBottom: 0 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 20px", border: "none", background: "transparent",
            color: activeTab === tab.id ? t.text : t.textDim,
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
                <p key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: t.textMuted, lineHeight: 1.8, margin: "0 0 20px" }}>
                  {para}
                </p>
              ))}
              <div style={{
                padding: "20px 24px", borderRadius: 16, marginTop: 24,
                background: `${campaign.brandColor}08`, border: `1px solid ${campaign.brandColor}15`,
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: campaign.brandColor, marginBottom: 8 }}>About the Owner</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: t.textSecondary }}>
                  <strong>{campaign.owner}</strong> · {campaign.currentLocation}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: t.textMuted, marginTop: 4 }}>
                  Proudly serving Davis since {campaign.founded}
                </div>
              </div>
            </div>
          )}

          {activeTab === "rewards" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn 0.3s ease" }}>
              {campaign.rewards.map(r => (
                <RewardCard key={r.id} reward={r} color={campaign.brandColor} onSelect={handleRewardSelect} selected={selectedReward?.id === r.id} t={t} />
              ))}
            </div>
          )}

          {activeTab === "funds" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: t.text, margin: "0 0 8px" }}>Where Your Money Goes</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: t.textMuted, margin: "0 0 24px", lineHeight: 1.6 }}>
                Full transparency — here's exactly how we'll use every dollar raised.
              </p>
              <FundAllocation items={campaign.useOfFunds} color={campaign.brandColor} t={t} />
            </div>
          )}

          {activeTab === "updates" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.3s ease" }}>
              {campaign.updates.map((u, i) => (
                <div key={i} style={{
                  padding: "20px 24px", borderRadius: 16,
                  background: t.bgSubtle, border: `1px solid ${t.border}`,
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textDim, marginBottom: 4 }}>{u.date}</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>{u.title}</div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.6, margin: 0 }}>{u.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ flex: "0 0 280px", position: "sticky", top: 80, alignSelf: "flex-start" }}>
          <div style={{
            padding: 24, borderRadius: 20,
            background: t.bgCard, border: `1px solid ${t.border}`,
          }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16 }}>
              Back This Project
            </div>

            {selectedReward ? (
              <div style={{
                padding: "14px 16px", borderRadius: 12, marginBottom: 16,
                background: `${campaign.brandColor}10`, border: `1px solid ${campaign.brandColor}25`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: t.text }}>
                    {selectedReward.emoji} {selectedReward.title}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: campaign.brandColor }}>
                    ${selectedReward.amount}
                  </div>
                </div>
                <button onClick={() => setSelectedReward(null)} style={{
                  background: "none", border: "none", color: t.textDim, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 11, padding: 0, marginTop: 6,
                }}>✕ Remove selection</button>
              </div>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textDim, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 6 }}>Custom Amount</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: t.textDim, fontFamily: "'JetBrains Mono', monospace", fontSize: 18 }}>$</span>
                  <input
                    value={customAmt}
                    onChange={e => setCustomAmt(e.target.value.replace(/[^0-9.]/g, ""))}
                    type="text" inputMode="decimal" placeholder="0"
                    style={{
                      width: "100%", padding: "14px 16px 14px 30px", borderRadius: 12,
                      border: `1px solid ${campaign.brandColor}30`, background: t.bgInput,
                      color: t.text, fontSize: 22, fontFamily: "'JetBrains Mono', monospace",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textFaint, marginTop: 4 }}>
                  Minimum $10 · Or select a reward on the Rewards tab
                </div>
              </div>
            )}

            <button onClick={handleContribute} disabled={!selectedReward && (!customAmt || parseFloat(customAmt) < 10)} style={{
              width: "100%", padding: "16px 0", borderRadius: 14, border: "none",
              background: (selectedReward || parseFloat(customAmt) >= 10)
                ? `linear-gradient(135deg, ${campaign.brandColor}, ${campaign.brandColor}cc)`
                : t.bgSubtle,
              color: (selectedReward || parseFloat(customAmt) >= 10) ? "#fff" : t.textGhost,
              fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16,
              cursor: (selectedReward || parseFloat(customAmt) >= 10) ? "pointer" : "default",
              letterSpacing: 0.5, transition: "all 0.2s",
            }}>
              {selectedReward ? `Contribute ${formatCurrency(selectedReward.amount)}` :
                (parseFloat(customAmt) >= 10 ? `Contribute ${formatCurrency(parseFloat(customAmt))}` : "Select a Reward or Enter Amount")}
            </button>

            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textGhost, textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
              Processed securely via PayPal.<br />
              Contributions support {campaign.brand}'s expansion.
            </p>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal campaign={campaign} reward={checkoutReward} customAmount={checkoutCustom} onClose={() => setShowCheckout(false)} onSuccess={handleSuccess} t={t} />
      )}
    </div>
  );
}

// ============================================================
// CAMPAIGN CARD
// ============================================================
function CampaignCard({ campaign, onOpen, t }) {
  return (
    <div
      onClick={() => onOpen(campaign)}
      style={{
        borderRadius: 24, overflow: "hidden", cursor: "pointer",
        background: t.bgCard, border: `1px solid ${t.border}`,
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
    >
      <div style={{
        padding: "48px 32px", position: "relative", overflow: "hidden",
        background: `linear-gradient(145deg, ${campaign.brandColor}20, ${campaign.brandColor}08)`,
      }}>
        <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: 120, opacity: 0.1, transform: "rotate(15deg)" }}>
          {campaign.heroEmoji}
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif", textTransform: "uppercase", letterSpacing: 1.2,
              background: "rgba(0,200,150,0.12)", color: "#00e6ac",
            }}>🟢 Active</span>
            <span style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
              fontFamily: "'Outfit', sans-serif", background: t.tagBg, color: t.textMuted,
            }}>{campaign.daysLeft} days left</span>
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: campaign.brandColor, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>
            {campaign.brand}
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 900, color: t.text, margin: 0, lineHeight: 1.2 }}>
            {campaign.title}
          </h2>
        </div>
      </div>

      <div style={{ padding: "24px 32px 28px" }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.6, margin: "0 0 20px" }}>
          {campaign.subtitle}
        </p>

        <ProgressBar raised={campaign.raised} goal={campaign.goal} color={campaign.brandColor} t={t} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10, marginBottom: 16 }}>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: t.text }}>{formatCurrency(campaign.raised)}</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textDim, marginLeft: 6 }}>of {formatCurrency(campaign.goal)}</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: campaign.brandColor }}>{pct(campaign.raised, campaign.goal)}%</span>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: t.text }}>{campaign.backerCount}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textFaint }}>backers</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: t.textSecondary }}>📍 {campaign.location}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textFaint }}>Est. {campaign.founded}</div>
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
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = window.localStorage?.getItem?.("mdc-fund-theme");
      if (saved) return saved === "dark";
    } catch (e) {}
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches !== false;
  });

  const t = isDark ? THEMES.dark : THEMES.light; useEffect(() => {
    fetchTotals().then(totals => {
      if (!totals) return;
      setCampaigns(prev => prev.map(c => {
        const data = totals[c.id];
        if (data) return { ...c, raised: data.raised, backerCount: data.backerCount };
        return c;
      }));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTotals().then(totals => {
        if (!totals) return;
        setCampaigns(prev => prev.map(c => {
          const data = totals[c.id];
          if (data) return { ...c, raised: data.raised, backerCount: data.backerCount };
          return c;
        }));
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);
```

**Edit 4 — Fix FAQ refund language.** Find:
```
"Contributions are non-refundable donations that support community business growth. If a campaign does not reach its goal, all contributions will be refunded in full via PayPal."
```

Replace with:
```
"All contributions are final and non-refundable. By contributing, you are making a donation to support a local Davis business's expansion and growth. You will receive the rewards associated with your contribution tier as described."
```

**Edit 5 — Fix disclaimer refund language.** Find at the bottom:
```
All contributions are non-refundable unless a campaign fails to meet its minimum goal.
```

Replace with:
```
All contributions are final and non-refundable.

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    try { window.localStorage?.setItem?.("mdc-fund-theme", isDark ? "dark" : "light"); } catch (e) {}
  }, [isDark]);

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
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, position: "relative", overflow: "hidden", transition: "background 0.4s ease, color 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 3px; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        details summary::-webkit-details-marker { display: none; }
        details summary { list-style: none; }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 80% 40% at 30% -10%, ${t.gradientBgA} 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 90%, ${t.gradientBgB} 0%, transparent 50%)` }} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: t.noiseOpacity, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100, padding: "14px 0",
        background: scrollY > 20 ? t.headerBg : "transparent",
        backdropFilter: scrollY > 20 ? "blur(20px)" : "none",
        borderBottom: scrollY > 20 ? `1px solid ${t.borderLight}` : "1px solid transparent",
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
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}>mydaviscalifornia</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: t.textDim, textTransform: "uppercase", letterSpacing: 1.5 }}>Community Fund</div>
            </div>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <a href="https://mydaviscalifornia.com" style={{
              padding: "8px 16px", borderRadius: 10, border: `1px solid ${t.borderInput}`,
              background: t.bgSubtle, color: t.textMuted,
              fontFamily: "'Outfit', sans-serif", fontSize: 13, textDecoration: "none",
              fontWeight: 500, transition: "all 0.2s",
            }}>
              ← Back
            </a>
          </div>
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
                fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 900, color: t.text,
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
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, color: t.textDim, lineHeight: 1.65, margin: "0 0 36px", maxWidth: 600 }}>
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
                    background: t.bgSubtle, border: `1px solid ${t.border}`,
                  }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: t.textSecondary }}>{item.label}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.textDim }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Cards */}
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: t.textFaint, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>
              Active Campaigns
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 48 }}>
              {campaigns.map((c, i) => (
                <div key={c.id} style={{ animation: `slideUp ${0.6 + i * 0.15}s cubic-bezier(0.22,1,0.36,1)` }}>
                  <CampaignCard campaign={c} onOpen={openCampaign} t={t} />
                </div>
              ))}
            </div>

            {/* Why Community Funding */}
            <div style={{
              padding: "36px 32px", borderRadius: 24, marginBottom: 48,
              background: `linear-gradient(145deg, ${t.gradientBgA}, ${t.gradientBgB})`,
              border: `1px solid ${t.border}`,
            }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 900, color: t.text, margin: "0 0 12px" }}>
                Why Community Funding?
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: t.textMuted, lineHeight: 1.7, margin: "0 0 24px" }}>
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
                    background: t.bgSubtle, border: `1px solid ${t.border}`,
                  }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: t.textSecondary, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: t.textDim, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: t.text, marginBottom: 20 }}>Frequently Asked Questions</h2>
              {[
                { q: "Is this an investment?", a: "No. This is reward-based crowdfunding, similar to Kickstarter. You're making a contribution to support a local business's expansion and receiving rewards (like free products, merchandise, and experiences) in return. You do not receive equity, shares, or any ownership stake." },
                { q: "Are contributions refundable?", a: "All contributions are final and non-refundable. By contributing, you are making a donation to support a local Davis business. You will receive the rewards associated with your contribution tier as described." },
                { q: "When do I receive my rewards?", a: "Reward fulfillment timelines vary by tier. Most rewards (digital acknowledgments, stickers) ship within 30 days of the campaign closing. Experience-based rewards (VIP events, free product weeks) activate when the new location opens." },
                { q: "How is this different from GoFundMe?", a: "GoFundMe is primarily for personal causes and charitable donations. Our platform is specifically designed for Davis business expansion, with structured reward tiers, transparent fund allocation, and direct accountability from business owners you already know and trust." },
                { q: "Why not just get a bank loan?", a: "Bank loans and outside investors come with conditions that can compromise what makes these businesses special. Community funding keeps ownership 100% local, avoids debt obligations that force cost-cutting, and creates a deeper connection between businesses and the people they serve." },
              ].map((item, i) => (
                <details key={i} style={{
                  padding: "18px 22px", borderRadius: 14, marginBottom: 10,
                  background: t.bgSubtle, border: `1px solid ${t.border}`,
                  cursor: "pointer",
                }}>
                  <summary style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: t.textSecondary, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {item.q}
                    <span style={{ color: t.textFaint, fontSize: 18, marginLeft: 12 }}>+</span>
                  </summary>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: t.textMuted, lineHeight: 1.6, margin: "12px 0 0" }}>{item.a}</p>
                </details>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: "32px 0 80px" }}>
            <CampaignPage campaign={activeCampaign} onBack={() => setActiveCampaign(null)} onContribute={handleContribute} t={t} />
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{
          padding: "16px 20px", borderRadius: 14,
          background: t.disclaimerBg, border: `1px solid ${t.disclaimerBorder}`,
        }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
            <strong>Disclaimer:</strong>The MyDavisCalifornia Community Fund are reward-based donations, not equity investments. Contributors do not receive ownership shares, dividends, or any financial return. All contributions are processed via PayPal and support the listed business's expansion plans. Rewards are fulfilled by the business owners. MyDavisCalifornia facilitates the platform but does not guarantee business outcomes. This is not a securities offering and is not registered with the SEC or any state securities regulator. Not affiliated with the City of Davis. All contributions are final and non-refundable.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${t.borderLight}`, padding: "24px 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: t.textFooter, lineHeight: 1.8 }}>
            © 2026 mydaviscalifornia.com · Community Fund<br />
            <a href="/terms" style={{ color: t.textFaint, textDecoration: "none" }}>Terms of Service</a>  ·  <a href="/privacy" style={{ color: t.textFaint, textDecoration: "none" }}>Privacy Policy</a>  ·  <a href="/faq" style={{ color: t.textFaint, textDecoration: "none" }}>FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
