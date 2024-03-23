'use client';

import { useEffect, useState } from 'react';
import { Reports } from '@/app/lib/definitions';
import { fetchIssues, fix } from '@/app/lib/actions';

export default function AdminList({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Fetch data asynchronously
    const fetchData = async () => {
      try {
        const fetchedData = await fetchIssues();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFix = async (id: number) => {
    const res: boolean = await fix(id);
    if(res){
        try{
            document.getElementById(id).innerText = "FIXED!!! 🥳🥳🥳";
            document.getElementById("btn"+id).hidden = true;
        } catch(err){
            
        }

    }
  };

  return (
    <div>
      {data?.reports?.map(item => {
        const fixedElem = item.fixed ? <p className="fixedElem">FIXED!!! 🥳🥳🥳</p> : <p id={item.id} className="fixedElem"></p>;
        const fixBtn = item.fixed ? null :  <button id={"btn"+item.id} className="fixbtn" onClick={() => handleFix(item.id)}>Fix</button>;
        const created = new Date(item.created);

        return (
          <div className="messageContainer" key={item.id}>
            <p className="timeText">{created.toLocaleTimeString('Finland')}</p>
            <p className="scrollableText">{item.msg}</p>
            {fixedElem}
            {fixBtn}
          </div>
        );
      })}
    </div>
  );
}