import "../../styles/Events.css";
import Img from "../../assets/pizza.svg";
import Event from "../../components/Event";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

function Events() {
  const [upcomingClicked, setUpcomingClicked] = useState(false);
  const [pastClicked, setPastClicked] = useState(false);

  const handleUpcoming = () => {
    setUpcomingClicked(true);
    setPastClicked(false);
  };

  const handlePast = () => {
    setPastClicked(true);
    setUpcomingClicked(false);
  };

  const EventsCollection = collection(db, "Events");

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const currentDate = new Date();

  const getUpcomingEvents = async () => {
    const q = query(EventsCollection, where("date", ">=", currentDate));
    try {
      const data = await getDocs(q);
      const eventsList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUpcomingEvents(eventsList);
    } catch (error) {
      console.error(error);
    }
  };

  const getPastEvents = async () => {
    const q = query(EventsCollection, where("date", "<", currentDate));
    try {
      const data = await getDocs(q);
      const eventsList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPastEvents(eventsList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingEvents();
    getPastEvents();
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
      <section className="events">
        <section className="events-img">
          <h1>EVENTS</h1>
        </section>
        <section className="events-section">
          <div className="tabs">
            <div
              className={upcomingClicked ? "tab left active" : "tab left"}
              onClick={handleUpcoming}
            >
              <h1>Upcoming Events</h1>
            </div>

            <div
              className={pastClicked ? "tab right active" : "tab right"}
              onClick={handlePast}
            >
              <h1>Past Events</h1>
            </div>
          </div>

          <div className="events-lists">
            <div
              className="events-list"
              id="upcoming"
              style={{ display: upcomingClicked ? "block" : "none" }}
            >
              {upcomingEvents.map((event) => (
                <Event
                  Img={Img}
                  time={event.time}
                  date={formatDate(event.date)}
                  location={event.location}
                  name={event.name}
                  description={event.description}
                  author="Yassine Moussaid"
                  loggedIn={false}
                  id={event.id}
                />
              ))}
            </div>
            <div
              className="events-list"
              id="past"
              style={{ display: pastClicked ? "block" : "none" }}
            >
              {pastEvents.map((event) => (
                <Event
                  Img={Img}
                  time={event.time}
                  date={formatDate(event.date)}
                  location={event.location}
                  name={event.name}
                  description={event.description}
                  author="Yassine Moussaid"
                  loggedIn={false}
                  id={event.id}
                />
              ))};
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Events;
