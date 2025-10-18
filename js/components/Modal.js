/**
 * Modal Component
 * Reusable modal for displaying product details (Quick View)
 */

import { createElement } from "../utils/dom.js"

/**
 * Modal state
 */
let modalInstance = null
let isOpen = false

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
 * Lock body scroll
 */
function lockBodyScroll() {
  document.body.style.overflow = "hidden"
}

/**
 * Unlock body scroll
 */
function unlockBodyScroll() {
  document.body.style.overflow = ""
}

/**
 * Close modal
 */
export function closeModal() {
  if (!isOpen || !modalInstance) return

  modalInstance.classList.remove("modal-open")
  modalInstance.classList.add("modal-closing")

  setTimeout(() => {
    if (modalInstance && modalInstance.parentNode) {
      modalInstance.parentNode.removeChild(modalInstance)
    }
    modalInstance = null
    isOpen = false
    unlockBodyScroll()
  }, 300) // Match animation duration
}

/**
 * Open modal with product data
 * @param {Object} product - Product data
 */
export function openModal(product) {
  if (isOpen) {
    closeModal()
    setTimeout(() => openModal(product), 350)
    return
  }

  // Create modal structure
  const modal = createElement("div", {
    className: "modal-overlay",
    children: [
      createElement("div", {
        className: "modal-container",
        children: [
          // Close button
          createElement("button", {
            className: "modal-close",
            attributes: {
              "aria-label": "Close modal",
              title: "Close (Esc)",
            },
            innerHTML: `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            `,
          }),
          // Modal content
          createElement("div", {
            className: "modal-content",
            children: [
              // Left side - Image
              createElement("div", {
                className: "modal-image-section",
                children: [
                  createElement("img", {
                    className: "modal-product-image",
                    attributes: {
                      src: product.image,
                      alt: product.title,
                    },
                  }),
                ],
              }),
              // Right side - Details
              createElement("div", {
                className: "modal-details-section",
                children: [
                  createElement("div", {
                    className: "modal-category",
                    textContent: product.category,
                  }),
                  createElement("h2", {
                    className: "modal-title",
                    textContent: product.title,
                  }),
                  createElement("div", {
                    className: "modal-rating",
                    innerHTML: `
                      <span class="modal-stars">${generateStars(product.rating.rate)}</span>
                      <span class="modal-rating-text">${product.rating.rate} (${product.rating.count} reviews)</span>
                    `,
                  }),
                  createElement("div", {
                    className: "modal-price",
                    textContent: `$${product.price.toFixed(2)}`,
                  }),
                  createElement("p", {
                    className: "modal-description",
                    textContent: product.description,
                  }),
                  // Action buttons (placeholders)
                  createElement("div", {
                    className: "modal-actions",
                    children: [
                      createElement("button", {
                        className: "modal-btn modal-btn-primary",
                        textContent: "Add to Cart",
                        attributes: {
                          "aria-label": `Add ${product.title} to cart`,
                        },
                      }),
                      createElement("button", {
                        className: "modal-btn modal-btn-secondary",
                        innerHTML: `
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span>Favorite</span>
                        `,
                        attributes: {
                          "aria-label": "Add to favorites",
                        },
                      }),
                      createElement("button", {
                        className: "modal-btn modal-btn-secondary",
                        innerHTML: `
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor" stroke="none">VS</text>
                          </svg>
                          <span>Compare</span>
                        `,
                        attributes: {
                          "aria-label": "Add to compare",
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })

  // Add to DOM
  document.body.appendChild(modal)
  modalInstance = modal
  isOpen = true

  // Lock body scroll
  lockBodyScroll()

  // Trigger animation
  requestAnimationFrame(() => {
    modal.classList.add("modal-open")
  })

  // Event listeners
  const closeBtn = modal.querySelector(".modal-close")
  const overlay = modal.querySelector(".modal-overlay")
  const container = modal.querySelector(".modal-container")

  // Close button click
  closeBtn.addEventListener("click", closeModal)

  // Overlay click (outside modal)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal()
    }
  })

  // Prevent clicks inside modal from closing
  container.addEventListener("click", (e) => {
    e.stopPropagation()
  })

  // Keyboard accessibility (ESC key)
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isOpen) {
      closeModal()
      document.removeEventListener("keydown", handleKeyDown)
    }
  }
  document.addEventListener("keydown", handleKeyDown)

  // Placeholder button handlers
  const addToCartBtn = modal.querySelector(".modal-btn-primary")
  const favoriteBtn = modal.querySelectorAll(".modal-btn-secondary")[0]
  const compareBtn = modal.querySelectorAll(".modal-btn-secondary")[1]

  addToCartBtn.addEventListener("click", () => {
    console.log("[v0] Add to cart clicked in modal for product:", product.id)
  })

  favoriteBtn.addEventListener("click", () => {
    favoriteBtn.classList.toggle("active")
    console.log("[v0] Favorite toggled in modal for product:", product.id)
  })

  compareBtn.addEventListener("click", () => {
    compareBtn.classList.toggle("active")
    console.log("[v0] Compare toggled in modal for product:", product.id)
  })
}

/**
 * Initialize modal component
 */
export function initModal() {
  console.log("[v0] Modal component initialized")
}
