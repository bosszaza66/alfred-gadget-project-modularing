/**
 * Hero Section Component
 * Large looping text banner with company vision
 */

import { createElement } from "../utils/dom.js"

/**
 * Create hero section
 * @returns {HTMLElement}
 */
export function createHeroSection() {
  const section = createElement("section", {
    className: "hero-section",
    attributes: {
      "aria-label": "Company vision",
    },
  })

  // Large looping text banner
  const banner = createElement("div", {
    className: "hero-banner",
  })

  const bannerText = createElement("div", {
    className: "hero-banner-text",
    innerHTML: `
      <span>ALFRED GADGET YOUR WAY</span>
      <span>ALFRED GADGET YOUR WAY</span>
      <span>ALFRED GADGET YOUR WAY</span>
    `,
  })

  banner.appendChild(bannerText)
  section.appendChild(banner)

  return section
}

/**
 * Render hero section to DOM
 */
export function renderHeroSection() {
  const mainContent = document.querySelector(".main-content")
  if (mainContent) {
    mainContent.insertBefore(createHeroSection(), mainContent.firstChild)
  }
}
