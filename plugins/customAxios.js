import axios from "axios"; // Axios本体をインポート

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
}); // Axiosインスタンスを生成

instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default instance;