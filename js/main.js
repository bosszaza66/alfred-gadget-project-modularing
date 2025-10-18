/**
 * Main Application Entry Point
 * Initializes all components and starts the app
 */

import { initTheme } from "./utils/theme.js"
import { renderNavbar } from "./components/Navbar.js"
import { initProductGrid } from "./components/ProductGrid.js"
import { CONFIG } from "./config.js"

/**
 * Initialize application
 */
function init() {
  console.log(`[v0] Initializing ${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`)

  // Initialize theme
  initTheme()

  // Render components
  renderNavbar()
  initProductGrid()

  console.log("[v0] Application initialized successfully")
}

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
