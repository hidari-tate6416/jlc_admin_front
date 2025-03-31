import Link from 'next/link';
import Header from './Header.js';

export default function Index({func, children}) {
  return (
    <button onClick={ func } class="rounded-md bg-jlc-third text-white w-1/2 mb-6 py-3">
      { children }
    </button>
  )
}
