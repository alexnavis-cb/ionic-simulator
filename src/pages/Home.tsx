import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import './Home.css';

const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  const launchDigio = () => {
    const browserObjectOptions = ["hidenavigationbuttons=yes",
      "hidden=no",
      "location=yes",
      "hideurlbar=yes",
      "clearsessioncache=yes",
      "clearcache=yes",
      "hardwareback=no",
      "useWideViewPort=no",
      "lefttoright=yes",
      "closebuttoncaption=Cancel",
      "zoom=no",
      /**ios*/
      "hidespinner=no",
      "toolbar=yes",
      "toolbarposition=top",
      "enableViewportScale=no",
      "enableViewportScale=yes",];

    const options = {
      callback: () => { },
      "is_iframe": true,
    }
    var url = URL.createObjectURL(
      new Blob(
        [
          `<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title>Digio Test</title>
       <script src="https://app.digio.in/sdk/v8/digio.js"></script>
     </head>
   
     <body>
     <script>
     let invoiceID = 'ENA230417153546646GMKWT2EE5MULAP'
     let customerId = 'nithiyashri.s@habile.in'
     const options = ${JSON.stringify(options)}
     
        let digio = new window.Digio(options);
        digio.init();
        digio.submit(invoiceID, customerId);
    </script>
     </body>
   </html>`,
        ],
        { type: "text/html" }
      )
    );

    console.log("ionic")
    const browserRef = InAppBrowser.create(
      url,
      "_self",
      browserObjectOptions.join()
    );
  }

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        {/* <IonList>
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList> */}
        <IonButton>
        <div className="App">
          <header className="App-header">
            <button onClick={() => launchDigio()} >Launch Digio</button>
          </header>
        </div>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;