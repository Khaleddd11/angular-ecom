import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected submitted = false;
  protected readonly emailPattern = '^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$';

  protected model = {
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) return;
    this.router.navigate(['/products']);
  }
}
