import React, { useState, useEffect } from "react";
import CircleInfoUrl from "../assets/icons/circle-info.svg";

const TooltipTrigger = ({ value }: { value: string }) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(
    function () {
      function handleClickOutside(event) {
        const contentEl = document.querySelector(`[data-value="${value}"]`);

        if (
          showTooltip &&
          contentEl &&
          !contentEl?.contains(event.target) &&
          !buttonRef?.current?.contains(event.target)
        ) {
          hideContent(contentEl);
          setShowTooltip(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [showTooltip]
  );

  const handleClick = () => {
    const contentEl = document.querySelector(`[data-value="${value}"]`);

    if (contentEl) {
      if (showTooltip) {
        hideContent(contentEl);
        setShowTooltip(false);
      } else {
        showContent(contentEl);
        setShowTooltip(true);
      }
    }
  };

  const showContent = (element: Element) => {
    element.classList.add("flex");
    element.classList.remove("hidden");
  };

  const hideContent = (element: Element) => {
    element.classList.add("hidden");
    element.classList.remove("flex");
  };

  return (
    <button
      ref={buttonRef}
      aria-label="Más información"
      className="ml-2 inline-flex h-4 w-4"
      type="button"
      onClick={handleClick}
    >
      <img
        src={CircleInfoUrl}
        className={`w-full h-full ${showTooltip ? "opacity-90" : "opacity-60"}`}
      />
    </button>
  );
};

const TooltipContent = React.forwardRef(
  (
    { value, children, ...props }: { value: string; children: React.ReactNode },
    ref
  ) => {
    return (
      <div
        data-value={value}
        className="absolute left-0 top-7 hidden flex-col gap-2 rounded border border-slate-400 bg-white p-2"
        {...props}
      >
        <div className="text-left text-sm font-normal">{children}</div>
      </div>
    );
  }
);

export { TooltipTrigger as Trigger, TooltipContent as Content };
