
<!-- Componente genérico para ícones no estilo SF Symbols desenhados em SVG. -->
<template>
  
  <!-- O SVG recebe tamanho e acessibilidade por props. -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="!label"
    :aria-label="label || undefined"
    role="img"
    class="sf-icon"
  >
    
    <!-- Os paths são injetados a partir do mapa de ícones abaixo. -->
    <g v-html="paths" />
  </svg>
</template>

<script setup>
// Computed resolve o SVG certo quando muda o nome do ícone.
import { computed } from 'vue'
// Props públicas do componente.
const props = defineProps({
  // Nome simbólico do ícone.
  name:  { type: String,           required: true  },
  // Tamanho em píxeis ou unidade CSS.
  size:  { type: [Number, String], default: 20     },
  // Label opcional; se não existir, o ícone fica escondido de leitores de ecrã.
  label: { type: String,           default: null   },
})
// Mapa local de ícones: evita depender de uma biblioteca externa para símbolos pontuais.
const ICONS = {
  // Pesquisa e filtros.
  'magnifyingglass':
    `<circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.6"/>
     <path d="M15.5 15.5 20 20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>`,
  'line.3.horizontal.decrease.circle':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <path d="M7 9h10M8.5 12h7M10 15h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'line.3.horizontal.decrease.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M7 9h10M8.5 12h7M10 15h4" stroke="white" stroke-width="1.4" stroke-linecap="round"/>`,
  'slider.horizontal.3':
    `<path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
     <circle cx="8"  cy="6.5"  r="2.2" fill="white" stroke="currentColor" stroke-width="1.4"/>
     <circle cx="16" cy="12"   r="2.2" fill="white" stroke="currentColor" stroke-width="1.4"/>
     <circle cx="10" cy="17.5" r="2.2" fill="white" stroke="currentColor" stroke-width="1.4"/>`,
  // Estados de confirmação, erro, aviso e informação.
  'magnifyingglass.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <circle cx="11" cy="10.5" r="4.5" stroke="white" stroke-width="1.5"/>
     <path d="M14 13.5 16.5 16" stroke="white" stroke-width="1.6" stroke-linecap="round"/>`,
  'checkmark.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M6 12.5 9.5 16 18 8" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  'checkmark.circle':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <path d="M7 12.5 10.5 16 17 8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  'checkmark':
    `<path d="M4 12.5 9 17.5 20 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  'xmark':
    `<path d="M5 5 19 19M19 5 5 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  'xmark.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M8 8 16 16M16 8 8 16" stroke="white" stroke-width="1.6" stroke-linecap="round"/>`,
  'xmark.octagon.fill':
    `<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86z" fill="currentColor"/>
     <path d="M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5" stroke="white" stroke-width="1.75" stroke-linecap="round"/>`,
  'exclamationmark.triangle.fill':
    `<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="currentColor"/>
     <path d="M12 9.5v4.5" stroke="white" stroke-width="1.75" stroke-linecap="round"/>
     <circle cx="12" cy="17" r="1" fill="white"/>`,
  'exclamationmark.triangle':
    `<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <path d="M12 9.5v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
     <circle cx="12" cy="17" r="1" fill="currentColor"/>`,
  'info.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M12 8v.5" stroke="white" stroke-width="1.7" stroke-linecap="round"/>
     <path d="M12 11 12 16" stroke="white" stroke-width="1.7" stroke-linecap="round"/>`,
  'info.circle':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <path d="M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
     <path d="M12 11 12 16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  // Navegação, reposição e exportação.
  'nosign':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <path d="M5.05 5.05 18.95 18.95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  'arrow.down.to.line':
    `<path d="M12 3v13" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/>
     <path d="M6 11 12 17 18 11" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M4 21h16" stroke="currentColor" stroke-width="1.65" stroke-linecap="round"/>`,
  'square.and.arrow.down':
    `<path d="M9 12 12 15 15 12M12 15V6" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M5 15v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" stroke="currentColor" stroke-width="1.55" stroke-linecap="round"/>`,
  'arrow.up.doc':
    `<path d="M5 12.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
     <path d="M12 15V4M8 8l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  'chevron.right':
    `<path d="M9 5 16 12 9 19" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>`,
  'chevron.left':
    `<path d="M15 5 8 12 15 19" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>`,
  'chevron.down':
    `<path d="M5 9 12 16 19 9" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>`,
  'chevron.up':
    `<path d="M5 15 12 8 19 15" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>`,
  'chevron.up.chevron.down':
    `<path d="M7.5 9 12 4.5 16.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M7.5 15 12 19.5 16.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'arrow.right':
    `<path d="M4 12h16M13 5 20 12 13 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  'arrow.left':
    `<path d="M20 12H4M11 5 4 12 11 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  'arrow.counterclockwise':
    `<path d="M4.5 8A8 8 0 1 1 4 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
     <path d="M2 5.5 4.5 8.5 7.5 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  'arrow.counterclockwise.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M7.5 10A5 5 0 1 1 7 12.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
     <path d="M5.5 7.5 7.5 10 9.5 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  // Gráficos e documentos.
  'chart.bar.fill':
    `<rect x="3"  y="13" width="4" height="8"  rx="1" fill="currentColor"/>
     <rect x="10" y="8"  width="4" height="13" rx="1" fill="currentColor"/>
     <rect x="17" y="3"  width="4" height="18" rx="1" fill="currentColor"/>`,
  'chart.bar':
    `<path d="M3 21V13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10 21V8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M17 21V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'chart.line.uptrend.xyaxis':
    `<path d="M3 20 8 13 12 16.5 17 8 21.5 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M3 21h18" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'chart.pie.fill':
    `<path d="M12 2a10 10 0 1 0 10 10H12z" fill="currentColor"/>
     <path d="M12 2v10h10A10 10 0 0 0 12 2z" fill="currentColor" opacity=".5"/>`,
  'doc.text':
    `<path d="M5 2h9.5L19 6.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <path d="M14.5 2 14.5 7H19" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
     <path d="M8 11h8M8 14.5h8M8 18h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'doc.text.magnifyingglass':
    `<path d="M4 3h10.5L18 6.5V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
     <path d="M14.5 3 14.5 7H18" stroke="currentColor" stroke-width="1.2"/>
     <path d="M6 9.5h8M6 12.5h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
     <circle cx="17" cy="19" r="3.2" stroke="currentColor" stroke-width="1.4"/>
     <path d="M19.5 21.5 22 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  'list.bullet':
    `<circle cx="4.5" cy="7"   r="1.5" fill="currentColor"/>
     <circle cx="4.5" cy="12"  r="1.5" fill="currentColor"/>
     <circle cx="4.5" cy="17"  r="1.5" fill="currentColor"/>
     <path d="M9 7h11M9 12h11M9 17h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  'book.closed':
    `<path d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.5"/>
     <path d="M4 19h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
     <path d="M12 2v17" stroke="currentColor" stroke-width="1.3"/>`,
  'book.closed.fill':
    `<path d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="currentColor"/>
     <path d="M4 20h16" stroke="white" stroke-width="1.4" stroke-linecap="round"/>`,
  // Pessoas, localização e contexto geográfico.
  'person':
    `<circle cx="12" cy="7"  r="4" stroke="currentColor" stroke-width="1.5"/>
     <path d="M2 21v-1a10 10 0 0 1 20 0v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  'person.2.fill':
    `<circle cx="7.5" cy="8" r="4" fill="currentColor"/>
     <path d="M0 21v-1a7.5 7.5 0 0 1 15 0v1" fill="currentColor"/>
     <circle cx="17" cy="8" r="3.5" stroke="currentColor" stroke-width="1.4"/>
     <path d="M19.5 21v-1a6.5 6.5 0 0 0-5-6.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'person.text.rectangle':
    `<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
     <circle cx="8" cy="10" r="2.5" stroke="currentColor" stroke-width="1.3"/>
     <path d="M6 15.5a4 4 0 0 1 4 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
     <path d="M14 9h5M14 13h5M14 17h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'globe':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="currentColor" stroke-width="1.2"/>
     <path d="M2 12h20M4.5 7h15M4.5 17h15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`,
  'map.fill':
    `<path d="M1 6 8 3 16 6 23 3v15l-7 3-8-3-7 3V6z" fill="currentColor"/>`,
  'map':
    `<path d="M1 6 8 3l8 3 7-3v15l-7 3-8-3-7 3V6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <path d="M8 3v15M16 6v15" stroke="currentColor" stroke-width="1.3"/>`,
  'location.fill':
    `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
     <circle cx="12" cy="9" r="2.5" fill="white"/>`,
  // Financiamento, calendário e tempo.
  'eurosign.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M15.5 8.5a6 6 0 1 0 0 7" stroke="white" stroke-width="1.55" stroke-linecap="round"/>
     <path d="M7.5 11h7M7.5 13h7" stroke="white" stroke-width="1.55" stroke-linecap="round"/>`,
  'eurosign.circle':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <path d="M15 8.5a5 5 0 1 0 0 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
     <path d="M7.5 11h7M7.5 13h7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'banknote':
    `<rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
     <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.3"/>
     <path d="M6 9v6M18 9v6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'creditcard.fill':
    `<rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor"/>
     <path d="M2 10h20" stroke="white" stroke-width="1.6"/>
     <rect x="5" y="14" width="4" height="2" rx=".5" fill="white" opacity=".6"/>`,
  'calendar':
    `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
     <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
     <circle cx="8"  cy="15" r="1" fill="currentColor"/>
     <circle cx="12" cy="15" r="1" fill="currentColor"/>
     <circle cx="16" cy="15" r="1" fill="currentColor"/>`,
  'clock':
    `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
     <path d="M12 7v5l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  // Pilares, entidades e outros símbolos decorativos.
  'leaf.fill':
    `<path d="M21 3C21 3 13 3 9 7C5 11 5 17 6 19C9 19 15 19 19 15C23 11 21 3 21 3z" fill="currentColor"/>
     <path d="M5 19 3 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  'cpu.fill':
    `<rect x="6"  y="6"  width="12" height="12" rx="2" fill="currentColor"/>
     <path d="M9 2v4M12 2v4M15 2v4M9 18v4M12 18v4M15 18v4M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'arrow.up.right.circle.fill':
    `<circle cx="12" cy="12" r="12" fill="currentColor"/>
     <path d="M8 16 16 8M16 8H9M16 8v7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'heart.fill':
    `<path d="M12 21C12 21 3 14.5 3 8.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3C21 14.5 12 21 12 21z" fill="currentColor"/>`,
  'person.3.fill':
    `<circle cx="4"  cy="9" r="3" fill="currentColor"/>
     <circle cx="12" cy="9" r="3" fill="currentColor"/>
     <circle cx="20" cy="9" r="3" fill="currentColor"/>
     <path d="M0 20v-1a4 4 0 0 1 8 0v1" fill="currentColor"/>
     <path d="M8 20v-1a4 4 0 0 1 8 0v1" fill="currentColor"/>
     <path d="M16 20v-1a4 4 0 0 1 8 0v1" fill="currentColor"/>`,
  'star.fill':
    `<path d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26z" fill="currentColor"/>`,
  'sparkles':
    `<path d="M12 3 13.5 7.5 18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
     <path d="M5 18.5 5.75 20.25 7.5 21l-1.75.75L5 23.5l-.75-1.75L2.5 21l1.75-.75z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
     <path d="M19 14 19.6 15.4 21 16l-1.4.6L19 18l-.6-1.4L17 16l1.4-.6z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>`,
  'flag.fill':
    `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="currentColor"/>
     <path d="M4 22V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  'flag':
    `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <path d="M4 22V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  'building.columns.fill':
    `<path d="M2 21h20v-2H2zM4 9h16v10H4zM12 2 2 7h20z" fill="currentColor"/>
     <rect x="6"  y="9" width="2" height="10" fill="white" opacity=".3"/>
     <rect x="11" y="9" width="2" height="10" fill="white" opacity=".3"/>
     <rect x="16" y="9" width="2" height="10" fill="white" opacity=".3"/>`,
  'building.2.fill':
    `<path d="M5 5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16H5z" fill="currentColor"/>
     <path d="M13 9h4a1 1 0 0 1 1 1v11h-5z" fill="currentColor" opacity=".75"/>
     <path d="M2 21h20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
     <path d="M8 9v.1M8 12v.1M8 15v.1M10 9v.1M10 12v.1M10 15v.1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>`,
  'arrow.triangle.2.circlepath':
    `<path d="M4.93 4.93A10 10 0 0 1 19 5M4 12a8 8 0 0 0 8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
     <path d="M20 12a8 8 0 0 0-8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
     <path d="M2 5 4.93 4.93 5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M22 19 19.07 19.07 19 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'externaldrive.connected.to.line.below':
    `<rect x="4" y="3" width="16" height="8" rx="2" stroke="currentColor" stroke-width="1.5"/>
     <circle cx="15" cy="7" r="1" fill="currentColor"/>
     <path d="M12 11v3M8 14h8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
     <rect x="7" y="14" width="10" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
     <circle cx="14.5" cy="17" r=".8" fill="currentColor"/>`,
  'bell.fill':
    `<path d="M18 16H6l1.5-1.5V10a4.5 4.5 0 0 1 9 0v4.5z" fill="currentColor"/>
     <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'trash':
    `<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'tag.fill':
    `<path d="M12.58 2H3a1 1 0 0 0-1 1v9.58a1 1 0 0 0 .29.71l9.42 9.42a2 2 0 0 0 2.83 0l7.17-7.17a2 2 0 0 0 0-2.83z" fill="currentColor"/>
     <circle cx="7" cy="8" r="1.5" fill="white"/>`,
}
// Se o nome não existir no mapa, mostra um ícone de fallback com ponto de interrogação.
const paths = computed(() => ICONS[props.name]
  ?? `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3" opacity=".5"/>
      <text x="12" y="16" text-anchor="middle" font-size="8" fill="currentColor" opacity=".5">?</text>`)
</script>

<style>

/* Mantém o ícone alinhado com texto e impede encolhimento em flexbox. */
.sf-icon { display: inline-block; vertical-align: middle; flex-shrink: 0; }
</style>
