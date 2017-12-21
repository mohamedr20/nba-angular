import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errMessage:string = ""
  newUser: boolean = true; // to toggle login or signup form
  passReset: boolean = false;
  constructor(private fb: FormBuilder, private router:Router,private auth: AuthService) {}
   ngOnInit(): void {
     this.buildForm();
   }
   toggleForm(): void {
     this.newUser = !this.newUser;
   }
   login(){
     return this.auth.emailLogin(this.userForm.value)
     .then((user)=>{
      this.router.navigate(['/nba'])
      return this.auth.updateUserData(user)
     })
     .catch((err)=>this.errMessage = err.message)
   }

//    resetPassword() {
//      this.auth.resetPassword(this.userForm.value['email'])
//      .then(() => this.passReset = true)
//    }
   buildForm(): void {
     this.userForm = this.fb.group({
       'email': ['', [
           Validators.required,
           Validators.email
         ]
       ],
       'password': ['', [
         Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25)
       ]
     ],
     });
     this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
     this.onValueChanged(); // reset validation messages
   }
   // Updates validation state on form changes.
   onValueChanged(data?: any) {
     if (!this.userForm) { return; }
     const form = this.userForm;
     for (const field in this.formErrors) {
       // clear previous error message (if any)
       this.formErrors[field] = '';
       const control = form.get(field);
       if (control && control.dirty && !control.valid) {
         const messages = this.validationMessages[field];
         for (const key in control.errors) {
           this.formErrors[field] += messages[key] + ' ';
         }
       }
     }
   }
  formErrors = {
     'email': '',
     'password': '',
     'login':''
   };
   validationMessages = {
     'email': {
       'required':      'Email is required.',
       'email':         'Email must be a valid email',
       'user': 'User not found, please register if you do not have an account.'
     },
     'password': {
       'required':      'Password is required.',
       'pattern':       'Password must be include at one letter and one number.',
       'minlength':     'Password must be at least 4 characters long.',
       'maxlength':     'Password cannot be more than 40 characters long.',
     }
   };

   navigateToRegister(){
     return this.router.navigate(['register'])
   }
}
