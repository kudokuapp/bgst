'use client';

import PasswordInput from '$lib/PasswordInput';
import TextInput from '$lib/TextInput';
import { useState } from 'react';
import { connectBca } from './promise';
import { toast } from 'react-hot-toast';

export default function Client({ id, token }: { id: string; token: string }) {
  const [textInput, setTextInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function handleClick() {
    toast.promise(
      connectBca({
        institutionId: Number(id),
        username: textInput,
        password: passwordInput,
        token,
      }),
      {
        loading: 'Connecting...',
        success: 'Sukses!',
        error: 'Error!',
      }
    );
  }
  switch (id) {
    case '2':
      return (
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
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            minLength={5}
          />

          <div className="w-full h-fit flex justify-end mt-6  ">
            <button
              onClick={handleClick}
              className="px-2 py-1 rounded-md shadow-xl"
              disabled={!textInput || !passwordInput}
            >
              Connect
            </button>
          </div>
        </div>
      );

    case '37':
      return (
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
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            minLength={5}
          />
        </div>
      );

    case '38':
      return (
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
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            minLength={5}
          />
        </div>
      );

    default:
      return <p>Error</p>;
  }
}
