function LatestEvent({ children, Image }: any) {
  const myStyle = {
    backgroundImage: `url("${Image}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
        <div className="event-block" style={myStyle}>
          <h2>{children}</h2>
        </div>
    </div>
  );
}

export default LatestEvent;
