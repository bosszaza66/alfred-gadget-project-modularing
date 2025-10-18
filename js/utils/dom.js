/**
 * DOM Manipulation Utilities
 * Helper functions for common DOM operations
 */

/**
 * Create an element with classes and attributes
 * @param {string} tag - HTML tag name
 * @param {Object} options - Element options
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
  const element = document.createElement(tag)

  if (options.className) {
    element.className = options.className
  }

  if (options.textContent) {
    element.textContent = options.textContent
  }

  if (options.innerHTML) {
    element.innerHTML = options.innerHTML
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
  }

  if (options.children) {
    options.children.forEach((child) => {
      if (child) element.appendChild(child)
    })
  }

  return element
}

/**
 * Query selector with error handling
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null}
 */
export function $(selector) {
  return document.querySelector(selector)
}

/**
 * Query selector all
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export function $$(selector) {
  return document.querySelectorAll(selector)
}

/**
 * Show element
 * @param {HTMLElement} element
 */
export function show(element) {
  if (element) element.style.display = ""
}

/**
 * Hide element
 * @param {HTMLElement} element
 */
export function hide(element) {
  if (element) element.style.display = "none"
}

/**
 * Toggle element visibility
 * @param {HTMLElement} element
 */
export function toggle(element) {
  if (element) {
    element.style.display = element.style.display === "none" ? "" : "none"
  }
}
