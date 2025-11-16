// ===================================
// Counter Animation
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// Scroll Animations
// ===================================

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation if element has data-count attribute
                const countElement = entry.target.querySelector('[data-count]');
                if (countElement && !countElement.classList.contains('counted')) {
                    countElement.classList.add('counted');
                    const target = parseInt(countElement.getAttribute('data-count'));
                    animateCounter(countElement, target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

// ===================================
// Live Stats Counter Animation
// ===================================

function animateLiveStats() {
    const statNumbers = document.querySelectorAll('.live-stats [data-target]');

    // Delay to start after hero animations
    setTimeout(() => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target, 2500);
        });
    }, 1000);
}

// ===================================
// ROI Calculator
// ===================================

function initializeCalculator() {
    const currentMeetingsSlider = document.getElementById('currentMeetings');
    const dealSizeSlider = document.getElementById('dealSize');
    const closingRateSlider = document.getElementById('closingRate');

    const currentMeetingsValue = document.getElementById('currentMeetingsValue');
    const dealSizeValue = document.getElementById('dealSizeValue');
    const closingRateValue = document.getElementById('closingRateValue');

    function formatCurrency(number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    function calculateROI() {
        const currentMeetings = parseInt(currentMeetingsSlider.value);
        const dealSize = parseInt(dealSizeSlider.value);
        const closingRate = parseInt(closingRateSlider.value) / 100;

        // Update input displays
        currentMeetingsValue.textContent = currentMeetings;
        dealSizeValue.textContent = formatNumber(dealSize);
        closingRateValue.textContent = closingRate * 100;

        // Calculate projected meetings (3x increase)
        const projectedMeetings = currentMeetings * 3;

        // Calculate revenues
        const currentMonthlyRevenue = currentMeetings * dealSize * closingRate;
        const projectedMonthlyRevenue = projectedMeetings * dealSize * closingRate;
        const currentAnnualRevenue = currentMonthlyRevenue * 12;
        const projectedAnnualRevenue = projectedMonthlyRevenue * 12;
        const additionalRevenue = projectedAnnualRevenue - currentAnnualRevenue;

        // Calculate service cost (assume $500 per meeting)
        const serviceInvestment = projectedMeetings * 12 * 500;

        // Calculate net ROI
        const netROI = additionalRevenue - serviceInvestment;
        const roiPercentage = ((additionalRevenue / serviceInvestment) * 100).toFixed(0);

        // Update results
        document.getElementById('projectedMeetings').textContent = projectedMeetings;
        document.getElementById('roiPercentage').textContent = roiPercentage + '%';
        document.getElementById('currentRevenue').textContent = formatCurrency(currentAnnualRevenue);
        document.getElementById('projectedRevenue').textContent = formatCurrency(projectedAnnualRevenue);
        document.getElementById('additionalRevenue').textContent = '+' + formatCurrency(additionalRevenue);
        document.getElementById('serviceInvestment').textContent = formatCurrency(serviceInvestment);
        document.getElementById('netROI').textContent = formatCurrency(netROI);
    }

    // Add event listeners
    if (currentMeetingsSlider) {
        currentMeetingsSlider.addEventListener('input', calculateROI);
        dealSizeSlider.addEventListener('input', calculateROI);
        closingRateSlider.addEventListener('input', calculateROI);

        // Initial calculation
        calculateROI();
    }
}

// ===================================
// FAQ Accordion
// ===================================

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for just '#'
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Calendar Pulse Animation Random Timing
// ===================================

function randomizeCalendarPulse() {
    const bookedDays = document.querySelectorAll('.calendar-day.booked');

    bookedDays.forEach((day, index) => {
        // Random delay between 0-2 seconds
        const delay = Math.random() * 2;
        day.style.animationDelay = `${delay}s`;
    });
}

// ===================================
// Header Scroll Effect
// ===================================

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===================================
// Initialize Everything on DOM Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    handleScrollAnimations();
    animateLiveStats();
    initializeCalculator();
    initializeFAQ();
    initializeSmoothScroll();
    randomizeCalendarPulse();
    handleHeaderScroll();

    // Add loaded class to body for any additional animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===================================
// Performance: Pause animations when tab is not visible
// ===================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});
