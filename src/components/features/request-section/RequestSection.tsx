import { ReactNode, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { toggleBooleanState } from "utils/Toggle";
import "./RequestSection.css";

interface RequestSectionProps {
  title: string;
  children: ReactNode;
}

function RequestSection({ title, children }: RequestSectionProps) {
  const [isSectionActive, setIsSectionActive] = useState<boolean>(true);
  const nodeRef = useRef(null);

  return (
    <section className="RequestSection">
      <div className="request-section_title" onClick={() => toggleBooleanState(setIsSectionActive)}>
        {title}
      </div>
      <CSSTransition
        in={isSectionActive}
        timeout={200}
        classNames="request-section_container"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="request-section_container">
          {children}
        </div>
      </CSSTransition>
    </section>
  );
}

export default RequestSection;
