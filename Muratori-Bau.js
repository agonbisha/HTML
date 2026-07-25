document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const counters = document.querySelectorAll('.counter');
  const fadeElements = document.querySelectorAll('.fade-in');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.slider-btn.prev');
  const nextButton = document.querySelector('.slider-btn.next');

  const setHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 650);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  window.setTimeout(() => {
    loadingScreen?.classList.add('hidden');
  }, 900);

  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => navLinks?.classList.remove('open'));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('counter')) {
            animateCounter(entry.target);
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  fadeElements.forEach((element) => observer.observe(element));
  counters.forEach((counter) => observer.observe(counter));

  function animateCounter(counter) {
    const target = Number(counter.dataset.target || 0);
    const duration = 1400;
    const start = performance.now();

    const step = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = `${value}${target >= 25 ? '+' : ''}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = `${target}${target >= 25 ? '+' : ''}`;
      }
    };

    requestAnimationFrame(step);
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      portfolioItems.forEach((item) => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });

  let activeIndex = 0;

  const showCard = (index) => {
    testimonialCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });
  };

  prevButton?.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showCard(activeIndex);
  });

  nextButton?.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % testimonialCards.length;
    showCard(activeIndex);
  });

  setInterval(() => {
    activeIndex = (activeIndex + 1) % testimonialCards.length;
    showCard(activeIndex);
  }, 5000);

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
