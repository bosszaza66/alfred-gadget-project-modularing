/**
 * Simple State Management
 * Lightweight state store for app data
 */

class Store {
  constructor() {
    this.state = {
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
      theme: "light",
      cart: [],
      compareList: [],
      favorites: [],
      filters: {
        categories: [],
        tags: [],
        priceMin: null,
        priceMax: null,
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 12,
        totalPages: 1,
      },
      searchQuery: "",
    }
    this.listeners = []
  }

  /**
   * Get current state
   * @returns {Object}
   */
  getState() {
    return { ...this.state }
  }

  /**
   * Update state
   * @param {Object} updates - State updates
   */
  setState(updates) {
    this.state = { ...this.state, ...updates }
    this.notify()
  }

  /**
   * Subscribe to state changes
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  /**
   * Notify all listeners of state change
   */
  notify() {
    this.listeners.forEach((listener) => listener(this.state))
  }
}

// Export singleton instance
export const store = new Store()
