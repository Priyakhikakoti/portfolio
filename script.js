/* ==========================================
   TYPING ANIMATION
   ========================================== */
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="cursor">|</span>`;

    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Cursor styling in JS (flashing cursor animation)
const style = document.createElement('style');
style.innerHTML = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .cursor {
    animation: blink 0.8s infinite;
    color: var(--accent-primary);
    font-weight: 700;
    margin-left: 2px;
  }
`;
document.head.appendChild(style);

/* ==========================================
   INITIALIZATION
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Init TypeWriter
  const txtElement = document.getElementById('typewriter');
  if (txtElement) {
    const words = [
      'Full Stack Developer',
      'Backend Systems Engineer',
      'Data Analytics Enthusiast',
      'Machine Learning Aspirant'
    ];
    new TypeWriter(txtElement, words, 2000);
  }

  // Init Theme
  initTheme();

  // Init Active Links on Scroll
  initActiveLinks();

  // Init Skill progress bars animation
  initSkillBars();

  // Mobile menu toggle
  initMobileMenu();
});

/* ==========================================
   THEME TOGGLING (DARK / LIGHT)
   ========================================== */
function initTheme() {
  const themeBtn = document.getElementById('theme-btn');
  const storedTheme = localStorage.getItem('theme');
  
  // Set default theme or stored theme
  if (storedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    document.body.classList.remove('light-mode');
    themeBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    if (isLight) {
      themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      themeBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* ==========================================
   ACTIVE MENU HIGHLIGHTING
   ========================================== */
function initActiveLinks() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links li');

  window.addEventListener('scroll', () => {
    let currentSectionId = 'home';
    const scrollPos = window.scrollY + 100; // Offset for sticky nav

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    mobileMenuBtn.innerHTML = isActive ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
    });
  });
}

/* ==========================================
   SKILLS BARS PROGRESS ANIMATION
   ========================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

/* ==========================================
   PROJECTS FILTERING
   ========================================== */
function filterProjects(category) {
  // Update active button styling
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(category)) {
      btn.classList.add('active');
    }
  });

  // Filter project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const categories = card.getAttribute('data-category').split(' ');
    if (category === 'all' || categories.includes(category)) {
      card.classList.remove('hide');
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.classList.add('hide');
      }, 300); // Sync with CSS transition
    }
  });
}

/* ==========================================
   PROJECT DETAILS DATABASE & MODAL LOGIC
   ========================================== */
