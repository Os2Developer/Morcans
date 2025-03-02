import { renderServices } from '../components/ourServicesSection.js';

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

document.addEventListener('DOMContentLoaded', () => {
  renderServices(servicesData, 'our-services-container');

  const scrollDownIcon = document.querySelector('.scroll-down');
  const targetSection = document.querySelector('.our-partners');

  if (scrollDownIcon && targetSection) {
    const headerHeight = 30;
    const targetRect = targetSection.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetTop = targetRect.top + scrollTop - headerHeight;

    scrollDownIcon.addEventListener('click', () => {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  } else {
    console.log('Scroll-down icon or target section not found.');
  }
});