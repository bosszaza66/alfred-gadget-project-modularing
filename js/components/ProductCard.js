/**
 * Product Card Component
 * Renders individual product card
 */

import { createElement } from "../utils/dom.js"
import { openModal } from "./Modal.js"
import { generateProductTags } from "../utils/productTags.js"

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
 * Get drag icon based on category
 * @param {string} category - Product category
 * @returns {string} SVG icon
 */
function getDragIcon(category) {
  const icons = {
    electronics: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>`,
    jewelery: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`,
    "men's clothing": `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
    "women's clothing": `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
  }

  return (
    icons[category] ||
    `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>`
  )
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
      draggable: "true",
    },
  })

  const tags = generateProductTags(product)

  const tagsContainer = createElement("div", {
    className: "product-card-tags",
    children: tags.slice(0, 2).map((tag) =>
      createElement("span", {
        className: "product-tag",
        textContent: tag,
      }),
    ),
  })

  // Image container
  const imageContainer = createElement("div", {
    className: "product-card-image-container",
    children: [
      tagsContainer,
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

  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "copy"
    e.dataTransfer.setData("application/json", JSON.stringify(product))

    // Create custom drag icon
    const dragIcon = createElement("div", {
      className: "drag-icon",
      innerHTML: getDragIcon(product.category),
    })
    document.body.appendChild(dragIcon)

    e.dataTransfer.setDragImage(dragIcon, 20, 20)

    setTimeout(() => {
      dragIcon.remove()
    }, 0)

    card.classList.add("dragging")
  })

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging")
  })

  card.addEventListener("click", (e) => {
    // Prevent navigation if clicking action buttons
    if (e.target.classList.contains("product-card-button") || e.target.closest(".product-card-action-btn")) {
      e.stopPropagation()
      if (e.target.classList.contains("product-card-button")) {
        console.log("[v0] Add to cart clicked for product:", product.id)
      }
      return
    }

    // Open modal with product data
    openModal(product)
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
