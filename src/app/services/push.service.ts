import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { firebaseConfig } from 'src/environments/firebase-config';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
@Injectable({
  providedIn: 'root'
})
export class PushService {

  initialize() {
    console.log('PushService.initialize() chiamato');
    console.log('Platform:', Capacitor.getPlatform());
    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
    // 1. Richiesta permessi
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
        // 2. Registrazione
        PushNotifications.register();
      } else {
        console.warn('Permessi notifiche non concessi');
      }
    });

    // 3. Token ricevuto
    PushNotifications.addListener('registration', token => {
      console.log('Token FCM ricevuto:', token.value);
      // Qui puoi salvarlo su Firestore o inviarlo al backend
    });

    // 4. Errore registrazione
    PushNotifications.addListener('registrationError', err => {
      console.error('Errore registrazione push:', err);
    });

    // 5. Notifica ricevuta (foreground)
    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Notifica ricevuta:', notification);
      // Puoi mostrare un toast, alert, ecc.
    });

    // 6. Azione su notifica (click)
    PushNotifications.addListener('pushNotificationActionPerformed', action => {
      console.log('Azione su notifica:', action);
      // Puoi gestire navigazione o logica
    });
  }
}

private async salvaTokenSuFirestore(token: string) {
  try {
    const firebaseConfig = {
      apiKey: '...',
      authDomain: '...',
      projectId: '...',
      messagingSenderId: '...',
      appId: '...'
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    const tokenId = token; // Puoi usare il token come ID documento
    await setDoc(doc(db, 'tokens', tokenId), {
      token,
      updatedAt: new Date().toISOString(),
      platform: Capacitor.getPlatform()
    });

    console.log('Token salvato su Firestore');
  } catch (err) {
    console.error('Errore salvataggio token:', err);
  }
}

}
