
import { useEffect, useState } from "react";
import "./App.css";
import useScrollReveal from "./useScrollReveal";
import { ArrowDownRight, ArrowUpRight, Sparkles, Send } from "lucide-react";

function App() {
  useScrollReveal();

  const [introProgress, setIntroProgress] = useState(0);
const [introPhase, setIntroPhase] = useState("loading");


useEffect(() => {
  let progress = 0;
  let exitTimer;

  const interval = setInterval(() => {
    progress = Math.min(progress + 2, 100);
    setIntroProgress(progress);

    if (progress >= 100) {
      clearInterval(interval);
      setIntroPhase("panels");

      exitTimer = setTimeout(() => {
        setIntroPhase("done");
      }, 1700);
    }
  }, 30);

  return () => {
    clearInterval(interval);
    clearTimeout(exitTimer);
  };
}, []);

  const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const updateProgress = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    setScrollProgress(progress);
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  return () => {
    window.removeEventListener("scroll", updateProgress);
    window.removeEventListener("resize", updateProgress);
  };
}, []);



const rocketStops = [
  {
    id: "home",
    label: "TAKEOFF",
    detail: "Meet the engineer",
    number: "01",
  },
  {
    id: "focus",
    label: "THE MISSION",
    detail: "AI with real-world purpose",
    number: "02",
  },
  {
    id: "projects",
    label: "FIELD NOTES",
    detail: "Explore selected projects",
    number: "03",
  },
  {
    id: "toolkit",
    label: "THE TOOLKIT",
    detail: "Skills and education",
    number: "04",
  },
  {
    id: "contact",
    label: "LAND HERE",
    detail: "Start a conversation",
    number: "05",
  },
];

const [rocketFlight, setRocketFlight] = useState({
  x: 78,
  y: 24,
  angle: -25,
  stage: 0,
});

