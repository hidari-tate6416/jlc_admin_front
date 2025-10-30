import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import ButtonJlcInactive from '/components/parts/ButtonJlcInactive.js';
import SmallButton from '/components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentUser() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const permitFlag = ('true' == router.query.PermitFlag) ? true : false;
  const mainFlag = ('true' == router.query.MainFlag) ? true : false;

  const [users, setUsers] = useState([]);
  const [alertText, setAlertText] = useState("");
  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    // 戻るボタン対策
    if (!tournamentId) {
      router.push("/");
      return;
    }

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
    setButtonActive(false);
    // 登録確認ダイアログ
    if(!window.confirm("会員の階級を変更します。よろしいですか？")){
      setButtonActive(true);
      return;
    }

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
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          予選結果確認
        </div>
        <div className="py-3 mx-8 border-y border-gray-500">
          <table className="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th>ユーザ名</th>
                <th>段位<br />取得日</th>
                <th>スコア</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map(user => (
                <tr>
                  <td className="w-1/4 h-12 text-s md:text-s mr-4">
                    <p>{ user.user.name }</p>
                  </td>
                  <td className="w-1/3">
                    <p className="">{ user.user.user_grade.grade.name }<br />{ (1 != user.user.user_grade.grade.id) ? user.user.user_grade.created_at.match(/^\d{4}-\d{2}-\d{2}/) : '' }</p>
                  </td>
                  <td className="">
                    <p className="">{ user.score }</p>
                  </td>
                  <td className="w-1/6">
                    <p className="">
                      <select id={`${user.user.id}`} className="h-10 rounded-md border-2 border-black">
                        <option value="1" selected={1 == `${user.user.user_grade.grade_id}`}>段なし</option>
                        <option value="2" selected={2 == `${user.user.user_grade.grade_id}`}>１段</option>
                        <option value="3" selected={3 == `${user.user.user_grade.grade_id}`}>２段</option>
                        <option value="4" selected={4 == `${user.user.user_grade.grade_id}`}>３段</option>
                      </select>
                    </p>
                  </td>
                </tr>
              )) : (
                <tr className="">
                  <td className="h-10 text-s md:text-s mr-4">
                    <p></p>
                  </td>
                  <td className="">
                    <p className=""></p>
                  </td>
                  <td className="">
                    <p className=""></p>
                  </td>
                  <td className="">
                    <p className=""></p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
            {(alertText) && <div className="text-s text-red pb-6">{ alertText }</div>}
            { buttonActive ? (
              <div>
                <ButtonJlc func={ saveUser } className="py-4">登録</ButtonJlc>
              </div>
            ) : (
              <div>
                <ButtonJlcInactive className="py-4">登録</ButtonJlcInactive>
              </div>
            )}
          </div>
        <div className="pb-3"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
        <div className="pb-6"><a href="/" className="cursor-pointer text-s text-blue">＜管理者メニューに戻る</a></div>
      </div>
    </Index>
  )
}