const projectData = {
  'proj-aegis': {
    title: 'Aegis Ops',
    tech: 'React.js, FastAPI, Python, SQLite, NumPy, Scikit-learn, CSS',
    type: 'Full Stack Engineering Operations & AI Platform',
    desc: 'Aegis Ops is a comprehensive, full-stack intelligence platform built to monitor system health and operations. It features proactive AI-driven predictive modules that process logs, detect deadlocks, and identify anomalous performance patterns before they escalate into serious outages.',
    features: [
      'Developed a responsive glassmorphism dashboard using React and Vite for real-time visualization of engineering system metrics.',
      'Designed and coded secure RESTful backend APIs in FastAPI connected to SQLite databases storing logs and configuration details.',
      'Built an intelligent anomaly detection engine utilizing Scikit-learn\'s Isolation Forest algorithm to flag abnormal behaviors.',
      'Applied statistical analytics with NumPy for raw scoring of logs, alerts, and system usage metrics.',
      'Engineered an intelligent recommender system using similarity algorithms to provide context-aware remediations.',
      'Utilized Natural Language Processing (NLP) heuristics to analyze database lock sequences and detect structural deadlocks in server operations.'
    ]
  },
  'proj-railway': {
    title: 'Railway Incident Management & Safety Monitoring System',
    tech: 'Flask, MySQL, Python, SQL',
    type: 'IIT Guwahati Internship Project - Backend & Database',
    desc: 'Developed during a backend internship at TIH IIT Guwahati, this platform is a centralized backend and database routing engine for reporting and logging regional railway incidents to improve operation safety and coordination.',
    features: [
      'Designed and coded secure RESTful APIs using Flask to process, inspect, and route regional railway incident records.',
      'Constructed a robust relational database schema in MySQL for incident storage, status logging, and user accounts.',
      'Implemented database connectivity, connection pooling, and optimized query routing for seamless system data flows.',
      'Implemented role-based authentication and authorization (RBAC) to restrict interface actions by role.',
      'Collaborated closely with frontend developers to enable seamless integration between UI modules and backend APIs.'
    ]
  },
  'proj-soulsync': {
    title: 'SoulSync – Mental Wellness Application',
    tech: 'Flask, HTML5, CSS3, JavaScript, SQLite',
    type: 'Mental Wellness Web App',
    desc: 'SoulSync is an interactive mental wellness web platform designed to promote digital self-care. It features dashboard trends, secure journals, and helper modules that allow users to map their emotional well-being over time in a friendly, approachable interface.',
    features: [
      'Built mood tracking logic that logs user sentiments and displays visual trends using dynamic SVG or CSS charts.',
      'Developed an AI-assisted journaling system with sentiment tags and word frequency indicators.',
      'Implemented clean responsive styling that balances soft, calming color palettes to reduce user stress.',
      'Engineered backend controllers in Flask to store journal files securely in database structures.',
      'Ensured high accessibility standards (WCAG) so screen readers can easily navigate core wellness metrics.'
    ]
  },
  'proj-attendance': {
    title: 'Attendance Management System',
    tech: 'HTML5, CSS3, JavaScript',
    type: 'Frontend Web Development Project',
    desc: 'This attendance management tool provides teachers and administrators with an automated digital register to record daily student attendance, reducing paper logs.',
    features: [
      'Designed and developed the responsive web frontend interface using modern HTML5 and CSS3 styling.',
      'Built interactive dashboard layouts in JavaScript for recording daily class attendance with single-click actions.',
      'Implemented client-side form validations and custom visual feedback alerts using vanilla JavaScript.',
      'Integrated user-friendly search and filtering states on the UI to quickly identify student records.'
    ]
  },
  'proj-portfolio': {
    title: 'Personal Portfolio Website',
    tech: 'HTML5, CSS3, Vanilla JS, Bootstrap Icons',
    type: 'Responsive Portfolio Site',
    desc: 'This is the current premium, responsive personal portfolio website showcasing Priyakhi Kakoti\'s projects, academic history, certifications, and technical skills.',
    features: [
      'Crafted with custom glassmorphic cards and dynamic backdrop-filter CSS styling.',
      'Implemented a robust Dark / Light mode toggle using custom variables and local storage saving.',
      'Built custom modal popups and responsive grid layouts supporting ultra-wide, desktop, tablet, and mobile dimensions.',
      'Implemented performance-focused typing effects and scroll-based progress bar loaders in vanilla JS.'
    ]
  }
};

