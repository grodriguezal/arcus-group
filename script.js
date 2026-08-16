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

const progress = document.querySelector('[data-progress]');
const railLinks = [...document.querySelectorAll('[data-section-rail] a')];
const trackedSections = railLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const updateScrollExperience = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress?.style.setProperty('--progress', `${ratio * 100}%`);
  document.documentElement.style.setProperty('--arch-shift', String(Math.min(window.scrollY * 0.08, 48)));

  let active = trackedSections[0];
  trackedSections.forEach(section => {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.45) active = section;
  });
  railLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${active?.id}`));
};

updateScrollExperience();
window.addEventListener('scroll', updateScrollExperience, { passive: true });

const principleContent = [
  ['01', 'Especialización', 'Cada compañía desarrolla experiencia, relaciones y capacidades propias para comprender de verdad la categoría en la que participa.'],
  ['02', 'Ejecución', 'Las buenas ideas necesitan capacidad para convertirse en realidad. Participamos directamente en los proyectos en los que creemos.'],
  ['03', 'Calidad', 'Elegimos productos, marcas, proyectos y partners con propuestas sólidas y diferenciadas, y aplicamos el mismo estándar a nuestra operación.'],
  ['04', 'Largo plazo', 'Construimos relaciones duraderas y desarrollamos compañías con vocación de permanencia, más allá de oportunidades puntuales.'],
  ['05', 'Crecimiento sostenible', 'Preferimos negocios sólidos, capaces de crecer de forma ordenada, rentable y sostenible, antes que crecimiento sin estructura.']
];

const principleModule = document.querySelector('[data-principles]');
if (principleModule) {
  const stage = principleModule.querySelector('.principle-stage');
  const number = principleModule.querySelector('[data-principle-number]');
  const title = principleModule.querySelector('[data-principle-title]');
  const copy = principleModule.querySelector('[data-principle-copy]');
  principleModule.querySelectorAll('[data-principle]').forEach(button => {
    button.addEventListener('click', () => {
      const item = principleContent[Number(button.dataset.principle)];
      principleModule.querySelectorAll('[data-principle]').forEach(tab => {
        const selected = tab === button;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
      });
      stage.classList.add('changed');
      number.textContent = item[0]; title.textContent = item[1]; copy.textContent = item[2];
      window.setTimeout(() => stage.classList.remove('changed'), 380);
    });
  });
}
