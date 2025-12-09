import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../util/cookieUtils';
import Tnc from '../components/tnc';

function LandingPage() {
  const navigate = useNavigate();
  // Check TNC acceptance synchronously on initial render
  const [tncAccepted, setTncAccepted] = useState(() => {
    if (typeof window !== 'undefined') {
      return getCookie('tncAccepted') === 'true';
    }
    return false;
  });

  // Handle TNC acceptance callback
  const handleTncAccept = () => {
    // Refresh the page to show landing page content
    window.location.reload();
  };

  // If TNC not accepted, show TNC component
  if (!tncAccepted) {
    return <Tnc onAccept={handleTncAccept} isLandingPage={true} />;
  }

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
        
        // Define injectContent function (must be defined before CSS loading)
        const injectContent = () => {
          // Extract body content and update all paths
          let bodyContent = doc.body.innerHTML;
          
          // CRITICAL: Remove script tags from body content BEFORE injection
          // Scripts will be loaded manually after DOM is ready
          bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
          
          // Update all image paths
          bodyContent = bodyContent.replace(/src="img\//g, 'src="/darkpulse-lp/img/');
          bodyContent = bodyContent.replace(/src='img\//g, "src='/darkpulse-lp/img/");
          
          // Update CSS paths in style tags or links
          bodyContent = bodyContent.replace(/href="css\//g, 'href="/darkpulse-lp/css/');
          bodyContent = bodyContent.replace(/href='css\//g, "href='/darkpulse-lp/css/");
          
          // Inject into container
          const container = document.getElementById('landing-page-container');
          if (!container) {
            console.error('Container #landing-page-container not found!');
            return;
          }
          
          console.log('Injecting HTML content into container...');
          
          // Clear any existing content
          container.innerHTML = '';
          
          // Set page variable before loading scripts
          window.page = "homePage";
          
          // Inject body content (WITHOUT scripts)
          console.log('About to inject HTML. Body content length:', bodyContent.length);
          console.log('Body content preview (first 200 chars):', bodyContent.substring(0, 200));
          
          container.innerHTML = bodyContent;
          
          // Force a reflow to ensure DOM is updated
          void container.offsetHeight;
          
          console.log('HTML content injected. Container children:', container.children.length);
          console.log('Container HTML length:', container.innerHTML.length);
          console.log('First child:', container.firstElementChild?.tagName);
          
          // Verify content was injected
          if (container.children.length === 0) {
            console.error('ERROR: HTML content was not injected! Container is empty.');
            console.error('Container element:', container);
            console.error('Body content was:', bodyContent.substring(0, 500));
            return;
          }
          
          // Double-check that key elements exist
          const testMenu = container.querySelector('.menu-links');
          const testHeader = container.querySelector('header');
          console.log('Key elements check - menu-links:', !!testMenu, 'header:', !!testHeader);
          
          if (!testMenu && !testHeader) {
            console.error('ERROR: Key elements not found after injection!');
            console.error('Container innerHTML preview:', container.innerHTML.substring(0, 500));
          }
            
            // Attach mobile menu handler immediately after injection
            setTimeout(() => {
              const menuBtn = container.querySelector('.menu-btn-3');
              const closeBtn = container.querySelector('.close-icon-mob');
              const header = container.querySelector('header') || document.querySelector('header');
              
              // Function to close menu
              const closeMenu = () => {
                if (menuBtn) menuBtn.classList.remove('active');
                if (header) header.classList.remove('active-nav');
                document.body.classList.remove('fix-body');
              };
              
              // Function to toggle menu
              const toggleMenu = () => {
                if (menuBtn) menuBtn.classList.toggle('active');
                if (header) header.classList.toggle('active-nav');
                document.body.classList.toggle('fix-body');
              };
              
              if (menuBtn) {
                menuBtn.addEventListener('click', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleMenu();
                });
                console.log('Mobile menu button event listener attached');
              }
              
              if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  closeMenu();
                });
                console.log('Close button event listener attached');
              }
              
              // Close menu when clicking on menu links
              const menuLinks = container.querySelectorAll('.menu-links li a');
              menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                  setTimeout(() => {
                    closeMenu();
                  }, 100);
                });
              });
            }, 50);
            
            // Wait for DOM to be fully ready before loading scripts
            // Use multiple checks to ensure HTML is in the DOM
            const waitForDOMAndLoadScripts = () => {
              // Check if container has content
              if (container.children.length === 0) {
                console.log('Waiting for DOM... container is empty, retrying...');
                setTimeout(waitForDOMAndLoadScripts, 100);
                return;
              }
              
              // Check if key elements exist
              const menuLinks = container.querySelector('.menu-links');
              if (!menuLinks) {
                console.log('Waiting for DOM... menu-links not found, retrying...');
                setTimeout(waitForDOMAndLoadScripts, 100);
                return;
              }
              
              console.log('DOM is ready! Container has', container.children.length, 'children');
              console.log('Menu links found:', !!menuLinks);
              
              // Now load scripts after DOM is confirmed ready
              setTimeout(() => {
                // Load JS scripts after DOM is ready
                const loadScript = (src, callback) => {
                  const existingScript = document.querySelector(`script[src="${src}"]`);
                  if (existingScript) {
                    console.log(`Script ${src} already loaded`);
                    if (callback) callback();
                    return;
                  }
                  
                  const script = document.createElement('script');
                  script.src = src;
                  script.onload = () => {
                    console.log(`Script loaded: ${src}`);
                    if (callback) callback();
                  };
                  script.onerror = () => {
                    console.error(`Failed to load script: ${src}`);
                    if (callback) callback(); // Continue even if one fails
                  };
                  document.body.appendChild(script);
                };
                
                // Load scripts sequentially
                console.log('Starting to load scripts...');
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
                                  
                                  // Ensure mobile menu works - attach event listeners directly
                                  const menuBtn = document.querySelector('.menu-btn-3');
                                  if (menuBtn && typeof travelyOprations !== 'undefined') {
                                    // Remove old listener and add new one
                                    const newBtn = menuBtn.cloneNode(true);
                                    menuBtn.parentNode.replaceChild(newBtn, menuBtn);
                                    newBtn.addEventListener('click', function(e) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const header = document.querySelector('header');
                                      newBtn.classList.toggle('active');
                                      if (header) header.classList.toggle('active-nav');
                                      document.body.classList.toggle('fix-body');
                                    });
                                  }
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
                                      line.style.height = lineHeight + 'px';
                                      const topPosition = Math.random() * 420;
                                      line.style.top = topPosition + 'px';
                                      const glowDuration = Math.random() * 2 + 2;
                                      const shineDuration = Math.random() * 2 + 3;
                                      const moveDuration = Math.random() + 1;
                                      line.style.animation = 'glow ' + glowDuration + 's infinite ease-in-out, shine ' + shineDuration + 's infinite linear, move ' + moveDuration + 's infinite alternate';
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
              }, 150); // Additional delay to ensure DOM is fully ready
            };
            
            // Start waiting for DOM and loading scripts
            requestAnimationFrame(() => {
              waitForDOMAndLoadScripts();
            });
        }; // End of injectContent function
        
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
  }, []);

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

