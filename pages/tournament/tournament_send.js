import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import ButtonInactive from '/components/parts/ButtonInactive.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentSend() {

  const boardgameId = 1;
  const router = useRouter();
  const [alertText, setAlertText] = useState("");
  const [buttonActive, setButtonActive] = useState(true);
  const [otherDispFlag, setOtherDispFlag] = useState(false);

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
    let groupTypeId = document.getElementById('groupTypeId');
    let groupOther = document.getElementById('groupOther');
    let hpUrl = (document.getElementById('hpUrl')) ?? document.getElementById('hpUrl');
    let snsUrl = (document.getElementById('snsUrl')) ?? document.getElementById('snsUrl');

    let memo = document.getElementById('memo');

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
      setAlertText("主催者連絡先Emailを入力してください。");
      return;
    }
    if (!email.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
      setAlertText("主催者連絡先Emailはメールアドレスの形式で入力してください。");
      return;
    }
    if (!tel.value) {
      setAlertText("主催者電話番号を入力してください。");
      return;
    }
    if (!tel.value.match(/^[0-9]*$/)) {
      setAlertText("主催者電話番号は半角数字で入力してください。");
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
    if (!groupTypeId.value.match(/^[1-6]*$/)) {
      setAlertText("団体区分を選択してください。");
      return;
    }
    if (5 == groupTypeId.value && !groupOther.value) {
      setAlertText("団体区分その他を入力してください。");
      return;
    }
    if (!memo.value) {
      setAlertText("備考を入力してください。");
      return;
    }
    setButtonActive(false);

    // 登録確認ダイアログ
    if(!window.confirm("入力した内容で再登録してよろしいですか？")){
      setButtonActive(true);
      return;
    }

    await API.post('admin/send_tournament', {
      "name": name.value,
      "boardgame_id": boardgameId,
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
      "sns_url": 'https://x.com/Lexio_Japan',
      "memo": memo.value,
      "min_grade": grade.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/tournament/tournament_complete"});
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
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

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          予選・本戦開催
        </div>
        <div><span class="text-xs pt-6">以下情報を入力して<br/>申請ボタンを押下してください。</span></div>
        <div><span class="text-xs"><span class="text-red">*</span>は入力必須項目</span></div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>大会名</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="name" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="東京新宿予選1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>日程</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="startDay" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="19900101" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>開始時間</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="startTime" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span class="my-auto">時</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>終了予定時間</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="endTime" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="18" /><span class="my-auto">時</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>会場名</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="place" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="東京ビックサイト" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>会場住所</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="adress" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="新宿区1-1-1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>定員</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="maxMember" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span class="my-auto">名</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>主催者連絡先Email</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="email" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="test@gmail.com" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>主催者電話番号</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="number" id="tel" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="09012345678" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>参加料</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="fee" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="3000" /><span class="my-auto">円</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>参加最低段数</div>
          <div class="w-2/3 my-auto">
            <div class="w-2/3 mx-auto flex">
              <select id="grade" class="w-32 h-10 rounded-md border-2 border-black">
                <option value="0">段なし</option>
                <option value="1">１段</option>
                <option value="2">２段</option>
                <option value="3">３段</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>団体区分</div>
          <div class ="w-2/3 my-auto">
            <select id="groupTypeId" onChange={ () => GroupChange() } class="w-2/3 pl-2 h-10 rounded-md border-2 border-black" required>
              <option value="" class="text-gray-600" checked>選択してください</option>
              <option value="6">レキシオ・ジャパン本部</option>
              <option value="1">カフェなどの店舗</option>
              <option value="2">一般サークル</option>
              <option value="3">学校サークル</option>
              <option value="4">企業サークル</option>
              <option value="5">その他</option>
            </select>
          </div>
        </div>
        {(otherDispFlag) &&
          <div class="flex justify-between pt-6 mb-6">
            <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>団体区分その他</div>
            <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="text" id="groupOther" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="" /></div></div>
          </div>
        }
         <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">HP等のURL</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="text" id="hpUrl" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="https://x.com/Lexio_Japan" /></div></div>
        </div>
        <div class="flex pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">その他詳細事項</div>
          <div class="w-2/3 my-auto md:mr-4 text-s"></div>
        </div>
        <div class="flex w-4/5 mx-auto mb-6">
          <textarea type="textarea" id="memo" class="w-full h-40 pl-2 rounded-md border-2 border-black">
            成績が上位10%には2段を授与
            成績が上位2名には3段と韓国での世界大会出場権を授与
          </textarea>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        { buttonActive ? (
          <div>
            <Button func={ sendInput }>登録</Button>
          </div>
        ) : (
          <div>
            <ButtonInactive>登録</ButtonInactive>
          </div>
        )}
        <div class="mt-2 pb-6"><Link href="/" class="text-s text-blue">＜管理者メニューに戻る</Link></div>
      </div>
    </Index>
  )
}
