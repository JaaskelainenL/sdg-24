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
            return (
              <div className="messageContainer">
                <p className="centerText">{item.id}</p>
                <p className="centerText">{item.msg}</p>
                <p className="centerText">{item.created}</p>
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
  const response = await fetch("http://localhost:3001/reports?limit=10&offset=0");
  const data = await response.json();
  return data;
}
