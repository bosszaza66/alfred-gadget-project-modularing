/**
 * Navbar Component
 * Renders main navigation bar
 */

import { createElement } from "../utils/dom.js"
import { createThemeToggle } from "./ThemeToggle.js"
import { CONFIG } from "../config.js"

/**
 * Create navbar element
 * @returns {HTMLElement}
 */
export function createNavbar() {
  const container = createElement("div", {
    className: "navbar-container",
  })

  // Brand
  const brand = createElement("div", {
    className: "navbar-brand",
    children: [
      createElement("div", {
        className: "navbar-brand-icon",
        textContent: "A",
      }),
      createElement("span", {
        textContent: CONFIG.APP.NAME,
      }),
    ],
  })

  // Actions
  const actions = createElement("div", {
    className: "navbar-actions",
    children: [
      createThemeToggle(),
      createElement("button", {
        className: "cart-button navbar-button",
        attributes: {
          "aria-label": "Shopping cart",
          title: "View cart",
        },
        innerHTML: `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span class="cart-badge">0</span>
                `,
      }),
    ],
  })

  container.appendChild(brand)
  container.appendChild(actions)

  return container
}

/**
 * Render navbar to DOM
 */
export function renderNavbar() {
  const navbarElement = document.getElementById("navbar")
  if (navbarElement) {
    navbarElement.appendChild(createNavbar())
  }
}
