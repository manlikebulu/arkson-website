// ====================================================
// ARKson — Site interactivity
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobile-nav');

  function closeMobileNav() {
    navToggle.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav after tapping a link
  document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------------- Smooth scroll w/ header offset ---------------- */
  const header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------------- Active nav link highlighting ---------------- */
  const sections = ['services', 'work', 'journal', 'reviews', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    const scrollPos = window.scrollY + (header ? header.offsetHeight : 0) + 40;
    let currentId = null;
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });
    navLinks.forEach(link => {
      const match = link.getAttribute('href') === `#${currentId}`;
      link.style.color = match ? 'var(--c-steel)' : '';
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ---------------- Contact form validation ---------------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    service: (v) => v !== '' || 'Select what you need.',
    message: (v) => v.trim().length >= 10 || 'Add a few more details about the project.'
  };

  function showFieldError(field, msg) {
    const wrapper = document.getElementById(field).closest('.form-field');
    const errorEl = document.getElementById(`error-${field}`);
    if (msg) {
      wrapper.classList.add('has-error');
      errorEl.textContent = msg;
    } else {
      wrapper.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateField(field) {
    const el = document.getElementById(field);
    const result = validators[field](el.value);
    showFieldError(field, result === true ? '' : result);
    return result === true;
  }

  ['name', 'email', 'service', 'message'].forEach(field => {
    const el = document.getElementById(field);
    el.addEventListener('blur', () => validateField(field));
    el.addEventListener('input', () => {
      if (el.closest('.form-field').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = ['name', 'email', 'service', 'message'];
    const results = fields.map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.textContent = 'Fix the highlighted fields and resend.';
      status.className = 'form-status error';
      const firstInvalid = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate submission (no backend wired up in this static build)
    const submitBtn = form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    setTimeout(() => {
      const name = document.getElementById('name').value.trim().split(' ')[0];
      status.textContent = `Thanks, ${name} — your project details are in. We'll follow up within 2 business days.`;
      status.className = 'form-status success';
      submitBtn.disabled = false;
      btnText.textContent = originalText;
      form.reset();
    }, 900);
  });

  /* ---------------- Journal modal ---------------- */
  const posts = {
    'tolerance-stack': {
      date: 'JUN 12, 2026',
      cat: 'Machining',
      title: 'Why tolerance stacking kills more assemblies than bad parts',
      body: [
        'Three parts came off the floor last quarter, each one inspected, each one within print. The assembly still failed at final fit. Nobody had cut a bad part. The problem was that nobody had checked what happens when three "acceptable" parts stack their tolerances in the same direction at once.',
        'Tolerance stacking is the gap between a part being correct and an assembly being correct. A bearing bore at the high end of its tolerance band, paired with a shaft at the low end, paired with a housing that\'s a few microns off-center — none of those are defects on their own. Together, they can push a fit outside what the design can absorb.',
        'On the gearbox in question, we ran a worst-case stack analysis across the bore, shaft, and housing before recutting anything. That analysis showed the original tolerance allocation left almost no margin once all three parts leaned the same way. We tightened one dimension — the housing bore — rather than all three, because it was the cheapest place to buy back margin without driving up machining cost elsewhere.',
        'The lesson we keep relearning: a drawing that passes individual part inspection can still describe an assembly that doesn\'t work. Stack analysis isn\'t a nice-to-have for tight assemblies — it\'s the only way to know if your tolerance budget actually adds up.'
      ]
    },
    '6061-vs-7075': {
      date: 'MAY 28, 2026',
      cat: 'Materials',
      title: '6061 vs. 7075: choosing aluminum by failure mode, not strength chart',
      body: [
        'Every spec sheet will tell you 7075 is stronger than 6061. That\'s true, and it\'s also the wrong question for most parts. The question that matters is: when this part eventually fails, what kind of failure can your application live with?',
        '6061 is more forgiving. It yields before it breaks, it\'s easier to weld, and it machines cleanly without the brittleness that shows up in higher-strength alloys. For brackets, housings, and structural parts where some warning before failure is valuable, that ductility is often worth more than the extra strength on a chart.',
        '7075 buys you strength-to-weight at the cost of toughness. It\'s less forgiving of stress concentrations, it doesn\'t weld well, and it can fail with less visible deformation beforehand. For aerospace fittings and high-load components where weight is the binding constraint, that trade is worth making. For a fixture base that just needs to not bend, it usually isn\'t.',
        'We ask one question before recommending either: if this part is overloaded by accident, do you want it to bend or do you want it to crack? That answer points to the alloy faster than any strength table.'
      ]
    },
    'first-article': {
      date: 'MAY 9, 2026',
      cat: 'Process',
      title: 'What a first-article inspection actually catches',
      body: [
        'A first-article inspection (FAI) is the first time a design\'s assumptions meet an actual cut part, measured against the full drawing rather than spot-checked. Skipping it to save a day is one of the more expensive shortcuts in manufacturing, because what it catches rarely shows up any other way.',
        'The first thing we check is whether every callout on the drawing was actually achievable on the chosen process. A tolerance that looked fine on screen can be unreachable on a particular machine setup, or achievable but only at a cost nobody priced in.',
        'The second is fit and function against mating parts, not just the print. A bore can be perfectly in tolerance and still bind against a shaft if a chamfer was specified ambiguously. FAI is where those ambiguities surface, before a few hundred parts repeat the same issue.',
        'The third is process repeatability. One good part proves the design is achievable. It doesn\'t prove the process will hold that result across a production run. That\'s a separate, ongoing check — but FAI is the baseline everything else gets measured against.',
        'Treat FAI as a design review with a physical part in your hand, not a formality before shipping. It\'s the cheapest place in the whole project to find a problem.'
      ]
    }
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalDate = document.getElementById('modalDate');
  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  let lastFocused = null;

  function openModal(postKey) {
    const post = posts[postKey];
    if (!post) return;
    modalDate.textContent = post.date;
    modalCat.textContent = post.cat;
    modalTitle.textContent = post.title;
    modalBody.innerHTML = post.body.map(p => `<p>${p}</p>`).join('');
    lastFocused = document.activeElement;
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-post]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(el.getAttribute('data-post'));
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) closeModal();
  });

});
