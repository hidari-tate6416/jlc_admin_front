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

  async function downloadEntryUser() {

    const fileName = 'entry_users.csv';

    await API.get('admin/download_entry_users?tournament_id=' + tournamentId, {
      responseType: 'blob'
    }).then(response => {
      if (!response.data) {
        console.log('認証エラー');
        return false;
      }
      // 1. レスポンスからファイル名を取得
      const disposition = response.headers.get('content-disposition');
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, '');
        }
      }

      // 2. レスポンスのボディをBlobオブジェクトに変換
      const blob =  response.data;

      // 3. BlobへのURLを生成
      const url = window.URL.createObjectURL(blob);

      // 4. ダウンロード用の<a>タグを生成してクリック
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // ダウンロード時のファイル名を指定
      document.body.appendChild(a); // DOMに追加
      a.click(); // プログラムでクリックイベントを発火
      a.remove(); // 不要になった<a>タグを削除

      // 5. 後片付け
      window.URL.revokeObjectURL(url);

    }).catch(err => {
      console.error('ダウンロード処理中にエラーが発生しました:', err);
      alert('ファイルのダウンロードに失敗しました。');
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
          エントリー一覧
        </div>
        <div className="py-3 mx-8 border-y border-gray-500">
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
                  <td className="w-1/3">
                    <ButtonDelete func={ () => deleteUser(user.user.id) } className="bg-red text-black">参加取消</ButtonDelete>
                  </td>
                </tr>
              )) : (
                <tr className="">
                  <td className="w-1/3 h-10 text-s md:text-s mr-4">
                    <p></p>
                  </td>
                  <td className="w-1/3">
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
          <Button func={ () => downloadEntryUser() }>Excelダウンロード</Button>
        </div>
        <div className="mt-4 pb-3"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜予選詳細に戻る</a></div>
        <div className="pb-6"><a href="/" className="cursor-pointer text-s text-blue">＜管理者メニューに戻る</a></div>
      </div>
    </Index>
  )
}
