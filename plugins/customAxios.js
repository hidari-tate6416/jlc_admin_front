import axios from "axios"; // Axios本体をインポート

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
}); // Axiosインスタンスを生成

const authRequestInterceptor = (config) => {
    const token = localStorage.getItem("token");

    if (token !== null) {
        // tokenがnullでない時、headerにAuthorizationを追加
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// リクエストの前に、authRequestInterceptorの処理をする宣言
instance.interceptors.request.use(authRequestInterceptor);

export default instance;