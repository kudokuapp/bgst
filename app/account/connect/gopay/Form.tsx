import { motion } from 'framer-motion';
import Image from 'next/image';
import Gojek from '$public/logo/bank/gojek.png';
import WaInput from '$lib/WaInput';
import { Dispatch, SetStateAction, useState } from 'react';
import OtpInput from 'react-otp-input';
import { kirimOtpGopay } from './promise';
import { toast } from 'react-hot-toast';
import cleanNum from '$utils/helper/cleanNum';
import { ButtonConnect } from '$lib/ButtonConnect';

export default function Form({
  token,
  handleClick,
  otp,
  setOtp,
  setOtpData,
}: {
  token: string;
  handleClick: () => void;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  setOtpData: Dispatch<SetStateAction<ExtendedBrickGojekOTPData>>;
}) {
  const [input, setInput] = useState('');
  const [progress, setProgress] = useState(1);

  const renderText = () => {
    switch (progress) {
      case 1:
        return (
          <>
            <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
              Isi nomor hp gopay kamu
            </h6>
            <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-xs">
              Akun Gojek bakal ke logout pas lo connect di BGST.
              <br />
              Nanti lo tinggal login lagi aja gausah panik!
            </p>
          </>
        );

      case 2:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan OTP dari Gojek
          </h6>
        );

      default:
        return <p>Error</p>;
    }
  };

  const renderProgress = () => {
    switch (progress) {
      case 1:
        return (
          <div className="max-w-[400px] flex flex-col gap-4">
            <WaInput
              onChange={(e) => {
                setInput(e.target.value);
              }}
              id="nomor-gojek"
              placeholder="Nomor HP Gopay"
              value={input}
            />
            <ButtonConnect
              disabled={
                !input || input.length < 9 || !/^08\d|^8\d/g.test(input)
              }
              onClick={handleClickFirst}
            />
          </div>
        );

      case 2:
        return (
          <motion.div
            className="max-w-[400px] flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <OtpInput
              placeholder="1234"
              value={otp}
              onChange={setOtp}
              numInputs={4}
              isInputNum={true}
              containerStyle={
                'w-full flex flex-row justify-between gap-1 mt-2 font-medium text-xl'
              }
              focusStyle={{ border: '2px solid #BA1B1B', outline: 'none' }}
              inputStyle={{
                backgroundColor: '#d6e3ff',
                borderRadius: '0.375rem',
                padding: '0.5rem',
                color: '#001a40',
                width: '100%',
                maxWidth: '60px',
                border: '2px solid #d6e3ff',
              }}
            />
            <ButtonConnect
              disabled={!otp || otp.length < 4}
              onClick={handleClick}
            />
          </motion.div>
        );
      default:
        return <p>Error</p>;
    }
  };

  const handleClickFirst = async () => {
    toast
      .promise(kirimOtpGopay({ username: `+62${cleanNum(input)}`, token }), {
        loading: 'Kirim OTP...',
        success: 'Sukses kirim OTP!',
        error: 'Error kirim OTP',
      })
      .then((data) => {
        //ON FULFILLED
        setOtpData({
          redirectRefId: data.redirectRefId,
          clientId: data.clientId,
          sessionId: data.sessionId,
          uniqueId: data.uniqueId,
          otpToken: data.otpToken,
          username: `+62${cleanNum(input)}`,
        });
        setProgress(2);
      });
  };

  return (
    <motion.div
      className="flex flex-col w-full items-center text-center gap-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={Gojek}
          width={50}
          height={50}
          quality={100}
          alt="Gojek Logo"
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Gopay
        </h4>
        {renderText()}
      </div>
      {renderProgress()}
    </motion.div>
  );
}
