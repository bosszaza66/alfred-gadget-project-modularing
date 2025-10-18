/**
 * Product Grid Component
 * Renders grid of product cards
 */

import { $, hide, show } from "../utils/dom.js"
import { createProductCard } from "./ProductCard.js"
import { fetchProducts } from "../api/productService.js"
import { store } from "../state/store.js"
import { createPagination, scrollToProductGrid } from "./Pagination.js"
import { updateTagsFilter } from "./Sidebar.js"
import { generateProductTags } from "../utils/productTags.js"

/**
 * Filter products based on current filters and search
 * @param {Array} products - All products
 * @returns {Array} Filtered products
 */
function filterProducts(products) {
  const { filters, searchQuery } = store.getState()
  let filtered = [...products]

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter((product) => filters.categories.includes(product.category))
  }

  // Tags filter
  if (filters.tags.length > 0) {
    filtered = filtered.filter((product) => {
      const productTags = generateProductTags(product).map((tag) => tag.toLowerCase().replace(/\s+/g, "-"))
      return filters.tags.some((tag) => productTags.includes(tag))
    })
  }

  // Price filter
  if (filters.priceMin !== null) {
    filtered = filtered.filter((product) => product.price >= filters.priceMin)
  }
  if (filters.priceMax !== null) {
    filtered = filtered.filter((product) => product.price <= filters.priceMax)
  }

  // Search filter
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery),
    )
  }

  return filtered
}

/**
 * Get paginated products
 * @param {Array} products - Filtered products
 * @param {number} page - Current page
 * @param {number} itemsPerPage - Items per page
 * @returns {Array} Paginated products
 */
function getPaginatedProducts(products, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return products.slice(startIndex, endIndex)
}

/**
 * Render products to grid
 * @param {Array} products - Array of product objects
 */
function renderProducts(products) {
  const gridElement = $("#products")
  if (!gridElement) return

  // Clear existing products
  gridElement.innerHTML = ""

  if (products.length === 0) {
    const emptyMessage = document.createElement("div")
    emptyMessage.className = "empty-message"
    emptyMessage.textContent = "No products found matching your criteria."
    gridElement.appendChild(emptyMessage)
    return
  }

  // Render each product card
  products.forEach((product) => {
    const card = createProductCard(product)
    gridElement.appendChild(card)
  })
}

/**
 * Render pagination controls
 */
function renderPagination() {
  const paginationContainer = document.getElementById("pagination-container")
  if (!paginationContainer) return

  const { pagination, filteredProducts } = store.getState()
  const totalPages = Math.ceil(filteredProducts.length / pagination.itemsPerPage)

  // Update total pages in store
  store.setState({
    pagination: {
      ...pagination,
      totalPages,
    },
  })

  paginationContainer.innerHTML = ""

  if (totalPages <= 1) return

  const paginationElement = createPagination(pagination.currentPage, totalPages, (page) => {
    store.setState({
      pagination: {
        ...pagination,
        currentPage: page,
      },
    })

    updateProductDisplay()
    scrollToProductGrid()
  })

  paginationContainer.appendChild(paginationElement)
}

/**
 * Update product display based on filters and pagination
 */
function updateProductDisplay() {
  const { products, pagination } = store.getState()

  // Filter products
  const filtered = filterProducts(products)
  store.setState({ filteredProducts: filtered })

  // Get paginated products
  const paginated = getPaginatedProducts(filtered, pagination.currentPage, pagination.itemsPerPage)

  // Render products and pagination
  renderProducts(paginated)
  renderPagination()
  showProducts()
}

/**
 * Show loading state
 */
function showLoading() {
  show($("#loading"))
  hide($("#error"))
  hide($("#products"))
}

/**
 * Show error state
 * @param {string} message - Error message
 */
function showError(message) {
  hide($("#loading"))
  const errorElement = $("#error")
  const errorMessage = errorElement?.querySelector(".error-message")

  if (errorMessage) {
    errorMessage.textContent = message
  }

  show(errorElement)
  hide($("#products"))
}

/**
 * Show products
 */
function showProducts() {
  hide($("#loading"))
  hide($("#error"))
  show($("#products"))
}

/**
 * Load and display products
 */
export async function loadProducts() {
  showLoading()
  store.setState({ loading: true, error: null })

  try {
    const products = await fetchProducts()
    store.setState({
      products,
      filteredProducts: products,
      loading: false,
    })

    // Update tags filter
    updateTagsFilter(products)

    // Initial display
    updateProductDisplay()

    console.log("[v0] Successfully loaded", products.length, "products")
  } catch (error) {
    const errorMessage = "Failed to load products. Please try again."
    store.setState({ loading: false, error: errorMessage })
    showError(errorMessage)
    console.error("[v0] Error loading products:", error)
  }
}

/**
 * Initialize product grid
 */
export function initProductGrid() {
  // Setup retry button
  const retryButton = $(".retry-button")
  if (retryButton) {
    retryButton.addEventListener("click", loadProducts)
  }

  document.addEventListener("filter", () => {
    const { pagination } = store.getState()
    store.setState({
      pagination: {
        ...pagination,
        currentPage: 1, // Reset to first page on filter
      },
    })
    updateProductDisplay()
  })

  document.addEventListener("search", () => {
    const { pagination } = store.getState()
    store.setState({
      pagination: {
        ...pagination,
        currentPage: 1, // Reset to first page on search
      },
    })
    updateProductDisplay()
  })

  // Load products
  loadProducts()
}
