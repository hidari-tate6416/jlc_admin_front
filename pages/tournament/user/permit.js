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

  async function permitUser(userId) {
      await API.post('user/permit_entry', {
        "tournament_id": tournamentId,
        "user_id": userId,
        "permit_flag": true
      }).then(res => {
        if ('OK' == res.data.result) {
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

  async function returnPage() {
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, SponsorFlag: true}}, "/tournament/detail");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          エントリー管理
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
                  <td class="">
                    <SmallButton func={ () => permitUser(user.user.id) }>承認</SmallButton>
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
        <div class="mt-4 pb-6"><a onClick={() =>returnPage()} class="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
      </div>
    </Index>
  )
}
