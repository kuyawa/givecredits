import Button from './Button';
//import { COMPLETE_KYC_URL } from '../constants';
import Image from 'next/image';
//import { useCallback } from 'react';


const ConnectGlobalID = () => {
    //useCallback to open GlobalID from browser
    const openGlobalID = null

    return (
        <Button
            text="Connect with"
            onClick={openGlobalID}
            className={`absolute py-3 normal-case text-sm font-bold bottom-7 right-8 h-10 w-100 text-sm mt-2 ml-4 py-2 px-3 rounded-s outline outline-offset-2 outline-4 outline-blue-800 mb-4`}
        >
            <Image alt='GlobalID Logo' src="/globalid-logo.png" width={100} height={100} className='ml-3 -mt-1.5' />
        </Button>
    );
}

export default ConnectGlobalID;