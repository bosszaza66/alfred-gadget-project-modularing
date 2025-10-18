/**
 * Sidebar Component
 * Renders filter sidebar with toggle functionality
 */

import { createElement } from "../utils/dom.js"

/**
 * Create sidebar element
 * @returns {HTMLElement}
 */
export function createSidebar() {
  const sidebar = createElement("aside", {
    className: "sidebar",
    id: "sidebar",
    attributes: {
      role: "complementary",
      "aria-label": "Product filters",
    },
  })

  // Sidebar header
  const header = createElement("div", {
    className: "sidebar-header",
    children: [
      createElement("h2", {
        className: "sidebar-title",
        textContent: "Filters",
      }),
      createElement("button", {
        className: "sidebar-close",
        id: "sidebar-close",
        attributes: {
          "aria-label": "Close filters",
        },
        innerHTML: `
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `,
      }),
    ],
  })

  // Category filter section
  const categorySection = createElement("div", {
    className: "sidebar-section",
    children: [
      createElement("h3", {
        className: "sidebar-section-title",
        textContent: "Category",
      }),
      createElement("div", {
        className: "filter-group",
        id: "category-filters",
        children: [
          createFilterOption("electronics", "Electronics"),
          createFilterOption("jewelery", "Jewelery"),
          createFilterOption("men's clothing", "Men's Clothing"),
          createFilterOption("women's clothing", "Women's Clothing"),
        ],
      }),
    ],
  })

  // Price filter section
  const priceSection = createElement("div", {
    className: "sidebar-section",
    children: [
      createElement("h3", {
        className: "sidebar-section-title",
        textContent: "Price Range",
      }),
      createElement("div", {
        className: "price-range",
        children: [
          createElement("div", {
            className: "price-inputs",
            children: [
              createElement("input", {
                className: "price-input",
                attributes: {
                  type: "number",
                  placeholder: "Min",
                  min: "0",
                  id: "price-min",
                },
              }),
              createElement("span", {
                className: "price-separator",
                textContent: "—",
              }),
              createElement("input", {
                className: "price-input",
                attributes: {
                  type: "number",
                  placeholder: "Max",
                  min: "0",
                  id: "price-max",
                },
              }),
            ],
          }),
        ],
      }),
    ],
  })

  sidebar.appendChild(header)
  sidebar.appendChild(categorySection)
  sidebar.appendChild(priceSection)

  return sidebar
}

/**
 * Create filter option checkbox
 * @param {string} value - Filter value
 * @param {string} label - Filter label
 * @returns {HTMLElement}
 */
function createFilterOption(value, label) {
  const option = createElement("div", {
    className: "filter-option",
  })

  const checkbox = createElement("input", {
    attributes: {
      type: "checkbox",
      id: `filter-${value}`,
      value: value,
      name: "category",
    },
  })

  const labelElement = createElement("label", {
    textContent: label,
    attributes: {
      for: `filter-${value}`,
    },
  })

  option.appendChild(checkbox)
  option.appendChild(labelElement)

  return option
}

/**
 * Create sidebar toggle button
 * @returns {HTMLElement}
 */
export function createSidebarToggle() {
  return createElement("button", {
    className: "sidebar-toggle",
    id: "sidebar-toggle",
    attributes: {
      "aria-label": "Toggle filters",
      "aria-expanded": "false",
    },
    innerHTML: `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      <span>Filters</span>
    `,
  })
}

/**
 * Create sidebar overlay for mobile
 * @returns {HTMLElement}
 */
function createSidebarOverlay() {
  return createElement("div", {
    className: "sidebar-overlay",
    id: "sidebar-overlay",
  })
}

/**
 * Toggle sidebar visibility
 */
export function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  const overlay = document.getElementById("sidebar-overlay")
  const toggleButton = document.getElementById("sidebar-toggle")

  if (!sidebar) return

  const isVisible = sidebar.classList.contains("visible")

  if (isVisible) {
    sidebar.classList.remove("visible")
    sidebar.classList.add("hidden")
    overlay?.classList.remove("visible")
    toggleButton?.setAttribute("aria-expanded", "false")
  } else {
    sidebar.classList.remove("hidden")
    sidebar.classList.add("visible")
    overlay?.classList.add("visible")
    toggleButton?.setAttribute("aria-expanded", "true")
  }
}

/**
 * Initialize sidebar functionality
 */
export function initSidebar() {
  const sidebar = createSidebar()
  const toggle = createSidebarToggle()
  const overlay = createSidebarOverlay()

  // Insert sidebar and overlay into DOM
  document.body.appendChild(sidebar)
  document.body.appendChild(toggle)
  document.body.appendChild(overlay)

  // Setup event listeners
  const toggleButton = document.getElementById("sidebar-toggle")
  const closeButton = document.getElementById("sidebar-close")
  const overlayElement = document.getElementById("sidebar-overlay")

  toggleButton?.addEventListener("click", toggleSidebar)
  closeButton?.addEventListener("click", toggleSidebar)
  overlayElement?.addEventListener("click", toggleSidebar)

  console.log("[v0] Sidebar initialized")
}
