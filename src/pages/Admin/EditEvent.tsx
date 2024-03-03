import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import "../../styles/AddEvent.css";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Event } from "../../models/Event";

function EditEvent() {
  const params = useParams();
  const eventId = params.id;

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const EventsCollection = collection(db, "Events");
  const docRef = doc(EventsCollection, eventId);

  const getEvent = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const event = docSnap.data();
        setName(event.name);
        setTime(event.time);
        const date = event.date.toDate();
        const formattedDate = date.toISOString().slice(0, 10);
        setDate(formattedDate);
        setLocation(event.location);
        setDescription(event.description);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);
  const navigate = useNavigate();

  const editEvent = async () => {
    if (!name || !time || !date || !location || !description) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await updateDoc(docRef, {
        name: name,
        time: time,
        date: Timestamp.fromDate(new Date(date)),
        location: location,
        description: description,
      });
      navigate("/admin-events");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="add-event">
      <h1>Edit Event</h1>
      <form action="">
        <div className="add-event-inputs">
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="time"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input type="file" placeholder="Image" />
        </div>
        <div className="add-event-btn">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button click={editEvent}>Edit</Button>
        </div>
      </form>
    </section>
  );
}

export default EditEvent;
