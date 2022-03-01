import React from "react";

import 'components/Appointment/styles.scss'

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const  { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  // creates interview object
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
    transition(SAVING);
  }

  function remove() {
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
    transition(SAVING);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={remove}
        />
      )}
    </article>
  );
};