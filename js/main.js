import { manageBodyScroll } from '../utils/body-scroll.js';
import { renderRequestForm } from '../components/requestForm.js';

async function loadComponent(targetId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;

    if (targetId === 'header') {
      setupHeaderNavigation();
    }
  } catch (error) {
    console.log('Error loading component:', error);
  }
}

function setupHeaderNavigation() {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      if (window.location.pathname.includes('home.html')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  const navItems = document.querySelectorAll('nav ul li');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (window.location.pathname.includes('home.html')) {
        scrollToSection(targetId);
      } else {
        window.location.href = `home.html#${targetId}`;
      }
    });
  });
}

function scrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = 70;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
}

function setupNavigation(navItems, isMobile) {
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const sectionMap = {
    'Services': 'our-services-container',
    'Advantages': 'our-advantages-container',
    'Clients': 'our-clients-container',
    'Contacts': 'footer'
  };

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = sectionMap[item.textContent.trim()];
      if (isMobile && mobileOverlay) {
        mobileOverlay.classList.add('hidden');
        manageBodyScroll(mobileOverlay, 'enable');
      }
      if (window.location.pathname.includes('home.html')) {
        scrollToSection(targetId);
      } else {
        window.location.href = `home.html#${targetId}`;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('header', '../components/header.html'),
    loadComponent('footer', '../components/footer.html')
  ]);

  const isMobile = window.innerWidth <= 767;
  const menuPopUp = document.getElementById('menu-pop-up');
  const mobileOverlay = document.querySelector('.mobile-menu-pop-up');
  const createRequestBtn = document.querySelector('.create-request-btn');
  const hamburgerBtn = document.getElementById('hamburger-button');
  const backArrow = document.querySelector('.pop-up-back-arrow');
  const mobileCloseIcon = document.querySelector('.pop-up-close-icon');
  const requestMenu = document.querySelector('.pop-up-mobile-btn');
  const mobileMenuHeader = document.querySelector('.mobile-menu-header');
  const mobileMenuContent = document.querySelector('.mobile-menu-content');

  renderRequestForm('menu-pop-up', false, () => {
    menuPopUp.classList.add('hidden');
    manageBodyScroll(menuPopUp, 'enable');
  });

  renderRequestForm('mobile-request-form-placeholder', true, () => {
    mobileOverlay.classList.add('hidden');
    manageBodyScroll(mobileOverlay, 'enable');
    mobileOverlay.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
    mobileOverlay.style.padding = '24px 24px 36px';
    mobileMenuHeader.style.backgroundColor = 'unset';
    mobileMenuHeader.style.padding = 'unset';
    mobileMenuHeader.style.borderRadius = 'unset';
    mobileMenuContent.style.gap = '40px';
    requestMenu.style.display = 'flex';
    $('.mobile-form').fadeOut(300, () => {
      $('.mobile-menu-info').fadeIn(300);
    });
  });

  // Set up close icon with a slight delay to ensure DOM update
  setTimeout(() => {
    const closeIcon = document.querySelector('#menu-pop-up .desktop-pop-up-close-icon');
    if (closeIcon) {
      closeIcon.addEventListener('click', () => {
        menuPopUp.classList.add('hidden');
        manageBodyScroll(menuPopUp, 'enable');
      });
    } else {
      console.error('Close icon not found in #menu-pop-up. Check DOM structure.');
    }
  }, 0);

  if (window.location.hash && window.location.pathname.includes('home.html')) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => scrollToSection(targetId), 500);
  }

  if (createRequestBtn) {
    createRequestBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = menuPopUp.classList.toggle('hidden');
      manageBodyScroll(menuPopUp, isHidden ? 'enable' : 'disable');
    });

    if (isMobile && requestMenu) {
      requestMenu.addEventListener('click', () => {
        $('.mobile-menu-info').fadeOut(300, () => {
          $('.mobile-form').fadeIn(300);
        });
        mobileOverlay.style.backgroundColor = '#FFFFFF';
        mobileOverlay.style.padding = '24px 16px 36px';
        mobileMenuHeader.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
        mobileMenuHeader.style.padding = '6px 12px';
        mobileMenuHeader.style.borderRadius = '12px';
        mobileMenuContent.style.gap = '16px';
        requestMenu.style.display = 'none';
      });
    } else {
      menuPopUp.addEventListener('click', (e) => {
        if (e.target === menuPopUp) {
          menuPopUp.classList.add('hidden');
          manageBodyScroll(menuPopUp, 'enable');
        }
      });
    }
  }

  const navItems = isMobile ? document.querySelectorAll('.mobile-menu-info span') : document.querySelectorAll('nav ul li');
  setupNavigation(navItems, isMobile);

  if (isMobile) {
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', () => {
        mobileOverlay.classList.remove('hidden');
        mobileOverlay.classList.add('open');
        manageBodyScroll(mobileOverlay, 'disable');
      });
    }

    if (backArrow) {
      backArrow.addEventListener('click', () => {
        if ($('.mobile-form').is(':visible')) {
          mobileOverlay.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
          mobileOverlay.style.padding = '24px 24px 36px';
          mobileMenuHeader.style.backgroundColor = 'unset';
          mobileMenuHeader.style.padding = 'unset';
          mobileMenuHeader.style.borderRadius = 'unset';
          mobileMenuContent.style.gap = '40px';
          requestMenu.style.display = 'flex';
          $('.mobile-form').fadeOut(300, () => {
            $('.mobile-menu-info').fadeIn(300);
          });
        } else {
          manageBodyScroll(mobileOverlay, 'enable');
        }
      });
    }

    if (mobileCloseIcon) {
      mobileCloseIcon.addEventListener('click', () => {
        if ($('.mobile-form').is(':visible')) {
          mobileOverlay.style.backgroundColor = 'rgba(20, 20, 22, 0.56)';
          mobileOverlay.style.padding = '24px 24px 36px';
          mobileMenuHeader.style.backgroundColor = 'unset';
          mobileMenuHeader.style.padding = 'unset';
          mobileMenuHeader.style.borderRadius = 'unset';
          mobileMenuContent.style.gap = '40px';
          requestMenu.style.display = 'flex';
          $('.mobile-form').fadeOut(300, () => {
            $('.mobile-menu-info').fadeIn(300);
          });
        } else {
          mobileOverlay.classList.add('hidden');
          manageBodyScroll(mobileOverlay, 'enable');
        }
      });
    }
  }
});