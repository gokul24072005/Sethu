import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <article>
          <h3>Get In Touch</h3>
          <p>3rd Floor, Aruvi Arcade Complex, 5th Cross Thillainagar, Trichy</p>
          <p>
            <a href="mailto:innovativezone.tech@gmail.com">innovativezone.tech@gmail.com</a>
          </p>
          <p>
            <a href="tel:+919943077284">+91-9943077284</a>
          </p>
        </article>

        <article>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/website-development">Website Development</a>
            </li>
            <li>
              <a href="/digital-election-campaign">Digital Election Campaign</a>
            </li>
            <li>
              <a href="/bulk-sms">Bulk SMS</a>
            </li>
            <li>
              <a href="/clients">Clients</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </article>

        <article>
          <h3>Popular Links</h3>
          <ul>
            <li>
              <a href="https://sms.izonegroups.com" target="_blank" rel="noreferrer">
                Bulk SMS Panel
              </a>
            </li>
            <li>
              <a href="https://voice.izonegroups.com" target="_blank" rel="noreferrer">
                Bulk Voice Panel
              </a>
            </li>
            <li>
              <a href="https://whatsapp.izonegroups.com" target="_blank" rel="noreferrer">
                Bulk Whatsapp Panel
              </a>
            </li>
          </ul>
        </article>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} - IZone Technologies. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
