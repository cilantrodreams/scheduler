import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState(initial);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);
  
  const setDay = day => setState({...state, day});

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const days = countSpots(state, state.day);
        setState({...state, days, appointments});
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = countSpots(state, state.day);
        setState({...state, days, appointments});
      });
  }

  function countSpots(state, day) {
    const currentDay = state.days.find(dayItem => dayItem.name === day);

    const appointmentIds = currentDay.appointments;

    const emptySpots = appointmentIds.filter(id => {
      return state.appointments[id].interview === null;
    });

    currentDay.spots = emptySpots.length;
    
    const days = [...state.days];
    const dayIndex = days.findIndex(day => day.name === state.day);
    days[dayIndex] = currentDay;
    
    return days;
  }

  return { state, setDay, bookInterview, cancelInterview}
}