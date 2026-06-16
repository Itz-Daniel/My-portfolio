/* ============================================================
   1. NAV — background border on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.borderBottomColor = 'rgba(229, 231, 235, 1)';
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  } else {
    navbar.style.borderBottomColor = 'transparent';
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  }
});

/* ============================================================
   2. MOBILE MENU TOGGLE
   ============================================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);
  if (menuOpen) {
    bar1.style.transform = 'translateY(6px) rotate(45deg)';
    bar2.style.opacity = '0';
    bar3.style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    bar1.style.transform = '';
    bar2.style.opacity = '';
    bar3.style.transform = '';
  }
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.add('hidden');
  bar1.style.transform = '';
  bar2.style.opacity = '';
  bar3.style.transform = '';
}

/* ============================================================
   3. TERMINAL TYPEWRITER (Cal.com themed accents)
   ============================================================ */
const termLines = [
  { id: 'term-line-1', key: 'status', value: 'student', keyColor: '#898989', valColor: '#fb923c' },
  { id: 'term-line-2', key: 'learning', value: 'React', keyColor: '#898989', valColor: '#3b82f6' },
  { id: 'term-line-3', key: 'building', value: 'portfolio', keyColor: '#898989', valColor: '#10b981' },
  { id: 'term-line-4', key: 'goal', value: 'join_great_team', keyColor: '#898989', valColor: '#8b5cf6' },
  { id: 'term-line-5', key: 'mindset', value: 'first_principles', keyColor: '#898989', valColor: '#111111' },
];

function typeText(el, text, speed = 45) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  await new Promise(r => setTimeout(r, 600));
  for (const line of termLines) {
    const el = document.getElementById(line.id);
    if (!el) continue;
    el.style.opacity = '1';
    el.innerHTML = `<span style="color:${line.keyColor}">${line.key}</span>: `;
    await new Promise(r => setTimeout(r, 80));
    const valSpan = document.createElement('span');
    valSpan.style.color = line.valColor;
    valSpan.style.fontWeight = '600';
    el.appendChild(valSpan);
    await typeText(valSpan, `"${line.value}";`);
    await new Promise(r => setTimeout(r, 180));
  }
}

const heroObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      termLines.forEach(line => {
        const el = document.getElementById(line.id);
        if (el) {
          el.textContent = '';
          el.style.opacity = '0';
        }
      });
      runTerminal();
      heroObs.disconnect();
    }
  });
}, { threshold: 0.3 });

const philosophySection = document.getElementById('philosophy');
if (philosophySection) heroObs.observe(philosophySection);

