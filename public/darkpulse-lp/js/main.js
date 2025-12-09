const pathname = window.location.pathname;
const travelyOprations = {
  selectors: {
    parallax: ".parallax",
    parallaxBackground: ".parallax-background",
    parallaxElement: ".parallax-content",
    headerMenu: ".menu-links",
    marquee: ".marquee",
    marqueeContent: ".marquee-content",
    storySection: ".story-section",
    swiperSlide: ".swiper-slide",
    centerCircle: ".center-circle",
    centercontent:".center-content"
  },
  settings: {
    hightlightMrnuGap: 0,
  },
  hederMenuLineAnimation: function () {
    let _self = this;
    const mainMenu = document.querySelector(this.selectors.headerMenu);
    if (!mainMenu) {
      console.warn('Menu element not found:', this.selectors.headerMenu);
      return;
    }

    mainMenu.insertAdjacentHTML(
      "beforeend",
      "<span class='active-line normal-shadow'> </span>"
    );
    let $activeLine = mainMenu.querySelector(".active-line");
    let activeliWidth = mainMenu
      ?.querySelector("li.active")
      ?.querySelector("a")?.offsetWidth;
    let activeliWidthLeft = mainMenu
      ?.querySelector("li.active")
      ?.querySelector("a")?.offsetLeft;
    if (activeliWidthLeft > -1) {
      $activeLine.style.width =
        activeliWidth + _self.settings.hightlightMrnuGap + "px";
      $activeLine.style.left = activeliWidthLeft + "px";
      $activeLine.style.opacity = "1";
    }
    const Lists = mainMenu.querySelectorAll("li");
    Lists.forEach(function (ele) {
      ele.addEventListener("mouseover", function (event) {
        $activeLine.style.opacity = "1";
        let linkWidth = event.target.offsetWidth;
        let linkLeft = event.target.offsetLeft;
        $activeLine.style.width =
          linkWidth + _self.settings.hightlightMrnuGap + "px";
        $activeLine.style.left = linkLeft + "px";
      });
      ele.addEventListener("mouseleave", function (event) {
        if (activeliWidthLeft > -1) {
          $activeLine.style.opacity = "1";
          $activeLine.style.width =
            activeliWidth + _self.settings.hightlightMrnuGap + "px";
          $activeLine.style.left = activeliWidthLeft + "px";
        } else {
          $activeLine.style.opacity = "0";
        }
      });
    });
  },
  closeMobileMenu: function () {
    const menuBtn = document.querySelector(".menu-btn-3");
    const header = document.querySelector("header");
    if (menuBtn) menuBtn.classList.remove("active");
    if (header) header.classList.remove("active-nav");
    document.body.classList.remove("fix-body");
  },
  mobileMenu: function () {
    const _self = this;
    
    const menuBtn = document.querySelector(".menu-btn-3");
    if (menuBtn) {
      // Remove any existing listeners by cloning
      const newMenuBtn = menuBtn.cloneNode(true);
      menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
      
      newMenuBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const header = document.querySelector("header");
        newMenuBtn.classList.toggle("active");
        if (header) {
          header.classList.toggle("active-nav");
        }
        document.body.classList.toggle("fix-body");
      });
    }

    const closeBtn = document.querySelector(".close-icon-mob");
    if (closeBtn) {
      // Remove any existing listeners
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
      
      newCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        _self.closeMobileMenu();
      });
    }

    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll(".menu-links li a");
    menuLinks.forEach(function(link) {
      // Remove existing listener and add new one
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener("click", function(e) {
        // Allow default anchor behavior for smooth scrolling
        setTimeout(() => {
          _self.closeMobileMenu();
        }, 100);
      });
    });
  },
  stickyScroll: function () {
    const header = document.querySelector("header");
    let lastScrollTop = 0;
    let isHeaderVisible = true;

    window.addEventListener("scroll", () => {
      let currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop === 0) {
        // At the top of the page
        header.classList.remove("animate-top", "hidden");
      } else if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        if (isHeaderVisible) {
          header.classList.add("hidden");
          header.classList.remove("animate-top");
          isHeaderVisible = false;
        }
      } else {
        // Scrolling up
        if (!isHeaderVisible) {
          header.classList.remove("hidden");
          header.classList.add("animate-top");
          isHeaderVisible = true;
        }
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    });
  },
  storyInit: function () {
    const items = document
      .querySelector(this?.selectors?.storySection)
      ?.querySelectorAll(this?.selectors?.swiperSlide);
    var heights;
    if (window.innerWidth > 500) {
      heights = [420, 320, 450, 490, 320]; // Define your pattern of heights
    } else {
      heights = [260, 220, 270, 300, 220]; //
    }
    items.forEach((item, index) => {
      const height = heights[index % heights.length];
      item.style.height = `${height}px`;
    });

    var swiper = new Swiper(this.selectors.storySection, {
      slidesPerView: 5.5,
      direction: "horizontal",
      loop: true,

      simulateTouch: false,

      autoplay: {
        enabled: true,
        delay: 1,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      spaceBetween: 30,

      freeMode: true,
      mousewheel: {
        releaseOnEdges: true,
        forceToAxis: true,
      },

      followFinger: true,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        320: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 5.5,
          spaceBetween: 20,
        },
      },
    });
  },
  progressbarAnimation: function (currentPrice) {
    const progressBar = document.getElementById("progress-bar");
    const maxPrice = parseFloat(progressBar.getAttribute("data-max-price"));
    const targetPrice = Math.min(currentPrice, maxPrice); // Ensure targetPrice doesn't exceed maxPrice

    // Calculate percentage based on the current price
    const percentage = (targetPrice / maxPrice) * 100;

    // Animate the progress bar
    let width = parseFloat(progressBar.style.width) || 0;
    const interval = setInterval(() => {
      if (width >= percentage) {
        clearInterval(interval);
        progressBar.innerHTML = `<span class="text-price">$${Math.round(
          targetPrice
        )}</span>`;
      } else {
        width += 1; // Increment the width
        progressBar.style.width = width + "%";
      }
    }, 30); // Adjust the interval for smoothness
  },
  htmlFloat: function () {
    class FloatingElements {
      constructor(parentSelector) {
        this.parent = document.querySelector(parentSelector);
        this.elements = Array.from(
          this.parent.querySelectorAll(".float-element")
        ); // Only select elements with the 'float-element' class
        this.startFloating();
      }

      startFloating() {
        this.elements.forEach((el) => {
          el.style.position = "relative";
          const floatDistanceX = el.getAttribute("data-float-distance-x") || 50;
          const floatDistanceY = el.getAttribute("data-float-distance-y") || 50;
          const speed = el.getAttribute("data-speed") || 1;
          this.floatElement(el, floatDistanceX, floatDistanceY, speed);
        });
      }

      floatElement(el, floatDistanceX, floatDistanceY, speed) {
        let directionX = Math.random() > 0.5 ? 1 : -1;
        let directionY = Math.random() > 0.5 ? 1 : -1;

        const animate = () => {
          let x = parseFloat(el.style.left) || 0;
          let y = parseFloat(el.style.top) || 0;

          // Limit the movement in the x direction
          if (Math.abs(x) >= floatDistanceX) {
            directionX *= -1;
          }
          // Limit the movement in the y direction
          if (Math.abs(y) >= floatDistanceY) {
            directionY *= -1;
          }

          x += directionX * speed;
          y += directionY * speed;

          el.style.left = `${x}px`;
          el.style.top = `${y}px`;

          requestAnimationFrame(animate);
        };

        animate();
      }
    }

    // Usage
    document.addEventListener("DOMContentLoaded", () => {
      new FloatingElements(".parent-section");
    });
  },
  animateLines : function() {
    const container = document.querySelector('.glow-bg');
    var numberOfLines;
    var  maxHeight ; 
    if(window.innerWidth < 768) {
       numberOfLines = 30;
       maxHeight = 250;
    } else {
       numberOfLines = 70;
       maxHeight = 300;
    }
    
    const minHeight = 80;
  // Maximum height of each line
    const containerHeight = window.innerHeight;

    // Set min and max top positions
    const minTopPosition = 0; // Minimum top position (from the top of the container)
    const maxTopPosition = 500 - minHeight; // Maximum top position (ensures lines stay visible)

    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.classList.add('glowing-image');

        // Generate a random height between 80px and 300px
        const lineHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        line.style.height = `${lineHeight}px`;

        // Generate a random top position within defined limits
        const topPosition = Math.random() * (maxTopPosition - minTopPosition) + minTopPosition;
        line.style.top = `${topPosition}px`;

        // Generate random animation timings
        const glowDuration = Math.random() * 2 + 2; // Between 2s and 4s
        const shineDuration = Math.random() * 2 + 3; // Between 3s and 5s
        const moveDuration = Math.random() + 1; // Between 1s and 2s

        // Set the animation styles
        line.style.animation = `
            glow ${glowDuration}s infinite ease-in-out,
            shine ${shineDuration}s infinite linear,
            move ${moveDuration}s infinite alternate
        `;

        container.appendChild(line);
    }
  },
  animateHomeHero: function () {
    let centercontent = document.querySelector(this.selectors.centercontent);
    let centerCircle = document.querySelector(this.selectors.centerCircle);
    centerCircle.classList.add("animateCircle");
    centerCircle.classList.remove("hide-visiblity");
    setTimeout(function(){
      centercontent.classList.remove("hide-visiblity");
    },1500)
   

  },
  createBackgroundText: function(){
    const container = document.getElementById('background');
    const text = "TOKENOMICS";
    const rows = 11; // Adjust as needed
    const columns = 5; // Adjust as needed

    for (let i = 0; i < rows * columns; i++) {
        const span = document.createElement('span');
        span.classList.add('tokenomics-text');

        // Odd-even condition
        if (i % 2 === 0) {
            span.classList.add('odd');
        } else {
            span.classList.add('even');
        }

        span.textContent = text;
        container.appendChild(span);
    }
  }
};

//homeInit
if (page === "homePage") {
  travelyOprations.mobileMenu();
  travelyOprations.hederMenuLineAnimation();
  travelyOprations.animateHomeHero();
  travelyOprations.animateLines();
  travelyOprations.createBackgroundText();
  // travelyOprations.storyInit();
  //travelyOprations.htmlFloat();
}
