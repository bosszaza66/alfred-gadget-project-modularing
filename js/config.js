/**
 * Application Configuration
 * Contains API endpoints and app constants
 */

export const CONFIG = {
  API_BASE_URL: "https://fakestoreapi.com",
  ENDPOINTS: {
    PRODUCTS: "/products",
    PRODUCT_BY_ID: "/products",
    CATEGORIES: "/products/categories",
    PRODUCTS_BY_CATEGORY: "/products/category",
  },
  THEME: {
    STORAGE_KEY: "alfred-gadget-theme",
    LIGHT: "light",
    DARK: "dark",
  },
  APP: {
    NAME: "Alfred Gadget",
    VERSION: "2.0.0",
  },
}
