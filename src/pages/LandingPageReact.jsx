import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookie } from '../util/cookieUtils';
import Tnc from '../components/tnc';
import '../styles/landing-page.css';

function LandingPageReact() {
  const navigate = useNavigate();
  const [tncAccepted, setTncAccepted] = useState(() => {
    if (typeof window !== 'undefined') {
      return getCookie('tncAccepted') === 'true';
    }
    return false;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const activeLineRef = useRef(null);
  const glowBgRef = useRef(null);
  const centerCircleRef = useRef(null);
  const centerContentRef = useRef(null);

  const handleTncAccept = () => {
    window.location.reload();
  };

  if (!tncAccepted) {
    return <Tnc onAccept={handleTncAccept} isLandingPage={true} />;
  }

  // Mobile menu handlers
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.classList.toggle('fix-body');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('fix-body');
  };

  // Menu line animation
  useEffect(() => {
    if (!menuRef.current) return;

    const mainMenu = menuRef.current;
    
    // Create active line element
    const activeLine = document.createElement('span');
    activeLine.className = 'active-line normal-shadow';
    mainMenu.appendChild(activeLine);
    activeLineRef.current = activeLine;

    const updateActiveLine = (element) => {
      if (!activeLine || !element) return;
      const linkWidth = element.offsetWidth;
      const linkLeft = element.offsetLeft;
      activeLine.style.width = `${linkWidth}px`;
      activeLine.style.left = `${linkLeft}px`;
      activeLine.style.opacity = '1';
    };

    const activeLink = mainMenu.querySelector('li.active a');
    if (activeLink) {
      updateActiveLine(activeLink);
    }

    const links = mainMenu.querySelectorAll('li');
    links.forEach((li) => {
      const link = li.querySelector('a');
      if (!link) return;

      link.addEventListener('mouseenter', () => {
        updateActiveLine(link);
      });

      link.addEventListener('mouseleave', () => {
        if (activeLink) {
          updateActiveLine(activeLink);
        } else {
          activeLine.style.opacity = '0';
        }
      });
    });

    return () => {
      if (activeLine && activeLine.parentNode) {
        activeLine.parentNode.removeChild(activeLine);
      }
    };
  }, []);

  // Animate glow lines
  useEffect(() => {
    if (!glowBgRef.current) return;

    const glowBg = glowBgRef.current;
    glowBg.innerHTML = ''; // Clear existing

    const numberOfLines = window.innerWidth < 768 ? 30 : 70;
    const maxHeight = window.innerWidth < 768 ? 250 : 300;
    const minHeight = 80;

    for (let i = 0; i < numberOfLines; i++) {
      const line = document.createElement('div');
      line.classList.add('glowing-image');
      const lineHeight = Math.random() * (maxHeight - minHeight) + minHeight;
      line.style.height = `${lineHeight}px`;
      const topPosition = Math.random() * 420;
      line.style.top = `${topPosition}px`;
      const glowDuration = Math.random() * 2 + 2;
      const shineDuration = Math.random() * 2 + 3;
      const moveDuration = Math.random() + 1;
      line.style.animation = `glow ${glowDuration}s infinite ease-in-out, shine ${shineDuration}s infinite linear, move ${moveDuration}s infinite alternate`;
      glowBg.appendChild(line);
    }
  }, []);

  // Animate center circle
  useEffect(() => {
    if (centerCircleRef.current) {
      setTimeout(() => {
        centerCircleRef.current?.classList.add('animateCircle');
        centerCircleRef.current?.classList.remove('hide-visiblity');
      }, 100);
    }

    if (centerContentRef.current) {
      setTimeout(() => {
        centerContentRef.current?.classList.remove('hide-visiblity');
      }, 1500);
    }
  }, []);

  // Background text animation
  useEffect(() => {
    const backgroundContainer = document.querySelector('#background');
    if (!backgroundContainer) return;

    const text = 'TOKENOMICS';
    const rows = 11;
    const columns = 5;

    backgroundContainer.innerHTML = ''; // Clear existing

    for (let i = 0; i < rows * columns; i++) {
      const span = document.createElement('span');
      span.classList.add('tokenomics-text');
      
      // Odd-even condition for staggered animation
      if (i % 2 === 0) {
        span.classList.add('odd');
      } else {
        span.classList.add('even');
      }

      span.textContent = text;
      backgroundContainer.appendChild(span);
    }
  }, []);

  // Sticky scroll header
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;
    let isHeaderVisible = true;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScrollTop === 0) {
        header.classList.remove('animate-top', 'hidden');
      } else if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        if (isHeaderVisible) {
          header.classList.add('hidden');
          header.classList.remove('animate-top');
          isHeaderVisible = false;
        }
      } else {
        // Scrolling up
        if (!isHeaderVisible) {
          header.classList.remove('hidden');
          header.classList.add('animate-top');
          isHeaderVisible = true;
        }
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page poppins-regular">
      <header className={mobileMenuOpen ? 'active-nav' : ''}>
        <div className="content-area top-navigation-content">
          <nav className="top-navigation">
            <div 
              className={`mobile-menu menu-btn-3 ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
            >
              <span></span><span></span><span></span>
            </div>
            <ul className="menu-links poppins-bold" ref={menuRef}>
              <div className="close-icon-mob" onClick={closeMobileMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="yellow"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <li className="active"><a href="#intro">INTRO</a></li>
              <li><a href="#darkpulse">WHY DARKPULSE</a></li>
              <li><a href="#keyfeature">KEY FEATURES</a></li>
              <li><a href="#tokenomics">TOKENOMICS</a></li>
              <li><a href="#fee">FEE</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://darkpulse.gitbook.io/darkpulse">DOCS</a></li>
            </ul>
            <div className="main-logo">
              <img src="/darkpulse-lp/img/logo.png" alt="Darkpulse Logo" />
            </div>
          </nav>
          <ul className="social-icons">
            <li>
              <a href="https://t.me/darkpulse" target="_blank" rel="noopener noreferrer">
                <img src="/darkpulse-lp/img/ic-1.png" alt="Telegram" />
              </a>
            </li>
            <li>
              <a href="https://x.com/darkpulse" target="_blank" rel="noopener noreferrer">
                <img src="/darkpulse-lp/img/ic2.png" alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xd890ce7f2c4d498749315e15b875a1fd002273e0" target="_blank" rel="noopener noreferrer">
                <img src="/darkpulse-lp/img/ic3.png" alt="DexTools" />
              </a>
            </li>
            <li>
              <a href="https://dexscreener.com/ethereum/0xd890ce7f2c4d498749315e15b875a1fd002273e0" target="_blank" rel="noopener noreferrer">
                <img src="/darkpulse-lp/img/ic4.png" alt="DexScreener" />
              </a>
            </li>
          </ul>
          <Link to="/login" className="login-btn poppins-bold">LOGIN</Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="glow-bg" ref={glowBgRef}></div>
        <div className="content-area">
          <div className="center-section">
            <div className="center-circle hide-visiblity" ref={centerCircleRef}>
              <img src="/darkpulse-lp/img/center-circle.png" alt="Center Circle" />
            </div>
            <div className="center-content hide-visiblity" ref={centerContentRef}>
              <h2>WELCOME TO DARKPULSE</h2>
              <h1 className="anton-regular gradiant-font">
                Revolutionizing Automated Market Making with AI
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="introduction" id="intro">
        <div className="content-area">
          <div className="heading-introduction">
            <div className="bgIntro-img">
              <img src="/darkpulse-lp/img/bgintro.png" alt="Introduction Background" />
            </div>
            <h2 className="anton-regular">INTRODUCTION</h2>
          </div>
          <p>
            At Darkpulse, we believe in transforming the decentralized finance
            (DeFi) landscape through cutting-edge technology. Our mission is to
            empower liquidity providers with advanced AI-driven tools that enhance
            Automated Market Making (AMM) strategies, optimize performance, and
            reduce risks.
          </p>
        </div>
      </section>

      <section className="why-choose" id="darkpulse">
        <div className="content-area">
          <div className="heading-introduction">
            <h3 className="anton-regular why-choose-quest">?</h3>
            <h2 className="anton-regular">Why Choose Darkpulse?</h2>
          </div>

          <div className="flex-containers-od-even">
            <div className="card">
              <div className="image-ico">
                <img src="/darkpulse-lp/img/chip.png" alt="Technology" />
              </div>
              <div className="content-img">
                <h3>Cutting-Edge Technology:</h3>
                <p>
                  Our AI-driven solutions are at the forefront of DeFi innovation,
                  designed to give you a competitive edge in the market.
                </p>
              </div>
            </div>
            <div className="card card-reverse">
              <div className="image-ico">
                <img src="/darkpulse-lp/img/hnd-img.png" alt="Efficiency" />
              </div>
              <div className="content-img">
                <h3>Enhanced Liquidity Efficiency:</h3>
                <p>
                  Maximize your returns with strategies that adapt to market
                  fluctuations, ensuring your liquidity works harder for you.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="image-ico">
                <img src="/darkpulse-lp/img/excmiltry.png" alt="Risk Reduction" />
              </div>
              <div className="content-img">
                <h3>Risk Reduction:</h3>
                <p>
                  Our tools are designed to provide insights that help you
                  navigate the complexities of the DeFi landscape, reducing
                  potential losses and enhancing your trading experience.
                </p>
              </div>
            </div>
            <div className="card card-reverse">
              <div className="image-ico">
                <img src="/darkpulse-lp/img/bulb.png" alt="Opportunities" />
              </div>
              <div className="content-img">
                <h3>Opportunity for Projects:</h3>
                <p>
                  With our AMM Lending feature, projects can efficiently secure
                  liquidity, ensuring they have the resources needed to thrive in
                  the competitive DeFi space.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="image-ico">
                <img src="/darkpulse-lp/img/hnd.png" alt="Community" />
              </div>
              <div className="content-img">
                <h3>Community Focused:</h3>
                <p>
                  Join a vibrant community of like-minded individuals who are
                  passionate about driving the future of finance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose key-features" id="keyfeature">
        <div className="content-area">
          <div className="heading-introduction">
            <h3 className="anton-regular why-choose-quest">
              <img src="/darkpulse-lp/img/key-features.png" alt="Key Features" />
            </h3>
            <h2 className="anton-regular">Key Features</h2>
          </div>

          <div className="card-tiles">
            <div className="card">
              <h3>AI-Powered Price Predictions</h3>
              <p>
                Our state-of-the-art AI algorithms analyze vast datasets to
                forecast price movements and market trends. By leveraging machine
                learning, we help liquidity providers make informed decisions
                about when and where to allocate their assets.
              </p>
            </div>
            <div className="card">
              <h3>Dynamic Liquidity Management</h3>
              <p>
                With Darkpulse, liquidity providers can seamlessly adjust their
                strategies in response to changing market conditions. Our platform
                provides real-time insights and recommendations, allowing users to
                optimize their liquidity provisioning with minimal effort.
              </p>
            </div>
            <div className="card">
              <h3>Impermanent Loss Mitigation</h3>
              <p>
                One of the biggest challenges facing liquidity providers is
                impermanent loss. Our AI-enhanced tools identify potential risks
                and suggest strategies to mitigate them, helping users protect
                their investments and maximize their returns.
              </p>
            </div>
            <div className="card">
              <h3>AMM Lending</h3>
              <p>
                Unlock new opportunities with our AMM Lending feature! Projects
                can lend their AMM liquidity from Darkpulse to initiate their
                AMM for token collateral. This innovative solution allows projects
                to bootstrap liquidity quickly and efficiently, enhancing their
                market presence while providing liquidity providers with
                additional earning potential.
              </p>
            </div>
            <div className="card">
              <h3>User-Friendly Interface</h3>
              <p>
                Our platform is designed for both seasoned DeFi veterans and
                newcomers alike. With an intuitive interface, users can easily
                navigate the complex world of AMMs, access valuable insights, and
                execute strategies without a steep learning curve.
              </p>
            </div>
            <div className="card">
              <h3>Community-Driven Development</h3>
              <p>
                At Darkpulse, we value our community. We actively seek feedback
                and suggestions from our users to continuously improve our
                platform and adapt to the ever-evolving DeFi ecosystem. Together,
                we'll shape the future of liquidity provisioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tocomincs-bg" id="tokenomics">
        <div id="background" className="poppins-black"></div>
        <div className="content-area">
          <div className="center-box">
            <div className="first-con">
              <h2 className="anton-regular">10,000,000</h2>
              <h4>$DARKPULSE</h4>
            </div>
            <ul>
              <li>
                <h3>TRADING TAX</h3>
                <h4>0%</h4>
              </li>
              <li>|</li>
              <li>
                <h3>TRANSFER TAX</h3>
                <h4>0%</h4>
              </li>
            </ul>
            <ul>
              <li>
                <h3>NETWORK</h3>
                <h4>SOL</h4>
              </li>
              <li>|</li>
              <li>
                <h3>MAX WALLET</h3>
                <h4>2%</h4>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ display: 'flex', width: '100%', padding: '10px 0px', background: 'none' }}>
        <img className="desktop-img" style={{ width: '100%' }} src="/darkpulse-lp/img/bgtocl.png" alt="Tokenomics" />
        <img className="mob-img" style={{ width: '100%' }} src="/darkpulse-lp/img/bgtoc_mobl.png" alt="Tokenomics Mobile" />
      </section>

      <section className="below-content why-choose key-features tocomincs-bg">
        <div className="content-area">
          <p>
            The $DARKPULSE token serves as the cornerstone of the Darkpulse
            platform, providing a wide array of utilities that empower users,
            enhance platform functionality, and foster community engagement. Here
            are the key utilities for the $DARKPULSE token:
          </p>

          <div className="card-tiles">
            <div className="card">
              <h3>Fee Discounts</h3>
              <p>
                Users who hold $DARKPULSE tokens will enjoy reduced fees on the
                platform. Whether it's transaction fees, withdrawal fees, or
                lending fees, token holders can benefit from substantial
                discounts, making liquidity provision and utilization more
                cost-effective.
              </p>
            </div>
            <div className="card">
              <h3>Staking Rewards</h3>
              <p>
                $DARKPULSE tokens can be staked on the Darkpulse platform to earn
                attractive rewards. By staking their tokens, users not only
                contribute to the security and stability of the ecosystem but also
                earn additional $DARKPULSE tokens as rewards, incentivizing long-term
                commitment to the project.
              </p>
            </div>
            <div className="card">
              <h3>Access to Premium Features</h3>
              <p>
                Certain advanced features of the Darkpulse platform will be
                exclusive to $DARKPULSE token holders. This includes access to premium
                analytics tools, enhanced AI-driven insights, and priority
                customer support, allowing users to maximize their trading and
                liquidity strategies.
              </p>
            </div>
            <div className="card">
              <h3>AMM Lending Collateral</h3>
              <p>
                Projects can utilize $DARKPULSE tokens as collateral when lending AMM
                liquidity from Darkpulse. This feature provides liquidity to new
                projects while enabling $DARKPULSE holders to participate in the
                growth of emerging DeFi initiatives, creating a symbiotic
                relationship within the ecosystem.
              </p>
            </div>
            <div className="card">
              <h3>Liquidity Mining Incentives</h3>
              <p>
                $DARKPULSE token holders can participate in liquidity mining programs,
                earning rewards for providing liquidity to various pools on the
                platform. These rewards can be distributed in the form of
                additional $DARKPULSE tokens, enhancing the earning potential for
                active participants.
              </p>
            </div>
            <div className="card">
              <h3>Cross-Platform Utility</h3>
              <p>
                As the Darkpulse ecosystem expands, $DARKPULSE tokens will have
                utility across various platforms and partnerships within the DeFi
                space. This interoperability will enhance the token's value and
                usability, creating a robust network of opportunities for holders.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose key-features amm-platform" id="fee">
        <div className="content-area">
          <div className="heading-introduction">
            <h3 className="anton-regular why-choose-quest">
              <img src="/darkpulse-lp/img/icon_hand.png" alt="Fees" />
            </h3>
            <h2 className="anton-regular">Darkpulse AMM Platform Fees</h2>
          </div>

          <div className="card-tiles">
            <div className="card">
              <h3>Trading Fees: <span>1</span></h3>
              <ul>
                <li>Standard Rate: 0.30% per trade</li>
                <li>
                  This fee is competitive with leading AMM platforms and is
                  applied to the total trade volume.
                </li>
              </ul>
            </div>

            <div className="card">
              <h3>Liquidity Provision Fees: <span>2</span></h3>
              <ul>
                <li>
                  Standard Rate: 0.20% per transaction for liquidity providers
                </li>
                <li>
                  This fee applies when users deposit or withdraw liquidity from
                  the pools.
                </li>
              </ul>
            </div>

            <div className="card">
              <h3>Lending Fees (for AMM Lending): <span>3</span></h3>
              <ul>
                <li>Standard Rate: 0.15% on the loan amount per transaction</li>
                <li>
                  This fee applies to projects borrowing liquidity against their
                  token collateral.
                </li>
              </ul>
            </div>

            <div className="card">
              <h3>Withdrawal Fees: <span> 4</span></h3>
              <ul>
                <li>Standard Rate: 0.10% of the total value withdrawn</li>
                <li>
                  This fee is applied when users withdraw their funds from the
                  platform.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="discount-structure">
        <div className="content-area">
          <div className="main-grid">
            <div className="grid-half">
              <div className="percentage">
                <img src="/darkpulse-lp/img/percentage.png" alt="Percentage" />
              </div>
              <div className="maintext anton-regular">
                Discount Structure for $DARKPULSE Holders:
              </div>
              <p>
                To incentivize long-term commitment and community engagement, we offer the following discounts based on the amount of $DARKPULSE tokens held:
              </p>
            </div>
            <div className="grid-half">
              <div className="grid-twoStructure">
                <div className="grid">
                  <h4>TIER 1</h4>
                  <h2>0-999 $DARKPULSE</h2>
                  <p>Discount: 0% (Standard Fees Apply)</p>
                </div>
                <div className="grid">
                  <h4>TIER 2</h4>
                  <h2>1,000 - 4,999 $DARKPULSE</h2>
                  <p>Discount: 10% off all fees</p>
                </div>
                <div className="grid">
                  <h4>TIER 3</h4>
                  <h2>5,000 - 9,999 $DARKPULSE</h2>
                  <p>Discount: 15% off all fees</p>
                </div>
                <div className="grid">
                  <h4>TIER 4</h4>
                  <h2>10,000+ $DARKPULSE</h2>
                  <p>Discount: 20% off all fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="content-area contract-address">
          <h3>CONTRACT ADDRESS</h3>
          <p style={{ color: '#28d7a6' }}>Coming Soon</p>
        </div>
      </section>

      <section className="join-us-journey">
        <div className="content-area yellow-card">
          <h3>Join Us on Our Journey!</h3>
          <div className="inner-con">
            <div className="content">
              <p>
                Are you ready to take your DeFi experience to the next level? 
                join our community discussions, and be among the first to access
                our platform when we launch!
              </p>
              <ul>
                <li>
                  <img src="/darkpulse-lp/img/tw.png" alt="Twitter" />
                  <a href="https://x.com/darkpulse" target="_blank" rel="noopener noreferrer">@darkpulse</a>
                </li>
                <li>
                  <img src="/darkpulse-lp/img/mail.png" alt="Email" />
                  <a href="https://t.co/dEBv2vUHVp" target="_blank" rel="noopener noreferrer">@darkpulse</a>
                </li>
              </ul>
            </div>
            <div className="bl-lemon">
              <img src="/darkpulse-lp/img/blacklemon.png" alt="Black Lemon" />
            </div>
          </div>
        </div>
      </section>

      <section className="join-us-journey bottom-area">
        <div className="content-area yellow-card">
          <div className="inner-con">
            <div className="content">
              <ul>
                <li>
                  <a href="https://t.me/darkpulse" target="_blank" rel="noopener noreferrer">
                    <img src="/darkpulse-lp/img/ic-1.png" alt="Telegram" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/darkpulse" target="_blank" rel="noopener noreferrer">
                    <img src="/darkpulse-lp/img/ic2.png" alt="Twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xd890ce7f2c4d498749315e15b875a1fd002273e0" target="_blank" rel="noopener noreferrer">
                    <img src="/darkpulse-lp/img/ic3.png" alt="DexTools" />
                  </a>
                </li>
                <li>
                  <a href="https://dexscreener.com/ethereum/0xd890ce7f2c4d498749315e15b875a1fd002273e0" target="_blank" rel="noopener noreferrer">
                    <img src="/darkpulse-lp/img/ic4.png" alt="DexScreener" />
                  </a>
                </li>
              </ul>
              <p className="email">
                <a href="mailto:info@darkpulse.bot" className="color-white" target="_blank" rel="noopener noreferrer">
                  info@darkpulse.bot
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Darkpulse. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPageReact;

