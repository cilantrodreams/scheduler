import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode) {
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
  }

  const back = function() {
    setMode(history[history.length -2]);
    setHistory(prev => [...prev].slice(0, -1));
  }

  return { mode, transition, back };
}