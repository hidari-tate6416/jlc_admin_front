import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import SmallButton from '/components/parts/SmallButton.js';
import ButtonDelete from '/components/parts/ButtonDelete.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentUserEntried() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const permitFlag = ('true' == router.query.PermitFlag) ? true : false;
  const mainFlag = ('true' == router.query.MainFlag) ? true : false;
  const dlUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace('api/', '');

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    // 戻るボタン対策
    if (!tournamentId) {
      router.push("/");
      return;
    }

    await API.post('admin/get_entry_users', {
      "tournament_id": tournamentId,
      "permit_flag": true
    }).then(res => {
      if ('OK' == res.data.result) {
        setUsers(res.data.users);
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/"});
    });

    // tokenをセット
    setToken(localStorage.getItem("token"));
  }

  async function deleteUser(userId) {
    // 登録確認ダイアログ
    if(!window.confirm("参加を取り消します。よろしいですか？")){
      return;
    }

    await API.post('admin/delete_entry_user', {
      "tournament_id": tournamentId,
      "user_id": userId
    }).then(res => {
      if ('OK' === res.data.result) {
        getUsers();
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
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/detail");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          エントリー一覧
        </div>
        <div class="py-3 mx-8 border-y border-gray-500">
          <table class="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map(user => (
                <tr class="">
                  <td class="h-10 text-s md:text-s mr-4">
                    <p>{ user.user.name }</p>
                  </td>
                  <td class="">
                    <p class="">{ user.user.user_grade.grade.name }</p>
                  </td>
                  <td class="w-1/3">
                    <ButtonDelete func={ () => deleteUser(user.user.id) } class="bg-red text-black">参加取消</ButtonDelete>
                  </td>
                </tr>
              )) : (
                <tr class="">
                  <td class="w-1/3 h-10 text-s md:text-s mr-4">
                    <p></p>
                  </td>
                  <td class="w-1/3">
                    <p class=""></p>
                  </td>
                  <td class="">
                    <p class=""></p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div class="mt-4">
          <a href={`${dlUrl + 'user/download_entry_users?token=' + token + '&tournament_id=' + tournamentId}`} target="_blank"><Button>Excelダウンロード</Button></a>
        </div>
        <div class="mt-4 pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
      </div>
    </Index>
  )
}
