import { EventsView } from "./components/events-view/events-view";


export default function Home() {
  return (
    <div>
      <main>
        <EventsView />
        <div style={{
          position: 'absolute', left: '2%',
          top: '50%'
        }}>
          <iframe src="https://alerts.in.ua/lite?embed" style={{ width: '500px', height: '300px', border: 'none', background: 'none' }} title="Мапа повітряних тривог" frameBorder="0" ></iframe>
        </div>
      </main>
    </div>
  );
}
