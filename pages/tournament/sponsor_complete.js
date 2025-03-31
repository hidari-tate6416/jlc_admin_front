import Index from '../../components/Index.js';
import Button from '../../components/parts/Button.js';
import { useState } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import Link from 'next/link';

export default function EntryComplete() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  return (
    <Index title="">
      <div class="my-20 pb-6 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          予選開催申請完了
        </div>
        <span class="text-s pt-6 px-4">
          予選開催申請が完了しました。<br/>
          <br/>
          LexioJapan事務局が確認して承認する際に<br/>メールを送信します。<br/>
          確認事項がある時は事務局より<br/>電話・メールをします。<br/>
          <br/>
          事務局の確認まで少々お待ちください。<br/>
          <br/>
          <br/>
          ダッシュボードは<Link href="/" class="text-s text-blue">こちら</Link>
        </span>
      </div>
    </Index>
  )
}
