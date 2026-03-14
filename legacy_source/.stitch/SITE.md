# Site Vision: After-school Program Portal
This portal provides a unified interface for students, parents, and instructors to manage after-school activities. It includes course enrollment, attendance tracking, 1:1 inquiries, and a personal dashboard.

**Stitch Project ID:** 10554756525812170840

## 1. Core Objectives
- Seamless course browsing and enrollment.
- Secure authentication via Firebase.
- Real-time attendance and progress tracking.
- Professional, airy, and responsive UI consistent with the DESIGN.md.

## 2. Sitemap
| Page Name | Path | Status |
|-----------|------|--------|
| Home | `/index.html` | [x] Functional |
| Login | `/src/login.html` | [x] Functional |
| Signup | `/src/signup.html` | [x] Functional |
| Password Reset | `/src/forgot-password.html` | [x] Functional |
| Course List | `/src/courses.html` | [/] Renaming Needed |
| Course Detail | `/src/course-detail.html` | [x] Functional |
| 1:1 Inquiry | `/src/inquiry.html` | [x] Functional |
| My Page | `/src/mypage.html` | [/] Renaming Needed |
| Notice List | `/src/notice.html` | [x] Functional |
| Admin Dashboard | `/src/admin.html` | [ ] Pending Consolidation |

## 3. Implementation Roadmap
- [ ] **Phase 1: Cleanup & Standardization**
  - Rename `after_school_course_enrollment_list_34b717b7.html` -> `courses.html`.
  - Rename `학생용_마이페이지_576a1e5f.html` -> `mypage.html`.
  - Update all internal links to reflect new paths.
- [ ] **Phase 2: Navigation Syncing**
  - Inject the same header/footer logic into all screens.
  - Fix broken links in footers.
- [ ] **Phase 3: Deep Audit & Fix**
  - Use Playwright to test the full "Signup -> Login -> Enroll -> MyPage" flow.
  - Fix any specific logic breaks in `course-detail.html`.
- [ ] **Phase 4: Final Polish & Deploy**
  - Verify mobile responsiveness.
  - Deploy to Firebase Hosting (or equivalent).

## 4. Current Task (Baton)
The current baton is at `.stitch/next-prompt.md`.
Current Focus: **Cleanup and Linkage Consistency.**
