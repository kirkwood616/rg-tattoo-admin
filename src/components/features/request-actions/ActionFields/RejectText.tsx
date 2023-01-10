import ActionContext from "context/ActionContext/ActionContext";
import { TextRejectType } from "context/ActionContext/ActionReducer";
import { useContext } from "react";
import { formatLcHyphen } from "utils/Formatting";

interface RejectTextProps {
  title: string;
  stateText: string | undefined;
  dispatchType: TextRejectType;
}

function RejectText({ title, stateText, dispatchType }: RejectTextProps) {
  const { dispatch } = useContext(ActionContext);

  return (
    <>
      <h1>{title.toUpperCase()}</h1>
      <textarea
        name={formatLcHyphen(title)}
        id={formatLcHyphen(title)}
        value={stateText}
        placeholder="Enter a reason..."
        onChange={(e) => dispatch({ type: dispatchType, value: e.target.value })}
      />

      {!stateText && <p>** Reason Required **</p>}

      <p>* This message will appear in the client's canceled notifaction email. *</p>
    </>
  );
}

export default RejectText;
