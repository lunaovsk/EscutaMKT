import { useState, useEffect, useCallback, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ 
  items, 
  variant = 'default', 
  itemsPerView = { desktop: 4, tablet: 2, mobile: 1 }, 
  autoPlay = false, 
  autoPlayInterval = 8000, 
  showDots = true, 
  renderItem 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const autoplayTimerRef = useRef(null);
    
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

    // Função para iniciar o autoplay
    const startAutoplay = useCallback(() => {
        if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
        }
        
        if (autoPlay && !isUserInteracting) {
            autoplayTimerRef.current = setInterval(nextSlide, autoPlayInterval);
        }
    }, [autoPlay, isUserInteracting, nextSlide, autoPlayInterval]);

    // Função para parar o autoplay
    const stopAutoplay = useCallback(() => {
        if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
            autoplayTimerRef.current = null;
        }
    }, []);

    // Gerenciar autoplay baseado no estado de interação
    useEffect(() => {
        if (autoPlay) {
            if (!isUserInteracting) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
        }

        return () => {
            stopAutoplay();
        };
    }, [autoPlay, isUserInteracting, startAutoplay, stopAutoplay]);

    // Reiniciar autoplay após 3 segundos sem interação
    const handleUserInteraction = () => {
        setIsUserInteracting(true);
        stopAutoplay();

        // Timer para reativar autoplay após 3 segundos sem interação
        setTimeout(() => {
            setIsUserInteracting(false);
        }, 3000);
    };

    const handleDotClick = (pageIndex) => {
        goToPage(pageIndex);
        handleUserInteraction();
    };

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        handleUserInteraction();
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 40;
        const isRightSwipe = distance < -40;

        if (isLeftSwipe) {
            nextSlide();
            handleUserInteraction();
        }
        if (isRightSwipe) {
            prevSlide();
            handleUserInteraction();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    // Pausar autoplay quando o mouse entra no carrossel
    const onMouseEnter = () => {
        if (autoPlay) {
            stopAutoplay();
        }
    };

    // Retomar autoplay quando o mouse sai do carrossel
    const onMouseLeave = () => {
        if (autoPlay && !isUserInteracting) {
            startAutoplay();
        }
    };

    return (
        <div 
            className={`carousel-container carousel-${variant}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
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
                            onClick={() => handleDotClick(index)}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            aria-label={`Ir para página ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;