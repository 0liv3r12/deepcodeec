import { useEffect } from 'react';

const ScrollAnimationHandler = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.animate-on-scroll');

        // Activar inmediatamente los que ya están en viewport
        const activate = (el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92) {
                el.classList.add('active');
            }
        };

        elements.forEach(activate);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.08 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return null;
};

export default ScrollAnimationHandler;
