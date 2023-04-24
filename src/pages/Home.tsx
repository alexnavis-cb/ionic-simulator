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

  const [invoiceId, setInvoiceId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [iframe, setIframe] = useState<string>("yes");
  const [version, setVersion] = useState<string>("v10");
  const [environment, setEnvironment] = useState<string>("sandbox");

  useIonViewWillEnter(() => {
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  function handleChange(event: any) {
    setInvoiceId(event.target.value);
  }
  function handleChangeCustomerId(event: any) {
    setCustomerId(event.target.value);
  }
  function handleChangeIframe(event: any) {
    setIframe(event.target.value);
  }
  function handleChangeVersion(event: any) {
    setVersion(event.target.value);
  }
  function handleChangeEnvironment(event: any) {
    setEnvironment(event.target.value);
  }
  const launchDigioIframe = () => {
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
      "is_iframe": iframe === "yes" ? true : false,
      "environment": environment
    }
    var url = URL.createObjectURL(
      new Blob(
        [
          `<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title>Digio Test</title>
       <script src="https://app.digio.in/sdk/${version}/digio.js"></script>
     </head>
   
     <body>
     <script>
     let invoiceID = '${invoiceId}' || 'ENA230417153546646GMKWT2EE5MULAP'
     let customerId = '${customerId}' || 'nithiyashri.s@habile.in'
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
  
  const launchDigio = () => {
    const options = {
      callback: () => { },
      "is_iframe": iframe === "yes" ? true : false,
      "environment": environment
    }
    let invoiceID = invoiceId || 'ENA230417153546646GMKWT2EE5MULAP'
    let customerIdLocal = customerId || 'nithiyashri.s@habile.in'
    
       let digio = new (window as any).Digio(options);
       digio.init();
       digio.submit(invoiceID, customerIdLocal);
  };

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <label>
        Invoice Id:
        <input type="text" name="invoiceId" value={invoiceId} onChange={handleChange} />  
        </label>
        <br/>
        <label>
        Customer Id:
        <input type="text" name="customerId" value={customerId} onChange={handleChangeCustomerId} /> 
        </label>
        <br/>
        <label>
        Use Iframe:
        <input type="text" name="iframe" value={iframe} onChange={handleChangeIframe} /> 
        </label>
        <br/>
        <label>
        Use Version:
        <input type="text" name="version" value={"" + version} onChange={handleChangeVersion} /> 
        </label>
        <label>
        <br/>
        Use Environment:
        <input type="text" name="environment" value={"" + environment} onChange={handleChangeEnvironment} /> 
        </label>
        <br/>
       
        <IonButton>
        <div className="App">
          <header className="App-header">
            <button onClick={() => launchDigio()} >Launch </button>
          </header>
        </div>        
        </IonButton>
        <br/>

        <IonButton>
        <div className="App">
          <header className="App-header">
            <button onClick={() => launchDigioIframe()} >Launch with url blob</button>
          </header>
        </div>        
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;