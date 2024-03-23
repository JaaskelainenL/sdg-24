import type { NextAuthConfig, Session } from 'next-auth';
import { auth } from '$/auth';
import { logout, fetchIssues } from '@/app/lib/actions';
import React from 'react';
import { Reports } from '@/app/lib/definitions';
import './admin.css';


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
          <button className="signout">
            <div className="hidden md:block">Sign out</div>
          </button>
        </form>
      </div>
      <div>
      {
          data?.reports?.map(item => {
            const fixedElem = item.fixed ? (<p className="fixedElem">FIXED!!! 🥳🥳🥳</p>) : null;
            const created = new Date(item.created);
            return (
              <div className="messageContainer">
                <p className="timeText">{created.toLocaleTimeString("Finland")}</p>
                <p className="scrollableText">{item.msg}</p>
                {fixedElem}
              </div>
            )
          })
        }
      </div>
    </main>
  );
}


