import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";

import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

type T_props = {
  slides: number[];
  options?: EmblaOptionsType;
  displayButtons?: boolean;
  displayDots?: boolean;
  children: React.ReactNode;
};

export const Carousel: React.FC<T_props> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{props.children}</div>
      </div>

      {(props.displayButtons || props.displayDots) && (
        <div className="embla__controls">
          {props.displayButtons && (
            <div className="embla__buttons">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          )}

          {props.displayDots && (
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export const CarouselItem: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <div className="embla__slide" {...props}>
      {props.children}
    </div>
  );
};
