import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [event, setEvent] = useState(null);





  useEffect(() => {
    axios
      .get("https://proxy.cors.sh/https://dyslexiaallianceforblackchildren.org/_functions/calendarEvents", {
        headers: {
          'x-cors-api-key': 'temp_edcf08722756a6558a018dc8453ce6c5'
        },
      })
      .then((response) => response.data)
      .then((data) => {
        const today = new Date();
        const closestEvent = data.items.reduce((closest, current) => {
          const eventDate = new Date(current.eventDate);
          const timeDiff = eventDate.getTime() - today.getTime();
          const dayDiff = timeDiff / (1000 * 3600 * 24);
          if (dayDiff >= 0 && dayDiff < closest.dayDiff) {
            return { event: current, dayDiff: dayDiff };
          } else {
            return closest;
          }
        }, { event: null, dayDiff: Infinity }).event;
        setEvent(closestEvent);
       

        
      });
  }, []);

  if (!event) {
    return null; // or return a loading spinner or message
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="bg-light text-danger py-3 px-4 shadow-lg">
          <h5 className="mb-0">{event.title}</h5>
          <div className="d-flex justify-content-between align-items-end mt-2">
            <div className="flex-grow-1">
              <p className="mb-0">{event.shortEventDescription}</p>
            </div>
            <div>
            <p className="mb-0 border border-primary border-1">{event.eventDate}</p>
            

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
