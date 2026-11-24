import { sendGAEvent } from "@next/third-parties/google";

/**
 * High-intent lead & conversion tracking for Pali Photography (https://www.paliphoto.co.uk)
 * Tracks actual business value milestones rather than low-value pageview noise.
 */

/**
 * Tracks high-intent booking inquiry form submissions.
 * Mapped to standard GA4 Key Event: 'generate_lead'
 *
 * @param {Object} params
 * @param {string} params.service_type - E.g. "Wedding Photography", "Pre-Wedding & Engagement", "Birthday Milestones"
 * @param {string} [params.event_location] - City or regional venue (e.g. "Edinburgh", "Glencoe", "Glasgow")
 * @param {number} [params.value] - Estimated commission value (optional)
 * @param {string} [params.currency] - Currency ISO code (defaults to "GBP")
 */
export function trackLeadSubmission({
  service_type,
  event_location = "Scotland / Unspecified",
  value,
  currency = "GBP",
}) {
  try {
    sendGAEvent({
      event: "generate_lead",
      service_type: service_type || "General Inquiry",
      event_location,
      currency,
      ...(value ? { value } : {}),
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[GA4] generate_lead dispatched (dev mode):", {
        service_type,
        event_location,
        currency,
        value,
      });
    }
  }
}

/**
 * Tracks high-intent direct contact clicks (tel / mailto).
 * Identifies users attempting immediate direct booking communication.
 *
 * @param {Object} params
 * @param {"phone" | "email"} params.method - Direct communication method
 * @param {string} params.target - Contact coordinate (e.g. "+44 7915 069154", "bookings@paliphoto.co.uk")
 * @param {string} [params.placement] - UI trigger location ("header", "footer", "contact_page", "hero")
 */
export function trackContactClick({ method, target, placement = "unknown" }) {
  try {
    sendGAEvent({
      event: "contact_click",
      contact_method: method,
      contact_target: target,
      placement,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[GA4] contact_click dispatched (dev mode):", {
        method,
        target,
        placement,
      });
    }
  }
}

/**
 * Tracks portfolio interaction and engagement milestones (filter switches, lightbox opens).
 * Fires deliberately on key user actions without flooding analytics during scroll.
 *
 * @param {Object} params
 * @param {"category_filter" | "lightbox_open" | "project_click"} params.action - Interaction type
 * @param {string} params.item_name - Name of the photographic plate, project, or category
 * @param {string} [params.category] - Parent collection category
 */
export function trackPortfolioEngage({ action, item_name, category }) {
  try {
    sendGAEvent({
      event: "portfolio_engage",
      engage_action: action,
      item_name,
      ...(category ? { item_category: category } : {}),
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[GA4] portfolio_engage dispatched (dev mode):", {
        action,
        item_name,
        category,
      });
    }
  }
}
