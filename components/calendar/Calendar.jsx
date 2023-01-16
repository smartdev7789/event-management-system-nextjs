import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { calendarService } from "services";
import { CalendarContext } from "context";

export const Calendar = () => {
  const { setIsAddModalOpen, setIsEditModalOpen, setInfo, events } =
    useContext(CalendarContext);

  const handleSelect = (info) => {
    setIsAddModalOpen(true);
    setInfo({ start: info.start, end: info.end });
  };

  const EventItem = ({ info }) => {
    const { event } = info;
    const handlerClick = () => {
      setIsEditModalOpen(true);
      setInfo({
        id: event.id,
        title: event.title,
        userid: event.extendedProps.userid,
        dateCreated: event.extendedProps.dateCreated,
      });
    };
    return (
      <Button onClick={handlerClick} type="ghost" block>
        {event.title}
      </Button>
    );
  };

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[daygridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </div>
  );
};
