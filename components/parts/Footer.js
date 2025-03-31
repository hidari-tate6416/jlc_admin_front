import Link from 'next/link';
import Image from 'next/image'

export default function Footer() {
  return (
    <div class="bg-jlc-sub pt-2 pb-1 w-full">
      <footer>
        <div class="flex justify-between mx-3 text-black">
          <div>
            <span class="text-xs">Japan Lexio Cup会員サイト</span>
          </div>
          <div class="">
            <Link href="/about" class="mr-3 text-xs">
              サイトについて
            </Link>
            <Link href="https://x.com/Lexio_Japan" class="text-xs" target="_blank">
              お問い合せ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
