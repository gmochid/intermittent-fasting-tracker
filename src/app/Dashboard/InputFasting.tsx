import { Button, Modal, Toast } from "flowbite-react";
import { useState } from "react";
import { api } from "~/utils/api";

export const InputFasting = () => {
  const [modalStartFasting, setModalStartFasting] = useState(false);
  const [modalFinishFasting, setModalFinishFasting] = useState(false);
  const [modalCancelFasting, setModalCancelFasting] = useState(false);
  const apiContext = api.useContext();
  const invalidate = () => {
    apiContext.fastingLog.getLatest.invalidate();
    apiContext.fastingLog.getAll.invalidate();
  };
  const { mutate: startFasting } = api.fastingLog.startFasting.useMutation({
    onSuccess: invalidate,
  });
  const { mutate: finishFasting } = api.fastingLog.finishFasting.useMutation({
    onSuccess: invalidate,
  });
  const { mutate: cancelFasting } = api.fastingLog.cancelFasting.useMutation({
    onSuccess: invalidate,
  });
  const { data: latestFastingLog, isSuccess } =
    api.fastingLog.getLatest.useQuery();
  return (
    <>
      {isSuccess && latestFastingLog && latestFastingLog.endAt === null ? (
        <div className="flex">
          <Button onClick={() => setModalFinishFasting(true)} className="mr-3">
            End Fast Today!
          </Button>
          <Button color="warning" onClick={() => setModalCancelFasting(true)}>
            Cancel Fast
          </Button>
        </div>
      ) : (
        <Button onClick={() => setModalStartFasting(true)}>Fast Today!</Button>
      )}

      <Modal
        show={modalStartFasting}
        onClose={() => setModalStartFasting(false)}
      >
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
              startFasting({
                startAt: new Date(Date.now()),
              });
              setModalStartFasting(false);
            }}
          >
            Start
          </Button>
          <Button color="gray" onClick={() => setModalStartFasting(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalFinishFasting}
        onClose={() => setModalFinishFasting(false)}
      >
        <Modal.Header>End your fast now</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Yeay, finish your fasting
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              if (latestFastingLog) {
                finishFasting({
                  id: latestFastingLog.id,
                  endAt: new Date(Date.now()),
                });
              }
              setModalFinishFasting(false);
            }}
          >
            End Fast
          </Button>
          <Button color="gray" onClick={() => setModalFinishFasting(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalCancelFasting}
        onClose={() => setModalCancelFasting(false)}
      >
        <Modal.Header>Cancel your fast now</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Fasting is not gonna make you die
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="warning"
            onClick={() => {
              if (latestFastingLog) {
                cancelFasting({
                  id: latestFastingLog.id,
                });
              }
              setModalCancelFasting(false);
            }}
          >
            Cancel Fast
          </Button>
          <Button color="gray" onClick={() => setModalCancelFasting(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
