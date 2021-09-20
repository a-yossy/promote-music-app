import { FC, useRef } from "react";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "lib/user";
import { useNavigate } from "react-router";

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation(createUserMutation);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (inputRef.current?.value) {
      try {
        await createUser({ variables: { name: inputRef.current.value } });
        navigate("/", { replace: true });
      } catch(e) {
        console.error(e);
      }
    }
  };

  if (loading) return <>Submitting</>;
  if (error) return <>Error: {error.message}</>;

  return (
    <>
      <input
        ref={inputRef}
        type="text"
      />
      <button onClick={handleClick}>
        登録
      </button>
    </>
  )
};

export default SignupPage;
