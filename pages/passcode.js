import Index from '../components/Index.js';
import Button from '../components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../plugins/customAxios.js';
import Link from 'next/link';

export default function Passcode() {

  const router = useRouter();
  const email = (router.query.Email) ? router.query.Email : '';
  const name = (router.query.Name) ? router.query.Name : '';
  const [alertText, setAlertText] = useState("");

  // クエリなしでこの画面に来たら前の画面に戻る
  useEffect(() => {
    checkInput();
  }, []);

  async function checkInput() {
    if (!email || !name) {
      router.push({ pathname: "/password_email"});
      return;
    }
  }

  async function authPasscode() {
    setAlertText("");

    let passcode = document.getElementById('passcode');
    if (!passcode.value) {
      setAlertText("パスコードが入力されていません。");
      return;
    }

    await API.post('admin/auth_passcord', {
      "email": email,
      "passcode": passcode.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/password", query: {Email: email, Name: name, Passcode: passcode.value}}, "password");
      }
      else {
        let failtureCount = res.data.failure_count;
        if (5 == failtureCount) {
          router.push({ pathname: "/password_email"});
        }
        let restCount = 5 - failtureCount;
        setAlertText("パスコードが間違っています。残り失敗回数：" + restCount + "回");
      }
    }).catch(err => {
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          パスワード再発行
        </div>
        <span class="text-xs pt-6">メールに送られたパスコードを入力して、<br/>認証ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4">パスコード</div>
          <div class="w-2/3 my-auto"><input type="text" id="passcode" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="" /></div>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ authPasscode }>認証</Button>
      </div>
    </Index>
  )
}
