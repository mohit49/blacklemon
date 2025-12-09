class Parallax {
    constructor(container) {
      this.container = container;
      this.elements = this.container.querySelectorAll('.parallax-element');
      this.init();
    }
  
    init() {
      window.addEventListener('scroll', () => this.applyParallax());
    }
  
    applyParallax() {
      const containerRect = this.container.getBoundingClientRect();
      const containerOffset = containerRect.top + window.pageYOffset;
  
      this.elements.forEach(element => {
        const scrollY = window.scrollY - containerOffset;
  
        // Get parallax values
        const parallaxX = element.getAttribute('data-parallax-x') || 0;
        const parallaxY = element.getAttribute('data-parallax-y') || 0;
        const parallaxScale = element.getAttribute('data-parallax-scale') || 1;
  
        // Get parallax limits
        const limitX = element.getAttribute('data-parallax-limit-x') || Infinity;
        const limitY = element.getAttribute('data-parallax-limit-y') || Infinity;
        const limitScale = element.getAttribute('data-parallax-limit-scale') || Infinity;
  
        // Calculate translation
        let translateX = scrollY * parallaxX;
        let translateY = scrollY * parallaxY;
  
        // Apply limits to translation
        translateX = Math.min(translateX, limitX);
        translateY = Math.min(translateY, limitY);
  
        // Calculate scale
        let scale = 1 + scrollY * 0.001 * (parallaxScale - 1);
  
        // Apply scale limit
        scale = Math.min(scale, limitScale);
  
        // Apply transformation
        element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      });
    }
  }
 // if(window.innerWidth > 768) {
  document.querySelectorAll('.parallax-container').forEach(container => {
    new Parallax(container);
  });
//}
  