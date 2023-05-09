import Image from 'next/image';

export default function LoadingSpinner() {
    return(
        <div className="loader">
            <Image className="pokeball" src="/pokeball.png" width={64} height={64} alt="loader" />
        </div>

    );
}