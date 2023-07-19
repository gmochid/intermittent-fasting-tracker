import { Button, Modal, Toast } from "flowbite-react";
import { useState } from "react";
import { api } from "~/utils/api";

export const InputFasting = () => {
  const [modalCreateLog, setModalCreateLog] = useState(false);
  const [modalUpdateLog, setModalUpdateLog] = useState(false);
  const { mutate: addFastingLog } = api.fastingLog.addFastingLog.useMutation();
  const { mutate: updateFastingLog } =
    api.fastingLog.updateFastingLog.useMutation();
  const { data: latestFastingLog, isSuccess } =
    api.fastingLog.getLatest.useQuery();
  return (
    <>
      {isSuccess && latestFastingLog && latestFastingLog.endAt === null ? (
        <Button onClick={() => setModalUpdateLog(true)}>End Fast Today!</Button>
      ) : (
        <Button onClick={() => setModalCreateLog(true)}>Fast Today!</Button>
      )}

      <Modal show={modalCreateLog} onClose={() => setModalCreateLog(false)}>
        <Modal.Header>Start your fast now!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Reach your body goals with fasting!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              addFastingLog({
                startAt: new Date(Date.now()),
              });
              setModalCreateLog(false);
            }}
          >
            Start
          </Button>
          <Button color="gray" onClick={() => setModalCreateLog(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalUpdateLog} onClose={() => setModalUpdateLog(false)}>
        <Modal.Header>End your fast now</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Fasting is not gonna make you die
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              if (latestFastingLog) {
                updateFastingLog({
                  id: latestFastingLog.id,
                  endAt: new Date(Date.now()),
                });
              }
              setModalUpdateLog(false);
            }}
          >
            End Fast
          </Button>
          <Button color="gray" onClick={() => setModalUpdateLog(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
