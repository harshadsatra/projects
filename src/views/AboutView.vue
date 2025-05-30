<template>
  <section class="content about-view">
    <div class="terminal-content">
      <div class="command-line">
        <span class="prompt">harshad@developer:~$</span>
        <span class="command typing-animation">cat About Me.txt</span>
      </div>

      <div class="output">
        <div class="section-header">Personal Information</div>
        <div class="info-grid">
          <div class="info-label">Name:</div>
          <div class="info-value">Harshad Satra</div>

          <div class="info-label">Title:</div>
          <div class="info-value">Lead Frontend Developer</div>

          <div class="info-label">Location:</div>
          <div class="info-value">Mumbai, Maharashtra, India</div>

          <div class="info-label">Email:</div>
          <div class="info-value">harshad.satra2@gmail.com</div>

          <div class="info-label">Experience:</div>
          <div class="info-value">11+ Years</div>
        </div>
      </div>

      <div class="output">
        <div class="section-header">Professional Summary</div>
        <p class="p-0">
          Accomplished Senior Frontend Engineer with 11+ years of experience building
          high-performance web applications using Vue.js, React, Next.js, TypeScript, and GraphQL.
          Led UI development for DocuX, reducing load times by 40% and driving 20% traffic growth
          through SEO and Web Accessibility (WCAG 2.1). Spearheaded agile teams of 5 developers,
          mentoring 3 juniors and collaborating cross-functionally to prioritize features, boosting
          user engagement by 25% and customer retention by 15%.
        </p>
      </div>

      <div class="output">
        <div class="section-header">Technical Skills</div>

        <div class="skill-category">
          <div class="skill-title">Languages & Core:</div>
          <div class="skill-list">HTML5, CSS3, SASS, JavaScript, TypeScript, AJAX</div>
        </div>

        <div class="skill-category">
          <div class="skill-title">Frameworks & Libraries:</div>
          <div class="skill-list">
            Vue.js, Nuxt.js, React, Next.js, Angular, Redux, React Hooks, Tailwind CSS, Bootstrap,
            GSAP, Lottie
          </div>
        </div>

        <div class="skill-category">
          <div class="skill-title">Tools & DevOps:</div>
          <div class="skill-list">
            VS Code, Cursor, Webpack, Vite, Docker, Jest, Vitest, GitHub, GitLab, AWS, Azure, GCP
          </div>
        </div>

        <div class="skill-category">
          <div class="skill-title">Methodologies:</div>
          <div class="skill-list">
            Agile, Scrum, CI/CD, TDD, E2E Testing, A/B Testing, RICE Framework
          </div>
        </div>
      </div>

      <div class="output">
        <div class="section-header">Professional Experience</div>

        <div class="experience-item">
          <div class="job-title">Frontend Software Developer</div>
          <div class="company-period">DocuX | June 2020 – Feb 2025</div>
          <div class="achievement">
            Architected scalable document management platform using Vue.js, Nuxt.js, and micro
            frontends
          </div>
          <div class="achievement">
            Reduced load times by 40% and improved Lighthouse scores by 15%
          </div>
          <div class="achievement">Led 5 developers in agile sprints, achieving 99.9% uptime</div>
          <div class="achievement">
            Increased traffic by 20% and supported 50,000+ monthly active users
          </div>
          <div class="achievement">Reduced churn by 10% and increased MRR by 12%</div>
        </div>

        <div class="experience-item">
          <div class="job-title">Frontend Specialist</div>
          <div class="company-period">Yellow Slice | January 2018 – May 2020</div>
          <div class="achievement">
            Developed responsive websites achieving 100% client satisfaction across 10+ projects
          </div>
          <div class="achievement">
            Improved load speeds by 25% and conversion rates by 12% via A/B testing
          </div>
          <div class="achievement">Enhanced SEO and organic traffic by 15%</div>
        </div>

        <div class="experience-item">
          <div class="job-title">Front End Developer</div>
          <div class="company-period">Yellow Slice | Sep 2013 - Jun 2017</div>
          <div class="achievement">
            Developed responsive websites achieving 95% client satisfaction across 15 projects
          </div>
          <div class="achievement">
            Increased organic traffic by 20% through performance optimization
          </div>
        </div>
      </div>

      <!-- <div class="output">
        <div class="section-header">Featured Projects</div>

        <div class="project-item">
          <div class="project-name">Inordinary</div>
          <div class="project-description">
            E-commerce platform with custom WordPress theme and WooCommerce integration, increasing
            sales by 18%
          </div>
        </div>

        <div class="project-item">
          <div class="project-name">Bridge Postworks</div>
          <div class="project-description">
            Portfolio site using Nuxt.js and Directus CMS, serving 500+ monthly users
          </div>
        </div>

        <div class="project-item">
          <div class="project-name">Lokall Place</div>
          <div class="project-description">
            Dynamic Next.js website with GSAP animations, achieving 2-second load times
          </div>
        </div>

        <div class="project-item">
          <div class="project-name">Early Man Films</div>
          <div class="project-description">
            Dynamic website with Node.js backend and Vue.js frontend, supporting 1000+ visitors
            monthly
          </div>
        </div>
      </div> -->

      <div class="output">
        <div class="section-header">Education & Certifications</div>
        <div class="info-grid">
          <div class="info-label">Degree:</div>
          <div class="info-value">B.Sc. Information Technology, University of Mumbai (2013)</div>

          <div class="info-label">Recent Certs:</div>
          <div class="info-value">
            Vue Complete Guide (Udemy), Google AI Essentials (Coursera), MongoDB Developer Path
          </div>
        </div>
      </div>

      <div class="output">
        <div class="section-header">Connect With Me</div>
        <div class="contact-links">
          <a href="https://www.harshadsatra.in/" class="contact-link" target="_blank">Website</a>
          <a href="https://github.com/harshadsatra" class="contact-link" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/harshadsatra/" class="contact-link" target="_blank"
            >LinkedIn</a
          >
          <a href="mailto:harshad.satra2@gmail.com" class="contact-link">Email</a>
          <RouterLink class="contact-link" to="/">Projects</RouterLink>
        </div>
      </div>

      <div class="command-line" style="margin-top: 40px">
        <span class="prompt">harshad@developer:~$</span>
        <span class="cursor"></span>
      </div>
    </div>
  </section>
</template>
