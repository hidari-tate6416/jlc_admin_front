import Index from '../../components/Index.js';
import ButtonJlc from '../../components/parts/ButtonJlc.js';
import ButtonInactive from '../../components/parts/ButtonInactive.js';
import SmallButton from '../../components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentDetail() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const entriedFlag = (router.query.EntriedFlag) ? true : false;
  const sponsorFlag = (router.query.SponsorFlag) ? true : false;
  const mainFlag = (router.query.MainFlag) ? true : false;

  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [tournamentHour, setTournamentHour] = useState(0);
  const [tournamentPlace, setTournamentPlace] = useState("");
  const [tournamentSponsor, setTournamentSponsor] = useState("");
  const [tournamentMax, setTournamentMax] = useState(0);
  const [tournamentMember, setTournamentMember] = useState(0);
  const [tournamentFee, setTournamentFee] = useState(0);
  const [tournamentMemo, setTournamentMemo] = useState("");
  const [tournamentEntried, setTournamentEntried] = useState(false);
  const [tournamentSponsorFrag, setTournamentSponsorFrag] = useState(false);
  const [title, setTitle] = useState('予選詳細');

  useEffect(() => {
    getTitle();
    getTournamentDetail();
  }, []);

  function getTitle() {
    if (mainFlag) {
      setTitle('本戦詳細');
    } else {
      // そのまま
    }
  }

  async function getTournamentDetail() {
    await API.post('user/get_detail_tournament', {
      "tournament_id": tournamentId
    }).then(res => {
      setTournamentName(res.data.tournament.name);
      setTournamentDate(res.data.tournament.start_day);
      setTournamentHour(res.data.tournament.start_time);
      setTournamentPlace(res.data.tournament.place);
      setTournamentSponsor(res.data.sponsor.name);
      setTournamentMax(res.data.tournament.max_member);
      setTournamentMember(res.data.tournament.num_member);
      setTournamentFee(res.data.tournament.fee);
      setTournamentMemo(res.data.tournament.memo);
      setTournamentEntried(res.data.entried_flag);
      setTournamentSponsorFrag(res.data.sponsor_flag);
    }).catch(err => {
      console.log(err);
      // router.push({ pathname: "/login"});
    });
  }

  async function entryTournament() {
    await API.post('user/entry', {
      "tournament_id": tournamentId
    }).then(res => {
      if ('OK' == res.data.result) {
        router.push({ pathname: "/tournament/entry_complete"});
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  function returnPage() {
    if (entriedFlag) {
      router.push({ pathname: "/tournament/", query: {EntriedFlag: true}}, "/tournament/entried");
    } else if (sponsorFlag) {
      router.push({ pathname: "/tournament/", query: {SponsorFlag: true}}, "/tournament/sponsor");
    } else if (mainFlag) {
      router.push({ pathname: "/tournament/", query: {MainFlag: true}}, "/tournament/top");
    } else {
      router.push({ pathname: "/tournament/"});
    }
  }

  async function entryUserList() {
    router.push({ pathname: "/tournament/user/", query: {TournamentId: tournamentId}}, "/tournament/user/");
  }
  async function entryUserPermit() {
    router.push({ pathname: "/tournament/user/permit", query: {TournamentId: tournamentId}}, "/tournament/user/permit");
  }
  async function entryUserShuffle() {
    router.push({ pathname: "/tournament/user/shuffle", query: {TournamentId: tournamentId}}, "/tournament/user/shuffle");
  }
  async function entryResultSend() {
    router.push({ pathname: "/tournament/user/result", query: {TournamentId: tournamentId}}, "/tournament/user/result");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          { title }
        </div>

        <div class="mx-8 py-5 border-y text-left">
          <div class="text-xl my-2">
            予選名：{ tournamentName }
          </div>
          <div class="text-xl my-2">
            日時：{ tournamentDate } { tournamentHour }時〜
          </div>
          <div class="text-xl my-2">
            場所：{ tournamentPlace }
          </div>
          <div class="text-xl my-2">
            主催者：{ tournamentSponsor }
          </div>
          <div class="text-xl my-2">
            参加定員：{ tournamentMax }
          </div>
          <div class="text-xl my-2">
            現在の参加数：{ tournamentMember }
          </div>
          <div class="text-xl my-2">
            参加費：{ tournamentFee }円
          </div>
          <div class="text-xl my-2">
            備考：{ tournamentMemo }
          </div>
        </div>

        <div class="py-5">
          { tournamentEntried ? (
            <div>
              <div><ButtonInactive class="py-4 bg-black">エントリー済み</ButtonInactive></div>
            </div>
          ) : (
            <div>
              <div><ButtonJlc func={ entryTournament } class="py-4">エントリー</ButtonJlc></div>
            </div>
          )}
          { tournamentSponsorFrag ? (
            <div>
              <div><ButtonJlc func={ entryUserList } class="py-4">エントリー一覧</ButtonJlc></div>
              <div><ButtonJlc func={ entryUserPermit } class="py-4">エントリー管理</ButtonJlc></div>
              <div><ButtonJlc func={ entryUserShuffle } class="py-4">席順シャッフル</ButtonJlc></div>
              <div><ButtonJlc func={ entryResultSend } class="py-4">結果送信</ButtonJlc></div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜一覧に戻る</a></div>
      </div>
    </Index>
  )
}
