import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email: string = '';
  password: string = '';
  constructor(public auth: AngularFireAuth, private router: Router, private toastr:ToastrService) { }

  ngOnInit() { }
  async signUp() {
    try {
      await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      this.toastr.success('Giriş başarılı,anasayfaya yönlendiriliyorsunuz');
      this.router.navigate(['/login']);

    } catch (error) {
      this.toastr.error('Kullanıcı oluşturulurken bir hata oluştu');
    }
    
  }
}