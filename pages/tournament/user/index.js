import Index from '../../../components/Index.js';
import ButtonJlc from '../../../components/parts/ButtonJlc.js';
import SmallButton from '../../../components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../../plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentUser() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const permitFlag = (router.query.PermitFlag) ? true : false;
  const mainFlag = (router.query.MainFlag) ? true : false;

  const [users, setUsers] = useState([]);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    await API.post('admin/get_tournament_result', {
      "tournament_id": tournamentId
    }).then(res => {
      if ('OK' == res.data.result) {
        setUsers(res.data.users);
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function saveUser() {
    // パラメータ作成
    const UserCount = users.length;
    let requestUsers = [];
    for (let UserIndex = 0; UserIndex < UserCount; UserIndex++) {
      let userId = users[UserIndex].user.id;
      let gradeId = document.getElementById(userId);
      let resultObject = {
        "user_id": userId,
        "grade_id": gradeId.value
      }
      requestUsers.push(resultObject);
    }

    await API.post('admin/save_user_grades', {
      "boardgame_id": boardgameId,
      "users": requestUsers
    }).then(res => {
      if ('OK' == res.data.result) {
        router.push({ pathname: "/tournament/user/grade_complete", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/grade_complete");
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
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/detail");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          予選結果確認
        </div>
        <div class="py-3 mx-8 border-y border-gray-500">
          <table class="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th>ユーザ名</th>
                <th>スコア</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map(user => (
                <tr>
                  <td class="h-12 text-s md:text-s mr-4">
                    <p>{ user.user.name }</p>
                  </td>
                  <td class="">
                    <p class="">{ user.score }</p>
                  </td>
                  <td class="w-1/3">
                    <p class="">
                      <select id={`${user.user.id}`} class="w-32 h-10 rounded-md border-2 border-black">
                        <option value="1" selected={1 == `${user.user.user_grade.grade_id}`}>段なし</option>
                        <option value="2" selected={2 == `${user.user.user_grade.grade_id}`}>１段</option>
                        <option value="3" selected={3 == `${user.user.user_grade.grade_id}`}>２段</option>
                        <option value="4" selected={4 == `${user.user.user_grade.grade_id}`}>３段</option>
                      </select>
                    </p>
                  </td>
                </tr>
              )) : (
                <tr class="">
                  <td class="h-10 text-s md:text-s mr-4">
                    <p></p>
                  </td>
                  <td class="">
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
            {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
            <div><ButtonJlc func={ saveUser } class="py-4">登録</ButtonJlc></div>
          </div>
        <div class="pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
      </div>
    </Index>
  )
}
