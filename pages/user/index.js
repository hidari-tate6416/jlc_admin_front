import Index from '/components/Index.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import SmallButton from '/components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function User() {

  const boardgameId = 1;
  const router = useRouter();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    await API.post('admin/get_list_user', {
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

  async function detailUser(userId) {
    router.push({ pathname: "/user/detail", query: {UserId: userId}}, "/user/detail");
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          会員一覧
        </div>
        <div class="m-4 border-2 border-black rounded-md">
          <div class="mt-2"><span>検索</span></div>
          <div class="flex justify-between pt-2 my-2">
            <div class="w-1/3 my-auto md:mr-4 text-s">氏名・大会名</div>
            <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="name" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="田中" /></div></div>
          </div>
          <div class="flex justify-between pt-2 mb-2">
            <div class="w-1/3 my-auto md:mr-4 text-s">Email</div>
            <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="email" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="tanaka@test.com" /></div></div>
          </div>
          <p class="w-1/3 mx-auto mb-4"><SmallButton func={ () => getUsers() }>検索</SmallButton></p>
        </div>
        <div class="py-3 mx-8">
          <table class="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th>id</th>
                <th><p>氏名</p><p>大会名</p></th>
                <th>段</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr class="border-y border-gray-500">
                  <td class="h-20 text-s md:text-s mr-4">
                    <p>{ user.id }</p>
                  </td>
                  <td class="h-20 text-s md:text-s mr-4">
                    <p>{ user.family_name + user.given_name }</p>
                    <p>{ user.name }</p>
                  </td>
                  <td class="h-20 text-s md:text-s mr-4">
                    <p>{ user.grade_name }</p>
                  </td>
                  <td class="max-h-2">
                    <p class=""><SmallButton func={ () => detailUser(user.id) }>詳細</SmallButton></p>
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
