(() => {
  const paths = {
    "shield-check": '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><path d="m9 12 2 2 4-4"/>',
    "refresh-cw": '<path d="M21 12a9 9 0 0 0-15.4-6.4L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15.4 6.4L21 16"/><path d="M16 16h5v5"/>',
    eraser: '<path d="m7 21-4-4a2.3 2.3 0 0 1 0-3.2L13.8 3a2.3 2.3 0 0 1 3.2 0l4 4a2.3 2.3 0 0 1 0 3.2L10.2 21Z"/><path d="m5 12 7 7"/><path d="M16 21h5"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/>',
    "calendar-days": '<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    "clock-3": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5h4"/>',
    sparkles: '<path d="m12 3-1.7 5.3L5 10l5.3 1.7L12 17l1.7-5.3L19 10l-5.3-1.7Z"/><path d="m5 3-.7 2.3L2 6l2.3.7L5 9l.7-2.3L8 6l-2.3-.7ZM19 16l-.6 1.7-1.7.6 1.7.6.6 1.7.6-1.7 1.7-.6-1.7-.6Z"/>',
    house: '<path d="m3 11 9-8 9 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22v-7h6v7"/>',
    "receipt-text": '<path d="M4 3v18l2-1.5L8 21l2-1.5L12 21l2-1.5 2 1.5 2-1.5 2 1.5V3Z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    "circle-dollar-sign": '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.8c-.4-.9-1.4-1.5-2.8-1.5-1.8 0-3 .9-3 2.2 0 1.4 1.2 1.9 3.1 2.3 1.7.4 2.7.9 2.7 2.3 0 1.4-1.2 2.4-3.1 2.4-1.5 0-2.7-.6-3.2-1.7M12.5 5.5v13"/>',
  };

  function icon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = paths[name] || paths["file-text"];
    return svg;
  }

  window.receiptIcons = {
    createIcons() {
      document.querySelectorAll("i[data-lucide]").forEach((placeholder) => placeholder.replaceWith(icon(placeholder.dataset.lucide)));
    },
  };
})();
