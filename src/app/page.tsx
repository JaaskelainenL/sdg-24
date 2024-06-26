import { fetchIssues } from '@/app/lib/actions';
import { Reports } from '@/app/lib/definitions';



export default async function Home() {
  const data: Reports = await fetchIssues();

  return (
    <main>
      <div className="title">
        <h1 className="centerText">
          <a href="/upload">Reports</a>
        </h1>
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