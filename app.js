
/* ================= NOWNET PRODUCTION — SHARED JS ================= */
(function(){
  'use strict';

  /* ---------- 3-dot dropdown ---------- */
  var dotsBtn  = document.getElementById('dotsBtn');
  var dropdown = document.getElementById('dropdown');
  if(dotsBtn && dropdown){
    dotsBtn.addEventListener('click', function(e){
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', function(e){
      if(!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') dropdown.classList.remove('open');
    });
    dropdown.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ dropdown.classList.remove('open'); });
    });
    /* highlight current page */
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    dropdown.querySelectorAll('a[href]').forEach(function(a){
      var href = a.getAttribute('href').toLowerCase();
      if(href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- mailto helper ---------- */
  function sendMail(subject, body){
    window.location.href = 'mailto:nownetofficial@gmail.com?subject='
      + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  /* ---------- work request form ---------- */
  var workForm = document.getElementById('workForm');
  if(workForm){
    workForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name   = document.getElementById('w-name').value.trim();
      var email  = document.getElementById('w-email').value.trim();
      var type   = document.getElementById('w-type').value;
      var budget = document.getElementById('w-budget').value.trim();
      var msg    = document.getElementById('w-msg').value.trim();
      sendMail(
        'Work Request — ' + type + ' — from ' + name,
        'Type: ' + type + '\nFrom: ' + name + ' <' + email + '>'
        + (budget ? '\nBudget: ' + budget : '')
        + '\n\n' + msg + '\n\n— Sent from the NOWNET official website'
      );
    });
  }

  /* ---------- feedback form ---------- */
  var fbForm = document.getElementById('fbForm');
  if(fbForm){
    fbForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name  = document.getElementById('fb-name').value.trim();
      var email = document.getElementById('fb-email').value.trim();
      var msg   = document.getElementById('fb-msg').value.trim();
      sendMail(
        'Feedback — from ' + name,
        'From: ' + name + (email ? ' <' + email + '>' : '')
        + '\n\n' + msg + '\n\n— Sent from the NOWNET official website'
      );
    });
  }

  /* ---------- NOWNET AI chat ---------- */
  var chatForm = document.getElementById('chatForm');
  if(chatForm){
    var chatLog  = document.getElementById('chatLog');
    var chatText = document.getElementById('chatText');
    var aiModel  = document.getElementById('aiModel');

    function addMsg(text, cls){
      var d = document.createElement('div');
      d.className = 'msg ' + cls;
      d.textContent = text;
      chatLog.appendChild(d);
      chatLog.scrollTop = chatLog.scrollHeight;
      return d;
    }

    chatForm.addEventListener('submit', function(e){
      e.preventDefault();
      var q = chatText.value.trim();
      if(!q) return;
      chatText.value = '';
      addMsg(q, 'user');

      var thinking = document.createElement('div');
      thinking.className = 'msg ai';
      thinking.innerHTML = '<span class="typing-dots"><i></i><i></i><i></i></span>';
      chatLog.appendChild(thinking);
      chatLog.scrollTop = chatLog.scrollHeight;

      var system = 'You are NOWNET AI, the official AI assistant of NOWNET Production, '
        + 'a digital production studio. Be helpful, clear, friendly and concise.';
      var url = 'https://text.pollinations.ai/' + encodeURIComponent(q)
        + '?model=' + encodeURIComponent(aiModel.value)
        + '&system=' + encodeURIComponent(system);

      var controller = new AbortController();
      var timeout = setTimeout(function(){ controller.abort(); }, 40000);

      fetch(url, {signal: controller.signal})
        .then(function(r){
          clearTimeout(timeout);
          if(!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function(text){
          thinking.remove();
          var clean = (text || '').trim();
          addMsg(clean || '(empty reply — try again)', 'ai');
        })
        .catch(function(err){
          clearTimeout(timeout);
          thinking.remove();
          if(err && err.name === 'AbortError'){
            addMsg('NOWNET AI took too long to reply. Please try again.', 'ai');
          } else {
            addMsg('Connection problem — please try again in a moment.', 'ai');
          }
        });
    });
  }
})();
