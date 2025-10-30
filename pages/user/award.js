import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import ButtonInactive from '/components/parts/ButtonInactive.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function Award() {

  const boardgameId = 1;
  const router = useRouter();
  const userId = (router.query.userId) ? router.query.userId : '';

  const [alertText, setAlertText] = useState("");
  const [buttonActive, setButtonActive] = useState(true);
  const [years, setYears] = useState([]);

  useEffect(() => {
    getYears();
    checkQuery();
  }, []);

  async function getYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const yearArray = [];

    for (let i = startYear; i <= currentYear; i++) {
      yearArray.push(i);
    }

    return setYears(yearArray);
  }
  async function checkQuery() {
    // 戻るボタン対策
    if (!userId) {
      router.push("/user/");
      return;
    }
  }

  async function sendInput() {
    setAlertText("");

    let year = document.getElementById('year');
    let award_name = document.getElementById('award_name');

    if (!year.value) {
      setAlertText("予選名を入力してください。");
      return;
    }
    if (!award_name.value) {
      setAlertText("日程を入力してください。");
      return;
    }
    setButtonActive(false);

    // 登録確認ダイアログ
    if(!window.confirm("入力した内容で登録してよろしいですか？")){
      setButtonActive(true);
      return;
    }

    await API.post('admin/add_user_award', {
      "user_id": userId,
      "boardgame_id": boardgameId,
      "year": year.value,
      "award_name": award_name.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "/user/award_complete", query: {userId: userId}}, "/user/award_complete");
      }
      else {
        router.push({ pathname: "/user/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function returnPage() {
    router.push({ pathname: "/user/detail", query: {userId: userId}}, "/user/detail");
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          成績登録
        </div>
        <div><span className="text-xs pt-6">以下情報を入力して<br/>登録ボタンを押下してください。</span></div>
        <div><span className="text-xs"><span className="text-red">*</span>は入力必須項目</span></div>
        <div className="flex justify-between pt-6 mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>取得年</div>
          <div class ="w-2/3 my-auto">
            <select id="year" className="w-2/3 pl-2 h-10 rounded-md border-2 border-black">
              {years.map(year => (
                <option value={`${year}`}>{ year }</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="w-1/3 my-auto md:mr-4 text-s"><span className="text-red">*</span>成績</div>
          <div className="w-2/3 my-auto"><div className="w-2/3 mx-auto flex"><input type="text" id="award_name" className="w-full py-2 pl-2 rounded-md border-2 border-black" placeholder="優勝" /></div></div>
        </div>

        {(alertText) && <div className="text-s text-red pb-6">{ alertText }</div>}
        { buttonActive ? (
          <div>
            <Button func={ sendInput }>登録</Button>
          </div>
        ) : (
          <div>
            <ButtonInactive>登録</ButtonInactive>
          </div>
        )}
        <div className="pb-3"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜会員詳細に戻る</a></div>
        <div className="pb-6"><a href="/" className="cursor-pointer text-s text-blue">＜管理者メニューに戻る</a></div>
      </div>
    </Index>
  )
}
