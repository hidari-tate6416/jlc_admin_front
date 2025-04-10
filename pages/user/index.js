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
        <div class="py-3 mx-8">
          <table class="table-auto w-full mx-auto text-center">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr class="border-y border-gray-500">
                  <td class="h-20 text-s md:text-s mr-4">
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
