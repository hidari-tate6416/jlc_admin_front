import Link from 'next/link';
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();

  function moveTop() {
    router.push({ pathname: "/login"});
  }

  function changeMenu() {
    let bars = document.getElementById('bars');
    let xmark = document.getElementById('xmark');
    let menu = document.getElementById('menu');
    bars.classList.toggle('hidden');
    xmark.classList.toggle('hidden');
    menu.classList.toggle('translate-x-full');
  }

  return (
    <div class="bg-jlc-sub">
      <Head>
        <meta charset="UTF-8"></meta>
        <link rel="icon" className='h-10' href="/favicons/favicon_jlc.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <header>
        <div class="fixed w-full bg-jlc-sub">
          <div class="flex justify-between h-12 px-6 border-b-4 border-jlc-third">
            {/* <button onClick={ moveTop } class="bg-jlc-third">
              <Image src="/favicons/favicon_jlc.png" width={50} height={60} objectFit="contain" />
            </button> */}
            <button onClick={ moveTop } class="italic">
              <span>JLC会員サイト</span>
            </button>
            {/* <button onClick={ changeMenu } class="px-2 py-1 top-2 right-6 bg-jlc-sub">
              <li id="bars" class="fa-solid fa-bars fa-2x text-jlc-third"></li>
            </button> */}
          </div>
        </div>

        {/* <nav>
          <ul id="menu" Class="fixed top-0 left-0 w-full z-20 text-center bg-jlc-main text-white font-bold translate-x-full transition ease-linear">
            <button onClick={ changeMenu } class="fixed px-2 py-1 top-2 right-6">
              <li id="xmark" class="fa-solid fa-xmark fa-2x text-jlc-third hidden"></li>
            </button>
            <li class="p-3"><a href="/">TOP</a></li>
            <li class="p-3"><a href="https://lexio-japan.com/" target="_blank">ABOUT Lexio</a></li>
            <li class="p-3"><a href="/about">ABOUT JapanLexioChampionship</a></li>
          </ul>
        </nav> */}
      </header>
    </div>
  )
}
