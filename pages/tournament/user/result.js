import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import ButtonJlcInactive from '/components/parts/ButtonJlcInactive.js';
import SmallButton from '/components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function TournamentUserResult() {

  const boardgameId = 1;
  const router = useRouter();
  const tournamentId = (router.query.TournamentId) ? router.query.TournamentId : '';
  const permitFlag = ('true' == router.query.PermitFlag) ? true : false;
  const mainFlag = ('true' == router.query.MainFlag) ? true : false;

  const [users, setUsers] = useState([]);
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
      router.push({ pathname: "/login"});
    });
  }

  async function resultSend() {
    setButtonActive(false);
    // 登録確認ダイアログ
    if(!window.confirm("送信内容は後から変更できません。\r\n送信してよろしいですか？")){
      setButtonActive(true);
      return;
    }
    // パラメータ作成
    const UserCount = users.length;
    let requestUsers = [];
    for (let UserIndex = 0; UserIndex < UserCount; UserIndex++) {
      let userId = users[UserIndex].user.id;
      let score = document.getElementById(userId);
      let resultObject = {
        "id": users[UserIndex].id,
        "user_id": userId,
        "score": score.value
      }
      requestUsers.push(resultObject);
    }

    // API
    await API.post('admin/save_tournament', {
      "tournament_id": tournamentId,
      "users": requestUsers
    }).then(res => {
      if ('OK' == res.data.result) {
        router.push({ pathname: "/tournament/user/result_complete", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/user/result_complete");
      }
    }).catch(err => {
      // console.log(err);
    });
  }

  async function returnPage() {
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/detail");
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          結果送信
        </div>
        <div className="pt-3 mx-8 border-y border-gray-500">
          <table className="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map(user => (
                <tr className="">
                  <td className="w-1/3 h-16 text-s md:text-s mr-4">
                    <p className="">{ user.user.name }</p>
                  </td>
                  <td className="w-1/3">
                    <p className=""><input type="number" id={`${user.user.id}`} className="w-3/4 h-10 pl-2 rounded-md border-2 border-black" defaultValue={`${user.score}`} placeholder="100" /></p>
                  </td>
                </tr>
              )) : (
                <tr className="">
                  <td className="h-16 text-s md:text-s mr-4">
                    <p></p>
                  </td>
                  <td className="">
                    <p className=""></p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          { buttonActive && users.length ? (
            <div>
              <div className="mt-4">
                <ButtonJlc func={ resultSend }>送信</ButtonJlc>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <ButtonJlcInactive>送信</ButtonJlcInactive>
            </div>
          )}
        </div>
        <div className="mt-4 pb-6"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
      </div>
    </Index>
  )
}
