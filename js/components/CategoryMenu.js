/**
 * Category Menu Component
 * Horizontal scrollable category cards below navbar
 */

import { createElement } from "../utils/dom.js"

const categories = [
  { name: "Headphones", icon: "🎧", slug: "electronics" },
  { name: "Monitors", icon: "🖥️", slug: "electronics" },
  { name: "Gaming", icon: "🎮", slug: "electronics" },
  { name: "Chairs", icon: "🪑", slug: "furniture" },
  { name: "Accessories", icon: "⌨️", slug: "electronics" },
  { name: "Audio", icon: "🔊", slug: "electronics" },
  { name: "Microphones", icon: "🎙️", slug: "electronics" },
  { name: "Graphics Cards", icon: "🎨", slug: "electronics" },
  { name: "Storage", icon: "💾", slug: "electronics" },
]

/**
 * Create category card
 * @param {Object} category
 * @returns {HTMLElement}
 */
function createCategoryCard(category) {
  const card = createElement("button", {
    className: "category-card",
    attributes: {
      "aria-label": `Browse ${category.name}`,
    },
  })

  const icon = createElement("div", {
    className: "category-icon",
    textContent: category.icon,
  })

  const name = createElement("div", {
    className: "category-name",
    textContent: category.name,
  })

  card.appendChild(icon)
  card.appendChild(name)

  card.addEventListener("click", () => {
    console.log("[v0] Category clicked:", category.name)
    // TODO: Implement category filtering
  })

  return card
}

/**
 * Create category menu
 * @returns {HTMLElement}
 */
export function createCategoryMenu() {
  const container = createElement("div", {
    className: "category-menu",
  })

  const scrollContainer = createElement("div", {
    className: "category-scroll",
  })

  categories.forEach((category) => {
    scrollContainer.appendChild(createCategoryCard(category))
  })

  container.appendChild(scrollContainer)

  return container
}

/**
 * Render category menu to DOM
 */
export function renderCategoryMenu() {
  const navbarElement = document.getElementById("navbar")
  if (navbarElement) {
    navbarElement.appendChild(createCategoryMenu())
  }
}
