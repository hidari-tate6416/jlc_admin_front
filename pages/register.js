import Index from '../components/Index.js';
import Button from '../components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../plugins/customAxios.js';
import Link from 'next/link';

export default function Register() {

  const router = useRouter();
  const email = router.query.Email;
  const passcode = router.query.Passcode;
  const [alertText, setAlertText] = useState("");

  // クエリなしでこの画面に来たら前の画面に戻る
  useEffect(() => {
    checkInput();
  }, []);

  async function checkInput() {
    if (!email || !passcode) {
      router.push("/register_email");
      return;
    }
  }

  async function register() {
    setAlertText("");

    let name = document.getElementById('name');
    let nameKana = document.getElementById('nameKana');
    let password = document.getElementById('password');
    let birthday = document.getElementById('birthday');
    if (!name.value) {
      setAlertText("ユーザ名が入力されていません。");
      return;
    }
    if (!nameKana.value) {
      setAlertText("ユーザ名（カナ）が入力されていません。");
      return;
    }
    if (!nameKana.value.match(/^[ァ-ヶー]+$/)) {
      setAlertText("ユーザ名（カナ）は数字や記号も全て全角カタカナで入力してください");
      return;
    }
    if (!password.value) {
      setAlertText("パスワードが入力されていません。");
      return;
    }
    if (password.value.length > 16 || password.value.length < 8 || !/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,16}$/.test(password.value)) {
      setAlertText("パスワードは半角英数8桁以上16桁以下で入力してください。");
      return;
    }
    if (!birthday.value) {
      setAlertText("生年月日が入力されていません。");
      return;
    }
    if (!birthday.value.match(/^[0-9]*$/)) {
      setAlertText("生年月日は半角数字のみで入力してください。");
      return;
    }

    await API.post('user/regist', {
      "email": email,
      "passcode": passcode,
      "name": name.value,
      "name_kana": nameKana.value,
      "password": password.value,
      "birthday": birthday.value
    }).then(res => {
      if ('OK' === res.data.result) {
        API.post('user/login', {
          "email": email,
          "password": password.value
        }).then(res => {
          if ('OK' === res.data.result) {
            API.interceptors.request.use(
              async config => {
                config.headers = {
                  'Authorization': `Bearer ` + res.data.token,
                }
                return config;
            });
            router.push({ pathname: "/"});
          }
        }).catch(err => {
          // console.log('error');
          // console.log(err);
        });
      }
      else {
        setAlertText("不正アクセスを検知");
      }
    }).catch(err => {
      // console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  return (
    <Index title="">
      <div class="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div class="font-semibold text-2xl py-5">
          JLC登録
        </div>
        <span class="text-xs pt-6">以下会員情報を入力して<br/>登録ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">ユーザ名</div>
          <div class="w-2/3 my-auto"><input type="text" id="name" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="太郎" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">ユーザ名(カナ)</div>
          <div class="w-2/3 my-auto"><input type="text" id="nameKana" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="タロウ" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">パスワード<br/>(半角英数8桁以上16桁以下)</div>
          <div class="w-2/3 my-auto"><input type="password" id="password" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="" /></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">生年月日<br/>(ハイフンなし)</div>
          <div class="w-2/3 my-auto"><input type="text" id="birthday" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="19900130" /></div>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ register }>登録</Button>

      </div>
    </Index>
  )
}
