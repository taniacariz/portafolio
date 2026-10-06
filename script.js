/**
 * PORTAFOLIO PROFESIONAL - TANIA CARIZ HUECHAO
 * Interactividad en JavaScript Vanilla
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes
  initNavbarScroll();
  initThemeToggle();
  initMobileNavCollapse();
  initScrollToTop();
  initContactForm();
  initFaqCards();
  setCurrentYear();
});

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const applyTheme = (theme) => {
    const isLight = theme === 'light';

    document.body.classList.toggle('light-theme', isLight);
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', isLight ? 'light' : 'dark');

    const icon = toggle.querySelector('.theme-icon');
    if (icon) {
      icon.className = isLight ? 'bi bi-moon-fill theme-icon' : 'bi bi-sun-fill theme-icon';
    }

    toggle.setAttribute('aria-label', isLight ? 'Cambiar a modo noche' : 'Cambiar a modo día');
    toggle.setAttribute('aria-pressed', String(isLight));
  };

  const savedTheme = (() => {
    try {
      return localStorage.getItem('portfolio_user_theme');
    } catch (error) {
      return null;
    }
  })();

  // Prioridad: tema oscuro por defecto para respetar la estética tech/glassmorphism
  const initialTheme = savedTheme || 'dark';
  applyTheme(initialTheme);

  toggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
    try {
      localStorage.setItem('portfolio_user_theme', nextTheme);
    } catch (error) {
      console.warn('No se pudo guardar el tema preferido:', error);
    }
  });
}

/**
 * 1. Efecto de barra de navegación al hacer scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Chequeo inicial
}

/**
 * 2. Cierre automático del menú móvil al hacer clic en un enlace
 */
function initMobileNavCollapse() {
  const navLinks = document.querySelectorAll('#navContent .nav-link, #navContent .btn');
  const navCollapse = document.getElementById('navContent');

  if (!navCollapse) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        // Obtenemos la instancia de Bootstrap Collapse y la cerramos
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

/**
 * 3. Botón flotante para regresar arriba (Scroll To Top)
 */
function initScrollToTop() {
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (!btnScrollTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btnScrollTop.classList.add('visible');
    } else {
      btnScrollTop.classList.remove('visible');
    }
  }, { passive: true });

  btnScrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 4. Validación y simulación de envío del formulario de contacto
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const formAlert = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Verificación de validez HTML5
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Estado visual de carga
    form.classList.remove('was-validated');
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    btnSpinner.classList.remove('d-none');
    formAlert.classList.add('d-none');

    // Simulación de envío asíncrono (ej. EmailJS o webhook)
    setTimeout(() => {
      // Estado de éxito
      submitBtn.disabled = false;
      btnText.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Mensaje';
      btnSpinner.classList.add('d-none');

      // Notificación al usuario
      formAlert.className = 'alert alert-success mt-3 mb-0';
      formAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> ¡Muchas gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.';
      formAlert.classList.remove('d-none');

      // Reinicio del formulario
      form.reset();

      // Ocultar mensaje tras 6 segundos
      setTimeout(() => {
        formAlert.classList.add('d-none');
      }, 6000);
    }, 1200);
  });
}

/**
 * 5. Año dinámico en el footer
 */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * 6. Sincronización del botón central para desplegar/ocultar las 3 calugas
 */
function initFaqCards() {
  const toggleBtn = document.getElementById('toggleAllFaqBtn');
  const toggleText = document.getElementById('toggleAllFaqText');
  const collapseElements = document.querySelectorAll('.faq-collapse-all');
  if (!toggleBtn || !toggleText || collapseElements.length === 0) return;

  const firstCollapse = collapseElements[0];

  firstCollapse.addEventListener('show.bs.collapse', () => {
    toggleText.textContent = 'Ocultar detalles';
    toggleBtn.setAttribute('aria-expanded', 'true');
  });

  firstCollapse.addEventListener('hide.bs.collapse', () => {
    toggleText.textContent = 'Ver detalles';
    toggleBtn.setAttribute('aria-expanded', 'false');
  });
}