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

// Contact form validation + demo submission handling
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  var announcer = document.getElementById('sr-announcer');
  function announce(msg){ if(announcer){ announcer.textContent=''; setTimeout(function(){ announcer.textContent=msg; }, 40);} }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var website = form.querySelector('input[name="website"]'); // honeypot
    if(website && website.value.trim()!==''){ announce('Spam tespit edildi. Form gönderilmedi.'); return; }

    var name = form.querySelector('input[name="name"]');
    var contact = form.querySelector('input[name="contact"]');
    var message = form.querySelector('textarea[name="message"]');
    var sending = form.querySelector('.sending');
    var valid = true;
    [name, contact, message].forEach(function(f){
      if(!f) return; f.classList.remove('field-error');
      if(!f.value || f.value.trim().length === 0){ valid=false; f.classList.add('field-error'); }
    });
    if(message && message.value.trim().length < 10){ valid=false; message.classList.add('field-error'); }
    if(!valid){ announce('Lütfen zorunlu alanları doldurun.'); return; }

    // Basic heuristic contact check
    var contactVal = contact.value.trim();
    var isPhone = /^\+?\d[\d\s-]{7,}$/.test(contactVal);
    var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
    if(!isPhone && !isEmail){ contact.classList.add('field-error'); announce('Telefon veya e-posta formatı geçersiz.'); return; }

    if(sending) sending.hidden = false;
    announce('Form gönderiliyor, lütfen bekleyin.');

    // Simulate async send (demo)
    setTimeout(function(){
      if(sending) sending.hidden = true;
      announce('Form başarıyla gönderildi. Teşekkürler.');
      form.reset();
    }, 900);
  });
})();
