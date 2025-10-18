/**
 * Main Application Entry Point
 * Initializes all components and starts the app
 */

import { initTheme } from "./utils/theme.js"
import { renderNavbar } from "./components/Navbar.js"
import { initProductGrid } from "./components/ProductGrid.js"
import { initSidebar } from "./components/Sidebar.js"
import { renderFooter } from "./components/Footer.js"
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
  initSidebar()
  initProductGrid()
  renderFooter()

  console.log("[v0] Application initialized successfully")
}

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
