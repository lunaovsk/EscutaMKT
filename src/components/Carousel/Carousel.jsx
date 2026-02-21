import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Carousel.css';

const Carousel = ({ items, variant = 'default', itemsPerView = { desktop: 4, tablet: 2, mobile: 1 }, autoPlay = false, autoPlayInterval = 5000, showArrows = true, showDots = true, renderItem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    useEffect(() => {
        const handleResize = () => {
        const width = window.innerWidth;
            if (width <= 640) {
                setItemsPerPage(itemsPerView.mobile);
            } else if (width <= 1024) {
                setItemsPerPage(itemsPerView.tablet);
            } else {
                setItemsPerPage(itemsPerView.desktop);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itemsPerView]);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => 
        prev + itemsPerPage >= items.length ? 0 : prev + itemsPerPage
        );
    }, [items.length, itemsPerPage]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => 
        prev - itemsPerPage < 0 ? Math.max(0, items.length - itemsPerPage) : prev - itemsPerPage
        );
    }, [items.length, itemsPerPage]);

    const goToPage = (pageIndex) => {
        setCurrentIndex(pageIndex * itemsPerPage);
    };

    useEffect(() => {
        let interval;
        if (autoPlay) {
            interval = setInterval(nextSlide, autoPlayInterval);
        }
        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, nextSlide]);

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
        nextSlide();
        }
        if (isRightSwipe) {
        prevSlide();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className={`carousel-container carousel-${variant}`}>
        <div 
            className="carousel-track-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div 
            className="carousel-track"
            style={{
                transform: `translateX(-${(currentIndex / items.length) * 100}%)`,
                width: `${(items.length / itemsPerPage) * 100}%`
            }}
            >
            {items.map((item, index) => (
                <div 
                key={index} 
                className="carousel-slide"
                style={{ width: `${100 / items.length}%` }}
                >
                {renderItem(item, index)}
                </div>
            ))}
            </div>
        </div>

        {showDots && totalPages > 1 && (
            <div className="carousel-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                key={index}
                className={`carousel-dot ${Math.floor(currentIndex / itemsPerPage) === index ? 'active' : ''}`}
                onClick={() => goToPage(index)}
                aria-label={`Ir para página ${index + 1}`}
                />
            ))}
            </div>
        )}
        </div>
    );
};

export default Carousel;