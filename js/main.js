/**
 * Main Application Entry Point
 * Initializes all components and starts the app
 */

import { initTheme } from "./utils/theme.js"
import { renderNavbar } from "./components/Navbar.js"
import { renderCategoryMenu } from "./components/CategoryMenu.js"
// import { renderHeroSection } from "./components/HeroSection.js"
import { renderVisionBlocks } from "./components/VisionBlocks.js"
import { initProductGrid } from "./components/ProductGrid.js"
import { initSidebar } from "./components/Sidebar.js"
import { renderFooter } from "./components/Footer.js"
import { renderFloatingButtons } from "./components/FloatingButtons.js"
import { initModal } from "./components/Modal.js"
import { CONFIG } from "./config.js"
import { componentRegistry } from "./utils/componentRegistry.js"

/**
 * Initialize application
 */
function init() {
  console.log(`[v0] Initializing ${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`)

  if (componentRegistry.isInitialized("app")) {
    console.warn("[v0] Application already initialized")
    return
  }

  // Initialize theme
  initTheme()

  if (!componentRegistry.isInitialized("modal")) {
    initModal()
    componentRegistry.register("modal")
  }

  // Render components in order with registry checks
  if (!componentRegistry.isInitialized("navbar")) {
    renderNavbar()
    componentRegistry.register("navbar")
  }

  if (!componentRegistry.isInitialized("categoryMenu")) {
    renderCategoryMenu()
    componentRegistry.register("categoryMenu")
  }

  if (!componentRegistry.isInitialized("visionBlocks")) {
    renderVisionBlocks()
    componentRegistry.register("visionBlocks")
  }

  if (!componentRegistry.isInitialized("sidebar")) {
    initSidebar()
    componentRegistry.register("sidebar")
  }

  if (!componentRegistry.isInitialized("productGrid")) {
    initProductGrid()
    componentRegistry.register("productGrid")
  }

  if (!componentRegistry.isInitialized("footer")) {
    renderFooter()
    componentRegistry.register("footer")
  }

  if (!componentRegistry.isInitialized("floatingButtons")) {
    renderFloatingButtons()
    componentRegistry.register("floatingButtons")
  }

  // Mark app as initialized
  componentRegistry.register("app")

  console.log("[v0] Application initialized successfully")
  console.log("[v0] Registered components:", componentRegistry.getAll())
}

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
