import Button from './Button';
import Image from 'next/image';

const VerifedGlobalID = () => {
    return (
        <Button
            text=""
            iconColor="blue"
            iconClassStyle="-mt-1 mr-2 text-lg bg-white rounded-full"
            icon="check_circle"
            className={`absolute py-3 bottom-7 right-8 h-10 w-25 text-sm mt-2 ml-20 py-2 px-3 rounded-s outline outline-offset-2 outline-4 outline-blue-800 mb-4`}
        >
            <Image
                alt='GlobalID Logo'
                width={100}
                height={100}
                className='-mt-1.5 ml-2'
                src="/globalid-logo.png"
            />
        </Button>
    )
}

export default VerifedGlobalID;