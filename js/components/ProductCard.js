/**
 * Product Card Component
 * Renders individual product card
 */

import { createElement } from "../utils/dom.js"

/**
 * Generate star rating HTML
 * @param {number} rating - Rating value (0-5)
 * @returns {string}
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return "★".repeat(fullStars) + (hasHalfStar ? "½" : "") + "☆".repeat(emptyStars)
}

/**
 * Create product card element
 * @param {Object} product - Product data
 * @returns {HTMLElement}
 */
export function createProductCard(product) {
  const card = createElement("article", {
    className: "product-card",
    attributes: {
      "data-product-id": product.id,
    },
  })

  // Image container
  const imageContainer = createElement("div", {
    className: "product-card-image-container",
    children: [
      createElement("img", {
        className: "product-card-image",
        attributes: {
          src: product.image,
          alt: product.title,
          loading: "lazy",
        },
      }),
    ],
  })

  // Content
  const content = createElement("div", {
    className: "product-card-content",
    children: [
      createElement("div", {
        className: "product-card-category",
        textContent: product.category,
      }),
      createElement("h3", {
        className: "product-card-title",
        textContent: product.title,
      }),
      createElement("div", {
        className: "product-card-rating",
        innerHTML: `
                    <span class="product-card-stars">${generateStars(product.rating.rate)}</span>
                    <span>${product.rating.rate} (${product.rating.count})</span>
                `,
      }),
    ],
  })

  // Footer
  const footer = createElement("div", {
    className: "product-card-footer",
    children: [
      createElement("div", {
        className: "product-card-price",
        textContent: `$${product.price.toFixed(2)}`,
      }),
      createElement("button", {
        className: "product-card-button",
        textContent: "Add to Cart",
        attributes: {
          "aria-label": `Add ${product.title} to cart`,
        },
      }),
    ],
  })

  content.appendChild(footer)
  card.appendChild(imageContainer)
  card.appendChild(content)

  // Add click handler for future product details page
  card.addEventListener("click", (e) => {
    // Prevent navigation if clicking the button
    if (e.target.classList.contains("product-card-button")) {
      e.stopPropagation()
      console.log("[v0] Add to cart clicked for product:", product.id)
      return
    }
    console.log("[v0] Product card clicked:", product.id)
    // Future: Navigate to product details page
  })

  return card
}
