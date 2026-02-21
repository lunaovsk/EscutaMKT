import { useEffect, useRef, useState } from "react";

const useReveal = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);

                if (options.once !== false) {
                    observer.disconnect();
                }
            }
        },
        {
            threshold: options.threshold || 0.2,
        }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);
    return { ref, isVisible };
};

export default useReveal;
