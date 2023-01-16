import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/calendar`;

const register = (event) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return fetchWrapper.post(`${baseUrl}/register`, {
    ...event,
    userid: user.id,
  });
};

const getAll = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return fetchWrapper.get(`${baseUrl}/${user.id}`);
};

const update = (id, params) => {
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
};

// prefixed with underscored because delete is a reserved word in javascript
const _delete = (id) => {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
};

export const calendarService = {
  register,
  getAll,
  update,
  delete: _delete,
};
