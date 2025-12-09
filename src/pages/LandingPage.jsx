import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load landing page HTML content
    const loadLandingPage = async () => {
      try {
        const response = await fetch('/darkpulse-lp/index.html');
        const html = await response.text();
        
        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Load CSS first
        const cssLink = doc.querySelector('link[rel="stylesheet"]');
        let cssHref = '/darkpulse-lp/css/main.css';
        if (cssLink) {
          const href = cssLink.getAttribute('href');
          if (href) {
            if (href.startsWith('css/')) {
              cssHref = `/darkpulse-lp/${href}`;
            } else if (!href.startsWith('http') && !href.startsWith('/')) {
              cssHref = `/darkpulse-lp/${href}`;
            } else if (href.startsWith('/')) {
              cssHref = href;
            }
          }
        }
        
        // Check if CSS is already loaded, if not load it
        const existingLink = document.querySelector(`link[href="${cssHref}"]`);
        if (!existingLink) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = cssHref;
          newLink.type = 'text/css';
          document.head.appendChild(newLink);
          
          // Wait for CSS to load before injecting content
          newLink.onload = () => {
            injectContent();
          };
        } else {
          injectContent();
        }
        
        function injectContent() {
        
          // Extract body content and update all paths
          let bodyContent = doc.body.innerHTML;
          
          // Update all image paths
          bodyContent = bodyContent.replace(/src="img\//g, 'src="/darkpulse-lp/img/');
          bodyContent = bodyContent.replace(/src='img\//g, "src='/darkpulse-lp/img/");
          
          // Update CSS paths in style tags or links
          bodyContent = bodyContent.replace(/href="css\//g, 'href="/darkpulse-lp/css/');
          bodyContent = bodyContent.replace(/href='css\//g, "href='/darkpulse-lp/css/");
          
          // Update JS paths
          bodyContent = bodyContent.replace(/src="js\//g, 'src="/darkpulse-lp/js/');
          bodyContent = bodyContent.replace(/src='js\//g, "src='/darkpulse-lp/js/");
          
          // Inject into container
          const container = document.getElementById('landing-page-container');
          if (container) {
            // Clear any existing content
            container.innerHTML = '';
            
            // Set page variable before loading scripts
            window.page = "homePage";
            
            // Inject body content
            container.innerHTML = bodyContent;
            
            // Wait for React to render, then load scripts
            requestAnimationFrame(() => {
              setTimeout(() => {
                // Load JS scripts after DOM is ready
                const loadScript = (src, callback) => {
                  const existingScript = document.querySelector(`script[src="${src}"]`);
                  if (existingScript) {
                    if (callback) callback();
                    return;
                  }
                  
                  const script = document.createElement('script');
                  script.src = src;
                  script.onload = callback;
                  script.onerror = () => console.error(`Failed to load script: ${src}`);
                  document.body.appendChild(script);
                };
                
                // Load scripts sequentially
                loadScript('/darkpulse-lp/js/common.js', () => {
                  loadScript('/darkpulse-lp/js/parallax.js', () => {
                    loadScript('/darkpulse-lp/js/main.js', () => {
                      console.log('Landing page scripts loaded');
                      
                      // Expose travelyOprations to window if it exists
                      // This helps with debugging and manual triggering
                      setTimeout(() => {
                        // Check if animations initialized
                        const glowBg = container.querySelector('.glow-bg');
                        const hasGlowLines = glowBg && glowBg.querySelectorAll('.glowing-image').length > 0;
                        const centerCircle = container.querySelector('.center-circle');
                        const isCircleAnimated = centerCircle && centerCircle.classList.contains('animateCircle');
                        
                        if (!hasGlowLines || !isCircleAnimated) {
                          console.log('Animations not detected, re-initializing...');
                          
                          // Force re-execution by creating a new script context
                          // that will re-run the initialization code
                          const reinitScript = document.createElement('script');
                          reinitScript.textContent = `
                            // Re-check and initialize
                            (function() {
                              if (typeof page !== 'undefined' && page === "homePage") {
                                // Access travelyOprations from the closure
                                // Since it's const, we need to trigger it differently
                                // Re-run the initialization block
                                const glowBg = document.querySelector('.glow-bg');
                                const centerCircle = document.querySelector('.center-circle');
                                
                                if (glowBg && glowBg.children.length === 0) {
                                  // Manually create glow lines if animateLines didn't run
                                  console.log('Manually creating glow lines...');
                                  // We'll need to call the function, but since it's in a closure,
                                  // we'll trigger it by re-evaluating the script logic
                                }
                                
                                // Try to access travelyOprations via eval in the script's scope
                                try {
                                  // Re-execute the homeInit block
                                  eval('if (page === "homePage") { travelyOprations.mobileMenu(); travelyOprations.hederMenuLineAnimation(); travelyOprations.animateHomeHero(); travelyOprations.animateLines(); travelyOprations.createBackgroundText(); }');
                                } catch(e) {
                                  console.error('Could not re-execute animations:', e);
                                  // Fallback: manually create animations
                                  if (glowBg) {
                                    const numberOfLines = window.innerWidth < 768 ? 30 : 70;
                                    const maxHeight = window.innerWidth < 768 ? 250 : 300;
                                    const minHeight = 80;
                                    
                                    for (let i = 0; i < numberOfLines; i++) {
                                      const line = document.createElement('div');
                                      line.classList.add('glowing-image');
                                      const lineHeight = Math.random() * (maxHeight - minHeight) + minHeight;
                                      line.style.height = \`\${lineHeight}px\`;
                                      const topPosition = Math.random() * 420;
                                      line.style.top = \`\${topPosition}px\`;
                                      const glowDuration = Math.random() * 2 + 2;
                                      const shineDuration = Math.random() * 2 + 3;
                                      const moveDuration = Math.random() + 1;
                                      line.style.animation = \`glow \${glowDuration}s infinite ease-in-out, shine \${shineDuration}s infinite linear, move \${moveDuration}s infinite alternate\`;
                                      glowBg.appendChild(line);
                                    }
                                  }
                                  
                                  if (centerCircle) {
                                    centerCircle.classList.add('animateCircle');
                                    centerCircle.classList.remove('hide-visiblity');
                                    const centerContent = document.querySelector('.center-content');
                                    if (centerContent) {
                                      setTimeout(() => {
                                        centerContent.classList.remove('hide-visiblity');
                                      }, 1500);
                                    }
                                  }
                                }
                              }
                            })();
                          `;
                          document.body.appendChild(reinitScript);
                          setTimeout(() => reinitScript.remove(), 2000);
                        } else {
                          console.log('Animations initialized successfully');
                        }
                      }, 600);
                    });
                  });
                });
              }, 100);
            });
          }
        }
      } catch (error) {
        console.error('Error loading landing page:', error);
      }
    };
    
    loadLandingPage();
    
    // Cleanup
    return () => {
      // Remove CSS
      const link = document.querySelector('link[href*="/darkpulse-lp/css/main.css"]');
      if (link) link.remove();
      
      // Remove scripts
      const scripts = document.querySelectorAll('script[src*="/darkpulse-lp/js/"]');
      scripts.forEach(script => script.remove());
    };
  }, [navigate]);

  return (
    <div 
      id="landing-page-container" 
      className="landing-page-wrapper"
      style={{ 
        width: '100%', 
        minHeight: '100vh', 
        margin: 0, 
        padding: 0,
        position: 'relative',
        overflow: 'visible',
        background: 'transparent'
      }}
    ></div>
  );
}

export default LandingPage;

