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
          予選登録完了
        </div>
        <span class="text-s pt-6">
          予選登録が完了しました。<br/>
          予選一覧は<Link href="/tournament/" class="text-s text-blue">こちら</Link>
        </span>
      </div>
    </Index>
  )
}
