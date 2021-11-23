import { FC } from 'react';
import UpdateUser from 'components/UpdateUser';
import Modal from 'components/Modal';

type UpdateUserModalProps = {
  currentName: string;
  showModal: boolean;
  handleCloseModal: () => void;
};

const UpdateUserModal: FC<UpdateUserModalProps> = ({
  currentName,
  showModal,
  handleCloseModal,
}) => (
  <Modal showModal={showModal}>
    <UpdateUser currentName={currentName} handleCloseModal={handleCloseModal} />
  </Modal>
);

export default UpdateUserModal;
