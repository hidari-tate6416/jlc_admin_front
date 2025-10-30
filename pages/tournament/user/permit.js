import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import SmallButton from '/components/parts/SmallButton.js';
import ButtonDelete from '/components/parts/ButtonDelete.js';
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
      "permit_flag": false
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

  async function permitUser(userId) {
    // 登録確認ダイアログ
    if(!window.confirm("後から承認を取り消すことはできません。承認してよろしいですか？")){
      return;
    }
    await API.post('admin/permit_entry', {
      "tournament_id": tournamentId,
      "user_id": userId,
      "permit_flag": true
    }).then(res => {
      if ('OK' == res.data.result) {
        // alert
        getUsers();
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
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
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          エントリー管理
        </div>
        <div className="py-3 mx-8 border-y border-gray-500">
          <table className="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map(user => (
                <tr className="">
                  <td className="w-1/4 h-10 text-s md:text-s mr-4">
                    <p>{ user.user.name }</p>
                  </td>
                  <td className="w-1/4">
                    <p className="">{ user.user.user_grade.grade.name }</p>
                  </td>
                  <td className="w-1/4">
                    <SmallButton func={ () => permitUser(user.user.id) }>承認</SmallButton>
                  </td>
                  <td className="w-1/4">
                    <ButtonDelete func={ () => deleteUser(user.user.id) }>拒否</ButtonDelete>
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
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pb-3"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
        <div className="pb-6"><a href="/" className="cursor-pointer text-s text-blue">＜管理者メニューに戻る</a></div>
      </div>
    </Index>
  )
}
