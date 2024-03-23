import type { NextAuthConfig, Session } from 'next-auth';
import { auth } from '$/auth';
import { logout, fetchIssues } from '@/app/lib/actions';
import React from 'react';
import { Reports } from '@/app/lib/definitions';
import './admin.css';
import AdminList from '@/app/ui/admin-view';


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
        <AdminList data={data}/>
      </div>
    </main>
  );
}


