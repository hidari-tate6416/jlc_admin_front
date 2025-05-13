import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import ButtonInactive from '/components/parts/ButtonInactive.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentEdit() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';

  const [alertText, setAlertText] = useState("");
  const [otherDispFlag, setOtherDispFlag] = useState(false);
  const [buttonActive, setButtonActive] = useState(true);

  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState("");
  const [tournamentHour, setTournamentHour] = useState("");
  const [tournamentEndHour, setTournamentEndHour] = useState("");
  const [tournamentPlace, setTournamentPlace] = useState("");
  const [tournamentAdress, setTournamentAdress] = useState("");
  const [tournamentMax, setTournamentMax] = useState("");
  const [tournamentEmail, setTournamentEmail] = useState("");
  const [tournamentTel, setTournamentTel] = useState("");
  const [tournamentFee, setTournamentFee] = useState("");
  const [tournamentGroupTypeId, setTournamentGroupTypeId] = useState("");
  const [tournamentGroupOther, setTournamentGroupOther] = useState("");
  const [tournamentMemo, setTournamentMemo] = useState("");
  const [tournamentHpUrl, setTournamentHpUrl] = useState("");
  const [tournamentSnsUrl, setTournamentSnsUrl] = useState("");
  const [tournamentMinGrade, setTournamentMinGrade] = useState("");

  useEffect(() => {
    getTournamentDetail();
  }, []);

  async function getTournamentDetail() {
    await API.post('admin/get_detail_tournament', {
      "tournament_id": tournamentId
    }).then(res => {
      if ('OK' == res.data.result) {
        setTournamentName(res.data.tournament.name);
        setTournamentDate(res.data.tournament.start_day.replaceAll("-", ""));
        setTournamentHour(res.data.tournament.start_time);
        setTournamentEndHour(res.data.tournament.end_time);
        setTournamentPlace(res.data.tournament.place);
        setTournamentAdress(res.data.tournament.adress);
        setTournamentMax(res.data.tournament.max_member);
        setTournamentEmail(res.data.tournament.email);
        setTournamentTel(res.data.tournament.tel);
        setTournamentFee(res.data.tournament.fee);
        setTournamentGroupTypeId(res.data.tournament.group_type_id);
        setTournamentGroupOther(res.data.tournament.group_other);
        setTournamentMemo(res.data.tournament.memo.replaceAll(" ", "\n"));
        setTournamentHpUrl(res.data.tournament.hp_url);
        setTournamentSnsUrl(res.data.tournament.sns_url);
        setTournamentMinGrade(res.data.tournament.min_grade);

        if (5 == res.data.tournament.group_type_id) {
          setOtherDispFlag(true);
        }
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function sendInput() {
    setAlertText("");

    let name = document.getElementById('name');
    let startDay = document.getElementById('startDay');
    let startTime = document.getElementById('startTime');
    let endTime = document.getElementById('endTime');
    let place = document.getElementById('place');
    let adress = document.getElementById('adress');
    let maxMember = document.getElementById('maxMember');
    let email = document.getElementById('email');
    let tel = document.getElementById('tel');
    let fee = document.getElementById('fee');
    let grade = document.getElementById('grade');
    let memo = document.getElementById('memo');
    let groupTypeId = document.getElementById('groupTypeId');
    let groupOther = document.getElementById('groupOther');
    let hpUrl = (document.getElementById('hpUrl')) ?? document.getElementById('hpUrl');
    let snsUrl = (document.getElementById('snsUrl')) ?? document.getElementById('snsUrl');

    if (!name.value) {
      setAlertText("予選名を入力してください。");
      return;
    }
    if (!startDay.value) {
      setAlertText("日程を入力してください。");
      return;
    }
    if (!startDay.value.match(/^[0-9]{8}$/)) {
      setAlertText("日程は半角数字8桁で入力してください。");
      return;
    }
    if (!startTime.value) {
      setAlertText("開始時間を入力してください。");
      return;
    }
    if (!startTime.value.match(/^[0-9]{2}$/)) {
      setAlertText("開始時間は半角数字2桁で入力してください。");
      return;
    }
    if (startTime.value < 0 || 24 < startTime.value) {
      setAlertText("開始時間は0から24の間で入力してください。");
      return;
    }
    if (!endTime.value) {
      setAlertText("終了予定時間を入力してください。");
      return;
    }
    if (!endTime.value.match(/^[0-9]{2}$/)) {
      setAlertText("終了予定時間は半角数字2桁で入力してください。");
      return;
    }
    if (endTime.value < 0 || 24 < startTime.value) {
      setAlertText("終了予定時間は0から24の間で入力してください。");
      return;
    }
    if (startTime.value >= endTime.value) {
      setAlertText("終了予定時間は開始時間より遅い時間を入力してください。");
      return;
    }
    if (!place.value) {
      setAlertText("会場名を入力してください。");
      return;
    }
    if (!adress.value) {
      setAlertText("会場住所を入力してください。");
      return;
    }
    if (!maxMember.value) {
      setAlertText("定員を入力してください。");
      return;
    }
    if (maxMember.value < 3) {
      setAlertText("定員は3名以上です。");
      return;
    }
    if (!maxMember.value.match(/^[0-9]*$/)) {
      setAlertText("定員は半角数字で入力してください。");
      return;
    }
    if (!email.value) {
      setAlertText("参加者連絡先Emailを入力してください。");
      return;
    }
    if (!email.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
      setAlertText("参加者連絡先Emailはメールアドレスの形式で入力してください。");
      return;
    }
    if (!tel.value) {
      setAlertText("参加者連絡先電話を入力してください。");
      return;
    }
    if (!tel.value.match(/^[0-9]*$/)) {
      setAlertText("電話番号は半角数字で入力してください。");
      return;
    }
    if (!fee.value) {
      setAlertText("参加料を入力してください。");
      return;
    }
    if (!fee.value.match(/^[0-9]*$/)) {
      setAlertText("参加料は半角数字で入力してください。");
      return;
    }
    if (fee.value < 0) {
      setAlertText("開始時間は0から24の間で入力してください。");
      return;
    }
    if (!grade.value) {
      setAlertText("指定外の値が選択されています。");
      return;
    }
    if (0 == groupTypeId.value) {
      setAlertText("団体区分を選択してください。");
      return;
    }
    if (!groupTypeId.value.match(/^[1-5]*$/)) {
      setAlertText("団体区分を選択してください。");
      return;
    }
    if (5 == groupTypeId.value && !groupOther.value) {
      setAlertText("団体区分その他を入力してください。");
      return;
    }

    setButtonActive(false);

    // 登録確認ダイアログ
    if(!window.confirm("大会内容を編集します。よろしいですか？")){
      setButtonActive(true);
      return;
    }

    await API.post('admin/edit_tournament', {
      "tournament_id": tournamentId,
      "name": name.value,
      "start_day": startDay.value,
      "start_time": startTime.value,
      "end_time": endTime.value,
      "place": place.value,
      "adress": adress.value,
      "max_member": maxMember.value,
      "email": email.value,
      "tel": tel.value,
      "fee": fee.value,
      "group_type_id": groupTypeId.value,
      "group_other": (5 == groupTypeId.value) ? groupOther.value : '',
      "hp_url": (hpUrl.value) ? hpUrl.value : '',
      "sns_url": (snsUrl.value) ? snsUrl.value : '',
      "memo": memo.value,
      "min_grade": grade.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/tournament/tournament_complete"});
      }
      else {
        setAlertText("不正アクセスを検知");
      }
    }).catch(err => {
      // console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  async function GroupChange() {
    let groupTypeId = document.getElementById('groupTypeId');
    if (5 == groupTypeId.value) {
      setOtherDispFlag(true);
    }
    else {
      setOtherDispFlag(false)
    }
  }

  function returnPage() {
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId}}, "/tournament/detail");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          予選編集
        </div>
        <div><span class="text-xs pt-6">以下情報を編集して<br/>再申請ボタンを押下してください。</span></div>
        <div><span class="text-xs"><span class="text-red">*</span>は入力必須項目</span></div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>予選名</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="name" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentName}`} placeholder="東京新宿予選1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>日程</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="startDay" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentDate}`} placeholder="20250501" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>開始時間</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="startTime" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentHour}`} placeholder="15" /><span class="my-auto">時</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>終了予定時間</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="endTime" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentEndHour}`} placeholder="18" /><span class="my-auto">時</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>会場名</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="place" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentPlace}`} placeholder="東京ビックサイト" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>会場住所</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="adress" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentAdress}`} placeholder="新宿区1-1-1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>定員</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="maxMember" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentMax}`} placeholder="15" /><span class="my-auto">名</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>主催者連絡先Email</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="email" class="w-full py-2 pl-2 rounded-md border-2 border-black"defaultValue={`${tournamentEmail}`} placeholder="test@gmail.com" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>主催者連絡先電話</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="number" id="tel" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentTel}`} placeholder="09012345678" /></div></div>
        </div>
        <div>
          <span class="text-xs pt-6">主催者連絡先Emailと主催者連絡先電話はエントリー承認したユーザにのみ公開されます。</span>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>参加料</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="fee" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentFee}`} placeholder="3000" /><span class="my-auto">円</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>参加最低段数</div>
          <div class="w-2/3 my-auto">
            <div class="w-2/3 mx-auto flex">
              <select id="grade" class="w-32 h-10 rounded-md border-2 border-black">
                <option value="0" selected={(0 == tournamentMinGrade)? true: false}>段なし</option>
                <option value="1" selected={(1 == tournamentMinGrade)? true: false}>１段</option>
                <option value="2" selected={(2 == tournamentMinGrade)? true: false}>２段</option>
                <option value="3" selected={(3 == tournamentMinGrade)? true: false}>３段</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>団体区分</div>
          <div class ="w-2/3 my-auto">
            <select id="groupTypeId" onChange={ () => GroupChange() } class="w-2/3 pl-2 h-10 rounded-md border-2 border-black" required>
              <option value="" class="text-gray-600">選択してください</option>
              <option value="6" selected={(6 == tournamentGroupTypeId) ? true : false}>レキシオ・ジャパン本部</option>
              <option value="1" selected={(1 == tournamentGroupTypeId) ? true : false}>カフェなどの店舗</option>
              <option value="2" selected={(2 == tournamentGroupTypeId) ? true : false}>一般サークル</option>
              <option value="3" selected={(3 == tournamentGroupTypeId) ? true : false}>学校サークル</option>
              <option value="4" selected={(4 == tournamentGroupTypeId) ? true : false}>企業サークル</option>
              <option value="5" selected={(5 == tournamentGroupTypeId) ? true : false}>その他</option>
            </select>
          </div>
        </div>
        {(otherDispFlag) &&
          <div class="flex justify-between pt-6 mb-6">
            <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>団体区分その他</div>
            <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="text" id="groupOther" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentGroupOther}`} placeholder="" /></div></div>
          </div>
        }
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">HP等のURL</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="text" id="hpUrl" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentHpUrl}`} placeholder="https://x.com/Lexio_Japan" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">SNSアカウント<br/>URL</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="text" id="snsUrl" class="w-full py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${tournamentSnsUrl}`} placeholder="https://x.com/Lexio_Japan" /></div></div>
        </div>
        <div class="flex pt-6 mb-6">
          <div class="w-2/5 my-auto md:mr-4 text-s">その他詳細事項</div>
          <div class="w-3/5 my-auto md:mr-4 text-s"></div>
        </div>
        <div class="flex w-4/5 mx-auto mb-4">
          <textarea type="textarea" id="memo" class="w-full h-40 pl-2 rounded-md border-2 border-black whitespace-pre-wrap" defaultValue={`${tournamentMemo}`}>
          </textarea>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        { buttonActive ? (
          <div>
            <Button func={ sendInput }>再登録</Button>
          </div>
        ) : (
          <div>
            <ButtonInactive>再登録</ButtonInactive>
          </div>
        )}
        <div class="mt-2 pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
      </div>
    </Index>
  )
}
