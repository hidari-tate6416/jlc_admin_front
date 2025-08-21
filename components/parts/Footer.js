import Link from 'next/link';
import Image from 'next/image'

export default function Footer() {
  return (
    <div className="bg-jlc-sub pt-2 pb-1 w-full">
      <footer>
        <div className="flex justify-between mx-3 text-black">
          <div>
            <span className="text-xs">Japan Lexio Championship会員サイト</span>
          </div>
          <div className="">
            <Link href="/about" className="mr-3 text-xs">
              サイトについて
            </Link>
            <Link href="https://x.com/Lexio_Japan" className="text-xs" target="_blank">
              お問い合せ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
