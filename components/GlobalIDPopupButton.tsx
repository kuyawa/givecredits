import React, { HTMLAttributes } from 'react';
import Image from 'next/image';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

//GlobalID button component to display GlobalID button in popup
const GlobalIDPopupButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, onClick, className, ...props }: ButtonProps, ref) => (
    <button
      className={`rounded-full font-bold justify-center flex flex-row ... ${className}`}
      {...{ onClick, ref }}
      {...props}
    >
      {text}
      <Image
        alt="GlobalId Logo"
        width={100}
        height={100}
        src="/globalid-logo.png"
        className="w-16 mt-1 ml-3"
      ></Image>
    </button>
  )
);
GlobalIDPopupButton.displayName = 'GlobalIDPopupButton';

export default GlobalIDPopupButton;
