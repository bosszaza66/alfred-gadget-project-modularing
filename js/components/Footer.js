/**
 * Footer Component
 * Renders site footer
 */

import { createElement } from "../utils/dom.js"
import { CONFIG } from "../config.js"

/**
 * Create footer element
 * @returns {HTMLElement}
 */
export function createFooter() {
  const footer = createElement("footer", {
    className: "footer",
    attributes: {
      role: "contentinfo",
    },
  })

  const container = createElement("div", {
    className: "footer-container",
  })

  // Footer content sections
  const content = createElement("div", {
    className: "footer-content",
    children: [
      createFooterSection("About", [
        { text: "About Us", href: "#" },
        { text: "Contact", href: "#" },
        { text: "Careers", href: "#" },
      ]),
      createFooterSection("Shop", [
        { text: "All Products", href: "#" },
        { text: "Categories", href: "#" },
        { text: "New Arrivals", href: "#" },
      ]),
      createFooterSection("Support", [
        { text: "Help Center", href: "#" },
        { text: "Shipping Info", href: "#" },
        { text: "Returns", href: "#" },
      ]),
    ],
  })

  // Footer bottom
  const bottom = createElement("div", {
    className: "footer-bottom",
    children: [
      createElement("p", {
        className: "footer-copyright",
        textContent: `© ${new Date().getFullYear()} ${CONFIG.APP.NAME}. Built with vanilla JS for YDP Full-stack Track.`,
      }),
      createElement("div", {
        className: "footer-social",
        children: [
          createSocialLink(
            "GitHub",
            "#",
            `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>`,
          ),
        ],
      }),
    ],
  })

  container.appendChild(content)
  container.appendChild(bottom)
  footer.appendChild(container)

  return footer
}

/**
 * Create footer section
 * @param {string} title - Section title
 * @param {Array} links - Array of link objects {text, href}
 * @returns {HTMLElement}
 */
function createFooterSection(title, links) {
  return createElement("div", {
    className: "footer-section",
    children: [
      createElement("h3", {
        className: "footer-section-title",
        textContent: title,
      }),
      createElement("div", {
        className: "footer-links",
        children: links.map((link) =>
          createElement("a", {
            className: "footer-link",
            textContent: link.text,
            attributes: {
              href: link.href,
            },
          }),
        ),
      }),
    ],
  })
}

/**
 * Create social link
 * @param {string} label - Accessibility label
 * @param {string} href - Link URL
 * @param {string} icon - SVG icon HTML
 * @returns {HTMLElement}
 */
function createSocialLink(label, href, icon) {
  return createElement("a", {
    className: "footer-social-link",
    innerHTML: icon,
    attributes: {
      href: href,
      "aria-label": label,
      target: "_blank",
      rel: "noopener noreferrer",
    },
  })
}

/**
 * Render footer to DOM
 */
export function renderFooter() {
  const existingFooter = document.querySelector(".footer")
  if (existingFooter) {
    existingFooter.replaceWith(createFooter())
  } else {
    document.body.appendChild(createFooter())
  }
  console.log("[v0] Footer rendered")
}
