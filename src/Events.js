import React, { useState, useEffect } from "react";
import axios from "axios";
import "evo-calendar";
import $ from "jquery";

function Events() {
  const [events, setEvents] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  function extractImageUrl(wixUrl) {
    const regex = /\/\/v1\/(.+?)\//;
    const match = wixUrl.match(regex);
    if (match) {
      return `https://static.wixstatic.com/media/${match[1]}`;
    }
    return null;
  }

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

    const eventImages = events.map(event => event.image).map(url => extractImageUrl(url));
    console.log(eventImages)
    if (dataFetched) {
      const calendarEvents = events.map((event) => {
        return {
          id: event.id,
          name: event.title,
          description: event.shortEventDescription,
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
