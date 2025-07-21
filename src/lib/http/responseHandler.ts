// Response handler: parse JSON, convert to camelCase
import camelcaseKeys from "camelcase-keys";

export const handleResponse = async (response: Response): Promise<unknown> => {
  // Nếu response không có content-type json, trả về nguyên bản
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json"))
    return response;
  try {
    const data = await response.clone().json();
    return camelcaseKeys(data, { deep: true });
  } catch (e) {
    return response;
  }
};
