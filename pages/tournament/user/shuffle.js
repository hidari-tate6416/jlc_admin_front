import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
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

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    await API.post('user/get_entry_users', {
      "tournament_id": tournamentId,
      "permit_flag": false
    }).then(res => {
      setUsers(res.data.users);
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/"});
    });
  }

  async function returnPage() {
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, PermitFlag: permitFlag, MainFlag: mainFlag}}, "/tournament/detail");
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          席順シャッフル
        </div>
        <div>開発中</div>
        {/* <div className="py-3 mx-8 border-y border-gray-500">
          <table className="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map(user => (
                <tr className="">
                  <td className="h-10 text-s md:text-s mr-4">
                    <p>{ user.user.name }</p>
                  </td>
                  <td className="">
                    <p className="">{ user.user.user_grade.grade.name }</p>
                  </td>
                  <td className="">
                    <SmallButton func={ () => permitUser(user.user.id) }>承認</SmallButton>
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
        </div> */}
        <div className="mt-4 pb-6"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
      </div>
    </Index>
  )
}
