document.documentElement.classList.add('js');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-contact-scroll]').forEach((scroll) => {
  const trigger = scroll.querySelector('.contact-scroll-trigger');
  if (!trigger) return;

  const setOpen = (open) => {
    scroll.dataset.open = String(open);
    trigger.setAttribute('aria-expanded', String(open));
  };

  trigger.addEventListener('click', () => {
    setOpen(scroll.dataset.open !== 'true');
  });

  scroll.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      trigger.focus();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!scroll.contains(event.target)) setOpen(false);
  });
});
