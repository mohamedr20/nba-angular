import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ReactiveFormsModule,Validators,FormGroup,FormBuilder} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit {

  userForm:FormGroup;
  newUser:boolean = true;
  resetPassword:boolean = false;

  constructor(private fb:FormBuilder,private auth:AuthService) { }

  ngOnInit(){
    this.buildForm()
  }
  toggleForm():void{
    this.newUser = !this.newUser;
  }
  signUp():void{
    this.auth.emailSignUp(this.userForm.value);
  }

  logIn():void{
    this.auth.emailLogin(this.userForm.value)
  }

  // resetPassword():void{
  //   this.auth.resetPassword
  // }

  buildForm(){
    this.userForm = this.fb.group({
      'email':['',[
        Validators.required,
        Validators.email
      ]],
      'password':['',[
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });
    this.userForm.valueChanges.subscribe(data=>this.onValueChanged(data))
    this.onValueChanged()
  }

  onValueChanged(data?:any){
    if(!this.userForm){return;}
    const form = this.userForm;
    for(const field in this.formErrors){
      //clear previous message
      this.formErrors[field] = '';
      const control = form.get(field)
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  formErrors =  {
    'email':'',
    'password':''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };
}
