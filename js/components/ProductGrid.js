/**
 * Product Grid Component
 * Renders grid of product cards
 */

import { $, hide, show } from "../utils/dom.js"
import { createProductCard } from "./ProductCard.js"
import { fetchProducts } from "../api/productService.js"
import { store } from "../state/store.js"

/**
 * Render products to grid
 * @param {Array} products - Array of product objects
 */
function renderProducts(products) {
  const gridElement = $("#products")
  if (!gridElement) return

  // Clear existing products
  gridElement.innerHTML = ""

  // Render each product card
  products.forEach((product) => {
    const card = createProductCard(product)
    gridElement.appendChild(card)
  })
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
    store.setState({ products, loading: false })
    renderProducts(products)
    showProducts()
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

  // Load products
  loadProducts()
}
