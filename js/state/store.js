/**
 * Simple State Management
 * Lightweight state store for app data
 */

class Store {
  constructor() {
    this.state = {
      products: [],
      loading: false,
      error: null,
      theme: "light",
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
