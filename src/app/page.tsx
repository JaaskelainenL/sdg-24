export default async function Home() {
  const data: Reports = await backendHello();

  return (
    <main>
      <div className="title">
        <h1 className="centerText">insert title</h1>
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

type Reports = {
  reports: {
    id: number,
    msg: string,
    created: string,
    fixed: string,
    gps_lat: number,
    gps_lng: number
  }[]
}

async function backendHello() {
  const response = await fetch("http://localhost:3001/reports?limit=20&offset=0");
  const data = await response.json();
  return data;
}
