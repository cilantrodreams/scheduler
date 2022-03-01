import { useState } from "react";

export default function useApplicationData(initial) {
  const [state, setState] = useState(initial);

}