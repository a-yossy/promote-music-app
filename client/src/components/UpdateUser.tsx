import { FC, useRef } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { updateUserMutation, UpdateUserInput, UserData } from 'lib/user';
import setLoginUserName from 'lib/setLoginUserName';
import { Button, Input } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

type UpdateUserProps = {
  currentName: string;
  handleCloseModal: () => void;
};

const UpdateUser: FC<UpdateUserProps> = ({ currentName, handleCloseModal }) => {
  const navigate = useNavigate();
  const [updateUser] = useMutation<{ updateUser: UserData }, UpdateUserInput>(
    updateUserMutation,
  );
  const inputRef = useRef<HTMLInputElement>();

  const handleUpdateUser = () => {
    const updateName = String(inputRef.current?.value);
    const toastUpdateUserId = toast.loading('Loading...');
    updateUser({ variables: { currentName, updateName } })
      .then((res) => {
        setLoginUserName(res.data?.updateUser.user.name as string);
        toast.success('Update completed', {
          id: toastUpdateUserId,
        });
        navigate(`/user/${res.data?.updateUser.user.name as string}`);
        handleCloseModal();
      })
      .catch((e: ApolloError) => {
        toast.error(`${e.message}`, {
          id: toastUpdateUserId,
        });
      });
    if (inputRef.current?.value) inputRef.current.value = '';
  };

  return (
    <>
      <Toaster />
      <Input inputRef={inputRef} sx={{ ml: 3, mt: 4, mb: 2 }} />
      <Button onClick={handleUpdateUser} variant="contained" size="small">
        更新
      </Button>
      <Button onClick={handleCloseModal} variant="contained" size="small">
        キャンセル
      </Button>
    </>
  );
};

export default UpdateUser;
