import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import SmallButton from '/components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function UserEntryTournament() {

  const boardgameId = 1;
  const router = useRouter();

  const [tournaments, setTournamens] = useState([]);
  const userId = (router.query.userId) ? router.query.userId : '';

  useEffect(() => {
    getTournaments();
  }, []);

  async function getTournaments() {
    // 戻るボタン対策
    if (!userId) {
      router.push("/user/");
      return;
    }

    await API.post('admin/get_list_entry_tournament', {
      "user_id": userId
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
    router.push({ pathname: "/tournament/detail", query: {TournamentId: tournamentId}}, "/tournament/detail");
  }

  async function returnPage() {
    router.push({ pathname: "/user/detail", query: {UserId: userId}}, "/user/detail");
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          参加大会一覧
        </div>
        <div className="py-3 mx-8">
          <table className="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map(entryTournament => (
                <tr className="w-1/3 border-y border-gray-500">
                  <td className="h-20 text-s md:text-s mr-4">
                    <p>{ entryTournament.tournament.start_day }</p>
                    <p>{ entryTournament.tournament.place }</p>
                  </td>
                  <td className="w-1/3 ">
                    { entryTournament.permit == 0 ? (
                        <p className="">承認待ち</p>
                    ) : (
                        <p className=""></p>
                    )}
                  </td>
                  <td className="w-1/3 max-h-2">
                    <p className=""><SmallButton func={ () => detailTournament(entryTournament.tournament.id) }>詳細</SmallButton></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pb-6"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜会員詳細に戻る</a></div>
      </div>
    </Index>
  )
}
