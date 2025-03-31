import Index from '../../components/Index.js';
import Button from '../../components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import Link from 'next/link';

export default function SponsorSend() {

  const boardgameId = 1;
  const router = useRouter();
  const [alertText, setAlertText] = useState("");

  async function sendInput() {
    setAlertText("");

    let name = document.getElementById('name');
    let startDay = document.getElementById('startDay');
    let startTime = document.getElementById('startTime');
    let place = document.getElementById('place');
    let maxMember = document.getElementById('maxMember');
    let tel = document.getElementById('tel');
    let fee = document.getElementById('fee');
    let memo = document.getElementById('memo');
    let checkTerm = document.getElementById('checkTerm');

    if (!name.value) {
      setAlertText("予選名を入力してください。");
      return;
    }
    if (!startDay.value) {
      setAlertText("日程を入力してください。");
      return;
    }
    if (!startDay.value.match(/^[0-9]{8}$/)) {
      setAlertText("日程は半角数字8桁で入力してください。");
      return;
    }
    if (!startTime.value) {
      setAlertText("開始時間を入力してください。");
      return;
    }
    if (!startTime.value.match(/^[0-9]{2}$/)) {
      setAlertText("開始時間は半角数字2桁で入力してください。");
      return;
    }
    if (startTime.value < 0 || 24 < startTime.value) {
      setAlertText("開始時間は0から24の間で入力してください。");
      return;
    }
    if (!place.value) {
      setAlertText("場所を入力してください。");
      return;
    }
    if (!maxMember.value) {
      setAlertText("定員を入力してください。");
      return;
    }
    if (maxMember.value < 5) {
      setAlertText("定員は5名以上です。");
      return;
    }
    if (!maxMember.value.match(/^[0-9]*$/)) {
      setAlertText("定員は半角数字で入力してください。");
      return;
    }
    if (!tel.value) {
      setAlertText("電話番号を入力してください。");
      return;
    }
    if (!tel.value.match(/^[0-9]*$/)) {
      setAlertText("電話番号は半角数字で入力してください。");
      return;
    }
    if (!fee.value) {
      setAlertText("参加料を入力してください。");
      return;
    }
    if (!fee.value.match(/^[0-9]*$/)) {
      setAlertText("参加料は半角数字で入力してください。");
      return;
    }
    if (fee.value < 0) {
      setAlertText("開始時間は0から24の間で入力してください。");
      return;
    }
    if (!memo.value) {
      setAlertText("備考を入力してください。");
      return;
    }
    if (!checkTerm.checked) {
      setAlertText("予選開催規約の同意にチェックが入っていません");
      return;
    }

    await API.post('user/send_tournament', {
      "name": name.value,
      "boardgame_id": boardgameId,
      "start_day": startDay.value,
      "start_time": startTime.value,
      "place": place.value,
      "max_member": maxMember.value,
      "tel": tel.value,
      "fee": fee.value,
      "memo": memo.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/tournament/sponsor_complete"});
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
          予選開催申請
        </div>
        <span class="text-xs pt-6">以下情報を入力して<br/>申請ボタンを押下してください。
        </span>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">予選名</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="name" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="東京新宿予選1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">日程</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="startDay" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="19900101" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">開始時間</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="startTime" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span class="my-auto">時</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">場所</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="text" id="place" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="新宿区1-1-1" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">定員</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="maxMember" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="15" /><span class="my-auto">名</span></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">電話番号</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto"><input type="number" id="tel" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="09012345678" /></div></div>
        </div>
        <div class="flex justify-between pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">参加料</div>
          <div class="w-2/3 my-auto"><div class="w-2/3 mx-auto flex"><input type="number" id="fee" class="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="3000" /><span class="my-auto">円</span></div></div>
        </div>
        <div class="flex pt-6 mb-6">
          <div class="w-1/3 my-auto md:mr-4 text-s">備考</div>
          <div class="w-2/3 my-auto md:mr-4 text-s"></div>
        </div>
        <div class="flex w-4/5 mx-auto mb-6">
          <textarea type="textarea" id="memo" class="w-full h-40 pl-2 rounded-md border-2 border-black">成績が上位20%には3段を授与</textarea>
        </div>

        <div class="mt-6 mx-auto w-4/5 h-32 overflow-auto bg-white border-2 border-black pt-2 text-xs">
          <h3 class="text-xl font-semibold text-center">JapanLexioCup会員サイト 予選開催規約</h3>

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
          <label for="terms">予選開催規約に同意します。</label>
        </div>
        {(alertText) && <div class="text-s text-red pb-6">{ alertText }</div>}
        <Button func={ sendInput }>申請</Button>
        <div class="mt-2 pb-6"><Link href="/" class="text-s text-blue">＜ダッシュボードに戻る</Link></div>
      </div>
    </Index>
  )
}
