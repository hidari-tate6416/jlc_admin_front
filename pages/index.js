import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function Home() {

  const boardgameId = 1;
  const router = useRouter();

  useEffect(() => {
    getAdminData();
  }, []);

  async function getAdminData() {
    await API.post('admin/profile', {
      "boadgame_id": boardgameId
    }).then(res => {
      if ('OK' != res.data.result) {
        router.push({ pathname: "/login"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function moveUserList() {
    router.push({ pathname: "/user/"});
  }
  async function moveTournamentPermitedList() {
    router.push({ pathname: "/tournament/", query: {PermitFlag: true}}, "/tournament/permit");
  }
  async function moveTournamentList() {
    router.push({ pathname: "/tournament/"});
  }
  async function moveMainList() {
    router.push({ pathname: "/tournament/", query: {MainFlag: true}}, "/tournament/main");
  }
  async function moveSendMainTournament() {
    router.push({ pathname: "/tournament/tournament_send"});
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          管理者メニュー
        </div>

        <div className="py-5">
          <div><ButtonJlc func={ moveUserList } className="py-4">会員確認</ButtonJlc></div>
          <div><ButtonJlc func={ moveTournamentPermitedList } className="py-4">予選一覧</ButtonJlc></div>
          <div><ButtonJlc func={ moveTournamentList } className="py-4">予選申請一覧</ButtonJlc></div>
          <div><ButtonJlc func={ moveMainList } className="py-4">全国大会一覧</ButtonJlc></div>
          <div><ButtonJlc func={ moveSendMainTournament } className="py-4">全国大会・予選登録</ButtonJlc></div>
        </div>
        <div className="pb-4"><Link href="/login" className="text-s text-blue">ログアウト</Link></div>
      </div>
    </Index>
  )
}
