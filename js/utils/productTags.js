/**
 * Product Tags Utility
 * Generates tags for products based on their properties
 */

/**
 * Generate tags for a product
 * @param {Object} product - Product object
 * @returns {Array<string>} Array of tag names
 */
export function generateProductTags(product) {
  const tags = []

  // Category-based tags
  if (product.category === "electronics") {
    tags.push("Electronics")
  } else if (product.category === "jewelery") {
    tags.push("Jewelry")
  } else if (product.category === "men's clothing") {
    tags.push("Men's Fashion")
  } else if (product.category === "women's clothing") {
    tags.push("Women's Fashion")
  }

  // Price-based tags
  if (product.price < 50) {
    tags.push("Budget Friendly")
  } else if (product.price > 100) {
    tags.push("Premium")
  }

  // Rating-based tags
  if (product.rating.rate >= 4.5) {
    tags.push("Top Rated")
  }

  // Random promotional tags (for demo purposes)
  const promoTags = ["New Arrival", "On Sale", "Trending", "Best Seller"]
  const randomPromo = promoTags[Math.floor(Math.random() * promoTags.length)]
  if (Math.random() > 0.5) {
    tags.push(randomPromo)
  }

  return tags
}

/**
 * Get all unique tags from products
 * @param {Array} products - Array of products
 * @returns {Array<string>} Array of unique tags
 */
export function getAllTags(products) {
  const tagsSet = new Set()

  products.forEach((product) => {
    const tags = generateProductTags(product)
    tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}
