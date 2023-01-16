import React, { useEffect, useState } from "react";
import { calendarService } from "services";

const initialState = {
  isAddModalOpen: false,
  setIsAddModalOpen: () => {},
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  info: {},
  setInfo: () => {},
  events: [],
  setEvents: () => {},
};

export const CalendarContext = React.createContext(initialState);

export const CalendarProvider = ({ children }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    calendarService.getAll().then((x) => setEvents([...x]));
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        isAddModalOpen,
        setIsAddModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        info,
        setInfo,
        events,
        setEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
