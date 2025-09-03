import Link from 'next/link';
import Header from './Header.js';

export default function Index({func, children}) {
  return (
    <button onClick={ func } className="rounded-md bg-red text-black w-full py-3">
      { children }
    </button>
  )
}
