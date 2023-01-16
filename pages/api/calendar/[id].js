import { apiHandler, eventsRepo } from "helpers/api";

const getByUserId = (req, res) => {
  const events = eventsRepo.getByUserId(req.query.id);

  if (!events) throw "Event Not Found";

  return res.status(200).json(events);
};

const update = (req, res) => {
  const data = req.body;
  eventsRepo.update(req.query.id, { ...data });
  return res.status(200).json({});
};

const _delete = (req, res) => {
  eventsRepo.delete(req.query.id);
  return res.status(200).json({});
};

export default apiHandler({
  get: getByUserId,
  put: update,
  delete: _delete,
});
