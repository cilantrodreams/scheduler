export function getAppointmentsForDay(state, day) {
  let appointments = [];

  const appointmentDay = state.days.find(appointmentDay => {
    return appointmentDay.name === day
  })

  if (appointmentDay) {
    appointments = appointmentDay.appointments.map((id) => {
      return state.appointments[id];
    });
  }

  return appointments;
}

export function getInterview(state, interview) {
  let interviewDetails = null;

  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    const student = interview.student;
    interviewDetails = { interviewer, student };
  }

  return interviewDetails;
}