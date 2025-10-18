/**
 * Floating Buttons Component
 * Back to top and support buttons
 */

import { createElement } from "../utils/dom.js"

/**
 * Create back to top button
 * @returns {HTMLElement}
 */
function createBackToTopButton() {
  const button = createElement("button", {
    className: "floating-button back-to-top hidden",
    attributes: {
      "aria-label": "Back to top",
      title: "Back to top",
    },
    innerHTML: `
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    `,
  })

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      button.classList.remove("hidden")
    } else {
      button.classList.add("hidden")
    }
  })

  return button
}

/**
 * Create support button
 * @returns {HTMLElement}
 */
function createSupportButton() {
  const button = createElement("button", {
    className: "floating-button support-button",
    attributes: {
      "aria-label": "Contact support",
      title: "Contact support",
    },
    innerHTML: `
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    `,
  })

  button.addEventListener("click", () => {
    console.log("[v0] Support button clicked")
    // TODO: Implement support chat
    alert("Support chat coming soon!")
  })

  return button
}

/**
 * Create floating buttons container
 * @returns {HTMLElement}
 */
export function createFloatingButtons() {
  const container = createElement("div", {
    className: "floating-buttons",
  })

  container.appendChild(createBackToTopButton())
  container.appendChild(createSupportButton())

  return container
}

/**
 * Render floating buttons to DOM
 */
export function renderFloatingButtons() {
  document.body.appendChild(createFloatingButtons())
}
