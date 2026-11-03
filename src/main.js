/* ============================================
   Main JS — Portfolio Interactions
   ============================================ */

import './styles/main.css';

// ——————————————————————————————————————
// Theme Management
// ——————————————————————————————————————
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initial);
  toggle?.setAttribute('aria-label', `Switch to ${initial === 'dark' ? 'light' : 'dark'} mode`);

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.setAttribute('aria-label', `Switch to ${next === 'dark' ? 'light' : 'dark'} mode`);
  });
}

// ——————————————————————————————————————
// Navigation
// ——————————————————————————————————————
function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  const navLinks = document.querySelectorAll('.nav__link');

  // Scroll shadow
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav?.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = { rootMargin: '-20% 0px -60% 0px' };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));

  // Mobile menu
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    links?.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      links?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ——————————————————————————————————————
// Copy Email
// ——————————————————————————————————————
function initCopyEmail() {
  const btns = document.querySelectorAll('[data-copy-email]');
  btns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email');
      try {
        await navigator.clipboard.writeText(email);
        const tooltip = btn.querySelector('.tooltip');
        if (tooltip) {
          tooltip.textContent = 'Copied!';
          tooltip.classList.add('show');
          setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => { tooltip.textContent = 'Click to copy'; }, 200);
          }, 1500);
        }
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        const tooltip = btn.querySelector('.tooltip');
        if (tooltip) {
          tooltip.textContent = 'Copied!';
          tooltip.classList.add('show');
          setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => { tooltip.textContent = 'Click to copy'; }, 200);
          }, 1500);
        }
      }
    });
  });
}

// ——————————————————————————————————————
// Skills Tabs
// ——————————————————————————————————————
function initSkillsTabs() {
  const tabs = document.querySelectorAll('.skills__tab');
  const panels = document.querySelectorAll('.skills__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${target}`)?.classList.add('active');
    });

    // Keyboard support
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);
      let newIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
      }
      if (newIndex !== undefined) {
        tabArray[newIndex].click();
        tabArray[newIndex].focus();
      }
    });
  });
}

