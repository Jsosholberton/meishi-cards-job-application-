'use client';

// State management
import { useFormStatus } from 'react-dom';

// Component
import { PigIcon } from './icons/Icons';

function ButtonCard({ type }: { type: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending} className="absolute z-10 top-0 right-1 mx-auto p-2 m-2 text-white font-bold uppercase rounded-lg border bg-green-400 flex flex-row transition hover:bg-green-600">
      <PigIcon className={`${pending && "animate-spin"} h-6 w-6 mr-2`} />
      {type}
    </button>
  )
}

export default ButtonCard
