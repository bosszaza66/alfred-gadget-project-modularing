/**
 * Product Service
 * Handles all API calls to FakeStore API
 */

import { CONFIG } from "../config.js"

/**
 * Fetch all products from API
 * @returns {Promise<Array>}
 */
export async function fetchProducts() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.PRODUCTS}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    throw error
  }
}

/**
 * Fetch single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.PRODUCT_BY_ID}/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const product = await response.json()
    return product
  } catch (error) {
    console.error(`[v0] Error fetching product ${id}:`, error)
    throw error
  }
}

/**
 * Fetch all categories
 * @returns {Promise<Array>}
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CATEGORIES}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const categories = await response.json()
    return categories
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    throw error
  }
}
