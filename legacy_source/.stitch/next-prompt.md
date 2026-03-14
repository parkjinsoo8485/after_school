---
page: cleanup-linkage
---
**Objective:** Perform a full audit of all existing screens in the `src/` directory. Clean up cluttered filenames to match the sitemap in `.stitch/SITE.md`. Ensure all navigation links (Header/Footer) correctly point to these new paths.

**Context:** 
We have a project with multiple screen versions (`_34b717b7`, `_576a1e5f`, etc.). We should keep the most functional one as the canonical version (e.g., `courses.html`, `mypage.html`).

**DESIGN SYSTEM (REQUIRED):**
[Attached from .stitch/DESIGN.md Section 6]
- Use `rounded-full` for all buttons.
- Apply `rounded-2xl` for all card-like containers.
- Use `primary (#137fec)` for interactive elements.
- Ensure the header uses the sticky glassmorphism style (`bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 border-b`).
- Keep text density low and whitespace high.
- Use the material symbols icon set for all UI actions.

**Tasks:**
1. Rename `after_school_course_enrollment_list_34b717b7.html` to `src/courses.html`.
2. Rename `학생용_마이페이지_576a1e5f.html` to `src/mypage.html`.
3. Update `index.html` header/footer links.
4. Update all `src/*.html` headers/footers to match the canonical navigation.
5. Verify the "Enrollment" flow works after renaming.
