import Index from '../../components/Index.js';
import Button from '../../components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentSend() {

  const boardgameId = 1;
  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  async function sendInput() {
    setAlertText("");

    let name = document.getElementById('name');
    let startDay = document.getElementById('startDay');
    let startTime = document.getElementById('startTime');
    let place = document.getElementById('place');
    let maxMember = document.getElementById('maxMember');
    let email = document.getElementById('email');
    let tel = document.getElementById('tel');
    let fee = document.getElementById('fee');
    let grade = document.getElementById('grade');
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
    if (!place.value) {
      setAlertText("場所を入力してください。");
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
      setAlertText("電話番号を入力してください。");
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
    if (!memo.value) {
      setAlertText("備考を入力してください。");
      return;
    }

    await API.post('admin/send_tournament', {
      "name": name.value,
      "boardgame_id": boardgameId,
      "start_day": startDay.value,
      "start_time": startTime.value,
      "place": place.value,
      "max_member": maxMember.value,
      "email": email.value,
      "tel": tel.value,
      "fee": fee.value,
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

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          予選・本戦開催
        </div>
        <span class="text-xs pt-6">以下情報を入力して<br/>登録ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">大会名</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="name" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="東京新宿予選1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">日程</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="startDay" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="19900101" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">開始時間</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="startTime" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span class="my-auto">時</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">場所</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="place" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="新宿区1-1-1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">定員</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="maxMember" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span class="my-auto">名</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">参加者連絡先Email</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="email" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="test@gmail.com" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">電話番号</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="number" id="tel" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="09012345678" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">参加料</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="fee" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="3000" /><span class="my-auto">円</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">参加最低段数</div>
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
        <div class="flex pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">備考</div>
          <div class="w-2/3 my-auto md:mr-4 text-s"></div>
        </div>
        <div class="flex w-4/5 mx-auto mb-6">
          <textarea type="textarea" id="memo" class="w-full h-40 pl-2 rounded-md border-2 border-black">成績が上位10%には2段を授与、成績が上位2名には3段と韓国での世界大会出場権を授与</textarea>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ sendInput }>登録</Button>
        <div class="mt-2 pb-6"><Link href="/" class="text-s text-blue">＜管理者メニューに戻る</Link></div>
      </div>
    </Index>
  )
}
