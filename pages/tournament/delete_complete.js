import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import { useState } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentComplete() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  return (
    <Index title="">
      <div class="my-20 pb-6 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          本戦・予選削除完了
        </div>
        <span class="text-s pt-6 px-4">
          本戦・予選削除が完了しました。<br/>
          管理者メニューは<Link href="/" class="text-s text-blue">こちら</Link>
        </span>
      </div>
    </Index>
  )
}