function openProjectModal(projId) {
  const data = projectData[projId];
  if (!data) return;

  document.getElementById('modal-project-title').textContent = data.title;
  document.getElementById('modal-project-tech').textContent = data.tech;
  document.getElementById('modal-project-type').textContent = data.type;
  document.getElementById('modal-project-desc').textContent = data.desc;

  const featuresList = document.getElementById('modal-project-features');
  featuresList.innerHTML = '';
  data.features.forEach(feat => {
    const li = document.createElement('li');
    li.textContent = feat;
    featuresList.appendChild(li);
  });

  const modal = document.getElementById('project-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore background scroll
}

/* ==========================================
   CERTIFICATION DATABASE & MODAL LOGIC
   ========================================== */
const certData = {
  'cert-iitg': {
    title: '30-Day Summer Internship Programme Certificate',
    issuer: 'Technology Innovation Hub (TIH), IIT Guwahati',
    id: 'IITG/TIDF/SI2025/051',
    date: 'June 2025 – July 2025',
    desc: 'Awarded for successfully completing the intensive Summer Internship Program. Actively contributed to the project "Railway Incident Management and Safety Monitoring System" under the guidance of Mr. N. N. Dutta (CEO, TIH) and Prof. S. K. Dwivedy (Project Director, TIH). Gained extensive experience in Python, Flask backend services, MySQL database operations, and user security models.',
    mockupType: 'tih-iitg'
  },
  'cert-cognifyz': {
    title: 'Data Science Internship Certificate',
    issuer: 'Cognifyz Technologies',
    id: 'CTI/A1/C279659',
    date: 'Dec 31, 2025 – Jan 31, 2026',
    desc: 'Certified completion of a one-month internship. Demonstrated dedication, strong technical skills, and coordination during practical assignments involving exploratory data analysis, data pre-processing, visualization design, and statistical data cleaning with Python.',
    mockupType: 'cognifyz'
  },
  'cert-devarena': {
    title: 'Data Science & Analytics Internship',
    issuer: 'The Developers Arena',
    id: 'TDA/DSA/2026/012',
    date: 'December 2025 – January 2026',
    desc: 'Successfully finished the practical project-based data analytics curriculum. Focused on solving real-world datasets problems, cleaning large CSV structures, building descriptive statistics charts, and sharpening analytical problem-solving skills.',
    mockupType: 'devarena'
  },
  'cert-deloitte': {
    title: 'Data Analytics Job Simulation Certificate',
    issuer: 'Deloitte / Forage',
    id: 'Verification Code: ZidsoWa6btDFoHJYM',
    date: 'January 2nd, 2026',
    desc: 'Completed Deloitte\'s interactive Job Simulation focused on Data Analysis and Forensic Technology. Solved tasks relating to predictive modeling, cyber forensics, metadata inspection, and reporting business intelligence metrics for major organizational investigations.',
    mockupType: 'deloitte'
  },
  'cert-nptel': {
    title: 'Compiler Design Online Certification',
    issuer: 'NPTEL Online Certification (IIT Kharagpur)',
    id: 'Roll No: NPTEL26CS56S354000054',
    date: 'Jan – Apr 2026 (12-Week Course)',
    desc: 'Successfully completed the 12-week course in Compiler Design (4 Academic Credits recommended) funded by the Ministry of Education, Government of India. Obtained a consolidated score of 57% (Assignments: 22.19/25, Proctored Exam: 34.5/75). The course covered Lexical Analysis, Syntax-Directed Translations, Intermediate Code Generation, and Code Optimization.',
    mockupType: 'nptel'
  }
};

function openCertModal(certId) {
  const data = certData[certId];
  if (!data) return;

  document.getElementById('modal-cert-title').textContent = data.title;
  document.getElementById('modal-cert-issuer').textContent = data.issuer;
  document.getElementById('modal-cert-id').textContent = data.id;
  document.getElementById('modal-cert-desc').textContent = data.desc;

  // Build the CSS Styled Mockup for the specific certificate
  const graphicContainer = document.getElementById('modal-cert-graphic-container');
  graphicContainer.innerHTML = '';
  
  const mockup = document.createElement('div');
  mockup.className = `cert-mockup mockup-${data.mockupType}`;
  
  // Custom styled CSS credentials
  let innerHTML = `
    <div class="cert-mockup-frame">
      <div class="cert-mockup-header">
        <div class="cert-mockup-seal"><i class="bi bi-shield-fill-check"></i></div>
        <div class="cert-mockup-inst">${data.issuer}</div>
      </div>
      <div class="cert-mockup-title">CERTIFICATE OF COMPLETION</div>
      <div class="cert-mockup-text">This is proudly awarded to</div>
      <div class="cert-mockup-name">Priyakhi Kakoti</div>
      <div class="cert-mockup-desc">for successfully completing the coursework / internship requirements in</div>
      <div class="cert-mockup-course">${data.title}</div>
      <div class="cert-mockup-footer">
        <div class="cert-mockup-sign">
          <div class="sign-line"></div>
          <span>Authorized Signature</span>
        </div>
        <div class="cert-mockup-meta">
          <div>Date: ${data.date}</div>
          <div>ID: ${data.id}</div>
        </div>
      </div>
    </div>
  `;
  mockup.innerHTML = innerHTML;
  graphicContainer.appendChild(mockup);

  // Inject styling for mockup frames dynamically if it does not exist
  if (!document.getElementById('mockup-styles')) {
    const mockupStyles = document.createElement('style');
    mockupStyles.id = 'mockup-styles';
    mockupStyles.innerHTML = `
      .cert-mockup {
        width: 100%;
        margin-bottom: 2rem;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: inset 0 0 40px rgba(0,0,0,0.1);
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .mockup-tih-iitg {
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        border: 2px solid #6366f1;
        color: #f8fafc;
      }
      .mockup-cognifyz {
        background: linear-gradient(135deg, #090d16 0%, #032525 100%);
        border: 2px solid #0d9488;
        color: #f8fafc;
      }
      .mockup-devarena {
        background: linear-gradient(135deg, #020617 0%, #1e1b4b 100%);
        border: 2px solid #8b5cf6;
        color: #f8fafc;
      }
      .mockup-deloitte {
        background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
        border: 2px solid #86efac;
        color: #f8fafc;
      }
      .mockup-nptel {
        background: linear-gradient(135deg, #27272a 0%, #0f172a 100%);
        border: 2px solid #e11d48;
        color: #f8fafc;
      }
      .cert-mockup-frame {
        border: 1px dashed rgba(255,255,255,0.15);
        padding: 1.5rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .cert-mockup-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .cert-mockup-seal {
        font-size: 2rem;
        color: var(--accent-primary);
      }
      .cert-mockup-inst {
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--text-secondary);
      }
      .cert-mockup-title {
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }
      .cert-mockup-text {
        font-size: 0.8rem;
        color: var(--text-muted);
        text-transform: uppercase;
      }
      .cert-mockup-name {
        font-size: 1.6rem;
        font-weight: 800;
        color: #fff;
        margin: 0.5rem 0;
        letter-spacing: 0.02em;
        font-family: 'Inter', sans-serif;
      }
      .cert-mockup-desc {
        font-size: 0.8rem;
        color: var(--text-muted);
        max-width: 80%;
      }
      .cert-mockup-course {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--accent-secondary);
        margin-top: 0.5rem;
        margin-bottom: 1.5rem;
      }
      .cert-mockup-footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-top: 1px solid rgba(255,255,255,0.08);
        padding-top: 1rem;
      }
      .cert-mockup-sign {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .sign-line {
        width: 120px;
        height: 1px;
        background: rgba(255,255,255,0.3);
        margin-bottom: 0.25rem;
      }
      .cert-mockup-sign span {
        font-size: 0.7rem;
        color: var(--text-muted);
      }
      .cert-mockup-meta {
        font-size: 0.7rem;
        color: var(--text-muted);
        text-align: right;
      }
      
      /* Light mode adaptations for cert preview inside the modal */
      body.light-mode .cert-mockup-name {
        color: #fff;
      }
      body.light-mode .cert-mockup-title {
        color: #fff;
      }
    `;
    document.head.appendChild(mockupStyles);
  }

  const modal = document.getElementById('cert-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================
   CONTACT FORM HANDLER
   ========================================== */
function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const submitBtn = document.getElementById('form-submit-btn');
  const feedback = document.getElementById('form-feedback');

  // Disable button and change state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
  
  // Simulate API call
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';

    // Show feedback
    feedback.style.display = 'block';
    feedback.style.color = '#10b981'; // green-500
    feedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    
    // Clear form
    document.getElementById('contact-form').reset();

    // Auto-hide feedback after 5 seconds
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
    
  }, 1500);
}
