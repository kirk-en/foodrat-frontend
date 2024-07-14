import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import kirk from "../../assets/kirk.jpg";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="about">
        <section className="about__left">
          <img
            src={kirk}
            alt="a headshot portrait of a person standing on a balcony"
            className="about__photo"
          />
        </section>
        <section className="about__right">
          <p className="about__text">Welcome to FoodRat 👋</p>

          <p className="about__text">
            I’m Kirk, a full-stack developer based in New York City. I built
            FoodRat as a capstone project for BrainStation’s Software
            Engineering Immersive after receiving a full scholarship to the
            program in early 2024. FoodRat leverages many of the technologies
            I've learned including React, Node.js, Axios, and SQL.
          </p>

          <p className="about__text">
            The idea behind FoodRat emerged from my personal experiences of
            being stuck with limited dinner options during late nights dedicated
            to learning to become a software engineer. This project allowed me
            to tackle a practical problem while working with a large,
            continuously updated dataset.
          </p>

          <p className="about__text">
            I particularly enjoyed the challenge of implementing custom map
            styling and integrating unique markers with the Google Maps API.
            Throughout the development process, I focused on efficiently
            managing API calls through a custom debouncing script, resulting in
            a more responsive user experience.
          </p>

          <p className="about__text">
            I hope you enjoy FoodRat! I believe it reflects my passion as a
            maker and my commitment to creating tools that are fun and enhance
            everyday life. I am eager to pivot towards new opportunities, learn
            from experienced software engineers, and contribute my skills to
            impactful projects. I would love to connect!
          </p>
          <ul className="about__links">
            <li className="about__link-item">
              <a href="https://github.com/kirk-en">
                <img src={github} alt="github" className="about__icon" />
              </a>
            </li>
            <li className="about__link-item about__link-item--sq">
              <a href="https://www.linkedin.com/in/kirkenbysk/">
                <img src={linkedin} alt="linkedin" className="about__icon" />
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer supportedRegion={true} />
    </>
  );
};

export default AboutPage;
