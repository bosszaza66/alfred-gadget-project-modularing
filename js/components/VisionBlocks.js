/**
 * Vision Blocks Component
 * Company core values/vision blocks
 */

import { createElement } from "../utils/dom.js"

const visions = [
  {
    title: "Genuine Product",
    description: "100% authentic products from trusted brands",
    icon: `<svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>`,
  },
  {
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep",
    icon: `<svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>`,
  },
  {
    title: "Easy Installment",
    description: "Flexible payment plans for your convenience",
    icon: `<svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>`,
  },
]

/**
 * Create vision block
 * @param {Object} vision
 * @returns {HTMLElement}
 */
function createVisionBlock(vision) {
  const block = createElement("div", {
    className: "vision-block",
  })

  const icon = createElement("div", {
    className: "vision-icon",
    innerHTML: vision.icon,
  })

  const title = createElement("h3", {
    className: "vision-title",
    textContent: vision.title,
  })

  const description = createElement("p", {
    className: "vision-description",
    textContent: vision.description,
  })

  block.appendChild(icon)
  block.appendChild(title)
  block.appendChild(description)

  return block
}

/**
 * Create vision blocks section
 * @returns {HTMLElement}
 */
export function createVisionBlocks() {
  const section = createElement("section", {
    className: "vision-section",
    attributes: {
      "aria-label": "Company values",
    },
  })

  const container = createElement("div", {
    className: "vision-container",
  })

  visions.forEach((vision) => {
    container.appendChild(createVisionBlock(vision))
  })

  section.appendChild(container)

  return section
}

/**
 * Render vision blocks to DOM
 */
export function renderVisionBlocks() {
  const mainContent = document.querySelector(".main-content")
  const heroSection = document.querySelector(".hero-section")
  if (mainContent && heroSection) {
    heroSection.after(createVisionBlocks())
  }
}
