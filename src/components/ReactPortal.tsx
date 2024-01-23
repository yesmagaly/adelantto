import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
}

interface ComponentProp { children: string | JSX.Element | JSX.Element[], wrapperId: string }


function ReactPortal({ children, wrapperId = "react-portal-wrapper" }: ComponentProp) {
  const [wrapperElement, setWrapperElement] = useState<Element| DocumentFragment>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId) as Element;
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  if (wrapperElement) {
    return createPortal(children, wrapperElement);
  }
}

export default ReactPortal;
