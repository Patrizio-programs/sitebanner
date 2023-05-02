import React, { useState, useEffect } from "react";
import axios from "axios";
import RevoCalendar from 'revo-calendar'
import dayjs from "dayjs";
import { Carousel } from "react-bootstrap";
import "./Events.css"

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

  function newEvent(name, date, allDay, extra) {
    return {
      name,
      date,
      allDay,
      extra: {
        text: extra.description,
        html: extra.courseLinkHtml,
      },
    };
  }
  
  const calendarEvents = events.map((event) => {
    const courseLink = event['link-courses-title'];
    const courseLinkHtml = courseLink ? `<a href="https://www.dyslexiaallianceforblackchildren.org/${courseLink}" target="_blank">Event Link</a>` : '';
    const description = event.shortEventDescription;
    const name = event.title;
    const dateStr = event.eventDate;
    const date = dayjs(dateStr).toDate();
    const allDay = true;
    const extra = {
      description,
      courseLinkHtml,
    };
  
    return newEvent(name, date, allDay, extra);
  });
  
  const revoCalendarProps = {
    events: calendarEvents,
    lang: "en",
    primaryColor: "#4F6995",
    secondaryColor: "#D7E6EE",
    todayColor: "#3B3966",
    textColor: "#333333",
    indicatorColor: "orange",
    animationSpeed: 300,
    sidebarWidth: 180,
    detailWidth: 280,
    showDetailToggler: true,
    showSidebarToggler: true,
    onePanelAtATime: false,
    openDetailsOnDateSelection: true,
    timeFormat24: true,
    showAllDayLabel: false,
    detailDateFormat: "YYYY/MM/DD",
  };
  
  return <div>
  <RevoCalendar {...revoCalendarProps} />
  <Carousel className="carousel-container" indicators={false}>
        {calendarEvents.map((event) => (
          <Carousel.Item key={event.name}>
            <h4>{event.name}</h4>
            <p>{event.extra.text}</p>
            <div dangerouslySetInnerHTML={{ __html: event.extra.html }} />
            <p>{dayjs(event.date).format("YYYY/MM/DD")}</p>
          </Carousel.Item>
        ))}
      </Carousel>


  </div> ;
      }

export default Events;