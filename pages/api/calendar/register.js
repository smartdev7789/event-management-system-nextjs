import { apiHandler, eventsRepo } from "helpers/api";

const register = (req, res) => {
  const { userid, ...rest } = req.body;
  const newEvent = { ...rest, userid };

  eventsRepo.create(newEvent);
  return res.status(200).json(newEvent);
};

export default apiHandler({
  post: register,
});
