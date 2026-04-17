/**
 * Format date into readable string
 * @param {string} dateString
 * @param {string} type ("full" | "short" | "time")
 */

export function formatDate(dateString, type = "full") {

  if (!dateString) return "Invalid date";

  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid date";

  if (type === "full") {
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  if (type === "short") {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  if (type === "time") {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return date.toString();
}