document.addEventListener('DOMContentLoaded', () => {
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    const scrollbarTrack = document.querySelector('.scrollbar-track');
    const sections = document.querySelectorAll('.block');
    let isDragging = false;
    let startY;
    let startScroll;
    let lastScrollTime = 0;
    const scrollCooldown = 100;
    let currentSection = 0;

    // Обновляем размер ползунка
    function updateScrollbarThumb() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const thumbHeight = (window.innerHeight / totalHeight) * 100;
        scrollbarThumb.style.height = `${Math.max(thumbHeight, 20)}px`;
    }

    // Обновляем позицию ползунка
    function updateScrollbarPosition() {
        // Если есть секции, используем их для расчета позиции
        if (sections.length > 0) {
            const scrollPercentage = (currentSection / (sections.length - 1)) * 100;
            scrollbarThumb.style.top = `${scrollPercentage}%`;
        } else {
            // Иначе используем обычную прокрутку
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollbarThumb.style.top = `${scrollPercentage}%`;
        }
    }

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            currentSection = index;
            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            updateScrollbarPosition();
        }
    }

    // Обработчик прокрутки
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime > scrollCooldown) {
            lastScrollTime = now;
            requestAnimationFrame(updateScrollbarPosition);
        }
    });

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        requestAnimationFrame(() => {
            updateScrollbarThumb();
            updateScrollbarPosition();
        });
    });

    // Обработчики для перетаскивания ползунка
    scrollbarThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        startScroll = currentSection;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaY = e.clientY - startY;
        const sectionHeight = window.innerHeight;
        const sectionDelta = Math.round(deltaY / sectionHeight);
        const newSection = Math.max(0, Math.min(sections.length - 1, startScroll + sectionDelta));
        
        if (newSection !== currentSection) {
            scrollToSection(newSection);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Обработчики для тач-устройств
    scrollbarThumb.addEventListener('touchstart', (e) => {
        isDragging = true;
        startY = e.touches[0].clientY;
        startScroll = currentSection;
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const deltaY = e.touches[0].clientY - startY;
        const sectionHeight = window.innerHeight;
        const sectionDelta = Math.round(deltaY / sectionHeight);
        const newSection = Math.max(0, Math.min(sections.length - 1, startScroll + sectionDelta));
        
        if (newSection !== currentSection) {
            scrollToSection(newSection);
        }
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Наблюдатель за текущей секцией
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSection = Array.from(sections).indexOf(entry.target);
                updateScrollbarPosition();
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Инициализация
    requestAnimationFrame(() => {
        updateScrollbarThumb();
        updateScrollbarPosition();
    });
}); 