/**
 * Navbar Component
 * Renders main navigation bar
 */

import { createElement } from "../utils/dom.js"
import { createThemeToggle } from "./ThemeToggle.js"
import { CONFIG } from "../config.js"
import { store } from "../state/store.js"

/**
 * Create search autocomplete dropdown
 * @returns {HTMLElement}
 */
function createAutocompleteDropdown() {
  return createElement("div", {
    className: "search-autocomplete hidden",
    id: "search-autocomplete",
    attributes: {
      role: "listbox",
    },
  })
}

/**
 * Show autocomplete suggestions
 * @param {string} query - Search query
 * @param {Array} products - All products
 */
function showAutocompleteSuggestions(query, products) {
  const dropdown = document.getElementById("search-autocomplete")
  if (!dropdown || !query) {
    dropdown?.classList.add("hidden")
    return
  }

  const lowerQuery = query.toLowerCase()
  const matches = products.filter((product) => product.title.toLowerCase().includes(lowerQuery)).slice(0, 5)

  if (matches.length === 0) {
    dropdown.classList.add("hidden")
    return
  }

  dropdown.innerHTML = ""

  matches.forEach((product) => {
    const item = createElement("div", {
      className: "autocomplete-item",
      attributes: {
        role: "option",
        "data-product-id": product.id,
      },
    })

    const img = createElement("img", {
      className: "autocomplete-image",
      attributes: {
        src: product.image,
        alt: product.title,
      },
    })

    const title = createElement("div", {
      className: "autocomplete-title",
    })

    // Highlight matching text
    const titleText = product.title
    const matchIndex = titleText.toLowerCase().indexOf(lowerQuery)
    if (matchIndex !== -1) {
      const before = titleText.substring(0, matchIndex)
      const match = titleText.substring(matchIndex, matchIndex + query.length)
      const after = titleText.substring(matchIndex + query.length)

      title.innerHTML = `${before}<mark>${match}</mark>${after}`
    } else {
      title.textContent = titleText
    }

    const price = createElement("div", {
      className: "autocomplete-price",
      textContent: `$${product.price.toFixed(2)}`,
    })

    item.appendChild(img)
    item.appendChild(title)
    item.appendChild(price)

    item.addEventListener("click", () => {
      // Filter to show only this product
      store.setState({ searchQuery: product.title })
      document.getElementById("search-input").value = product.title
      dropdown.classList.add("hidden")

      // Trigger search
      const event = new CustomEvent("search", { detail: { query: product.title } })
      document.dispatchEvent(event)
    })

    dropdown.appendChild(item)
  })

  dropdown.classList.remove("hidden")
}

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

  const autocompleteDropdown = createAutocompleteDropdown()

  searchForm.appendChild(searchIcon)
  searchForm.appendChild(searchInput)
  searchContainer.appendChild(searchForm)
  searchContainer.appendChild(autocompleteDropdown)

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const query = searchInput.value.trim()
    if (query) {
      store.setState({ searchQuery: query })
      document.getElementById("search-autocomplete")?.classList.add("hidden")

      // Trigger search event
      const event = new CustomEvent("search", { detail: { query } })
      document.dispatchEvent(event)
    }
  })

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim()
    const { products } = store.getState()

    if (query.length > 1) {
      showAutocompleteSuggestions(query, products)
      store.setState({ searchQuery: query })

      // Trigger search event
      const event = new CustomEvent("search", { detail: { query } })
      document.dispatchEvent(event)
    } else {
      document.getElementById("search-autocomplete")?.classList.add("hidden")
      if (query.length === 0) {
        store.setState({ searchQuery: "" })
        const event = new CustomEvent("search", { detail: { query: "" } })
        document.dispatchEvent(event)
      }
    }
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      document.getElementById("search-autocomplete")?.classList.add("hidden")
    }
  })

  return searchContainer
}

/**
 * Add product to cart
 * @param {Object} product - Product to add
 */
function addToCart(product) {
  const { cart } = store.getState()
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  store.setState({ cart: [...cart] })

  // Update cart badge
  const cartBadge = document.querySelector(".cart-badge")
  if (cartBadge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartBadge.textContent = totalItems.toString()
  }

  console.log("[v0] Product added to cart:", product.title)

  // Show visual feedback
  showCartFeedback()
}

/**
 * Show visual feedback when item added to cart
 */
function showCartFeedback() {
  const cartButton = document.querySelector(".cart-button")
  if (cartButton) {
    cartButton.classList.add("cart-added")
    setTimeout(() => {
      cartButton.classList.remove("cart-added")
    }, 600)
  }
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

  const cartButton = actions.querySelector(".cart-button")
  if (cartButton) {
    cartButton.addEventListener("dragover", (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
      cartButton.classList.add("drag-over")
    })

    cartButton.addEventListener("dragleave", () => {
      cartButton.classList.remove("drag-over")
    })

    cartButton.addEventListener("drop", (e) => {
      e.preventDefault()
      cartButton.classList.remove("drag-over")

      try {
        const product = JSON.parse(e.dataTransfer.getData("application/json"))
        addToCart(product)
      } catch (error) {
        console.error("[v0] Error adding product to cart:", error)
      }
    })
  }

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
