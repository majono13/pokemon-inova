import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth";
import { firstValueFrom } from 'rxjs';
import { localStorageKeys } from 'src/app/enums/localstorage.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }
  
    loginWithGoogle() {
      this.afAuth.signInWithPopup(new GoogleAuthProvider())
        .then((userCredential) => {
          this.getCredentialsAndSetToken(userCredential);
        })
        .catch((error) => {
          alert('Não foi possível realizar o login.')
        });
    }
  
    private async getCredentialsAndSetToken(userCredential: any) {
      const { additionalUserInfo } = userCredential;
      const firebaseUser = userCredential.user;
        const user = {
          id: firebaseUser?.uid,
          email: firebaseUser?.email,
          accessToken: await firebaseUser.getIdToken(),
        }
        this.setToken(user);
        if (additionalUserInfo?.isNewUser) {
          
        }
        this.goToHome();
    }
  
    private setToken(user: any) {
      localStorage.setItem(localStorageKeys['user'], JSON.stringify(user));
    }
  
    private goToHome() {
      this.router.navigate(['/main']);
    }
  
    async validateToken(): Promise<boolean> {
      const token = await firstValueFrom(this.afAuth.idToken)
      if (token) return true;
  
      this.router.navigate(['/login']);
      return false;
    }
  
    logout() {
      this.afAuth.signOut().then(() => {
        this.removeToken();
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.log(error)
      });
    }
  
    removeToken() {
      localStorage.removeItem(localStorageKeys['user']);
    }

}
