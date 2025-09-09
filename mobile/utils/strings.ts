export const formatPersonDetails = (
  height: string,
  mass: string,
  gender: string,
) => {
  const heightText = height === "unknown" ? height : `${height}cm`;

  const massText = mass === "unknown" ? mass : `${mass}kg`;

  return `Height: ${heightText} • Mass: ${massText} • Gender: ${gender}`;
};

export const getErrorMessage = (error: Error) => {
  if (
    error.message.includes("Network request failed") ||
    error.message.includes("fetch")
  ) {
    return "Network connection failed";
  }
  if (error.message.includes("4")) {
    return "Server error occurred";
  }
  if (error.message.includes("5")) {
    return "Server is temporarily unavailable";
  }
  return error.message;
};
