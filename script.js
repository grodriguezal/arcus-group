const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const toggle = document.querySelector('[data-menu-toggle]');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
