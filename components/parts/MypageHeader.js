import Link from 'next/link';
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();

  function moveTop() {
    router.push({ pathname: "/mypage"});
  }

  return (
    <div class="bg-white">
      <Head>
        <meta charset="UTF-8"></meta>
        <link rel="icon" className='h-10' href="/favicons/art_favicon.png" />
      </Head>
      <header>
        <div class="flex justify-between max-w-5xl mx-auto">
          <button onClick={ moveTop }>
            <Image src="/logos/art20060px.png" width={200} height={60} objectFit="contain" />
          </button>
          <a class="invisible text-2xl font-logo my-auto mx-3">menu</a>
        </div>
      </header>
    </div>
  )
}
