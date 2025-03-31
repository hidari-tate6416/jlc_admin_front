import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import Index from '../components/Index.js'

export default function About() {
  return (
    <Index title="">
      <div class="p-4 my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub justify-start">
        <div class="font-semibold text-2xl py-5">
          JapanLexioCupとは
        </div>
        <div class="mt-5 mb-3 mx-full">
          <div>JapanLexioCup（以下JLC）とは、ボードゲーム「Lexio」の日本大会の総称である！</div>
          <div>日本で大会を開いているボードゲームは数少ないが、「Lexio」は全国で予選を行い、予選を勝ち上がった人たちは全国大会で戦う！</div>
          <div>さらに！全国で勝ち上がった人たちは「Lexio」発祥の地、韓国で日本代表として世界大会に出場することになる！</div>
          <div>予選・全国・世界大会の成績で「Lexio」の称号や賞状ももらえる！</div>
          <div>競技性の高い「Lexio」で世界を掴むのは誰だ！</div>
        </div>
        <div class="font-semibold text-2xl py-5">
          JLC会員サイトとは
        </div>
        <div class="mt-5 mb-3 mx-full">
          <div>JLC会員サイト（以下本サイト）とは、JapanLexioCupに参加するユーザを管理するためのサイトである。</div>
          <div>参加者の称号や賞状、予選や対戦結果を管理するために本サイトが開発された。</div>
          <div>2025年度からサービス開始となるが、数年はアーリーアクセスとして運用予定。</div>
          <div>サイト上の不具合、表示乱れ等のお問い合わせは<a href="https://x.com/Lexio_Japan" class="text-blue" target="_blank">こちら</a>まで</div>
        </div>
        <div class="mt-6">新規登録は<Link href="/register_email" class="text-s text-blue">こちら</Link></div>
        <div class="my-2">ログインは<Link href="/login" class="text-s text-blue">こちら</Link></div>
      </div>
    </Index>
  )
}
