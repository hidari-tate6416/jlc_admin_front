import Link from 'next/link';
import Header from './Header.js';

export default function Index({func, children}) {
  return (
    <button onClick={ func } class="rounded-md bg-green-500 hover:bg-green-600 text-white w-1/3 mb-6 py-3">
      { children }
    </button>
  )
}
