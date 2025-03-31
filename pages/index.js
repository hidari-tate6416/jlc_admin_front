import Index from '../components/Index.js';
import ButtonJlc from '../components/parts/ButtonJlc.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../plugins/customAxios.js';
import Link from 'next/link';

export default function Home() {

  const boardgameId = 1;
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userGradeName, setUserGradeName] = useState("");
  const [userGradeId, setUserGradeId] = useState(0);
  const [userTypeId, setUserTypeId] = useState(0);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    await API.post('user/profile', {
      "boadgame_id": boardgameId
    }).then(res => {
      if ('OK' == res.data.result) {
        setUserName(res.data.user_name);
        setUserGradeName(res.data.grade_name);
        setUserGradeId(res.data.grade_id);
        setUserTypeId(res.data.user_type_id);
      }
      else {
        router.push({ pathname: "/login"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function moveTournamentList() {
    router.push({ pathname: "/tournament/"});
  }
  async function moveEntriedList() {
    router.push({ pathname: "/tournament/", query: {EntriedFlag: true}}, "/tournament/entried");
  }
  async function moveTopTournament() {
    router.push({ pathname: "/tournament/", query: {MainFlag: true}}, "/tournament/top");
  }
  async function moveSponsorTournamentList() {
    router.push({ pathname: "/tournament/", query: {SponsorFlag: true}}, "/tournament/sponsor");
  }
  async function moveSponsorTournament() {
    router.push({ pathname: "/tournament/sponsor_send"});
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="py-5">
          <div class="text-xl">
            現在の{ userName }さんの段は
          </div>
          <h2 class="text-4xl font-semibold py-5">
            { userGradeName }
          </h2>
        </div>

        <div class="py-5">
          <div><ButtonJlc func={ moveTournamentList } class="py-4">予選エントリー</ButtonJlc></div>
          <div><ButtonJlc func={ moveEntriedList } class="py-4">エントリー確認</ButtonJlc></div>
          { 2 <= userGradeId && (
            <div><ButtonJlc func={ moveTopTournament } class="py-4">本戦エントリー</ButtonJlc></div>
          )}
          { 2 == userTypeId && (
            <div><ButtonJlc func={ moveSponsorTournamentList } class="py-4">開催予選一覧</ButtonJlc></div>
          )}
          <div><ButtonJlc func={ moveSponsorTournament } class="py-4">予選開催</ButtonJlc></div>
        </div>
        <div class="pb-4"><Link href="/login" class="text-s text-blue">ログアウト</Link></div>
      </div>
    </Index>
  )
}
