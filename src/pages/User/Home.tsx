import "../../styles/Home.css";
import bg from "../../assets/bg.svg";
import grad from "../../assets/Graduation-rafiki.svg";
import Button from "../../components/Button";
import LatestEvent from "../../components/LatestEvent";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const EventsCollection = collection(db, "Events");

  const getEvents = async () => {
    const q = query(EventsCollection, orderBy("date", "desc"), limit(4));
    try {
      const data = await getDocs(q);
      const eventsList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(eventsList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatDate = (date: any) => {
    const formattedDate = date.toDate().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h5>Welcome to the</h5>
          <h1>
            Student <span>Union</span>
          </h1>
          <h4>
            Have a <span>Break</span>. Have an <span>Event</span>
          </h4>
          <Button to="/events">Events</Button>
        </div>
        <div className="hero-image">
          <img src={bg} alt="" />
        </div>
      </section>

      <section className="latest-events">
        <h1>
          <span>Latest</span> Events
        </h1>
        <div className="latest-events-holder">
          {events.map((event) => (
            <LatestEvent>{formatDate(event.date)}</LatestEvent>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="left-side">
          <img src={grad} alt="" />
        </div>
        <div className="right-side">
          <h1>
            About <span>SIST</span>
          </h1>
          <p>
            For 20 Years, SIST has delivered British education in Morocco
            awarding Bachelor, Masters and MBA degrees from Cardiff Metropolitan
            University, and is a unique higher education institute that operates
            entirely in English in Morocco. <br /> SIST students are privileged
            to receive British education and are awarded worldwide recognised
            degrees. <br /> SIST is also accredited by the Ministry of Higher
            Education in Morocco. Our graduates are taking over the English
            business world with their qualifications, fluency in three languages
            and abilities acquired through a British curriculum that teaches
            them the highest standards of professionalism and deliver success to
            any business they join.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
