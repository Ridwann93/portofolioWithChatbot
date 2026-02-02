'use client';

import { useRef } from 'react';
import styles from './styles/mainPage.module.css';
import Chatbot from './components/chatbot';

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* HOME */}
      <section id="home" className={styles.homeSection}>
        <div className={styles.homePage}>
          <div className={styles.leftSide}>
            <div className={styles.leftSideText}>
              <h2>Hi, I am</h2>
              <h1 id='namaSaya'>Ahmad Ridwan</h1>
              <p>a student who is interested in web and application development</p>
              <a
                href="#experience"
                className={`btn btn-primary ${styles.customButton}`}
              >
                Resume
              </a>
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.bigCircleImage}>
              <img src="farid.jpeg" alt="profile" />
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`${styles.section} ${styles.experience}`}>
        <h2>Experience</h2>
        <div className={styles.timeline}>

          <div className={styles.line}></div>

          <div className={styles.item}>
            <span className={styles.date}>December 2021 – March 2022</span>

            <div className={styles.dot}></div>

            <div className={styles.content}>
              <h3>PT. Andromeda Sinergi Komputasi</h3>
              <p className={styles.role}>Internship</p>
              <ul>
                <li>Create static website using html & css</li>
                <li>Create simple CRUD website</li>
              </ul>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.date}>January 2025 – Present</span>

            <div className={styles.dot}></div>

            <div className={styles.content}>
              <h3>CV Nusa Indo Technology</h3>
              <p className={styles.role}>Internship (Currently Ongoing)</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`${styles.section} ${styles.projects}`}>
        <h2>Projects</h2>

        {/* LEFT ARROW */}
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={() =>
            sliderRef.current?.scrollBy({
              left: -window.innerWidth * 0.7,
              behavior: 'smooth',
            })
          }
        >
          ‹
        </button>

        <div className={styles.projectSlider} ref={sliderRef}>
          <div className={styles.projectCard}>
            <img src="static1.jpg" alt="Project 1" />
          </div>

          <div className={styles.projectCard}>
            <img src="static2.jpg" alt="Project 2" />
          </div>

          <div className={styles.projectCard}>
            <img src="static3.jpg" alt="Project 3" />
          </div>
        </div>

        {/* RIGHT ARROW */}
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={() =>
            sliderRef.current?.scrollBy({
              left: window.innerWidth * 0.7,
              behavior: 'smooth',
            })
          }
        >
          ›
        </button>
      </section>



      {/* ABOUT */}
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <h2>About</h2>
          <div className={styles.aboutContentWrapper}>
            <div className={styles.aboutContent}>
            <div className={styles.photo}>
              <img src="farid.jpeg" alt="profile"/>
            </div>
            <div className={styles.description}>
              <h5>Full Name</h5>
              <p>Ahmad Ridwan</p>
              <h5>Address</h5>
              <p>Jl.Pumpungan IV/60 Surabaya</p>
              <h5>Born</h5>
              <p>Surabaya, 03 January 2004</p>
              <h5>Martial Status</h5>
              <p>Single</p>
            </div>
          </div>
          </div>
      </section>
      {/* CHATBOT */}
      <Chatbot />
    </>
  );
}
