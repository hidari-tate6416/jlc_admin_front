import Link from 'next/link';
import Header from './Header.js';

export default function Index({func, children}) {
  return (
    <button class="cursor-default rounded-md bg-gray-700 text-white w-1/2 mb-6 py-3">
      { children }
    </button>
  )
}
