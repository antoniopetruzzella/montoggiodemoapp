import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  initialize() {

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
}
