import { validateName, validateEmail, validatePhone, validateServiceSelection } from '../utils/validation.js';

function generateRequestFormHtml(isMobile) {
  const wrapperClass = isMobile ? 'mobile-form' : 'menu-pop-up-content';
  const wrapperStyle = isMobile ? 'display: none;' : '';

  // Contact form classes: base class plus mobile variant if applicable
  const contactFormClass = isMobile ? 'pop-up-contact-form pop-up-contact-form-mobile' : 'pop-up-contact-form';

  // Button classes: base class plus mobile variant if applicable
  const buttonClass = isMobile ? 'contact-form-button contact-form-button-mobile' : 'contact-form-button';

  // Input class suffix: add '-mobile' for mobile inputs
  const inputSuffix = isMobile ? '-mobile' : '';

  // Close icon: include only for desktop
  const closeIconHtml = isMobile ? '' : `
    <img src="../img/desktop-pop-up-close-icon.svg" alt="desktop-pop-up-close-icon" class="desktop-pop-up-close-icon">
  `;

  return `
    <div class="${wrapperClass}" style="${wrapperStyle}">
      <div class="menu-pop-up-close-block">
        <span>Create Request</span>
        ${closeIconHtml}
      </div>
      <div class="pop-up-info-block">
        <img src="../img/pop-up-info-block-letter.svg" alt="pop-up-info-block-letter">
        <div>
          <span class="pop-up-info-block-title">Would you like to become our client?</span>
          <span class="pop-up-info-block-text">
            Leave a request and our team of marketing experts will contact you
            to discuss strategies to promote your business.
          </span>
        </div>
      </div>
      <div class="${contactFormClass}">
        <div class="form-input-block">
          <label class="form-label">Your Full Name</label>
          <input type="text" class="form-input fullName${inputSuffix}" placeholder="Sara Biverman">
          <span class="error fullNameError"></span>
        </div>
        <div class="form-input-block">
          <label class="form-label">Email</label>
          <input type="email" id="email" class="form-input email${inputSuffix}" placeholder="example@mail.com">
          <span class="error emailError"></span>
        </div>
        <div class="form-input-block">
          <label class="form-label">Phone</label>
          <input type="tel" id="phone" class="form-input phone${inputSuffix}" placeholder="Type your mobile number">
          <span class="error phoneError"></span>
        </div>
        <div class="form-input-block">
          <label class="form-label">Your Company</label>
          <input type="text" id="company" class="form-input" placeholder="Type...">
        </div>
        <div class="form-input-block">
          <label class="form-label">Select Required Services</label>
          <select class="form-input service${inputSuffix}">
            <option class="service-option" value="Select Type">Select Type</option>
            <option class="service-option" value="Marketing Research">Marketing Research</option>
            <option class="service-option" value="Strategic Solutions">Strategic Solutions</option>
            <option class="service-option" value="End-to-End Marketing">End-to-End Marketing</option>
            <option class="service-option" value="Global Market Expansion">Global Market Expansion</option>
          </select>
          <span class="error serviceError"></span>
        </div>
        <div class="${buttonClass}" role="button" tabindex="0">
          <span>Send Request</span>
        </div>
      </div>
    </div>
  `;
}

export function validateForm(formContainer, isMobileForm) {
  const inputSuffix = isMobileForm ? '-mobile' : '';
  const name = formContainer.querySelector(`.fullName${inputSuffix}`)?.value || '';
  const email = formContainer.querySelector(`.email${inputSuffix}`)?.value || '';
  const phone = formContainer.querySelector(`.phone${inputSuffix}`)?.value || '';
  const service = formContainer.querySelector(`.service${inputSuffix}`)?.value || '';

  // Clear previous error messages
  formContainer.querySelectorAll('.error').forEach(error => {
    error.textContent = '';
    error.style.display = 'none';
  });

  let isValid = true;

  if (!validateName(name)) {
    formContainer.querySelector('.fullNameError').textContent = 'Please enter your full name.';
    formContainer.querySelector('.fullNameError').style.display = 'block';
    isValid = false;
  }
  if (!validateEmail(email)) {
    formContainer.querySelector('.emailError').textContent = 'Please enter a valid email address.';
    formContainer.querySelector('.emailError').style.display = 'block';
    isValid = false;
  }
  if (!validatePhone(phone)) {
    formContainer.querySelector('.phoneError').textContent = 'Please enter a valid phone number (at least 10 digits).';
    formContainer.querySelector('.phoneError').style.display = 'block';
    isValid = false;
  }
  if (!validateServiceSelection(service)) {
    formContainer.querySelector('.serviceError').textContent = 'Please select a required service.';
    formContainer.querySelector('.serviceError').style.display = 'block';
    isValid = false;
  }

  return isValid;
}

export function restrictToLettersAndSpaces(input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  });
}

export function restrictToDigits(input, maxLength) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
  });
}

function attachButtonListeners(button, formContainer, onSubmit) {
  button.addEventListener('click', () => {
    if (validateForm(formContainer, formContainer.classList.contains('pop-up-contact-form-mobile'))) {
      onSubmit();
    }
  });
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (validateForm(formContainer, formContainer.classList.contains('pop-up-contact-form-mobile'))) {
        onSubmit();
      }
    }
  });
}

export function renderRequestForm(containerId, isMobile, onSubmit) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.log(`Container with id "${containerId}" not found.`);
    return;
  }

  container.innerHTML = generateRequestFormHtml(isMobile);

  const formContainer = container.querySelector('.pop-up-contact-form');
  const button = container.querySelector('.contact-form-button');
  const fullNameInput = container.querySelector(`.fullName${isMobile ? '-mobile' : ''}`);
  const phoneInput = container.querySelector(`.phone${isMobile ? '-mobile' : ''}`);

  if (fullNameInput) restrictToLettersAndSpaces(fullNameInput);
  if (phoneInput) restrictToDigits(phoneInput, 10);

  if (button && formContainer) {
    attachButtonListeners(button, formContainer, onSubmit);
  }
}