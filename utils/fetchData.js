import axios from 'axios';

const baseUrl = process.env.BASE_URL;

export const getData = async (url, token) => {
  const res = await axios.get(`${baseUrl}/api/${url}`, {
    headers: {
      Authorization: token,
    },
    validateStatus: () => true,
  });

  return res.data;
};

export const postData = async (url, post, token) => {
  const res = await axios.post(`${baseUrl}/api/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    validateStatus: () => true,
  });

  return res.data;
};

export const putData = async (url, post, token) => {
  const res = await axios.put(`${baseUrl}/api/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    validateStatus: () => true,
  });

  return res.data;
};

export const patchData = async (url, post, token) => {
  const res = await axios.patch(`${baseUrl}/api/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    validateStatus: () => true,
  });

  return res.data;
};

export const deleteData = async (url, token) => {
  const res = await axios.delete(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    validateStatus: () => true,
  });

  return res.data;
};
