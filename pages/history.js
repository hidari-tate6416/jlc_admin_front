import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import Index from '/components/Index.js'

export default function History() {
  return (
    <Index title="">
      <div className="p-4 my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub justify-start">
        <div className="font-semibold text-2xl py-5">
          JLC会員サイトバージョン履歴
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.0.0（2025/05/10）</div>
          <div>リリース開始</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.1.0（2025/05/19）</div>
          <div>マイページ機能・会員情報更新機能・主催予選修正機能の実装</div>
          <div>その他微修正</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.2.0（2025/05/22）</div>
          <div>会員の参加予選一覧画面を実装</div>
          <div>管理者は全ての大会の参加者を確認できるように改修</div>
          <div>本画面のバージョン履歴画面の実装</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.3.0（2025/06/02）</div>
          <div>会員を削除できるように</div>
          <div>大会に地域データを持たせるように</div>
          <div>各大会のエントリー一覧からExcelでダウンロードできるように</div>
          <div>パスワード設定時の不具合を修正</div>
          <div>特典登録画面を修正</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.4.0（2025/06/19）</div>
          <div>終了した大会も表示されるように</div>
          <div>大会の表示順を開催日の降順になるように</div>
          <div>募集中・募集終了の大会がアイコンで判別できるように</div>
          <div>募集終了した大会にエントリーできないように</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.5.0（2025/07/10）</div>
          <div>主催者が参加者の取り消しやエントリーの拒否ができるように</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.6.0（2025/07/19）</div>
          <div>ローディングアイコンを修正し、画面表示時の拡大を抑えるように</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.7.0（2025/08/21）</div>
          <div>ユーザ情報に職業とLEXIOをどこで知ったか、プレイ頻度の項目を追加</div>
          <div>大会登録時の最低必要段位数を予選・本戦に修正</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.8.0（2025/10/07）</div>
          <div>会員詳細に段位・段位取得日を表示、予選結果に段位・段位取得日を表示</div>
        </div>
        <div className="mt-5 mb-3 mx-full">
          <div>version 1.9.0（2025/10/30）</div>
          <div>各階層のページにTOPページへのリンクを配置、会員のデータにアワードを追加
          </div>
        </div>
      </div>
    </Index>
  )
}
