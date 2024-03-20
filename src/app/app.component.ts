import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email: string = ''; // e-posta değişkeni
  password: string = ''; // şifre değişkeni

  constructor(public auth: AngularFireAuth) {}
  showMenu = false;

  // Giriş Yapma Fonksiyonu
  async signIn() {
    try {
      await this.auth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Giriş yapıldı.',this.email,this.password);
    } catch (error) {
      console.error('Giriş yapılırken bir hata oluştu:', error,this.email,this.password);
    }
  }

  // Çıkış Yapma Fonksiyonu
  async signOut() {
    try {
      await this.auth.signOut();
      console.log('Çıkış yapıldı.');
    } catch (error) {
      console.error('Çıkış yapılırken bir hata oluştu:', error);
    }
  }

  // Kullanıcı Kaydetme Fonksiyonu
  

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
