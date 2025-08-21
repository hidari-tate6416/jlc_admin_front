import Link from 'next/link';
import Header from './Header.js';

export default function Index({func, children}) {
  return (
    <button onClick={ func } className="rounded-md bg-jlc-third text-white md:w-1/2 w-2/3 mb-6 py-3">
      { children }
    </button>
  )
}
