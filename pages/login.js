import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function Login() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    resetBearer();
  }, []);

  async function resetBearer() {
    localStorage.setItem("token", null);
  }

  async function loginClick() {
    setAlertText("");

    let loginEmail = document.getElementById('loginEmail');
    let password = document.getElementById('password');
    if (!loginEmail.value || !password.value) {
      setAlertText("ログインIDかパスワードが入力されていません。");
      return;
    }

    await API.post('admin/login', {
      "email": loginEmail.value,
      "password": password.value
    }).then(res => {
      if ('OK' === res.data.result) {
        localStorage.setItem("token", res.data.token);
        router.push({ pathname: "/" });
      }
      else {
        setAlertText("ログイン情報に誤りがあります。");
        return;
      }
    }).catch(err => {
      // console.log(err);
      return;
    });
  }

  return (
    <Index title="" loadingFlag={false}>
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          サインイン
        </div>
        <span className="text-xs">ログインEmailとパスワードを入力してログインボタンを押してください</span>
        <div className="mt-5 mb-3 mx-full text-center">
          <div className="mb-5 mx-auto">
            <div className="text-xl">ログインEmail</div>
            <input type="text" id="loginEmail" className="w-3/4 mt-3 py-2 pl-2 rounded-md border-2 border-black" placeholder="taro@example.com" />
          </div>
          <div className="mb-10 mx-auto">
            <div className="text-xl">password</div>
            <input type="password" id="password" className="w-3/4 mt-3 py-2 pl-2 rounded-md border-2 border-black" placeholder="パスワード" />
          </div>
        </div>
        {(alertText) && <div className="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ loginClick }>ログイン</Button>
        <div className="my-2">パスワード忘れた方は<Link href="/password_email" className="text-s text-blue">こちら</Link></div>
        <div className="pb-4"><Link href="/history" className="text-s text-blue">バージョン履歴</Link></div>
      </div>
    </Index>
  )
}
