/* Contact form validation + submission handling for contactpage.html */
(function () {
  'use strict';

  const form = document.getElementById('wp-contact-form');
  if (!form) return;

  const status = document.getElementById('wp-contact-status');
  const TO_EMAIL = 'dior.zaverdino@gmail.com'; // same address as the mailto link on the page

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation rules per field name. Each returns an error string, or '' when valid.
  const rules = {
    name: (v) => (v.trim() ? '' : 'Please enter your name.'),
    email: (v) => {
      if (!v.trim()) return 'Please enter your email.';
      return EMAIL_RE.test(v.trim()) ? '' : 'Please enter a valid email address.';
    },
    subject: (v) => (v ? '' : 'Please pick a subject.'),
    message: (v) => {
      const t = v.trim();
      if (!t) return 'Please write a message.';
      return t.length < 10 ? 'Message should be at least 10 characters.' : '';
    }
  };

  function fieldEl(name) {
    return form.elements[name];
  }

  function errorEl(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function showError(name, msg) {
    const input = fieldEl(name);
    const slot = errorEl(name);
    if (slot) slot.textContent = msg;
    if (input) input.classList.toggle('wp-input--invalid', Boolean(msg));
  }

  // Validate a single field; returns true when valid.
  function validateField(name) {
    const input = fieldEl(name);
    if (!input || !rules[name]) return true;
    const msg = rules[name](input.value);
    showError(name, msg);
    return !msg;
  }

  // Clear an error as soon as the user fixes the field.
  Object.keys(rules).forEach((name) => {
    const input = fieldEl(name);
    if (!input) return;
    input.addEventListener('input', () => {
      if (input.classList.contains('wp-input--invalid')) validateField(name);
    });
    input.addEventListener('blur', () => validateField(name));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const results = Object.keys(rules).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.textContent = '';
      const firstInvalid = form.querySelector('.wp-input--invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend on a static site, so hand the message to the visitor's own
    // email app, pre-filled. (Swap this for a fetch() to a form service if one
    // is set up later.)
    const subjectSelect = fieldEl('subject');
    const data = {
      name: fieldEl('name').value.trim(),
      email: fieldEl('email').value.trim(),
      topic: subjectSelect.options[subjectSelect.selectedIndex].text,
      message: fieldEl('message').value.trim()
    };

    const mailSubject = data.topic + ' — from ' + data.name;
    const mailBody = data.message + '\n\n— ' + data.name + ' (' + data.email + ')';
    window.location.href = 'mailto:' + TO_EMAIL +
      '?subject=' + encodeURIComponent(mailSubject) +
      '&body=' + encodeURIComponent(mailBody);

    status.className = 'wp-contact-status wp-contact-status--ok';
    status.textContent = 'Opening your email app… If nothing opens, email ' + TO_EMAIL + ' directly.';
  });
})();
