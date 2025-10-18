/**
 * Theme Management Utilities
 * Handles light/dark theme switching and persistence
 */

import { CONFIG } from "../config.js"

/**
 * Get current theme from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
export function getCurrentTheme() {
  const savedTheme = localStorage.getItem(CONFIG.THEME.STORAGE_KEY)

  if (savedTheme) {
    return savedTheme
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return CONFIG.THEME.DARK
  }

  return CONFIG.THEME.LIGHT
}

/**
 * Apply theme to document
 * @param {string} theme - 'light' or 'dark'
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem(CONFIG.THEME.STORAGE_KEY, theme)
}

/**
 * Toggle between light and dark theme
 * @returns {string} New theme
 */
export function toggleTheme() {
  const currentTheme = getCurrentTheme()
  const newTheme = currentTheme === CONFIG.THEME.LIGHT ? CONFIG.THEME.DARK : CONFIG.THEME.LIGHT

  applyTheme(newTheme)
  return newTheme
}

/**
 * Initialize theme on page load
 */
export function initTheme() {
  const theme = getCurrentTheme()
  applyTheme(theme)
}
