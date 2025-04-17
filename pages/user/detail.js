import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import ButtonJlcInactive from '/components/parts/ButtonJlcInactive.js';
import SmallButton from '/components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function UserDetail() {

  const boardgameId = 1;
  const router = useRouter();
  const userId = (router.query.UserId) ? router.query.UserId : '';

  const [userFamilyName, setUserFamilyName] = useState("");
  const [userFamilyNameKana, setUserFamilyNameKana] = useState("");
  const [userGivenName, setUserGivenName] = useState("");
  const [userGivenNameKana, setUserGivenNameKana] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameKana, setUserNameKana] = useState("");
  // const [userLastLogin, setUserLastLogin] = useState("");
  const [userCreatedAt, setCreatedAt] = useState("");
  const [userBirthday, setBirthday] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userArea, setUserArea] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userGradeId, setUserGradeId] = useState(0);
  const [alertText, setAlertText] = useState("");
  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    getUserDetail();
  }, []);

  async function getUserDetail() {
    // 戻るボタン対策
    if (!userId) {
      router.push("/");
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
        setCreatedAt(res.data.user.created_at);
        setBirthday(res.data.user.birthday);
        setUserSex(res.data.user.sex.name);
        setUserArea(res.data.user.area.name);
        setEmail(res.data.user.email);
        setUserTel(res.data.user.tel);
        setUserGradeId(res.data.user.user_grade.grade_id);
      }
      else {
        router.push({ pathname: "/login"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function saveUser() {
    let gradeId = document.getElementById('gradeId');
    if (!gradeId.value) {
      setAlertText("指定外の値が選択されています。");
      return;
    }
    setButtonActive(false);

    // 登録確認ダイアログ
    if(!window.confirm("会員の階級を変更します。よろしいですか？")){
      setButtonActive(true);
      return;
    }

    await API.post('admin/save_user_grades', {
      "boardgame_id": boardgameId,
      "users": [
        {
            "user_id": userId,
            "grade_id": gradeId.value
        }
      ]
    }).then(res => {
      if ('OK' == res.data.result) {
        router.push({ pathname: "/user/complete"});
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function returnPage() {
    router.push({ pathname: "/user/"});
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          会員詳細
        </div>

        <div class="mx-8 py-5 border-y text-left">
        <div class="text-xl my-2">
            氏名：{ userFamilyName } {userGivenName}
          </div>
          <div class="text-xl my-2">
            氏名カナ：{ userFamilyNameKana } {userGivenNameKana}
          </div>
          <div class="text-xl my-2">
            大会名：{ userName }
          </div>
          <div class="text-xl my-2">
            大会名カナ：{ userNameKana }
          </div>
          <div class="text-xl my-2">
            生年月日：{ userBirthday }
          </div>
          <div class="text-xl my-2">
            性別：{ userSex }
          </div>
          <div class="text-xl my-2">
            居住地域：{ userArea }
          </div>
          <div class="text-xl my-2">
            Email：{ userEmail }
          </div>
          <div class="text-xl my-2">
            電話番号：{ userTel }
          </div>
          <div class="text-xl my-2">
            登録日：{ userCreatedAt }
          </div>
          {/* <div class="text-xl my-2">
            最終ログイン日時：{ userLastLogin }
          </div> */}
        </div>
        <div class="my-2 justify-between">
          <select id="gradeId" class="w-32 h-10 rounded-md border-2 border-black">
            <option value="1" selected={1 == `${userGradeId}`}>段なし</option>
            <option value="2" selected={2 == `${userGradeId}`}>１段</option>
            <option value="3" selected={3 == `${userGradeId}`}>２段</option>
            <option value="4" selected={4 == `${userGradeId}`}>３段</option>
          </select>
        </div>
        <div>
          {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
          { buttonActive ? (
            <div>
              <ButtonJlc func={ saveUser } class="py-4">登録</ButtonJlc>
            </div>
          ) : (
            <div>
              <ButtonJlcInactive class="py-4">登録</ButtonJlcInactive>
            </div>
          )}
        </div>

        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜会員一覧に戻る</a></div>
      </div>
    </Index>
  )
}
