import Link from 'next/link';
import MyHeader from './parts/MypageHeader.js';
import Footer from './parts/Footer.js';

export default function Mypage({title, children}) {
  return (
    <div class="bg-slate-200 mx-auto w-full md:w-1/2">
      <div class="flex flex-col min-h-screen">
        <MyHeader />

        <div class="flex-grow">
          <div class="animate-text-focus-in italic text-4xl my-5 text-center mx-auto">
            { title }
          </div>
          <div class="w-5/6 mx-auto my-5">
            { children }
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