useEffect(() => {
  const updateFlight = () => {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const p = maxScroll > 0
    ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
    : 0;

  // A continuous S-shaped flight with gentle vertical waves.
  const x = 50 + 31 * Math.sin(p * Math.PI * 4);
  const y = 12 + 76 * p + 3.5 * Math.sin(p * Math.PI * 8);

  // Follow the curve so the pointed nose turns with the flight.
  const dx = 31 * Math.PI * 4 * Math.cos(p * Math.PI * 4);
  const dy =
    76 + 3.5 * Math.PI * 8 * Math.cos(p * Math.PI * 8);

  // The SVG nose points upward, so offset its angle by 90°.
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

  const stage = Math.min(
    Math.floor(p * rocketStops.length),
    rocketStops.length - 1
  );

  setRocketFlight({ x, y, angle, stage });
};

  updateFlight();

  window.addEventListener("scroll", updateFlight, {
    passive: true,
  });
  window.addEventListener("resize", updateFlight);

  return () => {
    window.removeEventListener("scroll", updateFlight);
    window.removeEventListener("resize", updateFlight);
  };
}, []);


  return (
    <main
  className={`site-shell ${
    introPhase === "done" ? "intro-complete" : ""
  }`}>

    {introPhase !== "done" && (
  <div
    className={`intro-overlay intro-${introPhase}`}
    aria-hidden="true"
  >
    <div className="intro-brand">
      <span className="intro-wordmark">
        AV<span>.</span>
      </span>

      <div className="intro-loading-info">
        <span>
          {introPhase === "loading"
            ? "PREPARING EXPERIENCE"
            : "WELCOME"}
        </span>

        <span className="intro-percentage">
          {String(introProgress).padStart(3, "0")}%
        </span>
      </div>

      <div className="intro-progress-track">
        <div
          className="intro-progress-fill"
          style={{ width: `${introProgress}%` }}
        />
      </div>
    </div>

    <div
  className={`intro-panels ${
    introPhase === "panels" ? "intro-panels-exit" : ""
  }`}
>
      {[1, 2, 3, 4, 5].map((panel) => (
        <div
          className={`intro-panel intro-panel-${panel}`}
          key={panel}
        />
      ))}
    </div>
  </div>
)}

      <div
  className="scroll-progress-track"
  role="progressbar"
  aria-label="Page scroll progress"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={Math.round(scrollProgress)}
>
  <div
    className="scroll-progress-bar"
    style={{ transform: `scaleX(${scrollProgress / 100})` }}
  />
</div>
      
<a
  className="paper-rocket"
  href={`#${rocketStops[rocketFlight.stage].id}`}
  aria-label={`Fly to ${rocketStops[rocketFlight.stage].detail}`}
  style={{
    left: `${rocketFlight.x}%`,
    top: `${rocketFlight.y}%`,
    "--flight-angle": `${rocketFlight.angle}deg`,
  }}
>
  <span className="rocket-note">
    <span className="rocket-note-top">
      {rocketStops[rocketFlight.stage].number} / FLIGHT PATH
    </span>
    <strong>{rocketStops[rocketFlight.stage].label}</strong>
    <span>{rocketStops[rocketFlight.stage].detail}</span>
  </span>

  
<svg className="rocket-model" viewBox="0 0 120 150" aria-hidden="true">
  <defs>
    <linearGradient id="paperTop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#d8dbd1" />
    </linearGradient>
    <linearGradient id="paperSide" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#a3a99b" />
      <stop offset="100%" stopColor="#e8eae2" />
    </linearGradient>
  </defs>

  {/* Main long pointed paper nose */}
  <path
    d="M60 5 L91 94 L60 82 L29 94 Z"
    fill="url(#paperTop)"
    stroke="#20221e"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />

  {/* Dark folded half gives the nose depth */}
  <path d="M60 5 L60 82 L91 94 Z" fill="#aeb3a7" />

  {/* Main triangular paper wings */}
  <path
    d="M29 80 L8 113 L40 103 L60 82 Z"
    fill="#d6ff62"
    stroke="#20221e"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
  <path
    d="M91 80 L112 113 L80 103 L60 82 Z"
    fill="#ff1493"
    stroke="#20221e"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />

  {/* Folded lower body */}
  <path
    d="M40 94 L60 82 L80 94 L73 132 L60 143 L47 132 Z"
    fill="url(#paperTop)"
    stroke="#20221e"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />

  {/* Shaded side plane */}
  <path d="M60 82 L80 94 L73 132 L60 143 Z" fill="url(#paperSide)" />

  {/* Paper creases */}
  <path
    d="M60 5 L60 82 M60 82 L47 132 M60 82 L73 132"
    fill="none"
    stroke="#777d73"
    strokeWidth="1.5"
  />

  {/* Small folded tail */}
  <path
    d="M47 132 L60 143 L73 132 L67 148 L53 148 Z"
    fill="#d6ff62"
    stroke="#20221e"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
</svg>

</a>

      
      <nav className="navbar">
        <a className="wordmark" href="#home">
          AV<span className="wordmark-dot">.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#focus">Focus</a>
          <a href="#approach">Approach</a>
          <a href="#projects">Projects</a>
          <a href="#toolkit">Toolkit</a>
        </div>

        <a className="nav-contact" href="#contact">
          Let's connect <ArrowUpRight size={16} />
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            AI / ML STUDENT · MYSORE, INDIA
          </div>

          
<div className="hero-headlines">
  <h1 className="hero-name">
    Hi, I'm Abhay Varun.
  </h1>

  <h1 className="hero-title">
    Engineering the future of{" "}
    <span className="highlight">agricultural automation.</span>
  </h1>
</div>


          <p className="hero-description">
            I'm Abhay Varun S., an AI &amp; Machine Learning student at
            Mysore University School of Engineering. I’m interested in
            research-grade computer vision for agricultural automation,
            quality grading, and autonomous perception.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#focus">
              Explore my focus <ArrowDownRight size={18} />
            </a>
            <a className="text-link" href="#about">
              Get to know me <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="hero-note">
            <Sparkles size={17} />
            <span>Building at the intersection of AI and agriculture.</span>
          </div>
        </div>

        <div className="hero-visual" id="about">
          <div className="visual-topline">
            <span>THE HUMAN BEHIND THE CODE</span>
            <span>01 / INTRO</span>
          </div>

          <div className="portrait-frame">
            <img
  className="portrait-image"
  src="/portrait.png"
  alt="Abhay Varun S."
/>
            <div className="portrait-sticker">CURIOUS<br />BY DESIGN ↗</div>
          </div>

          <div className="visual-caption">
            <div>
              <span className="caption-label">CURRENTLY EXPLORING</span>
              <p>Intelligent systems for the real world.</p>
            </div>
            <span className="caption-index">AV—01</span>
          </div>
        </div>
      </section>

      <section className="focus-section" id="focus">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 — AREAS OF INTEREST</span>
            <h2>Technology with <span>purpose.</span></h2>
          </div>
          <p>
            Exploring how intelligent systems can help solve practical
            problems in agriculture and beyond.
          </p>
        </div>

        <div className="focus-grid">
          <article className="focus-card focus-card-lime">
            <span className="card-number">01</span>
            <span className="card-symbol">◎</span>
            <h3>Computer Vision</h3>
            <p>
              Visual perception, image understanding, and machine
              learning for agricultural applications.
            </p>
            <span className="card-tag">SEE · UNDERSTAND · ACT</span>
          </article>

          <article className="focus-card focus-card-pink">
            <span className="card-number">02</span>
            <span className="card-symbol">✳</span>
            <h3>Agricultural Automation</h3>
            <p>
              Exploring intelligent tools and automated workflows
              for real-world agricultural challenges.
            </p>
            <span className="card-tag">DESIGNED FOR IMPACT</span>
          </article>

          <article className="focus-card focus-card-white">
            <span className="card-number">03</span>
            <span className="card-symbol">↗</span>
            <h3>Quality Grading</h3>
            <p>
              Investigating how data-driven vision systems can
              support produce assessment and grading.
            </p>
            <span className="card-tag">PRECISION THROUGH AI</span>
          </article>
        </div>
      </section>


      <section className="approach-section" id="approach">
        <span className="section-kicker">02 — HOW I THINK</span>
        <h2>Curiosity first.<br /><span>Engineering always.</span></h2>
        <p>
          I’m building my understanding of AI systems by connecting
          machine learning concepts to practical engineering problems.
          This portfolio will grow alongside that journey.
        </p>
      </section>

      <section className="projects-section" id="projects">
        <div className="projects-sidebar">
          <span className="section-kicker">03 / SELECTED SYSTEMS</span>
          <p className="projects-sidebar-note">
            A collection of machine learning systems, datasets,
            and applied research explorations.
          </p>
          <span className="projects-count">07 SYSTEMS / 2026</span>
        </div>

        <div className="projects-content">
          <div className="projects-intro">
            Hover the research systems to inspect
            segmentation previews and model context.
          </div>

          {[
            {
              number: "01",
              title: "Automated Sugarcane Node Cutting Machine",
              description:
                "An intelligent agricultural robotics system for automatic sugarcane cutting, grounded in a healthy versus unhealthy dataset and YOLOv11 evaluation.",
              category: "AGRICULTURAL ROBOTICS / INSTANCE SEGMENTATION",
              stack: "YOLOv11 / Instance segmentation / Computer vision",
            },
            {
              number: "02",
              title: "CoffeeBeanSeg",
              description:
                "A polygon-annotated instance segmentation and quality grading dataset for high-resolution pre-roast Robusta coffee beans, benchmarked with YOLOv11.",
              category: "RESEARCH DATASET / QUALITY GRADING",
              stack: "YOLOv11 / Polygon annotations / Robusta coffee grading",
            },
            {
              number: "03",
              title: "Kannada Hate Speech Detection",
              description:
                "A multimodal hate speech detection framework with a manually collected Kannada dataset.",
              category: "MULTIMODAL NLP / DATASET COLLECTION",
              stack: "NLP / Multimodal fusion / Dataset curation",
            },
            {
              number: "04",
              title: "Unstructured Scene Segmentation for Autonomous Robots",
              description:
                "A YOLOv8-based segmentation model for custom outdoor datasets and real-time inference on a Dell workstation tower with an NVIDIA A4000 GPU.",
              category: "AUTONOMOUS ROBOTICS / OUTDOOR PERCEPTION",
              stack: "YOLOv8 / Segmentation / NVIDIA A4000",
            },
            {
              number: "05",
              title: "YOLO Coffee Bean Grading System",
              description:
                "A YOLOv11 real-time grading pipeline for custom coffee bean datasets.",
              category: "COMPUTER VISION / INSPECTION WORKFLOW",
              stack: "YOLOv11 / Computer vision / Quality grading",
            },
            {
              number: "06",
              title: "ERAGA: Educational RAG Assistant",
              description:
                "A Streamlit-based Retrieval-Augmented Generation system using OpenAI APIs for academic query resolution.",
              category: "GENAI / RETRIEVAL-AUGMENTED GENERATION",
              stack: "OpenAI APIs / RAG / Streamlit",
            },
            {
              number: "07",
              title: "Weather Prediction App",
              description:
                "A forecasting app using LSTM and ARIMA models for temperature and rainfall prediction.",
              category: "FORECASTING / TIME SERIES",
              stack: "LSTM / ARIMA / Streamlit",
            },
          ].map((project) => (
            <article className="project-row" key={project.number} data-reveal>
              <span className="project-number">({project.number})</span>

              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="project-meta">
                <span className="project-category">
                  {project.category}
                </span>
                <span className="project-stack">
                  {project.stack}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="toolkit-section" id="toolkit">
        <div className="toolkit-heading">
          <span className="section-kicker">04 — FOUNDATION & TOOLKIT</span>
          <h2>
            Learning to build.
            <br />
            <span>Building to learn.</span>
          </h2>
          <p>
            An engineering foundation shaped by machine learning,
            computer vision, and practical AI systems.
          </p>
        </div>

        <div className="toolkit-layout">
          <article className="education-card" data-reveal>
            <span className="toolkit-label">EDUCATION / 01</span>

            <div className="education-mark">B.E.</div>

            <h3>Artificial Intelligence and Machine Learning</h3>

            <p className="education-institution">
              Mysore University School of Engineering
            </p>

            <div className="education-bottom">
              <span>Graduation year</span>
              <span className="education-year">2026</span>
            </div>
          </article>

          <div className="skills-panel" data-reveal>
            <div className="skills-panel-heading">
              <span className="toolkit-label">TECHNICAL TOOLKIT / 02</span>
              <span className="skills-count">06 AREAS</span>
            </div>

            <div className="skill-group">
              <span className="skill-index">01</span>
              <div>
                <h3>Computer Vision</h3>
                <p>YOLOv8 · YOLOv11 · Instance segmentation</p>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-index">02</span>
              <div>
                <h3>Data & Annotation</h3>
                <p>Polygon annotations · Dataset curation</p>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-index">03</span>
              <div>
                <h3>Natural Language Processing</h3>
                <p>Multimodal NLP · Hate speech detection</p>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-index">04</span>
              <div>
                <h3>Generative AI</h3>
                <p>Retrieval-Augmented Generation · OpenAI APIs</p>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-index">05</span>
              <div>
                <h3>Time-Series Forecasting</h3>
                <p>LSTM · ARIMA</p>
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-index">06</span>
              <div>
                <h3>Application Development</h3>
                <p>Streamlit · Model inference workflows</p>
              </div>
            </div>
          </div>
        </div>

        <a
          className="github-link"
          href="https://github.com/abhay-error"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <span className="toolkit-label">CODE / EXPERIMENTS / REPOSITORIES</span>
            <strong>Explore my GitHub</strong>
          </span>
          <span className="github-arrow">↗</span>
        </a>
      </section>


      <section className="contact-section" id="contact">
        <div className="contact-topline">
          <span className="section-kicker">05 — GET IN TOUCH</span>
          <span className="contact-status">
            <span className="status-dot" />
            OPEN TO MEANINGFUL CONVERSATIONS
          </span>
        </div>

        <div className="contact-main">
          <div className="contact-copy" data-reveal>
            <h2>
              Have a problem
              <br />
              worth <span>solving?</span>
            </h2>

            <p>
              Interested in AI, computer vision, or agricultural
              automation? Let's connect and explore ideas that
              can make a difference in the real world.
            </p>

            <a
              className="contact-email"
              href="mailto:abhayvarun618@gmail.com"
            >
              abhayvarun618@gmail.com
              <span>↗</span>
            </a>
          </div>

          <div className="contact-links" data-reveal>
            <span className="toolkit-label">FIND ME ONLINE</span>

            <a
              className="contact-link"
              href="https://github.com/abhay-error"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="contact-link-label">01 / CODE</span>
                <strong>GitHub</strong>
              </span>
              <span className="contact-link-arrow">↗</span>
            </a>

            <a
              className="contact-link"
              href="https://www.linkedin.com/in/abhayvaruns/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="contact-link-label">02 / CONNECT</span>
                <strong>LinkedIn</strong>
              </span>
              <span className="contact-link-arrow">↗</span>
            </a>

            <a
              className="contact-link"
              href="mailto:abhayvarun618@gmail.com"
            >
              <span>
                <span className="contact-link-label">03 / SAY HELLO</span>
                <strong>Email</strong>
              </span>
              <span className="contact-link-arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="contact-bottom-note">
          <span>GOOD IDEAS START WITH A CONVERSATION.</span>
          <span>BASED IN INDIA · WORKING TOWARD WHAT'S NEXT.</span>
        </div>
      </section>

      <footer className="footer" data-reveal>
        <a className="wordmark" href="#home" aria-label="Back to homepage">
          AV<span className="wordmark-dot">.</span>
        </a>

        <p>Designed with curiosity. Built with purpose.</p>

        <a className="back-to-top" href="#home">
          BACK TO TOP ↑
        </a>

        <span className="footer-copyright">
          © {new Date().getFullYear()} ABHAY VARUN S.
        </span>
      </footer>

    </main>
  );
}

export default App;
