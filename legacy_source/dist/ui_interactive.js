// Generic UI Interaction Script for Prototype
document.addEventListener('DOMContentLoaded', () => {
    console.log('UI Interactivity Script Loaded.');

    // 1. Toast Notification System
    const getToastContainer = () => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 10000; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
            document.body.appendChild(container);
        }
        return container;
    };

    window.showToast = (message, type = 'success') => {
        const container = getToastContainer();
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? '#10b981' : '#ef4444';
        toast.style.cssText = `background: ${bgColor}; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.15); opacity: 0; transform: translateY(20px); transition: all 0.3s ease;`;
        toast.innerText = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // 2. Form Submission Prevention
    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
            const text = btn ? btn.innerText.trim() : '처리';
            showToast(`${text}가 완료되었습니다.`);
        });
    });

    // 3. Common Button Actions
    document.querySelectorAll('button, a').forEach((el) => {
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href') !== '#') {
            const href = el.getAttribute('href');
            if (!href.startsWith('/index.html') && !href.startsWith('/src/')) return;
        }

        el.addEventListener('click', function (e) {
            const text = (this.innerText || '').trim().replace(/\s+/g, ' ');

            if (this.tagName === 'A' && this.getAttribute('href') && this.getAttribute('href') !== '#' && !this.getAttribute('href').includes('index.html')) {
                return;
            }

            if (text.includes('목록으로') || text.includes('이전') || text.includes('취소') || text.includes('뒤로가기')) {
                e.preventDefault();
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = '/index.html';
                }
                return;
            }

            const actionKeywords = ['요청하기', '결제하기', '저장', '등록', '완료', '로그인', '회원가입', '보내기', '작성완료', '문의하기'];
            for (const word of actionKeywords) {
                if (text.includes(word)) {
                    e.preventDefault();
                    showToast(`${word.replace('하기', '')}가 성공적으로 처리되었습니다.`);

                    if (word === '로그인' || word === '회원가입' || word === '결제하기') {
                        setTimeout(() => { window.location.href = '/index.html'; }, 1500);
                    }
                    return;
                }
            }
        });
    });

    // 4. Input placeholders action
    document.querySelectorAll('input[type="text"][placeholder*="검색"]').forEach((input) => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                showToast(`'${input.value}' 검색 기능을 처리중입니다.`);
            }
        });
    });

    // 5. Attendance date <-> calendar sync
    const ATTENDANCE_DATE_KEY = 'attendance:selectedDate';
    const CALENDAR_PAGE_NAME = '상세_출결_관리_달력_492abeba.html';

    const parseISODate = (value) => {
        if (!value || typeof value !== 'string') return null;
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) return null;

        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);
        const date = new Date(year, month, day);

        if (Number.isNaN(date.getTime())) return null;
        if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) return null;
        return date;
    };

    const toISODate = (date) => {
        const y = String(date.getFullYear());
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const setDateToQuery = (isoDate) => {
        const url = new URL(window.location.href);
        url.searchParams.set('date', isoDate);
        window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    };

    const getSavedAttendanceDate = () => {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get('date');
        if (parseISODate(fromQuery)) return fromQuery;

        const fromStorage = localStorage.getItem(ATTENDANCE_DATE_KEY);
        if (parseISODate(fromStorage)) return fromStorage;

        return null;
    };

    const saveAttendanceDate = (isoDate) => {
        localStorage.setItem(ATTENDANCE_DATE_KEY, isoDate);
        setDateToQuery(isoDate);
    };

    const getActiveDate = (fallbackDateString) => {
        const saved = getSavedAttendanceDate();
        if (saved) return saved;
        if (parseISODate(fallbackDateString)) return fallbackDateString;
        return toISODate(new Date());
    };

    const patchCalendarLinks = (isoDate) => {
        document.querySelectorAll(`a[href*="${CALENDAR_PAGE_NAME}"]`).forEach((anchor) => {
            const href = anchor.getAttribute('href');
            if (!href) return;
            const url = new URL(href, window.location.origin);
            url.searchParams.set('date', isoDate);
            anchor.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
        });
    };

    const attendanceDateInput = document.querySelector('input[type="date"]');
    if (attendanceDateInput) {
        const initialDate = getActiveDate(attendanceDateInput.value);
        attendanceDateInput.value = initialDate;
        saveAttendanceDate(initialDate);
        patchCalendarLinks(initialDate);

        attendanceDateInput.addEventListener('change', () => {
            const nextDate = attendanceDateInput.value;
            if (!parseISODate(nextDate)) return;
            saveAttendanceDate(nextDate);
            patchCalendarLinks(nextDate);
        });
    }

    const decodedPathname = (() => {
        try {
            return decodeURIComponent(window.location.pathname || '');
        } catch (error) {
            return window.location.pathname || '';
        }
    })();
    const isCalendarPage = decodedPathname.includes(CALENDAR_PAGE_NAME) || (window.location.pathname || '').includes('492abeba');
    if (!isCalendarPage) return;

    const calendarGrid = document.querySelector('.grid.grid-cols-7.border-t.border-l');
    if (!calendarGrid) return;

    const monthNavContainer = Array.from(document.querySelectorAll('div.flex.gap-2')).find((el) => {
        const iconTexts = Array.from(el.querySelectorAll('.material-symbols-outlined')).map((icon) => icon.textContent.trim());
        return iconTexts.includes('chevron_left') && iconTexts.includes('chevron_right');
    });
    if (!monthNavContainer) return;

    const monthLabel = monthNavContainer.querySelector('span.font-bold');
    const navButtons = monthNavContainer.querySelectorAll('button');
    if (!monthLabel || navButtons.length < 2) return;

    const [prevMonthButton, nextMonthButton] = navButtons;
    const yearSelect = document.querySelector('select[data-calendar-year]');
    const calendarMonthSelect = document.querySelector('select[data-calendar-month]');
    const combinedMonthSelect = (!yearSelect || !calendarMonthSelect)
        ? document.querySelector('main select')
        : null;
    const monthDetailTitle = document.querySelector('h3.font-bold.text-lg');

    const topFilterRow = document.querySelector('main .flex.gap-3.w-full.md\\:w-auto') || document.querySelector('main .flex.gap-3.w-full');
    let calendarDateInput = topFilterRow ? topFilterRow.querySelector('input[type="date"]') : null;

    if (topFilterRow && !calendarDateInput) {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative flex-1 md:min-w-48';
        wrapper.innerHTML = '<input type="date" class="w-full h-11 pl-4 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary">';
        topFilterRow.appendChild(wrapper);
        calendarDateInput = wrapper.querySelector('input[type="date"]');
    }

    const dayCells = Array.from(calendarGrid.children).slice(0, 42);
    const templateMonth = (() => {
        const matched = (monthLabel.textContent || '').match(/(\d{4})\D+(\d{1,2})/);
        if (!matched) return { year: 2026, month: 3 };
        return { year: Number(matched[1]), month: Number(matched[2]) };
    })();

    const templateExtrasByDay = new Map();
    dayCells.forEach((cell) => {
        const dayTextMatch = (cell.textContent || '').trim().match(/\b([1-9]|[12][0-9]|3[01])\b/);
        if (!dayTextMatch) return;

        const day = Number(dayTextMatch[1]);
        const cloned = cell.cloneNode(true);

        const firstSpan = cloned.querySelector('span');
        if (firstSpan && /^\d+$/.test((firstSpan.textContent || '').trim())) {
            firstSpan.remove();
        } else {
            cloned.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE && /^\s*\d+\s*$/.test(node.textContent || '')) {
                    node.remove();
                }
            });
        }

        const extras = cloned.innerHTML.trim();
        if (extras) templateExtrasByDay.set(day, extras);
    });

    const ensureYearOptionsRange = (baseYear) => {
        if (!yearSelect || !Number.isFinite(baseYear)) return;
        if (yearSelect.dataset.skipYearExpand === 'true') return;

        const minYear = baseYear - 100;
        const maxYear = baseYear + 100;
        const existing = new Set(
            Array.from(yearSelect.options)
                .map((opt) => Number(opt.value))
                .filter((value) => Number.isFinite(value))
        );

        for (let y = minYear; y <= maxYear; y += 1) {
            if (existing.has(y)) continue;
            const option = document.createElement('option');
            option.value = String(y);
            option.textContent = `${y}년`;
            yearSelect.appendChild(option);
        }

        const sorted = Array.from(yearSelect.options).sort((a, b) => Number(a.value) - Number(b.value));
        yearSelect.innerHTML = '';
        sorted.forEach((opt) => yearSelect.appendChild(opt));
    };

    const renderCalendar = (isoDate) => {
        const selectedDate = parseISODate(isoDate) || new Date();
        const selectedIso = toISODate(selectedDate);
        const year = selectedDate.getFullYear();
        const monthIndex = selectedDate.getMonth();
        const monthNumber = monthIndex + 1;

        const firstDay = new Date(year, monthIndex, 1);
        const startDate = new Date(year, monthIndex, 1 - firstDay.getDay());

        monthLabel.textContent = `${year}.${String(monthNumber).padStart(2, '0')}`;
        if (monthDetailTitle) monthDetailTitle.textContent = `${monthNumber}월 출결 상세 내역`;
        if (calendarDateInput) calendarDateInput.value = selectedIso;

        if (yearSelect) {
            ensureYearOptionsRange(year);
            const yearValue = String(year);
            if (!Array.from(yearSelect.options).some((opt) => opt.value === yearValue)) {
                const newOption = document.createElement('option');
                newOption.value = yearValue;
                newOption.textContent = `${year}년`;
                yearSelect.appendChild(newOption);
            }
            yearSelect.value = yearValue;
        }

        if (calendarMonthSelect) {
            calendarMonthSelect.value = String(monthNumber);
        }

        if (combinedMonthSelect) {
            const foundOption = Array.from(combinedMonthSelect.options).find((opt) => {
                const numbers = (opt.textContent || '').match(/\d+/g);
                if (!numbers || numbers.length < 2) return false;
                return Number(numbers[0]) === year && Number(numbers[1]) === monthNumber;
            });
            if (foundOption) combinedMonthSelect.value = foundOption.value;
        }

        dayCells.forEach((cell, index) => {
            const cellDate = new Date(startDate);
            cellDate.setDate(startDate.getDate() + index);

            const inCurrentMonth = cellDate.getMonth() === monthIndex;
            const day = cellDate.getDate();
            const weekday = cellDate.getDay();
            const isSelected = toISODate(cellDate) === selectedIso;

            cell.classList.remove(
                'ring-2',
                'ring-primary',
                'ring-inset',
                'z-10',
                'bg-primary/5',
                'bg-slate-50/50',
                'dark:bg-slate-800/20',
                'text-slate-400'
            );

            if (!inCurrentMonth) {
                cell.classList.add('bg-slate-50/50', 'dark:bg-slate-800/20', 'text-slate-400');
            }

            const dayLabelTone = weekday === 0 ? 'text-danger' : weekday === 6 ? 'text-primary' : '';
            cell.innerHTML = `<span class="text-sm font-semibold ${dayLabelTone}">${day}</span>`;

            if (inCurrentMonth && year === templateMonth.year && monthNumber === templateMonth.month) {
                const extras = templateExtrasByDay.get(day);
                if (extras) cell.insertAdjacentHTML('beforeend', extras);
            }

            if (isSelected) {
                cell.classList.add('ring-2', 'ring-primary', 'ring-inset', 'z-10', 'bg-primary/5');
            }
        });

        saveAttendanceDate(selectedIso);
        patchCalendarLinks(selectedIso);
    };

    const setMonthWithSelectedDay = (baseIsoDate, delta) => {
        const baseDate = parseISODate(baseIsoDate) || new Date();
        const originalDay = baseDate.getDate();
        const next = new Date(baseDate.getFullYear(), baseDate.getMonth() + delta, 1);
        const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
        next.setDate(Math.min(originalDay, lastDay));
        renderCalendar(toISODate(next));
    };

    const initialCalendarDate = getActiveDate(calendarDateInput ? calendarDateInput.value : null);
    renderCalendar(initialCalendarDate);

    prevMonthButton.addEventListener('click', () => {
        const currentIso = calendarDateInput ? calendarDateInput.value : initialCalendarDate;
        setMonthWithSelectedDay(currentIso, -1);
    });

    nextMonthButton.addEventListener('click', () => {
        const currentIso = calendarDateInput ? calendarDateInput.value : initialCalendarDate;
        setMonthWithSelectedDay(currentIso, 1);
    });

    if (calendarDateInput) {
        calendarDateInput.addEventListener('change', () => {
            if (!parseISODate(calendarDateInput.value)) return;
            renderCalendar(calendarDateInput.value);
        });
    }

    const applyYearMonthSelection = () => {
        if (!yearSelect || !calendarMonthSelect) return;

        const year = Number(yearSelect.value);
        const month = Number(calendarMonthSelect.value);
        if (!Number.isFinite(year) || !Number.isFinite(month)) return;

        const current = parseISODate(calendarDateInput ? calendarDateInput.value : initialCalendarDate) || new Date();
        const lastDay = new Date(year, month, 0).getDate();
        const day = Math.min(current.getDate(), lastDay);
        renderCalendar(toISODate(new Date(year, month - 1, day)));
    };

    if (yearSelect) {
        yearSelect.addEventListener('change', applyYearMonthSelection);

        if (!yearSelect.dataset.wheelBound) {
            yearSelect.addEventListener('wheel', (event) => {
                event.preventDefault();

                const currentYear = Number(yearSelect.value);
                if (!Number.isFinite(currentYear)) return;

                const direction = event.deltaY > 0 ? 1 : -1;
                const nextYear = currentYear + direction;

                ensureYearOptionsRange(nextYear);
                yearSelect.value = String(nextYear);
                applyYearMonthSelection();
            }, { passive: false });
            yearSelect.dataset.wheelBound = 'true';
        }
    }

    if (calendarMonthSelect) {
        calendarMonthSelect.addEventListener('change', applyYearMonthSelection);
    }

    if (combinedMonthSelect) {
        combinedMonthSelect.addEventListener('change', () => {
            const selectedText = combinedMonthSelect.selectedOptions[0] ? combinedMonthSelect.selectedOptions[0].textContent || '' : '';
            const numbers = selectedText.match(/\d+/g);
            if (!numbers || numbers.length < 2) return;

            const year = Number(numbers[0]);
            const month = Number(numbers[1]);
            const current = parseISODate(calendarDateInput ? calendarDateInput.value : initialCalendarDate) || new Date();
            const lastDay = new Date(year, month, 0).getDate();
            const day = Math.min(current.getDate(), lastDay);
            renderCalendar(toISODate(new Date(year, month - 1, day)));
        });
    }
});
