# Design System: After-school Program Portal
**Project ID:** 10554756525812170840

## 1. Visual Theme & Atmosphere
The design system of the "After-school Program Portal" is characterized by a "Clean Professional Educational" aesthetic. It emphasizes clarity, trust, and ease of navigation for both parents and students. The interface utilizes a high-contrast layout with generous whitespace (Airy density), creating a modern SaaS-like feel. It supports both Light (default) and Dark modes seamlessly.

## 2. Color Palette & Roles
* **Vibrant Portal Blue (#137fec):** Primary Brand Color. Used for call-to-action buttons, active navigation states, and key highlights.
* **Slate Body Text (#1e293b / Slate-800):** Main Reading Gray. Used for body paragraphs, ensuring high legibility.
* **Subtle Slate Gray (#64748b / Slate-500):** Secondary text. Used for descriptions, sub-headings, and meta-data.
* **Pure Clean White (#ffffff):** Main background for Light mode.
* **Deep Night Slate (#0f172a):** Main background for Dark mode.
* **Border Slate-100 (#f1f5f9):** Used for subtle card borders and structural dividers in Light mode.

## 3. Typography Rules
* **Lexend & Noto Sans KR:** Primary font families. Lexend is used for numeric displays and English branding; Noto Sans KR handles the Korean content with clean, balanced weight.
* **Headlines:** Extrabold (800-900) for Hero sections, Bold (700) for Section titles. Use tight tracking (`tracking-tight`).
* **Body:** Normal (400) weight for descriptions and Medium (500) for navigation links.

## 4. Component Stylings
* **Buttons:** 
  - Shape: Fully Pill-shaped (`rounded-full`).
  - Style: Solid Vibrant Blue with white text for Primary actions. White background with Slate borders for Secondary actions.
  - Hover: Subtle `shadow-xl` expansion and color shifts.
* **Cards/Containers:** 
  - Corners: Large, generous roundness (`rounded-2xl` / ROUND_EIGHT).
  - Background: Flat white in light mode, deep slate in dark mode.
  - Borders: Thin Slate-100 borders (`border`).
  - Shadows: Very soft, diffused blue-tinted shadows (`shadow-primary/10`).
* **Navigation:** 
  - Header: Sticky position with glassmorphism blurred background (`bg-white/80 backdrop-blur-md`).
  - Active State: Vibrant Blue text with bold weight.

## 5. Layout Principles
* **Whitespace:** Strategic use of large top/bottom padding (`py-24`) to separate distinct functional areas.
* **Margins:** Centered max-width containers with lateral margins that expand significantly on desktop (`px-64`).
* **Hierarchy:** Distinct Hero section with center-aligned typography followed by grid-based secondary content sections.

## 6. Design System Notes for Stitch Generation
When generating screens for this project, always:
- Use `rounded-full` for all buttons.
- Apply `rounded-2xl` for all card-like containers.
- Use `primary (#137fec)` for interactive elements.
- Ensure the header uses the sticky glassmorphism style (`bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 border-b`).
- Keep text density low and whitespace high.
- Use the material symbols icon set for all UI actions.
