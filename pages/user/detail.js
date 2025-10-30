import Index from '/components/Index.js';
import Button from '/components/parts/Button.js';
import ButtonJlc from '/components/parts/ButtonJlc.js';
import ButtonJlcInactive from '/components/parts/ButtonJlcInactive.js';
import SmallButton from '/components/parts/SmallButton.js';
import ButtonDelete from '/components/parts/ButtonDelete.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from '/plugins/customAxios.js';
import Link from 'next/link';

export default function UserDetail() {

  const boardgameId = 1;
  const otherId = 7;

  const router = useRouter();
  const userId = (router.query.userId) ? router.query.userId : '';

  const [userFamilyName, setUserFamilyName] = useState("");
  const [userFamilyNameKana, setUserFamilyNameKana] = useState("");
  const [userGivenName, setUserGivenName] = useState("");
  const [userGivenNameKana, setUserGivenNameKana] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameKana, setUserNameKana] = useState("");
  // const [userLastLogin, setUserLastLogin] = useState("");
  const [userCreatedAt, setCreatedAt] = useState("");
  const [userBirthday, setBirthday] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userArea, setUserArea] = useState("");
  const [userAward, setUserAward] = useState([]);
  const [userOccupation, setUserOccupation] = useState("");
  const [userAcquisitionSource, setUserAcquisitionSource] = useState("");
  const [userAcquisitionSourceOther, setUserAcquisitionSourceOther] = useState("");
  const [userHistory, setUserHistory] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userGradeId, setUserGradeId] = useState(0);
  const [userGradeName, setUserGradeName] = useState('');
  const [userGradeDate, setUserGradeDate] = useState('');
  const [alertText, setAlertText] = useState("");
  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    getUserDetail();
  }, []);

  async function getUserDetail() {
    // 戻るボタン対策
    if (!userId) {
      router.push("/");
      return;
    }

    await API.post('admin/get_detail_user', {
      "boadgame_id": boardgameId,
      "user_id": userId
    }).then(res => {
      if ('OK' == res.data.result) {
        setUserFamilyName(res.data.user.family_name);
        setUserFamilyNameKana(res.data.user.family_name_kana);
        setUserGivenName(res.data.user.given_name);
        setUserGivenNameKana(res.data.user.given_name_kana);
        setUserName(res.data.user.name);
        setUserNameKana(res.data.user.name_kana);
        // setUserLastLogin(res.data.user.last_login_at);
        setCreatedAt(res.data.user.created_at.match(/^\d{4}-\d{2}-\d{2}/));
        setBirthday(res.data.user.birthday);
        setUserSex(res.data.user.sex.name);
        setUserArea(res.data.user.area.name);
        setUserAward(res.data.user.user_award_lexio);
        (0 != res.data.user.occupation_id) ? setUserOccupation(res.data.user.occupation.name) : setUserOccupation('');
        (0 != res.data.user.user_boardgame.acquisition_source_id) ? setUserAcquisitionSource(res.data.user.user_boardgame.acquisition_source.name): setUserAcquisitionSource('');
        setUserAcquisitionSourceOther(res.data.user.user_boardgame.acquisition_source_other);
        (0 != res.data.user.user_boardgame.history_id) ? setUserHistory(res.data.user.user_boardgame.history.name) : setUserHistory('');
        setEmail(res.data.user.email);
        setUserTel(res.data.user.tel);
        setUserGradeName(res.data.user.user_grade.grade.name);
        setUserGradeId(res.data.user.user_grade.grade_id);
        if (1 != userGradeId) {
          setUserGradeDate(res.data.user.user_grade.created_at.match(/^\d{4}-\d{2}-\d{2}/));
        }
      }
      else {
        router.push({ pathname: "/login"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function deleteAward(award_id) {
    // 登録確認ダイアログ
    if(!window.confirm("成績を削除します。よろしいですか？")){
      return;
    }

    await API.post('admin/delete_user_award', {
      "user_award_id": award_id
    }).then(res => {
      if ('OK' === res.data.result) {
        alert("成績削除が完了しました。");
        getUserDetail();
      }
      else {
        setAlertText("不正アクセスを検知");
      }
    }).catch(err => {
      // console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  async function saveUser() {
    let gradeId = document.getElementById('gradeId');
    if (!gradeId.value) {
      setAlertText("指定外の値が選択されています。");
      return;
    }
    setButtonActive(false);

    // 登録確認ダイアログ
    if(!window.confirm("会員の階級を変更します。よろしいですか？")){
      setButtonActive(true);
      return;
    }

    await API.post('admin/save_user_grades', {
      "boardgame_id": boardgameId,
      "users": [
        {
            "user_id": userId,
            "grade_id": gradeId.value
        }
      ]
    }).then(res => {
      if ('OK' == res.data.result) {
        router.push({ pathname: "/user/complete"});
      }
      else {
        router.push({ pathname: "/"});
      }
    }).catch(err => {
      // console.log(err);
      router.push({ pathname: "/login"});
    });
  }

  async function deleteUser() {
    // 登録確認ダイアログ
    if(!window.confirm("会員を削除します。よろしいですか？")){
      return;
    }

    await API.post('admin/delete_user', {
      "user_id": userId
    }).then(res => {
      if ('OK' === res.data.result) {
        alert("会員削除が完了しました。会員一覧に移動します。");
        router.push({ pathname: "/user/delete_complete"});
      }
      else {
        setAlertText("不正アクセスを検知");
      }
    }).catch(err => {
      // console.log(err);
      setAlertText("サーバエラーが起きました。しばらく時間をおいてもう一度お試しください。");
    });
  }

  async function editUser() {
    router.push({ pathname: "/user/edit", query: {userId: userId}}, "/user/edit");
  }

  async function moveEntryTournament() {
    router.push({ pathname: "/user/entry_tournament", query: {userId: userId}}, "/user/edit");
  }

  async function moveAward() {
    router.push({ pathname: "/user/award", query: {userId: userId}}, "/user/award");
  }

  async function returnPage() {
    router.push({ pathname: "/user/"});
  }

  return (
    <Index title="">
      <div className="my-20 mx-auto max-w-md w-3/4 rounded-md bg-jlc-sub text-center">
        <div className="font-semibold text-2xl py-5">
          会員詳細
        </div>

        <div className="mx-8 py-5 border-y text-left">
          <div className="text-xl my-2">
            段位：{ userGradeName }
          </div>
          <div className="text-xl my-2">
            段位取得日：{ userGradeDate }
          </div>
          {userAward.map(award => (
            <div className="my-2 flex justify-between">
              <div className="my-auto text-2xl">{ award.year }年：{ award.award_name }</div>
              <div className="text-s w-1/5"><ButtonDelete func={ () => deleteAward(award.id) } className="bg-red text-black">削除</ButtonDelete></div>
            </div>
          ))}
          <div className="text-xl my-2 mt-8">
            氏名：{ userFamilyName } {userGivenName}
          </div>
          <div className="text-xl my-2">
            氏名カナ：{ userFamilyNameKana } {userGivenNameKana}
          </div>
          <div className="text-xl my-2">
            大会名：{ userName }
          </div>
          <div className="text-xl my-2">
            大会名カナ：{ userNameKana }
          </div>
          <div className="text-xl my-2">
            生年月日：{ userBirthday }
          </div>
          <div className="text-xl my-2">
            性別：{ userSex }
          </div>
          <div className="text-xl my-2">
            居住地域：{ userArea }
          </div>
           <div className="text-xl my-2">
            職業：{ userOccupation }
          </div>
          <div className="text-xl my-2">
            流入経路：{ userAcquisitionSource }
          </div>
          {(userAcquisitionSourceOther) &&
            <div className="text-xl my-2">
              流入経路その他：{ userAcquisitionSourceOther }
            </div>
          }
          <div className="text-xl my-2">
            プレイ頻度：{ userHistory }
          </div>
          <div className="text-xl my-2">
            Email：{ userEmail }
          </div>
          <div className="text-xl my-2">
            電話番号：{ userTel }
          </div>
          <div className="text-xl my-2">
            登録日：{ userCreatedAt }
          </div>
          {/* <div className="text-xl my-2">
            最終ログイン日時：{ userLastLogin }
          </div> */}
        </div>
        <div className="mx-8 my-4 border-b">
          <div className="my-2 justify-between">
            <select id="gradeId" className="w-32 h-10 rounded-md border-2 border-black">
              <option value="1" selected={1 == `${userGradeId}`}>段なし</option>
              <option value="2" selected={2 == `${userGradeId}`}>１段</option>
              <option value="3" selected={3 == `${userGradeId}`}>２段</option>
              <option value="4" selected={4 == `${userGradeId}`}>３段</option>
            </select>
          </div>
          {(alertText) && <div className="text-s text-red pb-6">{ alertText }</div>}
          { buttonActive ? (
            <div>
              <Button func={ saveUser } className="">段位登録</Button>
            </div>
          ) : (
            <div>
              <ButtonJlcInactive className="">段位登録</ButtonJlcInactive>
            </div>
          )}
        </div>
        <div>
          <div>
            <ButtonJlc func={ editUser } className="py-4">会員情報編集</ButtonJlc>
          </div>
          <div>
            <ButtonJlc func={ moveEntryTournament } className="py-4">参加大会一覧</ButtonJlc>
          </div>
          <div>
            <ButtonJlc func={ moveAward } className="py-4">成績登録</ButtonJlc>
          </div>
          <div className="mx-auto mb-6 md:w-1/2 w-2/3">
            <ButtonDelete func={ deleteUser } className="py-4 bg-red text-black">会員削除</ButtonDelete>
          </div>
        </div>

        <div className="pb-3"><a onClick={() =>returnPage()} className="cursor-pointer text-s text-blue">＜会員一覧に戻る</a></div>
        <div className="pb-6"><a href="/" className="cursor-pointer text-s text-blue">＜管理者メニューに戻る</a></div>
      </div>
    </Index>
  )
}
