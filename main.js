    // Dark/light mode toggle
    const btn = document.getElementById('toggle-theme');
    function setTheme(dark) {
      if (dark) {
        document.body.classList.add('dark-mode');
        btn.innerHTML = '<i class="fa fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        btn.innerHTML = '<i class="fa fa-moon"></i>';
        localStorage.setItem('theme', 'light');
      }
    }
    btn.onclick = function () {
      setTheme(!document.body.classList.contains('dark-mode'));
    };
    // Recursos com paginação personalizada
    window.addEventListener('DOMContentLoaded', function () {
      const saved = localStorage.getItem('theme');
      if (
        saved === 'dark' ||
        (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        setTheme(true);
      } else {
        setTheme(false);
      }
      const savedLang = localStorage.getItem('lang') || 'en';
      // --- Recursos ---
      const resourcesData = {
        en: [
          // Vagner Bom Jesus Apps e Projetos
          { title: '📱 TBDB - The Biomimicry Database (Android)', desc: 'Official APK', link: 'https://apkpure.com/th/t-b-d-b/pt.tbdb.bjtech/' },
          { title: '🌿 The Biomimicry Database', desc: 'Multimodal platform for biomimicry', link: 'https://thebiomimicrydb.vercel.app/' },
          { title: '📝 Blog on Medium', desc: 'Technical and scientific articles', link: 'https://vagnerbomjesus.medium.com/' },
          { title: '🤖 TBDB | VITA ChatBot', desc: 'Development documentation of a multimodal knowledge sharing platform ...', link: 'https://bdigital.ipg.pt/dspace/bitstream/10314/10107/1/CM%20-%20Vagner%20B%20Jesus.pdf' },
          { title: '🔎 Google Scholar', desc: 'Academic publications', link: 'https://scholar.google.com/citations?user=K-IfdJoAAAAJ&hl=pt-PT&oi=ao' },
          // Useful Links
          { title: '🌐 ENISA - European Union Agency for Cybersecurity', desc: 'Official ENISA website', link: 'https://www.enisa.europa.eu/' }
        ],
        pt: [
          // Vagner Bom Jesus Apps e Projetos
          { title: '📱 TBDB - The Biomimicry Database (Android)', desc: 'Aplicação oficial APK', link: 'https://apkpure.com/th/t-b-d-b/pt.tbdb.bjtech/' },
          { title: '🌿 The Biomimicry Database', desc: 'Plataforma multimodal para biomimética', link: 'https://thebiomimicrydb.vercel.app/' },
          { title: '📝 Blog no Medium', desc: 'Artigos técnicos e científicos', link: 'https://vagnerbomjesus.medium.com/' },
          { title: '🤖 TBDB | ChatBot VITA', desc: 'Documentação do Desenvolvimento de uma Plataforma Multimodal para Partilha de Conhecimento ...', link: 'https://bdigital.ipg.pt/dspace/bitstream/10314/10107/1/CM%20-%20Vagner%20B%20Jesus.pdf' },
          { title: '🔎 Google Scholar', desc: 'Publicações académicas', link: 'https://scholar.google.com/citations?user=K-IfdJoAAAAJ&hl=pt-PT&oi=ao' },
          // Links Úteis
          { title: '🌐 ENISA - Agência da União Europeia para a Cibersegurança', desc: 'Website oficial da ENISA', link: 'https://www.enisa.europa.eu/' }
        ]
      };
      const translations = {
        en: {
          experience: 'Experience',
          education: 'Education',
          prev: 'Previous',
          next: 'Next',
          page: (c, t) => `Page ${c} of ${t}`
        },
        pt: {
          experience: 'Experiência',
          education: 'Formação académica',
          prev: 'Anterior',
          next: 'Próxima',
          page: (c, t) => `Página ${c} de ${t}`
        }
      };
      const langSelect = document.getElementById('language-select');
      const btnExp = document.getElementById('btn-experience');
      const btnEdu = document.getElementById('btn-education');

      let currentLanguage = 'en';
      let resources = resourcesData[currentLanguage];
      const perPage = 5;
      let currentPage = 1;
      let totalPages = Math.ceil(resources.length / perPage);

      function setLanguage(lang) {
        currentLanguage = lang;
        langSelect.value = lang;
        localStorage.setItem('lang', lang);
        resources = resourcesData[lang];
        totalPages = Math.ceil(resources.length / perPage);
        btnExp.textContent = translations[lang].experience;
        btnEdu.textContent = translations[lang].education;
        renderResources(1);
        currentPage = 1;
        renderCustomPagination();
      }
      langSelect.addEventListener('change', () => setLanguage(langSelect.value));
      setLanguage(savedLang);
      function renderResources(page) {
        const section = document.getElementById('resources-section');
        section.querySelectorAll('.resource-link').forEach(e => e.remove());
        const start = (page - 1) * perPage;
        const end = Math.min(start + perPage, resources.length);
        for (let i = start; i < end; i++) {
          const r = resources[i];
          const a = document.createElement('a');
          a.href = r.link;
          a.target = '_blank';
          a.className = 'resource-link';
          a.innerHTML = `<div class="resource-card">
            <div class="resource-title">${r.title}</div>
            <div class="resource-desc">${r.desc}</div>
          </div>`;
          section.insertBefore(a, section.querySelector('.pagination-custom'));
        }
      }
      function renderCustomPagination() {
        const pag = document.getElementById('custom-pagination');
        pag.innerHTML = '';
        // Botão Anterior / Previous
        const prev = document.createElement('button');
        prev.className = 'page-btn-custom';
        prev.textContent = translations[currentLanguage].prev;
        prev.disabled = currentPage === 1;
        prev.onclick = function () {
          if (currentPage > 1) {
            currentPage--;
            renderResources(currentPage);
            renderCustomPagination();
          }
        };
        pag.appendChild(prev);
        // Info página
        const info = document.createElement('span');
        info.className = 'page-info-custom';
        info.textContent = translations[currentLanguage].page(currentPage, totalPages);
        pag.appendChild(info);
        // Botão Próxima
        const next = document.createElement('button');
        next.className = 'page-btn-custom';
        next.textContent = translations[currentLanguage].next;
        next.disabled = currentPage === totalPages;
        next.onclick = function () {
          if (currentPage < totalPages) {
            currentPage++;
            renderResources(currentPage);
            renderCustomPagination();
          }
        };
        pag.appendChild(next);
      }
      renderResources(currentPage);
      renderCustomPagination();
      window.renderResources = renderResources;
      window.renderCustomPagination = renderCustomPagination;
      window.resources = resources;
      window.perPage = perPage;
    });
