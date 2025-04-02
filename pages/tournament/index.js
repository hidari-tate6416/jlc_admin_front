import Index from '../../components/Index.js';
import ButtonJlc from '../../components/parts/ButtonJlc.js';
import SmallButton from '../../components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import Link from 'next/link';

export default function Tournament() {

  const boardgameId = 1;
  const router = useRouter();
  const permitFlag = (router.query.PermitFlag) ? true : false;
  const mainFlag = (router.query.MainFlag) ? true : false;

  const [tournaments, setTournamens] = useState([]);
  const [title, setTitle] = useState('予選申請一覧');

  useEffect(() => {
    getTitle();
    getTournaments();
  }, []);

  function getTitle() {
    if (permitFlag) {
      setTitle('予選一覧');
    } else if (mainFlag) {
      setTitle('本戦一覧');
    } else {
      // 予選一覧のまま
    }
  }

  async function getTournaments() {
    await API.post('admin/get_list_tournament', {
      "boardgame_id": boardgameId,
      "permit_flag": permitFlag,
      "main_flag": mainFlag
    }).then(res => {
      if ('OK' == res.data.result) {
        setTournamens(res.data.tournaments);
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/"});
    });
  }

  async function detailTournament(tournamentId) {
    if (permitFlag) {
      router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, PermitFlag: permitFlag}}, "/tournament/detail");
    } else if (mainFlag) {
      router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId, MainFlag: mainFlag}}, "/tournament/detail");
    } else {
      router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId}}, "/tournament/detail");
    }
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          { title }
        </div>
        <div class="py-3 mx-8">
          <table class="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map(tournament => (
                <tr class="border-y border-gray-500">
                  <td class="h-20 text-s md:text-s mr-4">
                    <p>{ tournament.start_day } { tournament.start_time }時〜</p>
                    <p>{ tournament.place }</p>
                  </td>
                  <td class="max-h-2">
                    <p class=""><SmallButton func={ () => detailTournament(tournament.id) }>詳細</SmallButton></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="mt-4 pb-6"><Link href="/" class="text-s text-blue">＜管理者メニューに戻る</Link></div>
      </div>
    </Index>
  )
}
