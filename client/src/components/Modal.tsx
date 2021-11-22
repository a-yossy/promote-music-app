import { FC } from 'react';
import UpdateUser from 'components/UpdateUser';
import useStyles from './modalStyle';

type ModalProps = {
  currentName: string;
  showModal: boolean;
  handleCloseModal: () => void;
};

const Modal: FC<ModalProps> = ({
  currentName,
  showModal,
  handleCloseModal,
}) => {
  const styles = useStyles();

  return (
    <>
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.content}>
            <UpdateUser
              currentName={currentName}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
