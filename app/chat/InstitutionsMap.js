"use client";

import { useEffect, useRef, useState } from "react";
import { INSTITUTIONS, COUNTRIES } from "../../lib/institutions";

// Loads Leaflet from CDN once, resolves with window.L.
function loadLeaflet() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    if (window.L) return resolve(window.L);

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    let script = document.getElementById("leaflet-js");
    if (!script) {
      script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      document.body.appendChild(script);
    }
    if (window.L) return resolve(window.L);
    script.addEventListener("load", () => resolve(window.L));
  });
}

function popupHtml(inst) {
  const gmaps =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(inst.gmaps);
  const phone = inst.phone
    ? `<a href="tel:${inst.phone.replace(/\s/g, "")}" style="color:#C05A3C;text-decoration:none">${inst.phone}</a>`
    : "";
  const site = inst.website
    ? `<a href="https://${inst.website}" target="_blank" rel="noreferrer" style="color:#C05A3C;text-decoration:none">${inst.website}</a>`
    : "";
  return `
    <div style="font-family:Inter,sans-serif;min-width:190px;max-width:230px">
      <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#1A1A1A">${inst.name}</div>
      <div style="font-size:11px;color:#888;margin-bottom:6px">${inst.full}</div>
      <div style="font-size:12px;color:#555;line-height:1.45;margin-bottom:8px">${inst.role}</div>
      ${inst.address ? `<div style="font-size:11px;color:#888;margin-bottom:2px">📍 ${inst.address}</div>` : ""}
      ${phone ? `<div style="font-size:12px;margin-bottom:2px">📞 ${phone}</div>` : ""}
      ${site ? `<div style="font-size:12px;margin-bottom:8px">🔗 ${site}</div>` : ""}
      <a href="${gmaps}" target="_blank" rel="noreferrer"
         style="display:inline-block;background:#C05A3C;color:#fff;font-size:12px;font-weight:600;
                padding:6px 12px;border-radius:8px;text-decoration:none;font-family:'Space Grotesk',sans-serif">
        Open in Google Maps
      </a>
    </div>`;
}

export default function InstitutionsMap({ open = true }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [active, setActive] = useState("benin");

  // When the panel becomes visible, Leaflet must recompute its size,
  // otherwise it renders grey (it was initialised while hidden / 0-width).
  useEffect(() => {
    if (open && mapRef.current) {
      const t = setTimeout(() => mapRef.current.invalidateSize(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    let cancelled = false;

    loadLeaflet().then((L) => {
      if (cancelled || !L || !containerRef.current) return;
      if (mapRef.current) return; // already initialised

      const start = COUNTRIES[active];
      const map = L.map(containerRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView(start.center, start.zoom);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const dot = L.divIcon({
        className: "",
        html:
          '<div style="width:16px;height:16px;border-radius:50%;background:#C05A3C;' +
          'border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      INSTITUTIONS.forEach((inst) => {
        L.marker([inst.lat, inst.lng], { icon: dot })
          .addTo(map)
          .bindPopup(popupHtml(inst));
      });

      // Leaflet can render grey if the container sized after init.
      setTimeout(() => map.invalidateSize(), 200);
    });

    return () => {
      cancelled = true;
    };
  }, []); // init once

  function focusCountry(key) {
    setActive(key);
    const c = COUNTRIES[key];
    if (mapRef.current && c) {
      mapRef.current.flyTo(c.center, c.zoom, { duration: 0.8 });
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Country switcher */}
      <div style={{
        display: "flex", gap: 6, padding: "8px 10px",
        borderBottom: "1px solid var(--border-soft)",
      }}>
        {Object.entries(COUNTRIES).map(([key, c]) => (
          <button
            key={key}
            onClick={() => focusCountry(key)}
            style={{
              flex: 1, padding: "5px 6px", cursor: "pointer",
              borderRadius: "var(--radius)", fontSize: 11, fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              border: "1px solid " + (active === key ? "var(--primary)" : "var(--border)"),
              background: active === key ? "var(--primary)" : "transparent",
              color: active === key ? "#fff" : "var(--text-3)",
              transition: "all 0.12s",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div ref={containerRef} style={{ flex: 1, width: "100%" }} />

      {/* Hint */}
      <div style={{
        padding: "6px 12px", fontSize: 10, color: "var(--text-3)",
        borderTop: "1px solid var(--border-soft)", lineHeight: 1.4,
      }}>
        Tap a marker for contact and directions. Local branches may be closer than the headquarters shown.
      </div>
    </div>
  );
}