// ——————————————————————————————————————
// Scroll Reveal
// ——————————————————————————————————————
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ——————————————————————————————————————
// Smooth anchor scroll
// ——————————————————————————————————————
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ——————————————————————————————————————
// AI Recruiter Chatbot
// ——————————————————————————————————————
function initAIChatbot() {
  const launcher = document.getElementById('ai-chat-launcher');
  const windowEl = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close');
  const clearBtn = document.getElementById('ai-chat-clear');
  const messagesEl = document.getElementById('ai-chat-messages');
  const inputEl = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const chipsContainer = document.getElementById('ai-chips');

  if (!launcher || !windowEl) return;

  let isTyping = false;

  function toggleChat(forceOpen) {
    const shouldOpen = forceOpen !== undefined ? forceOpen : !windowEl.classList.contains('open');
    windowEl.classList.toggle('open', shouldOpen);
    if (shouldOpen) {
      setTimeout(() => inputEl?.focus(), 150);
    }
  }

  launcher.addEventListener('click', () => toggleChat());
  closeBtn?.addEventListener('click', () => toggleChat(false));

  clearBtn?.addEventListener('click', () => {
    if (messagesEl) {
      messagesEl.innerHTML = `
        <div class="ai-msg ai-msg--bot">
          <p>Chat cleared! Feel free to ask me anything about Shubhasheesh's 3.5+ years of experience, AI tooling (Claude, Cursor, Lovable), Angular architecture, or notice period.</p>
        </div>
      `;
    }
  });

  // Knowledge Base & Response Generator
  function getBotResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    if (q.includes('notice') || q.includes('available') || q.includes('join') || q.includes('immediate')) {
      return {
        text: `**Immediate Joiner (≤ 15 Days Notice Period)**\n\n• **Current Status**: Ready to onboard immediately.\n• **Preferred Locations**: Noida, Bengaluru, Pune, Mumbai, Hyderabad, or Remote.\n• **Target Roles**: Senior Frontend Developer, Angular Engineer, Full Stack Engineer (Angular + Spring Boot), SDE-1 / SDE-2.`,
        actions: [
          { label: '📄 Download CV', action: 'download-cv' },
          { label: '📧 Copy Email', action: 'copy-email' }
        ]
      };
    }

    if (q.includes('ai') || q.includes('claude') || q.includes('cursor') || q.includes('lovable') || q.includes('copilot') || q.includes('llm') || q.includes('gpt')) {
      return {
        text: `**AI-Augmented Engineering Workflow**\n\nShubhasheesh is an active power user of cutting-edge AI dev tools:\n\n• **Claude 3.5 Sonnet / Opus**: Daily driver for enterprise architecture, complex NgRx state design, RxJS operator composition, and Spring Boot entity modeling.\n• **Cursor AI**: Multi-file Composer, custom \`.cursorrules\`, and rapid Jasmine/Karma unit test generation.\n• **Lovable.dev**: Rapid interactive prototyping and full-stack component bootstrapping.\n• **Frontend LLM Integration**: Implemented streaming SSE (Server-Sent Events) with RxJS Subject pipelines and client-side AI chat widgets in enterprise apps.\n• **GitHub Copilot & Antigravity**: AI pair programming and CLI automation.`,
        actions: [
          { label: '🛠️ View AI Skills', action: 'view-ai-skills' }
        ]
      };
    }

    if (q.includes('microfrontend') || q.includes('module federation') || q.includes('shell') || q.includes('remote') || q.includes('webpack')) {
      return {
        text: `**Webpack 5 Module Federation Architecture**\n\nAt BDO India, Shubhasheesh designed the enterprise microfrontend architecture for a multi-country Global Finance ERP:\n\n• **Shell Container**: Centralized JWT auth, role-based route guards, multi-language theme engine, and shared NgRx Store.\n• **Remote Micro-Apps**: Independently deployed modules for Accounts Receivable, Sales Orders, and Bulk Upload Logs.\n• **Shared Dependencies**: Singleton Angular runtime, RxJS, and NgRx store to eliminate bundle duplication.\n• **Result**: Decoupled deployment pipelines, sub-200ms initial chunk load.`,
        actions: [
          { label: '📐 View Architecture', action: 'view-arch' }
        ]
      };
    }

    if (q.includes('40%') || q.includes('optimization') || q.includes('performance') || q.includes('invoicing') || q.includes('onpush') || q.includes('tax') || q.includes('uae')) {
      return {
        text: `**UAE e-Invoicing & 40% Performance Optimization**\n\n• **Project**: UAE Government VAT and e-Invoicing compliance system at BDO India.\n• **The Challenge**: Heavy financial tables with thousands of invoice items caused slow UI rendering.\n• **Optimization Strategies**:\n  1. Implemented **OnPush Change Detection** across all data-grid components.\n  2. Fine-tuned \`trackBy\` functions to prevent DOM thrashing.\n  3. Route-level lazy loading and RxJS retry/backoff interceptors.\n• **Outcome**: **40% reduction in invoice processing time** and full ARIA / keyboard accessibility compliance.`,
        actions: [
          { label: '💼 View Case Study', action: 'view-experience' }
        ]
      };
    }

    if (q.includes('spring') || q.includes('java') || q.includes('backend') || q.includes('postgres') || q.includes('sql') || q.includes('api')) {
      return {
        text: `**Java Spring Boot & Backend Capabilities**\n\n• **Experience**: 1+ year hands-on backend development in production.\n• **Tech**: Java, Spring Boot, JPA / Hibernate, REST APIs, PostgreSQL, SQL.\n• **Key Work**: Developed high-throughput REST APIs for the ERP Sales Grid (GET, update, batch operations) backed by PostgreSQL; resolved complex database bottlenecks.`,
        actions: [
          { label: '📊 View Skills', action: 'view-skills' }
        ]
      };
    }

    if (q.includes('arabic') || q.includes('rtl') || q.includes('i18n') || q.includes('translation')) {
      return {
        text: `**Full Arabic RTL & i18n Architecture**\n\n• Engineered a single shared internationalization layer in Angular supporting English and Arabic with full Right-to-Left (RTL) layout switching.\n• Built using modern CSS Logical Properties (\`margin-inline\`, \`padding-inline\`, flex reversal) and dynamic font switching for the UAE, Saudi Arabia, and GCC markets.`,
        actions: [
          { label: '🌐 Toggle RTL Live', action: 'toggle-rtl' }
        ]
      };
    }

    if (q.includes('salary') || q.includes('ctc') || q.includes('compensation') || q.includes('package')) {
      return {
        text: `**Compensation & Expectations**\n\n• Current Designation: Senior Executive (Full Stack Developer) at BDO India.\n• Notice Period: **15 Days or less (Immediate Joiner)**.\n• Preferred CTC: Competitive enterprise market rate commensurate with Senior Frontend / Full Stack roles. Open to discussion based on role and organization.`,
        actions: [
          { label: '📧 Contact Directly', action: 'copy-email' }
        ]
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('call')) {
      return {
        text: `**Get in Touch with Shubhasheesh**\n\n• 📧 **Email**: shubhasheeshshukla126@gmail.com\n• 📱 **Phone**: +91 7376373059\n• 💼 **LinkedIn**: linkedin.com/in/shubh7310\n• 📍 **Location**: Noida, India (Open to Relocation / Remote)\n• ⚡ **Availability**: Immediate Joiner`,
        actions: [
          { label: '📋 Copy Email', action: 'copy-email' },
          { label: '📄 Download Resume', action: 'download-cv' }
        ]
      };
    }

    // Default Fallback
    return {
      text: `**Shubhasheesh Shukla — Full Stack Developer (3.5+ Yrs Exp)**\n\n• **Core Stack**: Angular (15–21), TypeScript, RxJS, NgRx, Webpack 5 Module Federation.\n• **Backend**: Java, Spring Boot, REST APIs, PostgreSQL.\n• **AI Tools**: Daily practitioner of Claude 3.5, Cursor AI, Lovable.dev, and LLM streaming.\n• **Status**: Immediate Joiner (≤ 15 days notice).\n\nWhat would you like to know more about?`,
      actions: [
        { label: '⚡ Notice Period', query: 'Is he an immediate joiner?' },
        { label: '🤖 AI Workflow', query: 'How do you use Claude and Cursor?' },
        { label: '🧩 Microfrontends', query: 'Explain the Microfrontends architecture' },
        { label: '📄 Download CV', action: 'download-cv' }
      ]
    };
  }

  // Typewriter streaming effect
  function appendBotMessage(responseObj) {
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-msg ai-msg--bot';

    const p = document.createElement('div');
    msgEl.appendChild(p);

    // Typing dots indicator first
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-typing';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    msgEl.appendChild(typingIndicator);

    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    isTyping = true;

    // Simulate thinking delay
    setTimeout(() => {
      typingIndicator.remove();

      // Format markdown-like text to basic HTML
      const rawText = responseObj.text;
      let i = 0;
      const speed = 12;

      function typeChar() {
        if (i < rawText.length) {
          i += 3; // stream in small bursts
          const chunk = rawText.slice(0, i);
          p.innerHTML = formatMarkdown(chunk);
          messagesEl.scrollTop = messagesEl.scrollHeight;
          setTimeout(typeChar, speed);
        } else {
          p.innerHTML = formatMarkdown(rawText);
          isTyping = false;

          // Add action pills if present
          if (responseObj.actions && responseObj.actions.length > 0) {
            const actionsWrap = document.createElement('div');
            actionsWrap.className = 'ai-msg__actions';
            responseObj.actions.forEach(act => {
              const b = document.createElement('button');
              b.className = 'ai-msg__action-btn';
              b.type = 'button';
              b.textContent = act.label;
              b.addEventListener('click', () => {
                if (act.query) {
                  sendMessage(act.query);
                } else if (act.action) {
                  handleAction(act.action);
                }
              });
              actionsWrap.appendChild(b);
            });
            msgEl.appendChild(actionsWrap);
            messagesEl.scrollTop = messagesEl.scrollHeight;
          }
        }
      }

      typeChar();
    }, 350);
  }

  function formatMarkdown(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }

  function handleAction(actionName) {
    switch (actionName) {
      case 'download-cv':
        window.open('/assets/Shubhasheesh_Shukla_CV.pdf', '_blank');
        break;
      case 'copy-email':
        navigator.clipboard.writeText('shubhasheeshshukla126@gmail.com');
        alert('Email copied to clipboard: shubhasheeshshukla126@gmail.com');
        break;
      case 'view-arch':
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        toggleChat(false);
        break;
      case 'view-skills':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        toggleChat(false);
        break;
      case 'view-ai-skills':
        document.getElementById('ai-tools')?.scrollIntoView({ behavior: 'smooth' });
        toggleChat(false);
        break;
      case 'view-experience':
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        toggleChat(false);
        break;
    }
  }

  function sendMessage(text) {
    if (!text || isTyping) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg ai-msg--user';
    userMsg.textContent = text;
    messagesEl.appendChild(userMsg);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    inputEl.value = '';

    // Generate & stream bot response
    const botResp = getBotResponse(text);
    appendBotMessage(botResp);
  }

  sendBtn?.addEventListener('click', () => {
    sendMessage(inputEl?.value.trim());
  });

  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(inputEl?.value.trim());
    }
  });

  // Handle suggestion chips
  chipsContainer?.addEventListener('click', (e) => {
    const chip = e.target.closest('.ai-chip');
    if (chip) {
      sendMessage(chip.textContent.trim());
    }
  });

  // Global trigger for chat
  window.openAIChat = function(customQuery) {
    toggleChat(true);
    if (customQuery) {
      setTimeout(() => sendMessage(customQuery), 250);
    }
  };
}

