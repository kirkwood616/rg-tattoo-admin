import GoButton from "components/ui/buttons/GoButton/GoButton";
import AreYouSure from "components/ui/modals/AreYouSure/AreYouSure";
import ModalWindow from "components/ui/modals/ModalWindow/ModalWindow";
import AppContext from "context/AppContext/AppContext";
import useLocationTools from "hooks/useLocationTools";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { updateClosedRequest, updateOpenRequest } from "services/AdminApiService";
import { useSWRConfig } from "swr";
import { toggleBooleanState } from "utils/Toggle";
import "./AddNote.css";

interface AddNoteProps {
  request: AppointmentRequest;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
}

function AddNote({ request, note, setNote }: AddNoteProps) {
  const [isNoteActive, setIsNoteActive] = useState<boolean>(false);
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { route, id } = useLocationTools();
  const { mutate } = useSWRConfig();

  function onToggleNote(): void {
    toggleModalOpen(setIsNoteActive);
    if (note.length > 0) setNote("");
  }

  function updateByRequestStatus(request: AppointmentRequest): Promise<any> {
    switch (request.requestStatus) {
      case "new":
      case "awaiting-deposit":
      case "deposit-received":
        return updateOpenRequest(request);
      default:
        return updateClosedRequest(request);
    }
  }

  function onSaveNote(): void {
    if (note.length) setIsSubmitActive((current) => !current);
  }

  async function handleSaveNote(): Promise<void> {
    if (!note.length) return;
    toggleLoading();
    try {
      const updatedRequest: AppointmentRequest = {
        ...request,
        historyLog: [...request.historyLog, { dateCreated: new Date(), note: note }],
      };

      const options = {
        optimisticData: updatedRequest,
        rollbackOnError: true,
      };

      await mutate(`appointment-requests/${route}/${id}`, updateByRequestStatus(updatedRequest), options);
      toggleBooleanState(setIsSubmitActive);
      setNote("");
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <>
      <div className="AddNote">
        <GoButton text="ADD NOTE" onClick={onToggleNote} />
      </div>

      {isNoteActive && (
        <ModalWindow isActive={isNoteActive} closeFunction={onToggleNote}>
          <h1>ADD NOTE</h1>
          <div className="note-field">
            <textarea
              name="note"
              id="note"
              className="note"
              value={note}
              placeholder="Enter a note for yourself..."
              onChange={(e) => setNote(e.target.value)}
            />

            <p>* Notes are only visible to you. Clients will not see your notes *</p>

            <GoButton text="SAVE NOTE" cssClass="button_primary" isDisabled={note.length < 1} onClick={onSaveNote} />

            <GoButton text={"CANCEL NOTE"} cssClass="button_cancel" onClick={onToggleNote} />
          </div>
        </ModalWindow>
      )}

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleSaveNote}
          yesButtonText="YES"
          subModal
        />
      )}
    </>
  );
}

export default AddNote;
