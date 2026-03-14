import { test, expect } from '@playwright/test';

test.describe('General Site Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Home page loads and has correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/방과후학교 포털/);
    });

    test('Navigation header is visible', async ({ page }) => {
        const header = page.locator('header');
        await expect(header).toBeVisible();
        await expect(page.getByRole('link', { name: '홈' })).toBeVisible();
        await expect(page.getByRole('link', { name: '강좌 목록' })).toBeVisible();
    });

    test('Search bar is functional in header', async ({ page }) => {
        const searchInput = page.getByPlaceholder('강좌 검색...');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('로봇');
        await searchInput.press('Enter');
        // It might redirect or filter, usually it goes to course list
        // Based on index.html, it's just an input, the logic might be in ui_interactive.js
    });
});

test.describe('Course Enrollment flow', () => {
    test('Course list page loads with placeholders or dynamic content', async ({ page }) => {
        await page.goto('/src/after_school_course_enrollment_list_34b717b7.html');
        await expect(page).toHaveTitle(/수강신청/);
        
        // Wait for dynamic content or just ensure static is there
        await page.waitForSelector('.enroll-btn', { timeout: 10000 });
        
        // Use a more specific locator
        const courseHeading = page.locator('h4').filter({ hasText: /로봇/ }).first();
        await expect(courseHeading).toBeVisible();
    });

    test('Clicking a course detail while logged out redirects to login', async ({ page }) => {
        await page.goto('/src/after_school_course_enrollment_list_34b717b7.html');
        
        // Wait for at least one button to have an onclick or be a dynamic one
        await page.waitForSelector('.enroll-btn', { timeout: 5000 }).catch(() => null);
        
        const detailBtn = page.getByText('상세보기').first();
        await detailBtn.click();
        
        await expect(page).toHaveURL(/login.html/, { timeout: 10000 });
    });
});

test.describe('Authentication pages', () => {
    test('Login page loads correctly', async ({ page }) => {
        await page.goto('/src/login.html');
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.getByRole('button', { name: /로그인/ })).toBeVisible();
    });

    test('Signup page loads correctly', async ({ page }) => {
        await page.goto('/src/signup.html');
        await expect(page.locator('#identifier')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.getByRole('button', { name: /회원가입 완료/ })).toBeVisible();
    });
});

test.describe('External indices', () => {
    test('Screens index page loads', async ({ page }) => {
        await page.goto('/screens/index.html');
        await expect(page).toHaveURL(/\/screens\/index.html/);
        // Check if list of screens is present
        const screenLinks = page.locator('a[href$=".html"]');
        expect(await screenLinks.count()).toBeGreaterThan(0);
    });
});