/* ============================================================
   4. CONTACT FORM — Direct to WhatsApp
   ============================================================ */
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value || 'No Subject';
  const message = document.getElementById('message').value;

  const whatsappText = `Hello Daniel! \n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
  const encodedText = encodeURIComponent(whatsappText);
  const phoneNumber = "2349041554214";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  window.open(whatsappURL, '_blank');
  
  // Show clean Success Feedback
  const successBox = document.getElementById('formSuccess');
  if (successBox) {
    successBox.textContent = "Redirecting you to WhatsApp...";
    successBox.classList.remove('hidden');
    setTimeout(() => {
      successBox.classList.add('hidden');
    }, 5000);
  }

  e.target.reset();
}

/* ============================================================
   5. FOOTER YEAR
   ============================================================ */
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ============================================================
   6. SCROLL & PROGRESS REVEALS
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    // Slide In Reveal
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Skill Bar Reveal
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('[style*="width:"]');
          bars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            requestAnimationFrame(() => {
              bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
              bar.style.width = targetWidth;
            });
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('article').forEach(el => barObserver.observe(el));

    function updateTimelineProgress() {
      let maxActiveTop = 0;
      const cards = document.querySelectorAll('#roadmap .pl-12 > .relative');
      cards.forEach(card => {
        const dot = card.querySelector('.timeline-dot');
        if (dot && dot.classList.contains('active')) {
          maxActiveTop = Math.max(maxActiveTop, card.offsetTop + 13);
        }
      });
      const progressLine = document.getElementById('timeline-progress');
      if (progressLine) {
        progressLine.style.height = maxActiveTop + 'px';
      }
    }

    // Roadmap Dot Highlight Reveal
    const roadmapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const dot = entry.target.querySelector('.timeline-dot');
        if (dot) {
          if (entry.isIntersecting) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        }
      });

      updateTimelineProgress();
    }, {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    });

    document.querySelectorAll('#roadmap .pl-12 > .relative').forEach(el => roadmapObserver.observe(el));
    window.addEventListener('resize', updateTimelineProgress);
  }, 200);
});

/* ============================================================
   7. PROJECT EXPAND/COLLAPSE LOGIC
   ============================================================ */
const projectData = {
  nebula: {
    title: "Nebula Dashboard",
    image: "nebula_thumb.png",
    badges: [
      `<span class="skill-badge">HTML/CSS</span>`,
      `<span class="skill-badge text-yellow-800 bg-yellow-50 border-yellow-100">JavaScript</span>`,
      `<span class="skill-badge text-indigo-800 bg-indigo-50 border-indigo-100">UI Design</span>`
    ],
    desc: "The Nebula Dashboard was built to simplify complex data monitoring. It integrates responsive modular cards, real-time looking data grids, and beautiful layout alignments. The primary goal was to create an interface that is both highly functional for power users and visually clean.<br><br>Features clean typography, minimal card alignments, and customized modular layouts built from ground up.",
    demo: "https://nebuladashboard.netlify.app/"
  },
  wealthpath: {
    title: "WealthPath Pathfinder",
    image: "wealthpath.png",
    badges: [
      `<span class="skill-badge text-blue-800 bg-blue-50 border-blue-100">React</span>`,
      `<span class="skill-badge text-indigo-800 bg-indigo-50 border-indigo-100">TypeScript</span>`,
      `<span class="skill-badge text-cyan-800 bg-cyan-50 border-cyan-100">Tailwind</span>`
    ],
    desc: "A modern fintech application serving as a capital funding landing page and loan application portal. Designed to facilitate fast financial decisions using seamless UI/UX, robust form handling, real-time validations, and WhatsApp business integrations.<br><br>Features highly clean structures and a fully responsive interface tailored for accessibility.",
    demo: "https://wealthpathltd.vercel.app/"
  }
};

const modal = document.getElementById('project-modal');
const modalBox = document.getElementById('modal-content-box');
const modalBody = document.getElementById('modal-body');

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const imageHTML = data.image ?
    `<img src="${data.image}" alt="${data.title}" class="w-full h-auto max-h-[50vh] object-contain rounded-t-xl md:rounded-l-xl md:rounded-tr-none bg-neutral-50" />` :
    `<div class="w-full h-64 md:h-full flex items-center justify-center bg-neutral-50 border-b md:border-b-0 md:border-r border-border text-neutral-500">Mockup</div>`;

  modalBody.innerHTML = `
        <div class="md:w-[50%] flex items-center justify-center bg-neutral-50 border-b md:border-b-0 md:border-r border-border">
          ${imageHTML}
        </div>
        <div class="md:w-[50%] p-8 flex flex-col justify-between">
          <div>
            <h3 class="font-display font-bold text-2xl text-neutral-900 mb-4">${data.title}</h3>
            <p class="text-neutral-700 leading-relaxed mb-6 text-sm font-sans">${data.desc}</p>
            
            <div class="mb-6">
              <p class="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">Tech Stack</p>
              <div class="flex flex-wrap gap-2">
                ${data.badges.join('')}
              </div>
            </div>
          </div>
          
          <div class="pt-4 flex flex-col gap-2">
            <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary w-full justify-center">
              Live Demo
            </a>
          </div>
        </div>
      `;

  // Show modal
  modal.classList.remove('hidden');
  void modal.offsetWidth; // Trigger reflow
  modal.classList.remove('opacity-0');
  modalBox.classList.remove('scale-95');
}

function closeModal() {
  modal.classList.add('opacity-0');
  modalBox.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 250);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* ============================================================
   8. CAL.COM INTERACTIVE SCHEDULER & FILTER FUNCTIONS
   ============================================================ */
let selectedDateVal = 'Monday';
let selectedTimeVal = '09:00 AM';

function selectDate(btn, dayName) {
  document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedDateVal = dayName;
}

function selectTime(btn, timeStr) {
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedTimeVal = timeStr;
}

function triggerScheduler() {
  const nameInput = document.getElementById('sched-name');
  const name = nameInput.value.trim() || 'Visitor';
  
  const text = `Hello Daniel! \n\nI'd like to book a 15 min virtual chat with you.\n*Name:* ${name}\n*Proposed Slot:* ${selectedDateVal} at ${selectedTimeVal}`;
  const encodedText = encodeURIComponent(text);
  const phoneNumber = "2349041554214";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;
  
  window.open(whatsappURL, '_blank');
  nameInput.value = '';
}

function filterProjects(btn, category) {
  document.querySelectorAll('.nav-pill-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  document.querySelectorAll('article[data-category]').forEach(art => {
    const artCat = art.getAttribute('data-category');
    if (category === 'all' || artCat === category) {
      art.classList.remove('hidden');
      setTimeout(() => {
        art.style.opacity = '1';
        art.style.transform = 'scale(1)';
      }, 50);
    } else {
      art.classList.add('hidden');
      art.style.opacity = '0';
      art.style.transform = 'scale(0.95)';
    }
  });
}
