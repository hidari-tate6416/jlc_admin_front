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
  const permitFlag = (router.query.PermitFlag) ? true : false;
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
  const [tournamentPermit, setTournamentPermit] = useState(false);
  const [tournamentSponsorEmail, setTournamentSponsorEmail] = useState('');
  const [tournamentSponsorTel, setTournamentSponsorTel] = useState('');
  const [tournamentSponsorFrag, setTournamentSponsorFrag] = useState(false);
  const [title, setTitle] = useState('予選申請詳細');

  useEffect(() => {
    getTitle();
    getTournamentDetail();
  }, []);

  function getTitle() {
    if (permitFlag) {
      setTitle('予選詳細');
    }
    else if (mainFlag) {
      setTitle('本戦詳細');
    } else {
      // そのまま
    }
  }

  async function getTournamentDetail() {
    await API.post('admin/get_detail_tournament', {
      "tournament_id": tournamentId
    }).then(res => {
      if ('OK' == res.data.result) {
        setTournamentName(res.data.tournament.name);
        setTournamentDate(res.data.tournament.start_day);
        setTournamentHour(res.data.tournament.start_time);
        setTournamentPlace(res.data.tournament.place);
        setTournamentSponsor(res.data.sponsor.name);
        setTournamentMax(res.data.tournament.max_member);
        setTournamentMember(res.data.tournament.num_member);
        setTournamentFee(res.data.tournament.fee);
        setTournamentMemo(res.data.tournament.memo);
        setTournamentPermit((res.data.tournament.permit) ? true : false);
        setTournamentSponsorEmail((res.data.sponsor.email) ? res.data.sponsor.email : '');
        setTournamentSponsorTel(res.data.tournament.tel);
        setTournamentSponsorFrag(res.data.sponsor_flag);
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function permitTournament() {
    await API.post('admin/permit_tournament', {
      "tournament_id": tournamentId,
      "permit_flag": true
    }).then(res => {
      if ('OK' == res.data.result) {
        router.push({ pathname: "/tournament/permit_complete"});
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function resultTournament() {
    router.push({ pathname: "/tournament/user/", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/");
  }

  function returnPage() {
    if (permitFlag) {
      router.push({ pathname: "/tournament/", query: {PermitFlag: true}}, "/tournament/permit");
    } else if (mainFlag) {
      router.push({ pathname: "/tournament/", query: {MainFlag: true}}, "/tournament/main");
    } else {
      router.push({ pathname: "/tournament/"});
    }
  }

  async function entryUserEntried() {
    router.push({ pathname: "/tournament/user/entried", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/entried");
  }
  async function entryUserPermit() {
    router.push({ pathname: "/tournament/user/permit", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/permit");
  }
  async function entryUserShuffle() {
    router.push({ pathname: "/tournament/user/shuffle", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/shuffle");
  }
  async function entryResultSend() {
    router.push({ pathname: "/tournament/user/result", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/result");
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
            主催者Email：{ tournamentSponsorEmail }
          </div>
          <div class="text-xl my-2">
            主催者Tel：{ tournamentSponsorTel }
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
          { tournamentPermit ? (
            <div>
              <div><ButtonInactive class="py-4 bg-black">承認済み</ButtonInactive></div>
            </div>
          ) : (
            <div>
              <div><ButtonJlc func={ permitTournament } class="py-4">予選承認</ButtonJlc></div>
            </div>
          )}
          { tournamentPermit ? (
            <div>
              <div><ButtonJlc func={ resultTournament } class="py-4">結果確認</ButtonJlc></div>
            </div>
          ) : (
            <div>
              <div><ButtonInactive class="py-4">結果確認</ButtonInactive></div>
            </div>
          )}
        </div>
        { tournamentSponsorFrag ? (
            <div>
              <div><ButtonJlc func={ entryUserEntried } class="py-4">エントリー一覧</ButtonJlc></div>
              <div><ButtonJlc func={ entryUserPermit } class="py-4">エントリー管理</ButtonJlc></div>
              <div><ButtonJlc func={ entryUserShuffle } class="py-4">席順シャッフル</ButtonJlc></div>
              <div><ButtonJlc func={ entryResultSend } class="py-4">結果送信</ButtonJlc></div>
            </div>
          ) : (
            <div></div>
          )}
        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜一覧に戻る</a></div>
      </div>
    </Index>
  )
}
