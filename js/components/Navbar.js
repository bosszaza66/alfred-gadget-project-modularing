/**
 * Navbar Component
 * Renders main navigation bar
 */

import { createElement } from "../utils/dom.js"
import { createThemeToggle } from "./ThemeToggle.js"
import { CONFIG } from "../config.js"

/**
 * Create search bar
 * @returns {HTMLElement}
 */
function createSearchBar() {
  const searchContainer = createElement("div", {
    className: "navbar-search",
  })

  const searchForm = createElement("form", {
    className: "search-form",
    attributes: {
      role: "search",
    },
  })

  const searchIcon = createElement("div", {
    className: "search-icon",
    innerHTML: `
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    `,
  })

  const searchInput = createElement("input", {
    className: "search-input",
    attributes: {
      type: "search",
      placeholder: "Search products...",
      "aria-label": "Search products",
      id: "search-input",
    },
  })

  searchForm.appendChild(searchIcon)
  searchForm.appendChild(searchInput)
  searchContainer.appendChild(searchForm)

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const query = searchInput.value.trim()
    if (query) {
      console.log("[v0] Search query:", query)
      // TODO: Implement search functionality
    }
  })

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim()
    if (query.length > 2) {
      console.log("[v0] Search input:", query)
      // TODO: Implement live search
    }
  })

  return searchContainer
}

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

  const searchBar = createSearchBar()

  // Actions
  const actions = createElement("div", {
    className: "navbar-actions",
    children: [
      createThemeToggle(),
      createElement("button", {
        className: "compare-button navbar-button",
        attributes: {
          "aria-label": "Compare products",
          title: "Compare products",
        },
        innerHTML: `
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="compare-badge">0</span>
        `,
      }),
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
  container.appendChild(searchBar)
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
