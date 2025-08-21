import Link from 'next/link';
import Header from './parts/Header.js';
import Footer from './parts/Footer.js';
import Loading from './parts/Loading.js';
import { useState, useEffect } from "react";

export default function Index({title, loadingFlag = true, children}) {

  const [loadingOn, setLoadingOn] = useState(loadingFlag);

  useEffect(() => {
    setTimeout(() => setLoadingOn(false), 1500);
  }, []);

  return (
    <div className="bg-jlc-main mx-auto w-full">
      {(loadingOn) && <Loading />}
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow mt-10">
          <div>
            { title }
          </div>
          <div>
            { children }
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
