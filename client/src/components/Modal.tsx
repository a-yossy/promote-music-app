import { FC, ReactNode } from 'react';
import useStyles from 'lib/modalStyle';

type ModalProps = {
  showModal: boolean;
  children: ReactNode;
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
