import Index from '../components/Index.js';
import Button from '../components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../plugins/customAxios.js';
import Link from 'next/link';

export default function Password() {

  const router = useRouter();
  const email = router.query.Email;
  const passcode = router.query.Passcode;
  const name = router.query.Name;
  const [alertText, setAlertText] = useState("");

  // クエリなしでこの画面に来たら前の画面に戻る
  useEffect(() => {
    checkInput();
  }, []);

  async function checkInput() {
    if (!email || !passcode || !name) {
      router.push("/password_email");
      return;
    }
  }

  async function passwordReset() {
    setAlertText("");

    let password = document.getElementById('password');
    let passwordRemind = document.getElementById('passwordRemind');
    if (!password.value) {
      setAlertText("パスワードが入力されていません。");
      return;
    }
    if (!/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,16}$/.test(password.value)) {
      setAlertText("パスワードは半角英と半角数字を含めて8桁以上16桁以下で入力してください。");
      return;
    }
    if (!passwordRemind.value) {
      setAlertText("パスワード再確認を入力してください。");
      return;
    }
    if (password.value !== passwordRemind.value) {
      setAlertText("同一のパスワードを入力してください。");
      return;
    }

    await API.post('admin/reset_password', {
      "email": email,
      "passcode": passcode,
      "name": name,
      "password": password.value,
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/password_complete"});
      }
    }).catch(err => {
      console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          パスワード再設定
        </div>
        <span class="text-xs pt-6">新たなパスワードを入力して<br/>登録ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">パスワード<br/>(半角英と半角数字を含め8桁以上16桁以下)</div>
          <div class="w-2/3 my-auto"><input type="password" id="password" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">パスワード<br/>再確認</div>
          <div class="w-2/3 my-auto"><input type="password" id="passwordRemind" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="" /></div>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ passwordReset }>リセット</Button>

      </div>
    </Index>
  )
}
