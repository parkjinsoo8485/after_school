import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = 'c:/after_school';
const srcDir = path.join(rootDir, 'src');

const htmlFiles = [
    path.join(rootDir, 'index.html'),
    ...fs.readdirSync(srcDir)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(srcDir, f))
];

const NAVIGATION_LINKS = {
    '홈': '/index.html',
    '수강신청': '/src/courses.html',
    '강좌 목록': '/src/courses.html',
    '공지사항': '/src/notices.html',
    '강사 소개': '/src/instructor-dashboard.html',
    '마이페이지': '/src/mypage.html',
    '회원가입': '/src/signup.html',
    '로그인': '/src/login.html'
};

const CANONICAL_HEADER = `
            <header
                class="flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50 border-b border-slate-50 dark:border-slate-800">
                <div class="flex items-center gap-12">
                    <div class="flex items-center gap-2 text-primary cursor-pointer"
                        onclick="location.href='/index.html'">
                        <span class="material-symbols-outlined text-2xl font-bold">school</span>
                        <h2 class="text-slate-900 dark:text-white text-base font-bold tracking-tight">방과후학교 포털</h2>
                    </div>
                    <nav class="hidden md:flex items-center gap-8">
                        <a class="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/index.html">홈</a>
                        <a class="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/src/courses.html">강좌 목록</a>
                        <a class="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/src/notices.html">공지사항</a>
                        <a class="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="/src/instructor-dashboard.html">강사 소개</a>
                    </nav>
                </div>
                <div class="flex items-center gap-6">
                    <div class="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 w-64">
                        <span class="material-symbols-outlined text-slate-400 text-xl">search</span>
                        <input class="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400" placeholder="강좌 검색..." type="text">
                    </div>
                    <div class="flex items-center gap-4">
                        <span id="auth-user-info" class="text-slate-600 dark:text-slate-300 text-sm font-semibold" style="display:none"></span>
                        <a id="auth-login-btn" href="/src/login.html" class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">로그인</a>
                        <a id="auth-logout-btn" href="#" class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" style="display:none">로그아웃</a>
                        <a id="auth-signup-btn" href="/src/signup.html" class="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">회원가입</a>
                        <a id="auth-mypage-btn" href="/src/mypage.html" class="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all" style="display:none">마이페이지</a>
                    </div>
                </div>
            </header>
`;

const CANONICAL_FOOTER = `
            <footer class="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-16 px-6 md:px-20">
                <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div class="flex flex-col gap-6">
                        <div class="flex items-center gap-2 text-primary">
                            <span class="material-symbols-outlined">school</span>
                            <span class="font-bold text-lg text-slate-900 dark:text-white tracking-tight">방과후학교 포털</span>
                        </div>
                        <p class="text-slate-400 text-sm leading-relaxed">오늘의 배움으로 내일의 리더를 키웁니다.<br>2010년부터 학생들의 미래를 지원하고 있습니다.</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-6">주요 서비스</h4>
                        <ul class="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a class="hover:text-primary transition-colors" href="/src/courses.html">강좌 신청</a></li>
                            <li><a class="hover:text-primary transition-colors" href="/index.html">기관 소개</a></li>
                            <li><a class="hover:text-primary transition-colors" href="/src/notices.html">공지사항</a></li>
                            <li><a class="hover:text-primary transition-colors" href="/src/inquiry-form.html">고객 문의</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-6">고객 지원</h4>
                        <ul class="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <li><a class="hover:text-primary transition-colors" href="/index.html">자주 묻는 질문</a></li>
                            <li><a class="hover:text-primary transition-colors" href="/terms.html">이용 약관</a></li>
                            <li><a class="hover:text-primary transition-colors" href="/privacy.html">개인정보 처리방침</a></li>
                        </ul>
                    </div>
                </div>
                <div class="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-slate-400 text-xs">© 2024 방과후학교 포털 프로그램. All rights reserved.</p>
                    <div class="flex gap-6 text-slate-400">
                        <a class="hover:text-primary" href="/index.html"><span class="material-symbols-outlined text-xl">language</span></a>
                        <a class="hover:text-primary" href="/index.html"><span class="material-symbols-outlined text-xl">alternate_email</span></a>
                    </div>
                </div>
            </footer>
`;

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Standardize Tailwind Primary Color
    if (content.includes('"primary": "#064e3b"')) {
       content = content.replace('"primary": "#064e3b"', '"primary": "#137fec"');
       changed = true;
    }
    if (content.includes('--brand-green: #064e3b')) {
       content = content.replace(/--brand-green: #064e3b/g, '--brand-blue: #137fec');
       content = content.replace(/var\(--brand-green\)/g, '#137fec');
       changed = true;
    }

    // Replace Header
    if (content.includes('<header')) {
        const headerRegex = /<header[^>]*>([\s\S]*?)<\/header>/;
        content = content.replace(headerRegex, CANONICAL_HEADER.trim());
        changed = true;
    }

    // Replace Footer
    if (content.includes('<footer')) {
        const footerRegex = /<footer[^>]*>([\s\S]*?)<\/footer>/;
        content = content.replace(footerRegex, CANONICAL_FOOTER.trim());
        changed = true;
    }


    // Inject Global Auth
    if (!content.includes('/src/lib/global-auth.js')) {
        const authScript = '\n  <script type="module" src="/src/lib/global-auth.js"></script>';
        content = content.replace('</head>', `${authScript}\n</head>`);
        changed = true;
    }

    // Inject Search Logic in inputs if present
    if (content.includes('placeholder="강좌 검색..."') || content.includes('placeholder="강좌 검색"')) {
        if (!content.includes('src="/src/lib/search.js"')) {
            const searchScript = '\n  <script type="module" src="/src/lib/search.js"></script>';
            content = content.replace('</head>', `${searchScript}\n</head>`);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated: ${filePath}`);
    }
});

