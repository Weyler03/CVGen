"use client"

import { useEffect } from "react"

export default function PrintStyles() {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @media print {
        @page {
          size: A4;
          margin: 0.5in;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .print\\:shadow-none {
          box-shadow: none !important;
        }
        
        .print\\:break-inside-avoid {
          break-inside: avoid !important;
        }
        
        .print\\:break-after-page {
          break-after: page !important;
        }
        
        /* Hide navigation and buttons */
        nav, .no-print, button:not(.print-button) {
          display: none !important;
        }
        
        /* Ensure full width */
        .print-container {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Fix text colors */
        * {
          color: inherit !important;
        }
        
        /* Preserve background colors and gradients */
        .print-preserve-bg {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}
