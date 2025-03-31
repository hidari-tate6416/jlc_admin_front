import Index from '../components/Index.js';
import Button from '../components/parts/Button.js';
import { useState } from "react";
import { useRouter } from "next/router";
import API from './../plugins/customAxios.js';
import Link from 'next/link';

export default function PasswordEmail() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  async function sendPasscode() {
    setAlertText("");

    let email = document.getElementById('Email');
    let birthday = document.getElementById('birthday');
    if (!email.value) {
      setAlertText("Emailが入力されていません。");
      return;
    }
    if (!email.value.match(/.+@.+\..+/)) {
      setAlertText("メールアドレスの形式が間違っています。");
      return;
    }
    if (!birthday.value.match(/^[0-9]*$/)) {
      setAlertText("生年月日は半角数字のみで入力してください。");
      return;
    }

    await API.post('user/send_passcode', {
      "email": email.value,
      "birthday": birthday.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/passcode", query: {Email: email.value, Birthday: birthday.value}}, "passcode");
      }
      else {
        setAlertText("不正アクセスを検知。");
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
        <span class="text-xs pt-6">メールアドレスと生年月日を入力して、メール送信ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6">
          <div class="w-1/3 my-auto md:mr-4">Email</div>
          <div class="w-2/3 my-auto"><input type="text" id="Email" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="taro@example.com" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4">生年月日</div>
          <div class="w-2/3 my-auto"><input type="text" id="birthday" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="19900101" /></div>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ sendPasscode }>メール送信</Button>
      </div>
    </Index>
  )
}
