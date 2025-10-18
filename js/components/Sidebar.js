/**
 * Sidebar Component
 * Renders filter sidebar with toggle functionality
 */

import { createElement } from "../utils/dom.js"
import { getAllTags } from "../utils/productTags.js"
import { store } from "../state/store.js"

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

  const tagsSection = createElement("div", {
    className: "sidebar-section",
    children: [
      createElement("h3", {
        className: "sidebar-section-title",
        textContent: "Tags",
      }),
      createElement("div", {
        className: "filter-group",
        id: "tags-filters",
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
  sidebar.appendChild(tagsSection)
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
 * Create sidebar edge toggle button
 * @returns {HTMLElement}
 */
export function createSidebarEdgeToggle() {
  return createElement("button", {
    className: "sidebar-edge-toggle",
    id: "sidebar-edge-toggle",
    attributes: {
      "aria-label": "Toggle sidebar",
      "aria-expanded": "true",
    },
    innerHTML: `
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
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
 * Toggle sidebar collapse on desktop
 */
export function toggleSidebarCollapse() {
  const sidebar = document.getElementById("sidebar")
  const edgeToggle = document.getElementById("sidebar-edge-toggle")
  const pageWrapper = document.querySelector(".page-wrapper")

  if (!sidebar || !edgeToggle) return

  const isCollapsed = sidebar.classList.contains("collapsed")

  if (isCollapsed) {
    sidebar.classList.remove("collapsed")
    pageWrapper?.classList.remove("sidebar-collapsed")
    edgeToggle.setAttribute("aria-expanded", "true")
    edgeToggle.setAttribute("aria-label", "Collapse sidebar")
  } else {
    sidebar.classList.add("collapsed")
    pageWrapper?.classList.add("sidebar-collapsed")
    edgeToggle.setAttribute("aria-expanded", "false")
    edgeToggle.setAttribute("aria-label", "Expand sidebar")
  }
}

/**
 * Initialize sidebar functionality
 */
export function initSidebar() {
  const sidebar = createSidebar()
  const toggle = createSidebarToggle()
  const edgeToggle = createSidebarEdgeToggle()
  const overlay = createSidebarOverlay()

  const sidebarContainer = document.getElementById("sidebar-container")
  if (sidebarContainer) {
    sidebarContainer.appendChild(sidebar)
  } else {
    document.body.appendChild(sidebar)
  }

  document.body.appendChild(toggle)
  document.body.appendChild(edgeToggle)
  document.body.appendChild(overlay)

  // Setup event listeners
  const toggleButton = document.getElementById("sidebar-toggle")
  const closeButton = document.getElementById("sidebar-close")
  const overlayElement = document.getElementById("sidebar-overlay")
  const edgeToggleButton = document.getElementById("sidebar-edge-toggle")

  toggleButton?.addEventListener("click", toggleSidebar)
  closeButton?.addEventListener("click", toggleSidebar)
  overlayElement?.addEventListener("click", toggleSidebar)

  edgeToggleButton?.addEventListener("click", toggleSidebarCollapse)
}

/**
 * Update tags filter based on available products
 * @param {Array} products - Array of products
 */
export function updateTagsFilter(products) {
  const tagsContainer = document.getElementById("tags-filters")
  if (!tagsContainer) return

  const allTags = getAllTags(products)

  tagsContainer.innerHTML = ""

  allTags.forEach((tag) => {
    const option = createFilterOption(tag.toLowerCase().replace(/\s+/g, "-"), tag)
    option.querySelector("input").setAttribute("name", "tag")
    tagsContainer.appendChild(option)
  })

  // Add event listeners for tag filters
  const tagCheckboxes = tagsContainer.querySelectorAll('input[type="checkbox"]')
  tagCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedTags = Array.from(tagsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(
        (cb) => cb.value,
      )

      const { filters } = store.getState()
      store.setState({
        filters: {
          ...filters,
          tags: selectedTags,
        },
      })

      // Trigger filter event
      const event = new CustomEvent("filter")
      document.dispatchEvent(event)
    })
  })
}
