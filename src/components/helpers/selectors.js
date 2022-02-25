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