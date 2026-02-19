(function() {
    var css = document.createElement('style');
    css.textContent = [
        '.cm-overlay { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center; padding:1.5rem; backdrop-filter:blur(2px); }',
        '.cm-overlay.active { display:flex; }',
        '.cm-card { background:#fff; border-radius:12px; box-shadow:0 8px 40px rgba(0,0,0,0.18); padding:2.25rem 2.5rem; width:100%; max-width:520px; max-height:90vh; overflow-y:auto; position:relative; animation:cmSlide 0.25s ease; }',
        '@keyframes cmSlide { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }',
        '.cm-close { position:absolute; top:1rem; right:1.25rem; background:none; border:none; font-size:1.5rem; cursor:pointer; color:#8b919e; line-height:1; padding:0.25rem; transition:color 0.2s; }',
        '.cm-close:hover { color:#0a0c10; }',
        '.cm-card h2 { font-size:1.35rem; font-weight:600; letter-spacing:-0.02em; margin-bottom:0.25rem; color:#0a0c10; }',
        '.cm-card .cm-sub { font-size:0.875rem; color:#5c6370; margin-bottom:1.5rem; }',
        '.cm-row { display:flex; gap:0.85rem; }',
        '.cm-group { margin-bottom:1rem; flex:1; }',
        '.cm-group label { display:block; font-size:0.8rem; font-weight:500; color:#0a0c10; margin-bottom:0.3rem; }',
        '.cm-group label .cm-opt { color:#8b919e; font-weight:400; }',
        '.cm-group input, .cm-group textarea { width:100%; padding:0.6rem 0.75rem; font-size:0.875rem; font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif; border:1px solid rgba(0,0,0,0.15); border-radius:6px; background:#fff; color:#0a0c10; outline:none; transition:border-color 0.2s, box-shadow 0.2s; }',
        '.cm-group input:focus, .cm-group textarea:focus { border-color:#0b73b9; box-shadow:0 0 0 3px rgba(11,115,185,0.1); }',
        '.cm-group textarea { resize:vertical; min-height:80px; }',
        '.cm-submit { display:block; width:100%; padding:0.7rem; background:#0b73b9; color:#fff; font-size:0.9rem; font-weight:600; font-family:inherit; border:none; border-radius:6px; cursor:pointer; margin-top:0.5rem; transition:background 0.2s, transform 0.1s; box-shadow:0 2px 8px rgba(11,115,185,0.25); }',
        '.cm-submit:hover { background:#095f9a; transform:translateY(-1px); }',
        '.cm-thanks { text-align:center; padding:2rem 0; }',
        '.cm-thanks h2 { margin-bottom:0.5rem; }',
        '.cm-thanks p { color:#5c6370; font-size:0.9rem; margin-bottom:1.25rem; }',
        '.cm-thanks a { display:inline-block; padding:0.6rem 1.5rem; background:#0b73b9; color:#fff; font-size:0.875rem; font-weight:600; border-radius:6px; text-decoration:none; }',
        '@media (max-width:768px) { .cm-card { padding:1.5rem 1.25rem; } .cm-row { flex-direction:column; gap:0; } }'
    ].join('\n');
    document.head.appendChild(css);

    var overlay = document.createElement('div');
    overlay.className = 'cm-overlay';
    overlay.innerHTML =
        '<div class="cm-card">' +
            '<button class="cm-close" aria-label="Close">&times;</button>' +
            '<div class="cm-form-view">' +
                '<h2>Start a Conversation</h2>' +
                '<p class="cm-sub">Tell us a bit about yourself and we\'ll be in touch.</p>' +
                '<form id="cmForm">' +
                    '<div class="cm-row">' +
                        '<div class="cm-group"><label for="cmName">Name</label><input type="text" id="cmName" name="Name" required placeholder="Your full name"></div>' +
                        '<div class="cm-group"><label for="cmTitle">Title</label><input type="text" id="cmTitle" name="Title" required placeholder="Your role"></div>' +
                    '</div>' +
                    '<div class="cm-group"><label for="cmCompany">Company</label><input type="text" id="cmCompany" name="Company" required placeholder="Company name"></div>' +
                    '<div class="cm-row">' +
                        '<div class="cm-group"><label for="cmEmail">Email</label><input type="email" id="cmEmail" name="Email" required placeholder="you@company.com"></div>' +
                        '<div class="cm-group"><label for="cmPhone">Phone <span class="cm-opt">(optional)</span></label><input type="tel" id="cmPhone" name="Phone" placeholder="(555) 123-4567"></div>' +
                    '</div>' +
                    '<div class="cm-group"><label for="cmNotes">Notes <span class="cm-opt">(optional)</span></label><textarea id="cmNotes" name="Notes" placeholder="Any context you\'d like to add"></textarea></div>' +
                    '<input type="hidden" name="_subject" value="New Contact from northlabs.io">' +
                    '<input type="hidden" name="_captcha" value="false">' +
                    '<input type="text" name="_honey" style="display:none">' +
                    '<button type="submit" class="cm-submit">Send Message</button>' +
                '</form>' +
            '</div>' +
            '<div class="cm-thanks" style="display:none">' +
                '<h2>Thank you!</h2>' +
                '<p>Your message has been sent. A member of our team will be in touch shortly.</p>' +
                '<a href="#" class="cm-done">Close</a>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    var card = overlay.querySelector('.cm-card');
    var closeBtn = overlay.querySelector('.cm-close');
    var form = document.getElementById('cmForm');
    var formView = overlay.querySelector('.cm-form-view');
    var thanksView = overlay.querySelector('.cm-thanks');
    var doneBtn = overlay.querySelector('.cm-done');

    function openModal(e) {
        if (e) e.preventDefault();
        formView.style.display = '';
        thanksView.style.display = 'none';
        closeBtn.style.display = '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(e) {
        if (e) e.preventDefault();
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
    }

    closeBtn.addEventListener('click', closeModal);
    doneBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal(e);
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal(e);
    });

    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href="/contact/"]');
        if (link) openModal(e);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('.cm-submit');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        var data = new FormData(form);
        fetch('https://formsubmit.co/ajax/conversations@northlabs.io', {
            method: 'POST',
            body: data
        }).then(function(res) {
            return res.json();
        }).then(function() {
            formView.style.display = 'none';
            thanksView.style.display = '';
            closeBtn.style.display = 'none';
            btn.textContent = 'Send Message';
            btn.disabled = false;
            form.reset();
        }).catch(function() {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            window.location.href = 'mailto:conversations@northlabs.io';
        });
    });
})();
