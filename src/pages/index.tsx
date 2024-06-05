import { Inter } from "next/font/google";
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
    >
      <div className='bg-background-light dark:bg-background-dark h-screen w-full'>
        <div className='flex justify-center items-center h-fit'>
        <div className="flex flex-col items-start">
            <Image alt="daimlah logo" src="/logo.webp" width={400} height={400}/>
          </div>
        </div>
      </div>
    </main>
  );
}
