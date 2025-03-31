import Head from 'next/head'

import Mypage from '../../components/Mypage.js';
import Button from '../../components/parts/Button.js';
import SmallButton from '../../components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import CustomModal from '../../components/parts/CustomModal.js';

function PointRoom() {

  const router = useRouter();

  const roomId = router.query.scoreRoomId;
  const memberNo = router.query.memberNo;
  // const memberNo = 0;
  const [getScores, setGetScores] = useState([0, 0, 0, 0, 0]);
  const [otherMembers, setOtherMember] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [myColor, setMyColor] = useState('');
  const [myTextColor, setMyTextColor] = useState('');

  const [myScreenHeight, setMyScreenHeight] = useState('');
  const [othersScreenHeight, setOthersScreenHeight] = useState('');
  const [otherScreenHeight, setOtherScreenHeight] = useState('');

  const [showMenuModal, setShowMenuModal] = useState(false);

  useEffect(() => {
    getScore();
  }, []);

  async function getScore() {
    await API.post('app/get_detail_score_room', {
      "score_room_id": roomId,
      "member_no": memberNo
    }).then(res => {
      // console.log(res);
      if ('OK' == res.data.result) {
        let getOtherMembers = res.data.score_room.other_member;
        setOtherMember(getOtherMembers);
        setMyScore(res.data.score_room.my_score);
        setMyColor(res.data.score_room.my_color);
        setMyTextColor(res.data.score_room.my_text_color);

        // console.log(otherMembers[0]['color']);

        // 参加人数によって画面割合変更
        if (0 === getOtherMembers.length) {
          setMyScreenHeight('h-full');
        }
        else if (1 == getOtherMembers.length) {
          setMyScreenHeight('h-1/2');
          setOthersScreenHeight('h-1/2');
          setOtherScreenHeight('h-full');
        }
        else if (2 == getOtherMembers.length) {
          setMyScreenHeight('h-1/2');
          setOthersScreenHeight('h-1/2');
          setOtherScreenHeight('h-1/2');
        }
        else if (3 == getOtherMembers.length) {
          setMyScreenHeight('h-1/3');
          setOthersScreenHeight('h-2/3');
          setOtherScreenHeight('h-1/3');
        }
        else if (4 == getOtherMembers.length) {
          setMyScreenHeight('h-1/3');
          setOthersScreenHeight('h-2/3');
          setOtherScreenHeight('h-1/4');
        }
      }
      return res;
    }).catch(err => {
      // console.log(err);
      return err;
    });
  }

  async function changePoint(member_no, point) {
    let beforeScore = getScores[member_no];
    let afterScore = beforeScore + point;
    let scoreDiv = document.getElementById(member_no);
    if (0 == beforeScore) {
      scoreDiv.classList.remove("invisible");
      scoreDiv.classList.add("animate-fade-in-top");
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("animate-fade-in-top"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("animate-fade-in-top"));
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("invisible"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("invisible"));
    }
    else {
      scoreDiv.classList.remove("invisible");
      scoreDiv.classList.add("animate-change-score");
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("animate-change-score"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("animate-change-score"));
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("invisible"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("invisible"));
      // scoreDiv.classList.add("animate-fade-out-bottom");
      // scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("animate-fade-out-bottom"));
      // scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("animate-fade-out-bottom"));
    }

    setGetScores(
      getScores.map((getScore, index) => (index == member_no ? getScore + point : getScore))
    );
  }

  async function openMenu() {
    setShowMenuModal(true);
  }

  async function closeMenu() {
    setShowMenuModal(false);
  }

  async function leaveRoom() {
    if (0 === memberNo) {
      await API.get('app/logout_score_room?score_room_id=' + roomId).then(res => {
        if ('OK' == res.data.result) {
          router.push({ pathname: "point_count" });
        }
        return res;
      }).catch(err => {
        // console.log(err);
        return err;
      });
    }
    else {
      await API.post('app/logout_guest_score_room', {
        "score_room_id": roomId,
        "member_no": memberNo
      }).then(res => {
        // console.log(res);
        if ('OK' == res.data.result) {
          router.push({ pathname: "point_count" });
        }
        return res;
      }).catch(err => {
        // console.log(err);
        return err;
      });
    }
    await API.post('app/get_detail_score_room', {
      "score_room_id": roomId,
      "member_no": memberNo
    }).then(res => {
      if ('OK' == res.data.result) {
        //
      }
      return res;
    }).catch(err => {
      // console.log(err);
      return err;
    });
    setShowMenuModal(false);
  }

  async function changeScore() {
    // animation
    const memberCount = otherMembers.length;
    for (let memberIndex = 0; memberIndex <= memberCount; memberIndex++) {
      let scoreDiv = document.getElementById(memberIndex);
      scoreDiv.classList.add("animate-fade-out-bottom");
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("animate-fade-out-bottom"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("animate-fade-out-bottom"));
    }

    // API
    await API.post('app/update_score_room', {
      "score_room_id": roomId,
      "scores": getScores
    }).then(res => {
      if ('OK' == res.data.result) {
        getScore();
        setGetScores([0, 0, 0, 0, 0]);
      }
      return res;
    }).catch(err => {
      // console.log(err);
      return err;
    });

    resetScore();
  }

  async function updateScore() {
    getScore();
    resetScore();
  }

  async function resetScore() {
    setGetScores([0, 0, 0, 0, 0]);

    // animation
    const memberCount = otherMembers.length;
    for (let memberIndex = 0; memberIndex <= memberCount; memberIndex++) {
      let scoreDiv = document.getElementById(memberIndex);
      scoreDiv.classList.add("animate-fade-out-bottom");
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.remove("animate-fade-out-bottom"));
      scoreDiv.addEventListener("animationend", () => scoreDiv.classList.add("invisible"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.remove("animate-fade-out-bottom"));
      scoreDiv.addEventListener("animationcancel", () => scoreDiv.classList.add("invisible"));
    }
  }

  return (
    <div>
      <Head>
        <meta charset="UTF-8"></meta>
        <link rel="icon" className='h-10' href="/favicons/art_favicon.png" />
      </Head>
      <div class="h-screen">
        <div class="hidden">
          bg-white
          bg-black
          bg-red-500
          bg-blue-500
          bg-yellow-500
          bg-gray-500
          bg-green-500
          bg-purple-500
          bg-lime-500
          bg-orange-500
          bg-emerald-500
          bg-cyan-500
          bg-pink-500
        </div>
        <div class="bg-white absolute rounded border-2 border-black top-0 p-1 right-0 mr-2 mt-1 text-2xl">
          <button onClick={ openMenu }>Menu</button>
        </div>
        <div class={`${ othersScreenHeight } text-3xl text-center`}>
          {otherMembers.map((otherMember) => (
            <div class={`${ otherScreenHeight } ${ otherMember.color } ${ otherMember.text_color }`}>
              <div class="flex h-full">
                <div class="w-1/5 my-auto h-full">
                  <button onClick={ () => changePoint(otherMember.member_no, -10) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＜＜</button>
                </div>
                <div class="w-1/5 my-auto h-full">
                  <button onClick={ () => changePoint(otherMember.member_no, -1) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＜</button>
                </div>
                <div class="w-1/5 my-auto h-full">
                  <div id={`${otherMember.member_no}`} class="invisible h-1/3">
                    {/* {(0 !== getScores[otherMember.member_no]) && */}
                      <span>{ (0 < getScores[otherMember.member_no]) ? '+' + getScores[otherMember.member_no] : getScores[otherMember.member_no] }</span>
                    {/* } */}
                  </div>
                  <div class="h-1/3">
                    { otherMember.score }
                  </div>
                  <div class="h-1/3">
                    { otherMember.name }
                  </div>
                </div>
                <div class="w-1/5 my-auto h-full">
                  <button onClick={ () => changePoint(otherMember.member_no, 1) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＞</button>
                </div>
                <div class="w-1/5 my-auto h-full">
                  <button onClick={ () => changePoint(otherMember.member_no, 10) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＞＞</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class={`${ myScreenHeight } ${ myColor } ${ myTextColor } text-3xl text-center`}>
          <div class="flex h-full">
            <div class="w-1/5 my-auto h-full">
              <button onClick={ () => changePoint(memberNo, -10) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＜＜</button>
            </div>
            <div class="w-1/5 my-auto h-full">
              <button onClick={ () => changePoint(memberNo, -1) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＜</button>
            </div>
            <div class="w-1/5 my-auto h-full">
              <div class="h-1/2">
                <div id={ memberNo } class="invisible h-1/2 my-auto">
                  {/* {(0 !== getScores[memberNo]) && */}
                    <span>{ (0 < getScores[memberNo]) ? '+' + getScores[memberNo] : getScores[memberNo] }</span>
                  {/* } */}
                </div>
                <div class="h-1/2 my-auto">
                  { myScore }
                </div>
              </div>
              <div class="h-1/2 w-full text-base">
                <div class="h-1/3 w-full my-auto">
                  <button onClick={ () => changeScore() } class="text-black bg-white rounded border-2 border-black h-5/6 w-full">反映</button>
                </div>
                <div class="h-1/3 w-full my-auto">
                  <button onClick={ () => updateScore() } class="text-black bg-white rounded border-2 border-black h-5/6 w-full">更新</button>
                </div>
                <div class="h-1/3 w-full my-auto">
                  <button onClick={ () => resetScore() } class="text-black bg-white rounded border-2 border-black h-5/6 w-full">リセット</button>
                </div>
              </div>
            </div>
            <div class="w-1/5 my-auto h-full">
              <button onClick={ () => changePoint(memberNo, 1) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＞</button>
            </div>
            <div class="w-1/5 my-auto h-full">
              <button onClick={ () => changePoint(memberNo, 10) } class="hover:bg-black/[.1] active:bg-black/[.3] w-full h-full">＞＞</button>
            </div>
          </div>
        </div>
        <CustomModal
          modalShow={ showMenuModal }
          closeModalFunc={ closeMenu }
        >
          <div>
            <div class="text-center text-3xl">メニュー</div>
            <div class="mt-3 w-full md:w-1/2 mx-auto text-center">
              <SmallButton func={ () => leaveRoom() }>部屋から出る</SmallButton>
            </div>
            <div class="mt-3 w-full md:w-1/2 mx-auto text-center">
              <SmallButton func={ () => closeMenu() }>メニューを閉じる</SmallButton>
            </div>
            <div class="mt-5">
              <div class="text-2xl mb-3">
                使い方
              </div>
              <div>
                このツールはポイントを管理するツールです。<br />
                全員が入室した後に「更新」ボタンを押すとユーザーネームが出てきます。<br />
                早く上がった人やポイント管理者が<span class="text-red-500">全員分</span>の得たポイント分「＜＜」「＜」や「＞＞」「＞」を押してください。<br />
                そして「反映」ボタンを押すと、全員分のスコアが変更されます。<br />
                またそれ以外の人は「反映」ボタンが押された後に「更新」ボタンを押すと自分の画面に反映されます。<br />
              </div>
              <div class="mt-3">
                <div class="text-2xl mb-3">注意</div>
                <div>
                  「反映」ボタン「更新」ボタンを押さずに1時間立つとルームから抜けてログインからやり直しになります。<br />
                  その場合このルームに戻ることはできなくなります。<br />
                  定期的に「反映」か「更新」のボタンを押すようにしてください。<br />
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  )
}

export default PointRoom;