import scrollToSection from './scroll.js';


export function useScroll () {
     function toSection(sectionId) {
    scrollToSection(sectionId);
  }
    function toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function toBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  return {
    toSection,
    toTop,
    toBottom,
  };
}