import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import { useState } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentUserGradeComplete() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const permitFlag = ('true' == router.query.PermitFlag) ? true : false;
  const mainFlag = ('true' == router.query.MainFlag) ? true : false;

  async function returnPage() {
    router.push({ pathname: "/tournament/user/", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/");
  }

  return (
    <Index title="">
      <div class="my-20 pb-6 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          会員更新完了
        </div>
        <span class="text-s pt-6 px-4">
          会員更新が完了しました。<br/>
          <a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">会員一覧に戻る</a>
        </span>
      </div>
    </Index>
  )
}