// ——————————————————————————————————————
// Command Palette (Ctrl+K)
// ——————————————————————————————————————
function initCommandPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  const list = document.getElementById('cmd-palette-list');
  const navTrigger = document.getElementById('cmd-palette-trigger');

  if (!backdrop || !input || !list) return;

  const commands = [
    { label: '📄 Download Resume (PDF)', category: 'Actions', icon: '📥', action: () => window.open('/assets/Shubhasheesh_Shukla_CV.pdf', '_blank') },
    { label: '📋 Copy Email Address', category: 'Actions', icon: '📧', action: () => { navigator.clipboard.writeText('shubhasheeshshukla126@gmail.com'); alert('Email copied!'); } },
    { label: '💼 View Work Experience & Projects', category: 'Navigation', icon: '🏢', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: '🤖 Explore AI & Dev Tools', category: 'Navigation', icon: '✨', action: () => document.getElementById('ai-tools')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: '🛠️ View Technical Skills Matrix', category: 'Navigation', icon: '💻', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: '🎓 View Education & Credentials', category: 'Navigation', icon: '🎓', action: () => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: '🌓 Toggle Dark / Light Theme', category: 'Theme', icon: '🎨', action: () => document.getElementById('theme-toggle')?.click() }
  ];

  function renderList(query = '') {
    const q = query.toLowerCase().trim();
    const filtered = commands.filter(c => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));

    list.innerHTML = '';
    if (filtered.length === 0) {
      list.innerHTML = `<div style="padding:16px;text-align:center;color:var(--color-text-muted);font-size:0.8rem">No matching commands</div>`;
      return;
    }

    filtered.forEach((cmd, idx) => {
      const item = document.createElement('div');
      item.className = `cmd-palette__item ${idx === 0 ? 'selected' : ''}`;
      item.innerHTML = `
        <div class="cmd-palette__item-label">
          <span>${cmd.icon}</span>
          <span>${cmd.label}</span>
        </div>
        <span class="cmd-palette__kbd">${cmd.category}</span>
      `;
      item.addEventListener('click', () => {
        closePalette();
        cmd.action();
      });
      list.appendChild(item);
    });
  }

  function openPalette() {
    backdrop.classList.add('open');
    input.value = '';
    renderList();
    setTimeout(() => input.focus(), 100);
  }

  function closePalette() {
    backdrop.classList.remove('open');
  }

  navTrigger?.addEventListener('click', openPalette);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      backdrop.classList.contains('open') ? closePalette() : openPalette();
    }
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closePalette();
    }
  });

  input.addEventListener('input', () => {
    renderList(input.value);
  });

  input.addEventListener('keydown', (e) => {
    const items = list.querySelectorAll('.cmd-palette__item');
    if (!items.length) return;
    let selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[selectedIdx]?.classList.remove('selected');
      selectedIdx = (selectedIdx + 1) % items.length;
      items[selectedIdx]?.classList.add('selected');
      items[selectedIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[selectedIdx]?.classList.remove('selected');
      selectedIdx = (selectedIdx - 1 + items.length) % items.length;
      items[selectedIdx]?.classList.add('selected');
      items[selectedIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      items[selectedIdx]?.click();
    }
  });
}

// ——————————————————————————————————————
// 3D Tilt Micro-Interactions
// ——————————————————————————————————————
function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.project-card, .ai-tool-card, .edu-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ——————————————————————————————————————
// Init
// ——————————————————————————————————————
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initCopyEmail();
  initSkillsTabs();
  initScrollReveal();
  initSmoothScroll();
  // initAIChatbot(); // Hidden for now; will be integrated end-to-end with RAG later
  initCommandPalette();
  initCardTilt();
});

