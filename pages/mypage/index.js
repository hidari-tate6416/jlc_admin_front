import Mypage from '../../components/Mypage.js';
import Button from '../../components/parts/Button.js';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from './../../plugins/customAxios.js';

function Index() {

  const router = useRouter();

  const [memberName, setMemberName] = useState("");
  const [userType, setUserType] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await API.get('app/get_top_profile').then(res => {
        setMemberName(res.data.name);
        setUserType(res.data.user_type_id);
        return res;
      }).catch(err => {
        // console.log(err);
        return err;
      });
    }

    fetchData();
    }, []);

  async function movePointCount() {
    router.push({ pathname: "mypage/point_count", query: {userType: userType} }, "mypage/point_count");
  }

  return (
    <Mypage title="">
      <div>
        ようこそ、<span class="text-2xl">{ memberName }</span>さん
      </div>
      <div>今日は何をして遊びますか？</div>
      <div class="mt-4">
        <button onClick={ movePointCount } class="h-96 w-full">
          <div class="animate-text-focus-in hover:animate-kenburns-bottom relative h-full bg-cover bg-center bg-no-repeat bg-[url('/img/PointCount.png')]">
            <div class="absolute top-36 w-full h-1/4 bg-white/75">
              <div class="font-mono text-4xl mt-7">
                ポイントカウント
              </div>
            </div>
          </div>
        </button>
      </div>
    </Mypage>
  )
}

export default Index;