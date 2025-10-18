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

  const scrollingBanner = createElement("div", {
    className: "footer-scrolling-banner",
  })

  const bannerText = createElement("div", {
    className: "footer-banner-text",
    innerHTML: `
      <span>${CONFIG.APP.NAME}</span>
      <span>${CONFIG.APP.NAME}</span>
      <span>${CONFIG.APP.NAME}</span>
      <span>${CONFIG.APP.NAME}</span>
      <span>${CONFIG.APP.NAME}</span>
    `,
  })

  scrollingBanner.appendChild(bannerText)
  container.appendChild(scrollingBanner)

  // Footer content sections
  const content = createElement("div", {
    className: "footer-content",
    children: [
      createElement("div", {
        className: "footer-section",
        children: [
          createElement("h3", {
            className: "footer-section-title",
            textContent: "COMPANY INFO",
          }),
          createElement("div", {
            className: "footer-links",
            children: [
              createElement("a", {
                className: "footer-link",
                textContent: "About Us",
                attributes: { href: "#" },
              }),
              createElement("a", {
                className: "footer-link",
                textContent: "Contact",
                attributes: { href: "#" },
              }),
              createElement("a", {
                className: "footer-link",
                textContent: "Careers",
                attributes: { href: "#" },
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        className: "footer-section",
        children: [
          createElement("h3", {
            className: "footer-section-title",
            textContent: "CUSTOMER SERVICE",
          }),
          createElement("div", {
            className: "footer-links",
            children: [
              createElement("a", {
                className: "footer-link",
                textContent: "Help Center",
                attributes: { href: "#" },
              }),
              createElement("a", {
                className: "footer-link",
                textContent: "Shipping Info",
                attributes: { href: "#" },
              }),
              createElement("a", {
                className: "footer-link",
                textContent: "Returns",
                attributes: { href: "#" },
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        className: "footer-section",
        children: [
          createElement("h3", {
            className: "footer-section-title",
            textContent: "LEGAL",
          }),
          createElement("div", {
            className: "footer-links",
            children: [
              createElement("a", {
                className: "footer-link",
                textContent: "Privacy Policy",
                attributes: { href: "#" },
              }),
              createElement("a", {
                className: "footer-link",
                textContent: "Terms of Service",
                attributes: { href: "#" },
              }),
            ],
          }),
        ],
      }),
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
