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
 * Generate product variations (mock data for demo)
 * @param {Object} product - Product data
 * @returns {Array}
 */
function generateVariations(product) {
  // Mock variations based on category
  const variations = {
    electronics: ["#000000", "#FFFFFF", "#C0C0C0"],
    jewelery: ["#FFD700", "#C0C0C0", "#CD7F32"],
    "men's clothing": ["#000000", "#1E3A8A", "#DC2626"],
    "women's clothing": ["#EC4899", "#8B5CF6", "#000000"],
  }

  return variations[product.category] || ["#000000", "#FFFFFF", "#808080"]
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
      // Overlay for dimming effect
      createElement("div", {
        className: "product-card-overlay",
      }),
      // Action buttons container
      createElement("div", {
        className: "product-card-actions",
        children: [
          createElement("button", {
            className: "product-card-action-btn favorite-btn",
            attributes: {
              "aria-label": "Add to favorites",
              title: "Add to favorites",
            },
            innerHTML: `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            `,
          }),
          createElement("button", {
            className: "product-card-action-btn compare-btn",
            attributes: {
              "aria-label": "Add to compare",
              title: "Add to compare",
            },
            innerHTML: `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor" stroke="none">VS</text>
              </svg>
            `,
          }),
        ],
      }),
      // Product variations section
      createElement("div", {
        className: "product-card-variations",
        children: generateVariations(product).map((color) =>
          createElement("span", {
            className: "variation-swatch",
            attributes: {
              style: `background-color: ${color}`,
              title: `Color: ${color}`,
            },
          }),
        ),
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

  // Event handlers for action buttons
  const favoriteBtn = imageContainer.querySelector(".favorite-btn")
  const compareBtn = imageContainer.querySelector(".compare-btn")

  favoriteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    favoriteBtn.classList.toggle("active")
    console.log("[v0] Favorite toggled for product:", product.id)
  })

  compareBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    compareBtn.classList.toggle("active")
    console.log("[v0] Compare toggled for product:", product.id)
  })

  return card
}
