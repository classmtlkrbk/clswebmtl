// Main interactive scripts for the landing page
// Year injector
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Smooth scroll for anchor CTAs
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();

// FAQ accordion
(function(){
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
})();

// Partners reveal animation using IntersectionObserver
(function(){
  var partners = document.querySelector('.partners');
  if (!partners) return;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          partners.classList.add('reveal');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.18});
    io.observe(partners);
  } else {
    partners.classList.add('reveal');
  }
})();

// Gallery reveal (staggered)
(function(){
  var grid = document.querySelector('.gallery-grid');
  if (!grid) return;
  if ('IntersectionObserver' in window) {
    var gio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          grid.classList.add('reveal');
          gio.unobserve(e.target);
        }
      });
    }, {threshold:0.12});
    gio.observe(grid);
  } else {
    grid.classList.add('reveal');
  }
})();

// Services reveal and expand/collapse
(function(){
  var services = document.querySelector('.services-grid');
  if (!services) return;

  // Reveal animation
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          services.classList.add('reveal');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.2});
    io.observe(services);
  } else {
    services.classList.add('reveal');
  }

  // Expand/collapse with accessibility
  var buttons = document.querySelectorAll('.service-card .more');
  buttons.forEach(function(btn){
    // find corresponding more-content within the same card
    var card = btn.closest('.service-card');
    var content = card.querySelector('.more-content');
    if (!content) return;

    // ensure each content has an id for aria-controls
    if (!content.id) {
      content.id = 'svc-' + Math.random().toString(36).slice(2,8);
    }
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', content.id);

    function closeOtherCards() {
      // close other open cards for accordion-like behavior on narrow screens
      var openCards = document.querySelectorAll('.service-card.open');
      openCards.forEach(function(openCard){
        if (openCard === card) return;
        openCard.classList.remove('open');
        var otherContent = openCard.querySelector('.more-content');
        var otherBtn = openCard.querySelector('.more');
        if (otherContent) otherContent.style.maxHeight = null;
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherContent) otherContent.setAttribute('aria-hidden', 'true');
      });
    }

    btn.addEventListener('click', function(){
      var title = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Hizmet';
      var isOpen = card.classList.toggle('open');

      // On small screens, behave like an accordion
      if (window.innerWidth <= 860 && isOpen) closeOtherCards();

      btn.setAttribute('aria-expanded', String(isOpen));
      content.setAttribute('aria-hidden', String(!isOpen));

      // safe maxHeight toggle
      if (isOpen) {
        // allow a short timeout for browser to paint and measure
        requestAnimationFrame(function(){
          try { content.style.maxHeight = content.scrollHeight + 'px'; } catch(e) { content.style.maxHeight = '240px'; }
        });
      } else {
        content.style.maxHeight = null;
      }

      // Announce to screen readers
      var announcer = document.getElementById('sr-announcer');
      if (announcer) {
        announcer.textContent = title + (isOpen ? ' açıldı' : ' kapandı');
      }
    });

    // Keyboard support for Enter/Space
    btn.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
})();
