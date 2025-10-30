import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import { useState } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function UserComplete() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");
  const userId = (router.query.userId) ? router.query.userId : '';

  async function returnPage() {
    router.push({ pathname: "/user/detail", query: {userId: userId}}, "/user/detail");
  }

  return (
    <Index title="">
      <div className="my-20 pb-6 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          成績登録完了
        </div>
        <span className="text-s pt-6">
          成績登録が完了しました。<br/>
          会員詳細は<a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">こちら</a>
        </span>
      </div>
    </Index>
  )
}
