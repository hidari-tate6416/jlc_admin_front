import Link from 'next/link';
import Header from './parts/Header.js';
import Footer from './parts/Footer.js';

export default function Index({title, children}) {
  return (
    <div class="bg-jlc-main mx-auto w-full">
      <div class="flex flex-col min-h-screen">
        <Header />

        <div class="flex-grow mt-10">
          <div>
            { title }
          </div>
          <div>
            { children }
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
