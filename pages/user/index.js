import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import SmallButton from '/components/parts/SmallButton.js';
import ButtonDelete from '/components/parts/ButtonDelete.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function User() {

  const boardgameId = 1;
  const router = useRouter();
  const dlUrl = process.env.NEXT_PUBLIC_API_BASE_URL + 'admin/download_list_user';

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    await API.post('admin/get_list_user', {
      "name": name.value,
      "email": email.value
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
  }

  async function downloadUser() {

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    const fileName = 'user_list.csv';

    await API.post('admin/download_list_user', {
      "name": name.value,
      "email": email.value
    }, {
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

  async function detailUser(userId) {
    router.push({ pathname: "/user/detail", query: {UserId: userId}}, "/user/detail");
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          会員一覧
        </div>
        <div className="m-4 border-2 border-black rounded-md">
          <div className="mt-2"><span>検索</span></div>
          <div className="flex justify-between pt-2 my-2">
            <div className="w-1/3 my-auto md:mr-4 text-s">氏名・大会名</div>
            <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="name" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="田中" /></div></div>
          </div>
          <div className="flex justify-between pt-2 mb-2">
            <div className="w-1/3 my-auto md:mr-4 text-s">Email</div>
            <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto"><input type="text" id="email" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="tanaka@test.com" /></div></div>
          </div>
          <p className="w-1/3 mx-auto my-4"><SmallButton func={ () => getUsers() }>検索</SmallButton></p>
        </div>
        <p className="w-2/3 mx-auto my-4"><SmallButton func={ () => downloadUser() }>表示中会員をダウンロード</SmallButton></p>
        <div className="py-3 mx-8">
          <table className="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th className="w-1/4">会員ID</th>
                <th className="w-1/4"><p>氏名</p><p>大会名</p></th>
                <th className="w-1/4">段</th>
                <th className="w-1/4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr className="border-y border-gray-500">
                  <td className="h-20 text-s md:text-s mr-4">
                    <p>{ user.id }</p>
                  </td>
                  <td className="h-20 text-s md:text-s mr-4">
                    <p>{ user.family_name + user.given_name }</p>
                    <p>{ user.name }</p>
                  </td>
                  <td className="h-20 text-s md:text-s mr-4">
                    <p>{ user.grade_name }</p>
                  </td>
                  <td className="max-h-2">
                    <p className=""><SmallButton func={ () => detailUser(user.id) }>詳細</SmallButton></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pb-6"><Link href="/" className="text-s text-blue">＜管理者メニューに戻る</Link></div>
      </div>
    </Index>
  )
}
