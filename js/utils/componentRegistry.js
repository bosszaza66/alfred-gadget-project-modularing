/**
 * Component Registry
 * Tracks initialized components to prevent double-initialization
 */

class ComponentRegistry {
  constructor() {
    this.components = new Map()
  }

  /**
   * Register a component as initialized
   * @param {string} name - Component name
   * @param {any} instance - Component instance or reference
   * @returns {boolean} - True if registered, false if already exists
   */
  register(name, instance = true) {
    if (this.components.has(name)) {
      console.warn(`[v0] Component "${name}" is already initialized`)
      return false
    }
    this.components.set(name, instance)
    console.log(`[v0] Component "${name}" registered`)
    return true
  }

  /**
   * Check if component is initialized
   * @param {string} name - Component name
   * @returns {boolean}
   */
  isInitialized(name) {
    return this.components.has(name)
  }

  /**
   * Get component instance
   * @param {string} name - Component name
   * @returns {any}
   */
  get(name) {
    return this.components.get(name)
  }

  /**
   * Unregister a component
   * @param {string} name - Component name
   * @returns {boolean}
   */
  unregister(name) {
    return this.components.delete(name)
  }

  /**
   * Get all registered components
   * @returns {string[]}
   */
  getAll() {
    return Array.from(this.components.keys())
  }

  /**
   * Clear all registered components
   */
  clear() {
    this.components.clear()
  }
}

// Export singleton instance
export const componentRegistry = new ComponentRegistry()
