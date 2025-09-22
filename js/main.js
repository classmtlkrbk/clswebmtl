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

// Enhanced Services reveal and expand/collapse
(function(){
  // Since services now uses intro-style layout, we don't need the expand/collapse functionality
  // Just keep this comment block in case we want to add animations later
})();
