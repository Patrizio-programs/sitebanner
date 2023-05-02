import React, { useState, useEffect } from "react";
import axios from "axios";
import "evo-calendar";
import $ from "jquery";

function Events() {
  const [events, setEvents] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    axios
      .get("https://proxy.cors.sh/https://dyslexiaallianceforblackchildren.org/_functions/calendarEvents", {
        headers: {
          "x-cors-api-key": "temp_edcf08722756a6558a018dc8453ce6c5",
        },
      })
      .then((response) => {
        setEvents(response.data["items"]);
        setDataFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {

    const eventLinks = events.map(event => event['link-courses-title']);

    console.log(eventLinks)
    console.log(events)

    if (dataFetched) {
      const calendarEvents = events.map((event) => {
        const courseLink = event['link-courses-title']; // get the course link
        
        // create a clickable link with the course link as href
        const courseLinkHtml = courseLink ? `<a href="https://www.dyslexiaallianceforblackchildren.org/${courseLink}" target="_blank">Course Link</a>` : '';
        
        // append the course link to the event description
        const descriptionWithLink = `${event.shortEventDescription} ${courseLinkHtml}`;
        
        return {
          id: event.id,
          name: event.title,
          description: descriptionWithLink,
          date: event.eventDate,
          type: "event",
        };
      });

     
      $("#calendar").evoCalendar({
        format: "yyyy-mm-dd",
        calendarEvents: calendarEvents,
      });
    }
  }, [dataFetched, events]);

  return (
    <div>
      <h1>Events</h1>
      <div id="calendar"></div>
    </div>
  );
}

export default Events;
