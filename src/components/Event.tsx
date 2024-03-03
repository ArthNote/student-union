import { Link } from "react-router-dom";

function Event({
  Img,
  time,
  date,
  location,
  name,
  description,
  author,
  loggedIn,
  id,
  click
}: any) {
  return (
    <div className="event">
      <div className="event-img">
        <img src={Img} alt="" />
      </div>
      <div className="event-content">
        <div className="info">
          <h3>
            {time} {date}
          </h3>
          <div className="seperator"></div>
          <h3>
            <span>
              <i className="fa-solid fa-location-dot"></i>
              {location}
            </span>
          </h3>
          {loggedIn ? (
            <div className="icons">
              <Link to={`/edit-event/${id}`}>
                <i className="fa-solid fa-pen"></i>
              </Link>
              <i className="fa-solid fa-trash" onClick={click}></i>
            </div>
          ) : null}
        </div>
        <div className="name-desc">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <div className="view-more">
          <h1>
            <i className="fa-solid fa-user-pen"></i>
            {author}
          </h1>
          <Link to="">View More</Link>
        </div>
      </div>
    </div>
  );
}

export default Event;
