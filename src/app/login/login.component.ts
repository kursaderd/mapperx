import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userSignIn?: boolean
  constructor(public auth: AngularFireAuth, private router: Router, private toastr: ToastrService) { }

  async signIn() {
    if (!this.validateEmail(this.email)) {
      this.toastr.error('Bir hata oluştu!', 'Geçersiz e-posta adresi formatı');
      return;
    }
  
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('Giriş yapıldı.');
        this.userSignIn = true;
        this.toastr.success('Giriş başarılı, anasayfaya yönlendiriliyorsunuz');
        // Giriş başarılı olduğunda anasayfaya yönlendir
        this.router.navigate(['/anasayfa']);
      })
      .catch(error => {
        console.error('Giriş sırasında bir hata oluştu:', error);
      });
  }
  
  
  public async register() {
    this.router.navigate(['/register']);
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
