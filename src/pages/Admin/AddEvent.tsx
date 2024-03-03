import { useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import "../../styles/AddEvent.css"
import { Timestamp, addDoc , collection } from "firebase/firestore";
import { Event } from "../../models/Event";

function AddEvent() {

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const EventsCollection = collection(db, "Events");
  const navigate = useNavigate();

  const addEvent = async () =>{
    if (!name || !time || !date || !location || !description) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const newEvent: Event = {
        name,
        description,
        date: Timestamp.fromDate(new Date(date)),
        time,
        location,
      };
      
      await addDoc(EventsCollection, newEvent);
      navigate("/admin-events");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="add-event">
      <h1>Add Event</h1>
      <form action="">
        <div className="add-event-inputs">
          <input
            type="text"
            placeholder="Event Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="time"
            placeholder="Time"
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input type="file" placeholder="Image" />
        </div>
        <div className="add-event-btn">
          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button click={addEvent}>Add</Button>
        </div>
      </form>
    </section>
  );
}

export default AddEvent