import "../../styles/About.css";
import bg from "../../assets/me.png";
import ig from "../../assets/ig.png";
import ld from "../../assets/ld.png";
import gm from "../../assets/gmail.png";
import img from "../../assets/Online page-rafiki.png";

function About() {
  return (
    <>
      <section className="about-main">
        <div className="content">
          <h5>Hello, I am</h5>
          <h1>
            Moussaid <span>Yassine</span>
          </h1>
          <h4>
            I am a Full-stack <span>Developer</span>
          </h4>
          <p>
            I design and develop services for customers of all sizes, <br />
            specializing in creating stylish, modern websites, web services{" "}
            <br /> and online stores.
          </p>
          <div className="sm">
            <img src={gm} alt="" />
            <img src={ig} alt="" />
            <img src={ld} alt="" />
          </div>
        </div>
        <div className="my-image">
          <img src={bg} alt="" />
        </div>
      </section>

      <section className="skills">
        <h1>
          <span>WHAT I</span> DO?
        </h1>
        <div className="skills-holder">
          <SkillBlock
            text="Web Dev"
            Icon={<i className="fa-solid fa-laptop-code"></i>}
          />
          <SkillBlock
            text="Mobile Dev"
            Icon={<i className="fa-solid fa-mobile-screen"></i>}
          />
          <SkillBlock
            text="Data Security"
            Icon={<i className="fa-solid fa-database"></i>}
          />
        </div>
      </section>

      <section className="about-section">
        <div className="left-side">
          <img src={img} alt="" />
        </div>
        <div className="right-side">
          <h1>
            About The<span> Website</span>
          </h1>
          <p>
            This website is a platform for the SIST Student Union, where both <br />
            normal users and administrators can access information about
            upcoming <br /> events. Normal users can view upcoming events, while
            administrators <br /> have the ability to log in, register, edit, delete,
            and add new events to <br /> the website. Overall, the website serves as a
            central hub for <br /> communication and organization within the student
            union.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;

function SkillBlock({text, Icon}:any) {
  return (
    <div className="skill-block">
      {Icon}
      <h2>{text}</h2>
    </div>
  );
}
