import Index from '../../components/Index.js';
import ButtonJlc from '../../components/parts/ButtonJlc.js';
import ButtonInactive from '../../components/parts/ButtonInactive.js';
import SmallButton from '../../components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import Link from 'next/link';

export default function UserDetail() {

  const boardgameId = 1;
  const router = useRouter();
  const userId = (router.query.UserId) ? router.query.UserId : '';

  const [userName, setUserName] = useState("");
  const [userNameKana, setUserNameKana] = useState("");
  const [userLastLogin, setUserLastLogin] = useState("");
  const [userCreatedAt, setCreatedAt] = useState("");
  const [userBirthday, setBirthday] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userGradeId, setUserGradeId] = useState(0);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    getUserDetail();
  }, []);

  async function getUserDetail() {
    await API.post('admin/get_detail_user', {
      "user_id": userId
    }).then(res => {
      if ('OK' == res.data.result) {
        setUserName(res.data.user.name);
        setUserNameKana(res.data.user.name_kana);
        setUserLastLogin(res.data.user.last_login_at);
        setCreatedAt(res.data.user.created_at);
        setBirthday(res.data.user.birthday);
        setEmail(res.data.user.email);
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
            ユーザ名：{ userName }
          </div>
          <div class="text-xl my-2">
            ユーザ名カナ：{ userNameKana }
          </div>
          <div class="text-xl my-2">
            生年月日：{ userBirthday }
          </div>
          <div class="text-xl my-2">
            Email：{ userEmail }
          </div>
          <div class="text-xl my-2">
            登録日：{ userCreatedAt }
          </div>
          <div class="text-xl my-2">
            最終ログイン日時：{ userLastLogin }
          </div>
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
          <div><ButtonJlc func={ saveUser } class="py-4">登録</ButtonJlc></div>
        </div>

        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜会員一覧に戻る</a></div>
      </div>
    </Index>
  )
}
