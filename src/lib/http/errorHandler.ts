// Error handler for HTTP client
// Can be extended: send log, display toast, etc.
export const handleError = (error: unknown, retryCount?: number): void => {
  if (
    typeof window !== "undefined" &&
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { status?: number } }).response ===
      "object" &&
    (error as { response?: { status?: number } }).response?.status === 401
  ) {
    window.location.href = "/login";
  }
  // Log lỗi ra console
  console.error("HTTP Error:", error, "Retry:", retryCount);
};
