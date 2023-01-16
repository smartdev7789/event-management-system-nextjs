import { Layout } from "components";
import { Calendar, AddEvent, EditEvent } from "components/calendar";
import { CalendarProvider } from "context";
import React from "react";

const Index = () => {
  return (
    <CalendarProvider>
      <Layout>
        <Calendar />
        <AddEvent />
        <EditEvent/>
      </Layout>
    </CalendarProvider>
  );
};

export default Index;
