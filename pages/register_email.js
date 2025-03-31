import Index from '../components/Index.js';
import Button from '../components/parts/Button.js';
import { useState } from "react";
import { useRouter } from "next/router";
import API from './../plugins/customAxios.js';
import Link from 'next/link';

export default function RegisterEmail() {

  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  async function sendPasscode() {
    setAlertText("");

    let Email = document.getElementById('Email');
    let checkTerm = document.getElementById('checkTerm');
    if (!Email.value) {
      setAlertText("Emailが入力されていません。");
      return;
    }
    if (!Email.value.match(/.+@.+\..+/)) {
      setAlertText("メールアドレスの形式が間違っています。");
      return;
    }
    if (!checkTerm.checked) {
      setAlertText("利用規約の同意にチェックが入っていません");
      return;
    }

    await API.post('user/send_passcode', {
      "email": Email.value,
      "birthday": ''
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/passcode", query: {Email: Email.value}}, "passcode");
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
          JLC登録
        </div>
        <span class="text-xs pt-6">メールアドレスを入力して利用規約を読み、<br/>メール送信ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6">
          <div class="w-1/3 my-auto md:mr-4">Email</div>
          <div class="w-2/3 my-auto"><input type="text" id="Email" class="w-2/3 py-2 pl-2 rounded-md border-2 border-black" placeholder="taro@example.com" /></div>
        </div>
        <div class="mt-6 mx-auto w-2/3 h-32 overflow-auto bg-white border-2 border-black pt-2 text-xs">
          <h3 class="text-xl font-semibold text-center">JapanLexioCup会員サイト 会員規約</h3>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第1条（会員登録）</h4>
              <p class="mt-2 text-black">JapanLexioCup会員サイト（以下「本サイト」）において会員登録を行うには、所定の手続きを経て、必要な情報（生年月日およびメールアドレス）を提供することが必要です。会員は、提供した情報が正確かつ最新であることを保証し、情報の更新があった場合は速やかに変更手続きを行うものとします。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第2条（個人情報の取り扱い）</h4>
              <p class="mt-2 text-black">会員が提供する個人情報（生年月日、メールアドレス等）は、プライバシーポリシーに基づき、適切に管理されます。会員は、個人情報の取り扱いについて、プライバシーポリシーに同意した上で会員登録を行うものとします。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第3条（会員の義務）</h4>
              <p class="mt-2 text-black">1. 会員は、本サイトを利用するにあたり、法律を遵守し、公序良俗に反する行為を行わないものとします。</p>
              <p class="mt-2 text-black">2. 会員は、他の会員または第三者に対する迷惑行為、不正アクセス、または本サイトの運営を妨げる行為を行わないものとします。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第4条（会員登録の停止・解除）</h4>
              <p class="mt-2 text-black">1. 本サイトは、会員が規約に違反した場合、または不正な利用が疑われる場合、会員登録を一時的に停止または解除することができます。</p>
              <p class="mt-2 text-black">2. 会員は、自らの意思で会員登録を解除することができます。解除手続きについては、本サイトの指示に従ってください。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第5条（規約の変更）</h4>
              <p class="mt-2 text-black">本サイトは、会員規約を随時変更することがあります。変更後の規約は、本サイトに掲示された時点で効力を生じるものとし、会員は変更後の規約に従うものとします。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第6条（免責事項）</h4>
              <p class="mt-2 text-black">本サイトは、会員が本サイトを利用したことによるいかなる損害についても責任を負いません。ただし、当サイトの故意または重大な過失による場合を除きます。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第7条（準拠法および管轄）</h4>
              <p class="mt-2 text-black">本規約は日本法に基づいて解釈され、会員と本サイトとの間で発生する紛争については、日本の裁判所を専属的管轄裁判所とします。</p>
          </div>

          <h3 class="text-xl font-semibold text-center text-blue-600">JapanLexioCup会員サイト 利用規約</h3>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第1条（利用の許可）</h4>
              <p class="mt-2 text-black">本サイトのサービス（以下「本サービス」）は、会員登録を行った利用者に対して提供されます。本サービスを利用することによって、会員は本規約に同意したことになります。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第2条（サービスの変更・停止）</h4>
              <p class="mt-2 text-black">1. 本サイトは、予告なく本サービスの内容を変更または停止することがあります。</p>
              <p class="mt-2 text-black">2. 本サイトは、サービスの変更または停止により生じた損害について一切責任を負いません。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第3条（禁止事項）</h4>
              <p class="mt-2 text-black">会員は、以下の行為を行ってはならないものとします。</p>
              <p class="mt-2 text-black">1. 法令または公序良俗に反する行為</p>
              <p class="mt-2 text-black">2. 他の会員や第三者の権利を侵害する行為</p>
              <p class="mt-2 text-black">3. 本サービスを不正に利用する行為</p>
              <p class="mt-2 text-black">4. 本サイトの運営を妨げる行為</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第4条（著作権）</h4>
              <p class="mt-2 text-black">本サービスで提供されるコンテンツ（文章、画像、音声等）は、すべて本サイトまたはコンテンツ提供者の著作物であり、会員はこれを無断で複製、配布、改変等することはできません。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第5条（サービスの終了）</h4>
              <p class="mt-2 text-black">本サイトは、会員に事前通知することなく、サービスを終了することがあります。この場合、会員は終了後のサービス利用ができなくなることに同意するものとします。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第6条（免責）</h4>
              <p class="mt-2 text-black">本サイトは、会員が本サービスを利用することにより生じた損害について、一切の責任を負わないものとします。ただし、当サイトの故意または重大な過失による場合を除きます。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第7条（規約の変更）</h4>
              <p class="mt-2 text-black">本規約は随時変更されることがあります。変更後の規約は本サイトに掲示された時点で効力を生じるものとし、会員は変更後の規約に従うものとします。</p>
          </div>

          <div>
              <h4 class="text-l font-semibold text-black mt-4">第8条（準拠法および管轄）</h4>
              <p class="mt-2 text-black">本規約は日本法に基づき解釈され、会員と本サイトとの間で生じた紛争については、日本の裁判所を専属的管轄裁判所とします。</p>
          </div>
        </div>
        <div class="mt-2 mb-6">
          <input type="checkbox" id="checkTerm" name="terms" class="mx-2" />
          <label for="terms">会員規約に同意します。</label>
        </div>

        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ sendPasscode }>メール送信</Button>
      </div>
    </Index>
  )
}
