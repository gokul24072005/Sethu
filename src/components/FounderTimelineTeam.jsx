import React, { useEffect } from 'react';
import './FounderTimelineTeam.css';

function FounderTimelineTeam() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  const team = [
    { initials: 'SC', name: 'Sarah Chen', title: 'CTO', desc: 'Full-stack expert passionate about scalable architecture.' },
    { initials: 'MR', name: 'Michael Rodriguez', title: 'Lead Designer', desc: 'Award-winning designer focused on user experience.' },
    { initials: 'EJ', name: 'Emily Johnson', title: 'Project Manager', desc: 'Agile enthusiast ensuring seamless project delivery.' },
    { initials: 'DK', name: 'David Kim', title: 'Senior Developer', desc: 'React specialist with a love for clean code.' },
    { initials: 'LW', name: 'Lisa Wang', title: 'UX Researcher', desc: 'Data-driven designer advocating for user needs.' },
    { initials: 'JM', name: 'James Miller', title: 'DevOps Engineer', desc: 'Cloud infrastructure specialist ensuring 99.9% uptime.' }
  ];

  const timeline = [
    { year: '2014', title: 'Founded', desc: 'Izone Technologies was born with a vision to transform digital experiences.' },
    { year: '2016', title: 'First Major Client', desc: 'Partnered with Fortune 500 company for enterprise solution.' },
    { year: '2018', title: 'Team Expansion', desc: 'Grew to 35+ team members across multiple countries.' },
    { year: '2020', title: 'Global Reach', desc: 'Expanded operational capabilities to global markets.' },
    { year: '2022', title: 'Industry Award', desc: 'Recognized with premier awards for excellence in digital services.' },
    { year: '2024', title: 'Innovation Hub', desc: 'Launched state-of-the-art innovation center for future tech.' }
  ];

  return (
    <div className="founder-timeline-team-wrapper">
      <section className="founder-spotlight-section">
        <div className="container">
          <div className="founder-card">
            <div className="founder-card-offset"></div>
            <div className="founder-card-content animate-on-scroll">
              <div className="founder-image-col">
                <div className="founder-image-box">
                  <div className="founder-badge">👑</div>
                  <img src="/pics/CEO.png" alt="Mr.B.Kesavan M.E - CEO" />
                </div>
              </div>
              <div className="founder-text-col">
                <span className="founder-pill">Leadership</span>
                <h2 className="founder-name">Mr.B.Kesavan M.E</h2>
                <h3 className="founder-title">Founder/CEO</h3>
                <p className="founder-bio">
                  Visionary leader with 15+ years of experience in the tech industry. 
                  Kesavan founded Izone Technologies with a mission to democratize world-class 
                  web development and help businesses of all sizes achieve digital excellence.
                </p>
                <div className="founder-metrics">
                  <div className="metric">
                    <strong>15+</strong>
                    <span>Years Experience</span>
                  </div>
                  <div className="metric">
                    <strong>200+</strong>
                    <span>Projects Led</span>
                  </div>
                  <div className="metric">
                    <strong>200+</strong>
                    <span>Team Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-grid-section">
        <div className="container">
          <div className="section-header-center">
            <div className="team-icon-wrapper">
              <span className="team-icon">👋</span>
            </div>
            <p className="green-section-label">Our Team</p>
            <h2>Meet the Experts</h2>
          </div>
          
          <div className="team-cards-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card animate-on-scroll">
                <div className="team-card-header">
                  <div className="team-avatar">{member.initials}</div>
                  <div className="team-name-title">
                    <h4>{member.name}</h4>
                    <span>{member.title}</span>
                  </div>
                </div>
                <p className="team-desc">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="section-header-center">
            <p className="green-section-label">Our Journey</p>
            <h2>Company Timeline</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            {timeline.map((item, index) => (
              <div key={index} className={`timeline-item animate-on-scroll ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">📅 {item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FounderTimelineTeam;
