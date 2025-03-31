import Mypage from '../../components/Mypage.js';
import Button from '../../components/parts/Button.js';
import SmallButton from '../../components/parts/SmallButton.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';
import CustomModal from '../../components/parts/CustomModal.js';

function PointCount() {

  const router = useRouter();

  const [rooms, setRooms] = useState([]);
  const [colors, setColors] = useState([]);
  const [userType, setUserType] = useState(router.query.userType);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [members, setMember] = useState([]);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    async function fetchData() {
      await API.get('app/reset_score_room').then(res => {
        return res;
      }).catch(err => {
        // console.log(err);
        return err;
      });

      await API.get('app/list_score_room').then(res => {
        setRooms(res.data.rooms);
        return res;
      }).catch(err => {
        // console.log(err);
        return err;
      });

      await API.get('app/menu/create_score_room').then(res => {
        setColors(res.data.menus);
        return res;
      }).catch(err => {
        // console.log(err);
        return err;
      });
    }

    fetchData();
    }, []);

  async function createRoom() {
    setShowCreateModal(true);
  }

  async function createRoomComplete() {
    let roomName = document.getElementById('roomName');
    let roomPassword = document.getElementById('roomPassword');
    let defaultPoint = document.getElementById('defaultPoint');
    let hostColor = document.getElementById('hostColor');
    let guest1Color = document.getElementById('guest1Color');
    let guest2Color = document.getElementById('guest2Color');
    let guest3Color = document.getElementById('guest3Color');
    let guest4Color = document.getElementById('guest4Color');
    if (!roomName.value || !roomPassword.value || !defaultPoint.value || 0 == hostColor.value) {
      setAlertText("入力内容が不足しています。");
      return;
    }

    await API.post('app/create_score_room', {
      "default_score": defaultPoint.value,
      "room_name": roomName.value,
      "room_password": roomPassword.value,
      "host_color": hostColor.value,
      "guest1_color": guest1Color.value,
      "guest2_color": guest2Color.value,
      "guest3_color": guest3Color.value,
      "guest4_color": guest4Color.value,
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "point_room", query: {memberNo: 0, scoreRoomId: res.data.score_room_id}}, "point_room");
      }
    });
  }

  async function clooseCreateModal() {
    setShowCreateModal(false);
  }

  async function showSelectRoom(roomId, joinRoomName) {
    setRoomId(roomId);
    setRoomName(joinRoomName);

    await API.get('app/get_score_room?score_room_id=' + roomId).then(res => {
      // console.log(res);
      if ('OK' === res.data.result) {
        setMember(res.data.room.guests);
      }
    });

    setShowJoinModal(true);
  }

  async function joinRoomComplete() {
    let joinRoomPassword = document.getElementById('joinRoomPassword');
    let joinMemberNo = document.getElementById('joinMemberNo');
    if (!joinRoomPassword.value || !joinMemberNo.value) {
      setAlertText("入力内容が不足しています。");
      return;
    }

    await API.post('app/join_score_room', {
      "score_room_id": roomId,
      "member_no": joinMemberNo.value,
      "room_password": joinRoomPassword.value
    }).then(res => {
      if ('OK' === res.data.result) {
        router.push({ pathname: "point_room", query: {memberNo: joinMemberNo.value, scoreRoomId: roomId}}, "point_room");
      }
    });
  }

  async function closeSelectRoom() {
    setShowJoinModal(false);
    setRoomId(0);
  }

  return (
    <Mypage title="ポイントカウント">
      <div>
        <div class="py-3 my-5 mx-auto text-center bg-white">
          <div class="my-6">参加したい部屋を選ぶか部屋を作って楽しみましょう。</div>
          <Button func={ createRoom }>部屋を作る</Button>
        </div>
        <div class="py-3 bg-white">
          <table class="table-auto w-full mx-auto text-center bg-white">
            <thead>
              <tr>
                <th>テーブル名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr>
                  <td class="h-24 text-2xl md:text-3xl mr-4">{ room.room_name }</td>
                  <td><SmallButton func={ () => showSelectRoom(room.room_id, room.room_name) }>部屋に入る</SmallButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal
        modalShow={ showCreateModal }
        closeModalFunc={ clooseCreateModal }
      >
        <div>
          <div class="text-center text-3xl">ルーム作成</div>
          <div class="md:flex mt-5">
            <div class="flex justify-between">
              <div class="w-1/2 my-auto md:mr-4">ルーム名</div>
              <div class="w-1/2 my-auto"><input type="text" id="roomName" class="w-32 py-2 pl-2 rounded-md border-2 border-black" placeholder="ルーム名" /></div>
            </div>
            <div class="flex justify-between md:ml-10 mt-3">
              <span class="w-1/2 my-auto md:mr-4">ルームパスワード</span>
              <div class="w-1/2 my-auto"><input type="text" id="roomPassword" class="w-32 py-2 pl-2 rounded-md border-2 border-black" placeholder="1234" /></div>
            </div>
            <div class="flex justify-between md:ml-10 mt-3">
              <span class="w-1/2 my-auto md:mr-4">初期点数</span>
              <div class="w-1/2 my-auto"><input type="text" id="defaultPoint" class="w-32 py-2 pl-2 rounded-md border-2 border-black" placeholder="100" /></div>
            </div>
          </div>
          <div class="md:flex mt-7">
            <div class="flex justify-between">
              <span class="w-1/2 my-auto md:mr-4">自分のカラー</span>
              <div class="w-1/2 my-auto">
                <select id="hostColor" class="w-32 h-10 rounded-md border-2 border-black">
                  <option value="0">選択してください</option>
                  {colors.map(color => (
                    <option value={ color.id }>{ color.name }</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="md:flex">
            <div class="flex justify-between mt-3">
              <span class="w-1/2 my-auto md:mr-4">プレイヤー1カラー</span>
              <div class="w-1/2 my-auto">
                <select id="guest1Color" class="w-32 h-10 rounded-md border-2 border-black">
                  <option value="0">プレイヤーなし</option>
                  {colors.map(color => (
                    <option value={ color.id }>{ color.name }</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="flex justify-between mt-3 md:ml-3">
              <span class="w-1/2 my-auto md:mr-4">プレイヤー2カラー</span>
              <div class="w-1/2 my-auto">
                <select id="guest2Color" class="w-32 h-10 rounded-md border-2 border-black">
                  <option value="0">プレイヤーなし</option>
                  {colors.map(color => (
                    <option value={ color.id }>{ color.name }</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="flex justify-between mt-3 md:ml-3">
              <span class="w-1/2 my-auto md:mr-4">プレイヤー3カラー</span>
              <div class="w-1/2 my-auto">
                <select id="guest3Color" class="w-32 h-10 rounded-md border-2 border-black">
                  <option value="0">プレイヤーなし</option>
                  {colors.map(color => (
                    <option value={ color.id }>{ color.name }</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="flex justify-between mt-3 md:ml-3">
              <span class="w-1/2 my-auto md:mr-4">プレイヤー4カラー</span>
              <div class="w-1/2 my-auto">
                <select id="guest4Color" class="w-32 h-10 rounded-md border-2 border-black">
                  <option value="0">プレイヤーなし</option>
                  {colors.map(color => (
                    <option value={ color.id }>{ color.name }</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="mt-3 w-full md:w-1/2 mx-auto text-center">
            <SmallButton func={ () => createRoomComplete() }>部屋を作る</SmallButton>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        modalShow={ showJoinModal }
        closeModalFunc={ closeSelectRoom }
      >
        <div>
          <div class="text-center text-3xl">ルーム参加</div>
          <div class="md:flex mt-5">
            <div class="flex justify-between mb-3">
              <span class="my-auto md:mr-4">ルーム名</span>
              <span class="my-auto">{ roomName }</span>
            </div>
            <div class="flex justify-between md:ml-10 my-auto mb-3">
              <span class="w-1/2 my-auto md:mr-4">ルームパスワード</span>
              <div class="w-1/2 my-auto"><input type="text" id="joinRoomPassword" class="w-32 py-2 pl-2 rounded-md border-2 border-black" placeholder="1234" /></div>
            </div>
            <div class="flex justify-between md:ml-10 my-auto mb-3">
              <span class="w-1/2 my-auto md:mr-4">自分のカラー</span>
              <div class="w-1/2 my-auto">
                <select id="joinMemberNo" class="w-32 h-10 rounded-md border-2 border-black">
                  <option value="0">選択してください</option>
                  {members.map(member => (
                    <option value={ member.member_no } disabled={ member.use }>プレイヤー{ member.member_no }{ member.color_id.name_ja }</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="mt-3 w-full md:w-1/2 mx-auto text-center">
            <SmallButton func={ () => joinRoomComplete() }>部屋に入る</SmallButton>
          </div>
        </div>
      </CustomModal>
    </Mypage>
  )
}

export default PointCount;