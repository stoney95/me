import { useEffect, useState } from "react";

export default function useMousePosition() {
  let [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });

  const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("dragover", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("dragover", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
}