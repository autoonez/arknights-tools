export const assetUrl =
  process.env.NODE_ENV === "production"
    ? `/arknights-assets`
    : `http://localhost:5000/arknights-assets`;
