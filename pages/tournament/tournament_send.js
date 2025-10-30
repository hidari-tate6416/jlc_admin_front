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

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAreas();
  }, []);

  async function getAreas() {
    await API.get('menu/area').then(res => {
      if ('OK' == res.data.result) {
        setAreas(res.data.menu);
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
    let areaId = document.getElementById('areaId');
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
    if (!areaId.value) {
      setAlertText("選択してください。");
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
      setAlertText("予選・本戦で指定外の値が選択されています。");
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
      "area_id": areaId.value,
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
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          予選・本戦開催
        </div>
        <div><span className="text-xs pt-6">以下情報を入力して<br/>登録ボタンを押下してください。</span></div>
        <div><span className="text-xs"><span className="text-red">*</span>は入力必須項目</span></div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>大会名</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="name" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="東京新宿予選1" /></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>日程</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="startDay" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="19900101" /></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>開始時間</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="number" id="startTime" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span className="my-auto">時</span></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>終了予定時間</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="number" id="endTime" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="18" /><span className="my-auto">時</span></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>会場名</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="place" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="東京ビックサイト" /></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>会場住所</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="adress" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="新宿区1-1-1" /></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>居住地域</div>
          <div class ="w-2/3 my-auto">
            <select id="areaId" className="w-2/3 pl-2 h-10 rounded-md border-2 border-black">
              {areas.map(area => (
                <option value={`${area.id}`} selected={(area.id == 1)? true: false}>{ area.name }</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>定員</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="number" id="maxMember" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span className="my-auto">名</span></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>主催者連絡先Email</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="email" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="test@gmail.com" /></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>主催者電話番号</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="number" id="tel" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="09012345678" /></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>参加料</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="number" id="fee" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="3000" /><span className="my-auto">円</span></div></div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>予選・全国大会</div>
          <div className="w-2/3 my-auto">
            <div className="w-2/3 mx-auto flex">
              <select id="grade" className="w-32 h-10 rounded-md border-2 border-black">
                <option value="0">予選</option>
                <option value="1">全国大会</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>団体区分</div>
          <div class ="w-2/3 my-auto">
            <select id="groupTypeId" onChange={ () => GroupChange() } className="w-2/3 pl-2 h-10 rounded-md border-2 border-black" required>
              <option value="" className="text-gray-600" checked>選択してください</option>
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
          <div className="flex justify-between pt-6 mb-6">
            <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>団体区分その他</div>
            <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="text" id="groupOther" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="" /></div></div>
          </div>
        }
         <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s">HP等のURL</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="text" id="hpUrl" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="https://x.com/Lexio_Japan" /></div></div>
        </div>
        <div className="flex pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s">その他詳細事項</div>
          <div className="w-2/3 my-auto md:mr-4 text-s"></div>
        </div>
        <div className="flex w-4/5 mx-auto mb-6">
          <textarea type="textarea" id="memo" className="w-full h-40 pl-2 rounded-md border-2 border-black">
            必ずJLC詳細（https://lexio-japan.com/jlc/）をご確認の上、エントリーお願いします。
          </textarea>
        </div>

        {(alertText) && <div className="text-s text-red pb-6">{ alertText }</div>}
        { buttonActive ? (
          <div>
            <Button func={ sendInput }>登録</Button>
          </div>
        ) : (
          <div>
            <ButtonInactive>登録</ButtonInactive>
          </div>
        )}
        <div className="mt-2 pb-6"><Link href="/" className="text-s text-blue">＜管理者メニューに戻る</Link></div>
      </div>
    </Index>
  )
}
