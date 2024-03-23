import type { NextAuthConfig, Session } from 'next-auth';
import { auth } from '$/auth';
import { logout, fetchIssues } from '@/app/lib/actions';
import React from 'react';
import { Reports } from '@/app/lib/definitions';



export default async function Home() {
  const data: Reports = await fetchIssues();

  


  return (
    <main>
      <div className="title">
        <h1 className="centerText">Welcome admin</h1>
      </div>
      <div>
      <form
          action={logout}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
      <div>
        {
          data?.reports?.map(item => {
            const fixedElem = item.fixed ? (<p className="centerText">FIXED!!! 🥳🥳🥳</p>) : null;
            const created = new Date(item.created);
            return (
              <div className="messageContainer">
                <p className="timeText">{created.toLocaleTimeString("Finland")}</p>
                <p className="centerText">{item.msg}</p>

  

                {fixedElem}
              </div>
            )
          })
        }
      </div>
    </main>
  );
}


