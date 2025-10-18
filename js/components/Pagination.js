/**
 * Pagination Component
 * Handles pagination controls for product grid
 */

import { createElement } from "../utils/dom.js"

/**
 * Create pagination controls
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {Function} onPageChange - Callback when page changes
 * @returns {HTMLElement}
 */
export function createPagination(currentPage, totalPages, onPageChange) {
  const pagination = createElement("div", {
    className: "pagination",
    attributes: {
      role: "navigation",
      "aria-label": "Pagination",
    },
  })

  // Previous button
  const prevButton = createElement("button", {
    className: `pagination-button pagination-prev ${currentPage === 1 ? "disabled" : ""}`,
    textContent: "Previous",
    attributes: {
      "aria-label": "Previous page",
      disabled: currentPage === 1,
    },
  })

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  })

  pagination.appendChild(prevButton)

  // Page numbers
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  pageNumbers.forEach((pageNum) => {
    if (pageNum === "...") {
      const ellipsis = createElement("span", {
        className: "pagination-ellipsis",
        textContent: "...",
      })
      pagination.appendChild(ellipsis)
    } else {
      const pageButton = createElement("button", {
        className: `pagination-button pagination-page ${pageNum === currentPage ? "active" : ""}`,
        textContent: pageNum.toString(),
        attributes: {
          "aria-label": `Page ${pageNum}`,
          "aria-current": pageNum === currentPage ? "page" : undefined,
        },
      })

      pageButton.addEventListener("click", () => {
        onPageChange(pageNum)
      })

      pagination.appendChild(pageButton)
    }
  })

  // Next button
  const nextButton = createElement("button", {
    className: `pagination-button pagination-next ${currentPage === totalPages ? "disabled" : ""}`,
    textContent: "Next",
    attributes: {
      "aria-label": "Next page",
      disabled: currentPage === totalPages,
    },
  })

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  })

  pagination.appendChild(nextButton)

  return pagination
}

/**
 * Get page numbers to display
 * @param {number} current - Current page
 * @param {number} total - Total pages
 * @returns {Array} Array of page numbers and ellipsis
 */
function getPageNumbers(current, total) {
  const pages = []
  const maxVisible = 7

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push("...")
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push("...")
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push("...")
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push("...")
      pages.push(total)
    }
  }

  return pages
}

/**
 * Scroll to top of product grid smoothly
 */
export function scrollToProductGrid() {
  const productGrid = document.getElementById("products")
  if (productGrid) {
    const yOffset = -100 // Offset for fixed header
    const y = productGrid.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({
      top: y,
      behavior: "smooth",
    })
  }
}
