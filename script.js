(() => {
  const config = window.THANH_MAI_MISA_CONFIG || {};

  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      menuBtn.textContent = open ? '☰' : '×';
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded','false');
      menuBtn.textContent = '☰';
      mobileNav.hidden = true;
    }));
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  const qrDialog = document.getElementById('qrDialog');
  document.querySelectorAll('.js-open-qr').forEach(btn => {
    btn.addEventListener('click', () => qrDialog?.showModal());
  });

  const imageDialog = document.getElementById('imageDialog');
  const imageDialogImg = document.getElementById('imageDialogImg');
  document.querySelectorAll('.js-image-zoom').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!imageDialog || !imageDialogImg) return;
      imageDialogImg.src = btn.dataset.full || '';
      imageDialog.showModal();
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(dialog => {
    dialog.querySelector('.modal-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });
  });

  const form = document.getElementById('leadForm');
  const status = document.getElementById('formStatus');

  const setStatus = (type, msg) => {
    if (!status) return;
    status.className = `form-status ${type}`;
    status.textContent = msg;
  };

  const payloadFromForm = formData => ({
    source: 'landing-page-thanh-mai-misa',
    submittedAt: new Date().toISOString(),
    consultant: config.consultant || 'Thanh Mai MISA',
    fullName: formData.get('fullName')?.trim(),
    phone: formData.get('phone')?.trim(),
    email: formData.get('email')?.trim(),
    role: formData.get('role'),
    taxCode: formData.get('taxCode')?.trim(),
    city: formData.get('city'),
    interest: formData.get('interest'),
    businessType: 'Doanh nghiệp',
    consent: formData.get('consent') === 'on',
    pageUrl: window.location.href,
    referrer: document.referrer || ''
  });

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      status?.removeAttribute('class');
      form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

      const spamField = form.querySelector('[name="companyWebsite"]');
      if (spamField?.value) return;

      if (!form.checkValidity()) {
        form.querySelectorAll(':invalid').forEach(el => el.classList.add('invalid'));
        form.reportValidity();
        setStatus('error', 'Vui lòng kiểm tra và điền đầy đủ các trường bắt buộc.');
        return;
      }

      const fd = new FormData(form);
      const payload = payloadFromForm(fd);
      const submitBtn = form.querySelector('.submit-btn');
      const oldText = submitBtn?.innerHTML;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';
      }

      try {
        if (!config.leadEndpoint) {
          localStorage.setItem('thanhMaiMisaPendingLead', JSON.stringify(payload));
          setStatus('warning', 'Form đã sẵn sàng nhưng chưa kết nối AMIS aiMarketing. Để được hỗ trợ ngay, vui lòng gọi 0763 517 916 hoặc quét Zalo bên cạnh.');
          return;
        }

        const res = await fetch(config.leadEndpoint, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setStatus('success', 'Đã gửi thông tin thành công. Thanh Mai MISA sẽ liên hệ tư vấn sớm.');
        form.reset();
        window.dataLayer?.push({event:'lead_submit_success', lead_source:'thanh-mai-misa'});
      } catch (err) {
        console.error(err);
        setStatus('error', 'Chưa thể gửi thông tin lúc này. Vui lòng gọi 0763 517 916 hoặc quét Zalo để được hỗ trợ ngay.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = oldText || 'Nhận tư vấn miễn phí →';
        }
      }
    });
  }
})();
