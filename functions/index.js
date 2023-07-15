import { BASE_URL } from "../config/api";
import { BASE_URL_ADMIN } from "../config/api";
import { eraseCookie } from "./cookies";

const func = {
  createUser: async (data = {}) => {
    const response = await fetch(BASE_URL + "/createUser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  getUser: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getUser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  authUser: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getAuth", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  getEvents: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getEvents", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },

  reqOrganizer: async (data = {}) => {
    const response = await fetch(BASE_URL + "/organizerRequest", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  createEvent: async (data = {}) => {
    const response = await fetch(BASE_URL + "/createEvent", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  getEventsBy: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getEventsBy", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  buyTicket: async (data = {}) => {
    const response = await fetch(BASE_URL + "/buyTicket", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Origin: "*",
        // "Access-Control-Allow-Origin": "https://VoteHub-backend.onrender.com"
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  getTicket: async (data) => {
    const response = await fetch(BASE_URL + "/getTicket/" + data, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },
  withdraw: async (data = {}) => {
    const response = await fetch(BASE_URL + "/requestWithdrawal", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  checkSlug: async (data = {}) => {
    const response = await fetch(BASE_URL + "/checkSlug/" + data.id, {
      method: "GET",
    });

    return response.json();
  },
  generateQuickGuid: function () {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  },

  signOut: () => {
    window.localStorage.clear();
    eraseCookie("auth");
  },

  getPolls: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getPolls/" + data?.id, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },

  createPoll: async (data = {}) => {
    const response = await fetch(BASE_URL + "/createPolls", {
      method: "Post", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  addNominee: async (data = {}) => {
    const response = await fetch(BASE_URL + "/addNominee", {
      method: "Post", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  getNomineesBy: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getNomineesBy", {
      method: "Post", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  castVote: async (data = {}) => {
    const response = await fetch(BASE_URL + "/castVote", {
      method: "Post", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  getTransactions: async (data = {}) => {
    const response = await fetch(BASE_URL + "/transactions/" + data?.id, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },

  voteWithdraw: async (data = {}) => {
    const response = await fetch(BASE_URL + "/withdrawalRequestVote", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  getTransactionsAdmin: async (data = {}) => {
    const response = await fetch(BASE_URL_ADMIN + "/getTransactions/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },

  getPollsAdmin: async (data = {}) => {
    const response = await fetch(BASE_URL_ADMIN + "/getPolls/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },

  getEventsAdmin: async (data = {}) => {
    const response = await fetch(BASE_URL_ADMIN + "/getEvents/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },

  getUsersAdmin: async (data = {}) => {
    const response = await fetch(BASE_URL_ADMIN + "/getUsers/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },
  getApprovalsAdmin: async (data = {}) => {
    const response = await fetch(BASE_URL_ADMIN + "/getApprovals/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },
  getSMS: async (data = {}) => {
    const response = await fetch(BASE_URL + "/getSMSBy/" + data?.id, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });

    return response.json();
  },
  sendSMS: async (data = {}) => {
    const response = await fetch(BASE_URL + "/SendSMS", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  buyCredit: async (data = {}) => {
    const response = await fetch(BASE_URL + "/buyCredit", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  showResults: async (data = {}) => {
    const response = await fetch(BASE_URL + "/showResults", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  stopEvent: async (data = {}) => {
    const response = await fetch(BASE_URL + "/stopEvent", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
  approveEvent: async (data = {}) => {
    const response = await fetch(BASE_URL + "/approveEvent", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
};

export default func;
