const fs = require("fs");

let events = require("data/events.json");

const create = (event) => {
  event.id = events.length ? Math.max(...events.map((x) => x.id)) + 1 : 1;

  event.dateCreated = new Date().toISOString();
  event.dateUpdated = new Date().toISOString();

  events.push(event);
  saveData();
};

const update = (id, params) => {
  const event = events.find((x) => x.id.toString() === id.toString());

  event.dateUpdated = new Date().toISOString();

  Object.assign(event, params);
  saveData();
};

const _delete = (id) => {
  events = events.filter((x) => x.id.toString() !== id.toString());
  saveData();
};

const saveData = () => {
  fs.writeFileSync("data/events.json", JSON.stringify(events, null, 4));
};

export const eventsRepo = {
  getById: (id) => events.find((x) => x.id.toString() === id.toString()),
  getByUserId: (id) => events.filter((x) => x.userid.toString() === id.toString()),
  find: (x) => events.find(x),
  create,
  update,
  delete: _delete,
};
