import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import ButtonInactive from '/components/parts/ButtonInactive.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function UserEdit() {

  const router = useRouter();
  const userId = router.query.userId;

  const [alertText, setAlertText] = useState("");
  const [buttonActive, setButtonActive] = useState(true);

  const [sexes, setSexes] = useState([]);
  const [areas, setAreas] = useState([]);

  const [userFamilyName, setUserFamilyName] = useState("");
  const [userFamilyNameKana, setUserFamilyNameKana] = useState("");
  const [userGivenName, setUserGivenName] = useState("");
  const [userGivenNameKana, setUserGivenNameKana] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameKana, setUserNameKana] = useState("");
  const [userBirthday, setBirthday] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userArea, setUserArea] = useState("");
  const [userTel, setUserTel] = useState("");

  // クエリなしでこの画面に来たら前の画面に戻る
  useEffect(() => {
    getUserDetail();
    getSexes();
    getAreas();
  }, []);

  async function getUserDetail() {
    // 戻るボタン対策
    if (!userId) {
      router.push("/user/");
      return;
    }

    await API.post('admin/get_detail_user', {
      "user_id": userId
    }).then(res => {
      if ('OK' == res.data.result) {
        setUserFamilyName(res.data.user.family_name);
        setUserFamilyNameKana(res.data.user.family_name_kana);
        setUserGivenName(res.data.user.given_name);
        setUserGivenNameKana(res.data.user.given_name_kana);
        setUserName(res.data.user.name);
        setUserNameKana(res.data.user.name_kana);
        // setUserLastLogin(res.data.user.last_login_at);
        setBirthday(res.data.user.birthday);
        setUserSex(res.data.user.sex.id);
        setUserArea(res.data.user.area.id);
        setUserTel(res.data.user.tel);
      }
      else {
        router.push({ pathname: "/login"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function getSexes() {
    await API.get('menu/sex').then(res => {
      if ('OK' == res.data.result) {
        setSexes(res.data.menu);
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

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

  async function edit() {

    setAlertText("");

    let familyName = document.getElementById('familyName');
    let givenName = document.getElementById('givenName');
    let familyNameKana = document.getElementById('familyNameKana');
    let givenNameKana = document.getElementById('givenNameKana');
    let name = document.getElementById('name');
    let nameKana = document.getElementById('nameKana');
    let passwordRemind = document.getElementById('passwordRemind');
    let birthday = document.getElementById('birthday');
    let SexId = document.getElementById('SexId');
    let areaId = document.getElementById('areaId');
    let tel = document.getElementById('tel');

    if (!familyName.value || !givenName.value) {
      setAlertText("氏名を入力してください。");
      return;
    }
    if (!familyNameKana.value || !givenNameKana.value) {
      setAlertText("氏名（カナ）を入力してください。");
      return;
    }
    if (!familyNameKana.value.match(/^[ァ-ヶー]+$/) || !givenNameKana.value.match(/^[ァ-ヶー]+$/)) {
      setAlertText("氏名（カナ）は数字や記号も全て全角カタカナで入力してください");
      return;
    }
    if (!name.value) {
      setAlertText("大会名を入力してください。");
      return;
    }
    if (!nameKana.value) {
      setAlertText("大会名（カナ）を入力してください。");
      return;
    }
    if (!nameKana.value.match(/^[ァ-ヶー]+$/)) {
      setAlertText("大会名（カナ）は数字や記号も全て全角カタカナで入力してください");
      return;
    }
    if (!birthday.value) {
      setAlertText("生年月日を入力してください。");
      return;
    }
    if (!birthday.value.match(/^[0-9]{8}$/)) {
      setAlertText("生年月日は半角数字8桁で入力してください。");
      return;
    }
    if (!tel.value) {
      setAlertText("電話番号を入力してください。");
      return;
    }
    if (!SexId.value) {
      setAlertText("選択してください。");
      return;
    }
    if (!areaId.value) {
      setAlertText("選択してください。");
      return;
    }
    if (!tel.value.match(/^[0-9]*$/)) {
      setAlertText("電話番号は半角数字のみで入力してください。");
      return;
    }
    setButtonActive(false);

    // 登録確認ダイアログ
    if(!window.confirm("入力した情報で登録しますか？")){
      setButtonActive(true);
      return;
    }

    await API.post('admin/edit_user_profile', {
      "user_id": userId,
      "family_name": familyName.value,
      "family_name_kana": familyNameKana.value,
      "given_name": givenName.value,
      "given_name_kana": givenNameKana.value,
      "name": name.value,
      "name_kana": nameKana.value,
      "birthday": birthday.value,
      "sex_id": SexId.value,
      "area_id": areaId.value,
      "tel": tel.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/user/edit_complete"});
      }
      else {
        setAlertText("不正アクセスを検知");
      }
    }).catch(err => {
      // console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  async function returnPage() {
    router.push({ pathname: "/user/detail", query: {UserId: userId}}, "/user/detail");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          JLC登録
        </div>
        <div><span class="text-xs pt-6">以下会員情報を入力して<br/>登録ボタンを押下してください。</span></div>
        <div><span class="text-xs"><span class="text-red">*</span>は入力必須項目</span></div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>氏名</div>
          <div class="w-2/3 my-auto">
            <input type="text" id="familyName" class="w-1/3 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userFamilyName}`} placeholder="佐藤" />
            <input type="text" id="givenName" class="w-1/3 ml-2 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userGivenName}`} placeholder="太郎" />
          </div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>氏名(カナ)</div>
          <div class="w-2/3 my-auto">
            <input type="text" id="familyNameKana" class="w-1/3 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userFamilyNameKana}`} placeholder="サトウ" />
            <input type="text" id="givenNameKana" class="w-1/3 ml-2 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userGivenNameKana}`} placeholder="タロウ" />
          </div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>大会選手名</div>
          <div class="w-2/3 my-auto"><input type="text" id="name" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userName}`} placeholder="太郎" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-2">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>大会選手名(カナ)</div>
          <div class="w-2/3 my-auto"><input type="text" id="nameKana" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userNameKana}`} placeholder="タロウ"  autocomplete="off" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>生年月日<br/>(ハイフンなし)</div>
          <div class="w-2/3 my-auto"><input type="text" id="birthday" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userBirthday}`} placeholder="19900130" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>性別</div>
          <div class ="w-2/3 my-auto">
            <select id="SexId" class="w-2/3 pl-2 h-10 rounded-md border-2 border-black">
              {sexes.map(sex => (
                <option value={`${sex.id}`} selected={(sex.id == userSex)? true: false}>{ sex.name }</option>
              ))}
            </select>
          </div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>居住地域</div>
          <div class ="w-2/3 my-auto">
            <select id="areaId" class="w-2/3 pl-2 h-10 rounded-md border-2 border-black">
              {areas.map(area => (
                <option value={`${area.id}`} selected={(area.id == userArea)? true: false}>{ area.name }</option>
              ))}
            </select>
          </div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s"><span class="text-red">*</span>電話番号<br/>(ハイフンなし)</div>
          <div class="w-2/3 my-auto"><input type="text" id="tel" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" defaultValue={`${userTel}`} placeholder="09012345678" /></div>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        { buttonActive ? (
          <div>
             <Button func={ edit }>更新</Button>
          </div>
        ) : (
          <div>
            <ButtonInactive>更新</ButtonInactive>
          </div>
        )}
        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜会員詳細に戻る</a></div>
      </div>
    </Index>
  )
}
