import { ButtonConnect } from '$lib/ButtonConnect';
import PasswordInput from '$lib/PasswordInput';
import TextInput from '$lib/TextInput';
import { Dispatch, SetStateAction } from 'react';

export default function Form({
  id,
  inputSuggest,
  handleClick,
  textInput,
  setTextInput,
  password,
  setPassword,
}: {
  id: string;
  inputSuggest: string;
  handleClick: () => void;
  textInput: string;
  setTextInput: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) {
  switch (id) {
    case '2':
      return (
        <div className="w-full h-fit flex flex-col gap-4 justify-center items-center my-10">
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan {inputSuggest} kamu
          </h6>
          <div className="max-w-[400px] flex flex-col gap-4">
            <TextInput
              placeholder="User ID"
              id="user-id"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              minLength={5}
            />
            <PasswordInput
              placeholder="PIN"
              id="pin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={5}
            />

            <ButtonConnect
              disabled={!textInput || !password}
              onClick={() => {
                handleClick();
              }}
            />
          </div>
        </div>
      );

    case '37':
      return (
        <div className="w-full h-fit flex flex-col gap-4 justify-center items-center my-10">
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan {inputSuggest} kamu
          </h6>
          <div className="max-w-[400px] flex flex-col gap-4">
            <TextInput
              placeholder="User ID"
              id="user-id"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              minLength={5}
            />
            <PasswordInput
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={5}
            />

            <ButtonConnect
              disabled={!textInput || !password}
              onClick={() => {
                handleClick();
              }}
            />
          </div>
        </div>
      );

    case '38':
      return (
        <div className="w-full h-fit flex flex-col gap-4 justify-center items-center my-10">
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan {inputSuggest} kamu
          </h6>
          <div className="max-w-[400px] flex flex-col gap-4">
            <TextInput
              placeholder="User ID"
              id="user-id"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              minLength={5}
            />
            <PasswordInput
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={5}
            />

            <ButtonConnect
              disabled={!textInput || !password}
              onClick={() => {
                handleClick();
              }}
            />
          </div>
        </div>
      );

    default:
      return <p>Error</p>;
  }
}
