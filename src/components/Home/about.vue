<template>
  <div class="container">
    <div class="top-row">
      <div class="content-section">
        <!-- About Section -->
        <section class="section">
          <h1 class="section-title">About Me</h1>
          <div class="about-section">
            <p class="tagline">Senior Front-End Engineer building better web experiences</p>
            <p class="section-text">
              I specialize in crafting accessible, high-performance web applications that solve real business challenges. 
              With a passion for clean code and user-centric design, I bridge technical execution with strategic vision 
              to deliver products that scale and empower.
            </p>
          </div>
        </section>

        <!-- Current Work -->
        <section>
          <h1 class="section-title">Current Work</h1> 
          <div class="current-work">
            <p class="section-text">
              I currently work as a Senior Front-End Engineer at <a href="https://www.modelop.com" target="_blank" class="link">ModelOp</a>, 
              an enterprise AI governance platform trusted by Fortune 100 companies and regulatory bodies. 
              My work focuses on creating robust solutions that enable large organizations to effectively manage 
              and operationalize their AI initiatives at scale.
            </p>       
 
          </div>
        </section>
      </div>

      <!-- Profile Image -->
      <div class="image-section">
        <img class="profile-image" src="../../assets/Will_Richards.jpg" alt="Will Richards portrait">
        <div class="signature-container">
          <div class="signature typed-out">William Richards</div>
        </div>
      </div>
    </div>

                <section class="work-highlights">
              <h2  >Key Contributions</h2>
              <ul class="highlight-list">
                <li>Own and lead development of core application workflows including model lifecycle management, compliance reporting, and AI Use Case pages</li>
                <li>Collaborate directly with Fortune 100 executive teams to solve complex integration challenges and unique business needs</li>
                <li>Championed WCAG 2.2 AA compliance across entire platform</li>
              </ul>
            </section>

    <!-- Previous Experience -->
    <section class="section">
      <h1 class="section-title">Previous Work Experience</h1>
      <p class="section-text">
        Before ModelOp, I spent 3 years as a software developer for the 
        <a href="http://marthlab.org" target="_blank" class="link">Marth Lab</a> and 1.5 years developing software for computational genetic discovery. 
        I also gained 1.5 years of experience as a web developer on the 
        <a href="http://iobio.io/" target="_blank" class="link">iobio</a> team, building diagnostic tools and visualizations for clinicians.
      </p>
    </section>

    <!-- Projects -->
    <section class="section">
      <h1 class="section-title">Featured Projects</h1>
      
      <div class="project-category">
        <h2 class="subheading">Web Applications</h2>
        <ul class="project-list">
          <li> 
            <a href="https://pedigree.iobio.io" target="_blank" class="link">pedigree.iobio.io</a>
            <p class="project-description">Author of pedigree visualization with interactive genotype/phenotype regression analysis.</p>
          </li>
          <li>
            <a href="https://gene.iobio.io" target="_blank" class="link">gene.iobio.io</a>
            <p class="project-description">Developer for web application used to investigate potential disease-causing variants.</p>
          </li>
          <li>
            <a href="https://clin.iobio.io" target="_blank" class="link">clin.iobio.io</a>
            <p class="project-description">Developer for a web application guiding clinicians through a diagnostic genomic analysis workflow.</p>
          </li>
        </ul>
      </div>

      <div class="project-category">
        <h2 class="subheading">Backend Software</h2>
        <div class="columns">
          <div class="column">
            <ul class="project-list">
              <li>
                <a href="https://github.com/WilliamRichards2017/RufAlu" target="_blank" class="link">Alu variant detection</a>
                <p class="project-description">Author of Alu mobile element detection plugin for de novo variant caller (C++11).</p>
              </li>
              <li>
                <a href="https://github.com/WilliamRichards2017/Twofus" target="_blank" class="link">Structural variant detection</a>
                <p class="project-description">Author of structural variant detection plugin for de novo variant caller (C++11).</p>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="project-list">
              <li>
                <a href="https://github.com/WilliamRichards2017/pdxFilter" target="_blank" class="link">PDX contamination filter</a>
                <p class="project-description">Author of filter leveraging CNN pipeline to filter murine contamination (Python 3).</p>
              </li>
              <li>
                <a href="https://github.com/jandrewrfarrell/RUFUS" target="_blank" class="link">De novo variant caller</a>
                <p class="project-description">Developer for k-mer based de novo variant caller (C++11).</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="section">
      <h1 class="section-title">Education</h1>
      <p class="section-text">
        I graduated from 
        <a href="http://carleton.edu" target="_blank" class="link">Carleton College</a> 
        with a degree in Computer Science in July 2017. 
      </p>
    </section>

    
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
}

.top-row {
  display: flex;
  gap: 3rem;
  align-items: flex-start; /* Align sections at the top */
}

/* Section Styles */
.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2a2a2a;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: #2a70c2;
}

/* Tagline */
.tagline {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2a70c2;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 3px solid #2a70c2;
}

li > a, ul > li {
  font-size: 1.2em
}

/* Text Elements */
.section-text {
  line-height: 1.6;
  color: #444;
  margin-bottom: 1.5rem;
  max-width: 75ch;
}

/* Work Highlights */
.work-highlights {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.highlight-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.highlight-list li {
  padding: 0.75rem 0;
  border-top: 1px solid #eee;
}


/* Projects */
.project-category {
  margin: 2rem 0;
}

.subheading {
  font-size: 1.5rem;
  color: #2a2a2a;
  margin: 1.5rem 0;
}

.project-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.project-list li {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.project-description {
  margin: 0.5rem 0 0 0;
  color: #666;
}

/* Columns */
.columns {
  display: flex;
  gap: 2rem;
}

.column {
  flex: 1;
}

/* Links */
.link {
  color: #2a70c2;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.link:hover {
  color: #357abd;
  text-decoration: underline;
}

/* Profile Image */
.profile-image {
  width: 100%;
  max-width: 350px;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Signature */
.signature {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #2a2a2a;
  text-align: center;
  margin-top: 1rem;
}

.image-section {
  display: flex;
  flex-direction: column;
      align-items: center;

}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .top-row {
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 2rem;
  }

  .profile-image {
    max-width: 250px;
  }

  
  .image-section,
  .content-section {
    width: 100% !important;
  }
  
  .columns {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .tagline {
    font-size: 1.1rem;
  }
    .signature {
    font-size: 1.8rem;
  }
  .typed-out {
    font-size: 1.4rem;
  }
}



/* Add these animation styles at the end of your CSS */
.typed-out {
  overflow: hidden;
  border-right: 0.15em solid black;
  white-space: nowrap;
  font-size: 1.6rem;
  width: 0;
  animation: 
    typing 2.5s steps(32, end) forwards,
    blink-cursor 0.7s step-end infinite,
    hide-cursor 5s forwards;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-cursor {
  from, to { border-color: transparent; }
  50% { border-color: black; }
}

@keyframes hide-cursor {
  to { border-right-color: transparent; }
}

.signature-container {
  display: inline-block;
}

.signature {
  font-family: 'Dancing Script', cursive;
  color: #2a2a2a;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding: 0 15px;
  opacity: 0.9;
  margin-left:  0.15em;
  font-size: 2.2rem;
}

</style>

