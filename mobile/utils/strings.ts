import i18n from "@/i18n";

const translateGender = (gender: string) => {
  switch (gender.toLowerCase()) {
    case "male":
      return i18n.t("MALE");
    case "female":
      return i18n.t("FEMALE");
    case "hermaphrodite":
      return i18n.t("HERMAPHRODITE");
    default:
      return i18n.t("UNKNOWN");
  }
};

export const formatPersonDetails = (
  height: string,
  mass: string,
  gender: string,
) => {
  const heightText = height === "unknown" ? i18n.t("UNKNOWN") : `${height}cm`;

  const massText = mass === "unknown" ? i18n.t("UNKNOWN") : `${mass}kg`;

  return `${i18n.t("HEIGHT")}: ${heightText} • ${i18n.t("MASS")}: ${massText} • ${i18n.t("GENDER")}: ${translateGender(gender)}`;
};

export const getErrorMessage = (error: Error) => {
  if (
    error.message.includes("Network request failed") ||
    error.message.includes("fetch")
  ) {
    return i18n.t("NETWORK_CONNECTION_FAILED");
  }
  if (error.message.includes("4")) {
    return i18n.t("SERVER_ERROR_OCCURRED");
  }
  if (error.message.includes("5")) {
    return i18n.t("SERVER_TEMPORARILY_UNAVAILABLE");
  }
  return error.message;
};
