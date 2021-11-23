import { FC } from 'react';
import useStyles from 'lib/modalStyle';

type ModalProps = {
  showModal: boolean;
};

const Modal: FC<ModalProps> = ({ showModal, children }) => {
  const styles = useStyles();

  return (
    <>
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.content}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
