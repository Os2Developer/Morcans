import { renderServices } from '../components/ourServicesSection.js';
import { manageBodyScroll } from '../utils/body-scroll.js';
import { renderRequestForm } from '../components/requestForm.js';

const servicesData = [
  {
    title: "Marketing Research and Analytics",
    text: "The secret to marketing success lies in the ability to adapt to constantly changing market trends and needs. Morcans Digital conducts in-depth research and data analysis, enabling businesses to understand their audience, measure marketing campaign effectiveness, and adjust strategy according to changing conditions.",
    img: "../img/marketing-research.png"
  },
  {
    title: "Bespoke Strategic Solutions",
    text: "A competent marketing strategy is the foundation of successful business, and this is where Morcans Digital demonstrates its expertise. Our strategies are not just a set of activities, but carefully crafted plans based on in-depth market analysis, competitive environment, and consumer preferences.",
    img: "../img/bespoke-strategic-solutions.png"
  },
  {
    title: "End-to-End Marketing",
    text: "In today's world, where online presence plays a key role, effective digital marketing becomes an integral part of any brand's strategy. Morcans Digital offers a full range of services in this field: from search engine optimization to social media management, content creation, and advertising campaign management.",
    img: "../img/end-to-end-marketing.png",
    extraImg: "../img/end-to-end-marketing-finger-icon.svg",
    extraImgAlt: "finger-icon"
  },
  {
    title: "Global Market Expansion",
    text: "One of the key aspects of modern business development is its globalization. Morcans Digital offers comprehensive solutions for successful brand promotion abroad, taking into account cultural, linguistic, and market specifics of different countries. The result is successful business development in the international arena.",
    img: "../img/global-market-expansion.png"
  }
];

function initOurPartnersSlider() {
  if(window.innerWidth < 767) {
    $('.our-partners-logo-slider').slick({
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      dots: true,
      arrows: false,
    })
  }
}

function handleHashNavigation() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        const headerHeight = 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderServices(servicesData, 'our-services-container');
  initOurPartnersSlider();
  handleHashNavigation();

  const heroMobileFormPopUp = document.querySelector('.hero-mobile-form-pop-up');
  const heroCreateRequestBtn = document.querySelector('.hero-create-request-btn');
  const heroCloseIcon = heroMobileFormPopUp?.querySelector('.pop-up-close-icon');
  const heroBackArrow = heroMobileFormPopUp?.querySelector('.pop-up-back-arrow');

  // Render mobile form with submission handler
  renderRequestForm('hero-mobile-form-placeholder', true, () => {
    heroMobileFormPopUp.classList.add('hidden');
    manageBodyScroll(heroMobileFormPopUp, 'enable');
  });

  const scrollDownIcon = document.querySelector('.scroll-down');
  const targetSection = document.querySelector('.our-partners');

  if (scrollDownIcon && targetSection) {
    const headerHeight = 30;
    const targetRect = targetSection.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetTop = targetRect.top + scrollTop - headerHeight;
    scrollDownIcon.addEventListener('click', () => {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  }

  if (heroCreateRequestBtn && heroMobileFormPopUp) {
    heroCreateRequestBtn.addEventListener('click', () => {
      heroMobileFormPopUp.classList.remove('hidden');
      document.querySelector('#hero-mobile-form-placeholder .mobile-form').style.display = 'flex';
      manageBodyScroll(heroMobileFormPopUp, 'disable');
    });
  }

  if (heroCloseIcon) {
    heroCloseIcon.addEventListener('click', () => {
      heroMobileFormPopUp.classList.add('hidden');
      manageBodyScroll(heroMobileFormPopUp, 'enable');
    });
  }

  if (heroBackArrow) {
    heroBackArrow.addEventListener('click', () => {
      heroMobileFormPopUp.classList.add('hidden');
      manageBodyScroll(heroMobileFormPopUp, 'enable');
    });
  }
});