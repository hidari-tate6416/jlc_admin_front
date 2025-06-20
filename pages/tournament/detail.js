import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import ButtonJlcInactive from '/components/parts/ButtonJlcInactive.js';
import SmallButton from '/components/parts/SmallButton.js';
import ButtonDelete from '/components/parts/ButtonDelete.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentDetail() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const permitFlag = ('true' == router.query.PermitFlag) ? true : false;
  const mainFlag = ('true' == router.query.MainFlag) ? true : false;

  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [tournamentHour, setTournamentHour] = useState(0);
  const [tournamentEndHour, setTournamentEndHour] = useState(0);
  const [tournamentPlace, setTournamentPlace] = useState("");
  const [tournamentAdress, setTournamentAdress] = useState("");
  const [tournamentArea, setTournamentArea] = useState("");
  const [tournamentSponsor, setTournamentSponsor] = useState("");
  const [tournamentMax, setTournamentMax] = useState(0);
  const [tournamentMember, setTournamentMember] = useState(0);
  const [tournamentFee, setTournamentFee] = useState(0);
  const [tournamentGroupType, setTournamentGroupType] = useState("");
  const [tournamentGroupOther, setTournamentGroupOther] = useState("");
  const [tournamentHpUrl, setTournamentHpUrl] = useState("");
  const [tournamentSnsUrl, setTournamentSnsUrl] = useState("");
  const [tournamentBuyCount, setTournamentBuyCount] = useState(0);
  const [tournamentMemo, setTournamentMemo] = useState("");
  const [tournamentQuestion, setTournamentQuestion] = useState("");
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
    // 戻るボタン対策
    if (!tournamentId) {
      router.push("/");
      return;
    }

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
        setTournamentEndHour(res.data.tournament.end_time);
        setTournamentPlace(res.data.tournament.place);
        setTournamentAdress(res.data.tournament.adress);
        setTournamentArea(res.data.tournament.area.name);
        setTournamentSponsor(res.data.sponsor.name);
        setTournamentMax(res.data.tournament.max_member);
        setTournamentMember(res.data.tournament.num_member);
        setTournamentFee(res.data.tournament.fee);
        setTournamentMemo(res.data.tournament.memo.replace(" ", "\n"));
        setTournamentQuestion(res.data.tournament.question);
        setTournamentGroupType(res.data.tournament.group_type.name);
        setTournamentGroupOther(res.data.tournament.group_other);
        setTournamentHpUrl(res.data.tournament.hp_url);
        setTournamentSnsUrl(res.data.tournament.sns_url);
        setTournamentBuyCount(res.data.tournament.buy_count);
        setTournamentPermit((res.data.tournament.permit) ? true : false);
        setTournamentSponsorEmail((res.data.tournament.email) ? res.data.tournament.email : '');
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
    // 登録確認ダイアログ
    if(!window.confirm("予選を承認します。よろしいですか？")){
      return;
    }

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

  async function deleteTournament() {
    // 登録確認ダイアログ
    if(!window.confirm("大会を削除します。よろしいですか？")){
      return;
    }

    await API.post('admin/delete_tournament', {
      "tournament_id": tournamentId
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/tournament/delete_complete"});
      }
      else {
        setAlertText("不正アクセスを検知");
      }
    }).catch(err => {
      // console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
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
  async function editTournament() {
    router.push({ pathname: "/tournament/edit", query: {TournamentId: tournamentId}}, "/tournament/edit");
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
          <div class="text-l my-2">
            予選名：{ tournamentName }
          </div>
          <div class="text-l my-2">
            日時：{ tournamentDate } { tournamentHour }時〜{ tournamentEndHour }時
          </div>
          <div class="text-l my-2">
            会場名：{ tournamentPlace }
          </div>
          <div class="text-l my-2">
            会場住所：{ tournamentArea }{ tournamentAdress }
          </div>
          <div class="text-l my-2">
            主催者：{ tournamentSponsor }
          </div>
          <div class="text-l my-2">
            主催者Email：{ tournamentSponsorEmail }
          </div>
          <div class="text-l my-2">
            主催者Tel：{ tournamentSponsorTel }
          </div>
          <div class="text-l my-2">
            参加定員：{ tournamentMax }
          </div>
          <div class="text-l my-2">
            現在の参加数：{ tournamentMember }
          </div>
          <div class="text-l my-2">
            参加費：{ tournamentFee }円
          </div>
          <div class="text-l my-2">
            団体区分：{ tournamentGroupType }　{ tournamentGroupOther }
          </div>
          <div class="text-l my-2">
            HP：<a href={`${tournamentHpUrl}`} class="cursor-pointer text-s text-blue" target="_blank">{ tournamentHpUrl }</a><i class="fas fa-external-link-alt ml-2"></i>
          </div>
          <div class="text-l my-2">
            SNS：<a href={`${tournamentSnsUrl}`} class="cursor-pointer text-s text-blue" target="_blank">{ tournamentSnsUrl }</a><i class="fas fa-external-link-alt ml-2"></i>
          </div>
          <div class="text-l my-2">
            LEXIO購入希望数：{ tournamentBuyCount }個
          </div>
          <div class="text-l my-2 whitespace-pre-wrap">
            その他詳細事項：<br/>{ tournamentMemo }
          </div>
          <div class="text-l my-2">
            ご意見・ご質問：<br/>{ tournamentQuestion }
          </div>
        </div>

        <div class="pt-5">
          { tournamentPermit ? (
            <div>
              <div><ButtonJlcInactive class="py-4 bg-black">承認済み</ButtonJlcInactive></div>
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
              <div><ButtonJlcInactive class="py-4">結果確認</ButtonJlcInactive></div>
            </div>
          )}
        </div>
        <div>
          <div><ButtonJlc func={ entryUserEntried } class="py-4">参加者一覧</ButtonJlc></div>
        </div>
        { tournamentSponsorFrag ? (
            <div>
              <div><ButtonJlc func={ entryUserPermit } class="py-4">エントリー管理</ButtonJlc></div>
              <div><ButtonJlc func={ editTournament } class="py-4">大会情報編集</ButtonJlc></div>
              <div><ButtonJlc func={ entryUserShuffle } class="py-4">席順シャッフル</ButtonJlc></div>
              <div><ButtonJlc func={ entryResultSend } class="py-4">結果送信</ButtonJlc></div>
            </div>
          ) : (
            <div></div>
          )}
        <div>
          <div><ButtonDelete func={ deleteTournament } class="py-4 bg-red text-black">大会削除</ButtonDelete></div>
        </div>
        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜一覧に戻る</a></div>
      </div>
    </Index>
  )
}
