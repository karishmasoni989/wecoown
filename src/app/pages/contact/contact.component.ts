import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
            	/* start enter button trigger*/
	$(".CheckForm").keypress(function (e) {
    if (e.which === 13) {
        $('#formSubmit').trigger('click');
      }
  });
/* end enter button trigger*/
  }

  submitForm() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#email').val();
    if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal)) && ($('#address').val() == '' || $('#address').val().length < 3)) {
      $('#address').focus();
      $('#email').focus();
      $('#name').focus();
      $(".contact-danger").html("Please enter name.<br>Please enter email address.<br>Please enter description.");
      $('.contact-danger').show();
    }  
    else if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal)) ) {
      $('#email').focus();
      $('#name').focus();
      $(".contact-danger").html("Please enter name.<br>Please enter email address.");
      $('.contact-danger').show();
    }
    else if ($('#name').val() == '' && ($('#address').val() == '' || $('#address').val().length < 3) ) {
      $('#address').focus();
      $('#name').focus();
      $(".contact-danger").html("Please enter name.<br>Please enter description.");
      $('.contact-danger').show();
    }
    else if ($('#name').val() == '' ) {
      $('#name').focus();
      $(".contact-danger").html("Please enter name.");
      $('.contact-danger').show();
    }
    else if ($('#name').val().length < 3 && ($('#email').val() == '' || !regex.test(emailVal)) && ($('#address').val() == '' || $('#address').val().length < 3)) {
      $('#address').focus();
      $('#email').focus();
      $('#name').focus();
      $(".contact-danger").html("Name must be greater than 2 character.<br>Please enter email address.<br>Please enter description.");
      $('.contact-danger').show();
    } 
    else if ($('#name').val().length < 3 && ($('#email').val() == '' || !regex.test(emailVal))) {
      $('#email').focus();
      $('#name').focus();
      $(".contact-danger").html("Name must be greater than 2 character.<br>Please enter email address.");
      $('.contact-danger').show();
    }
    else if ($('#name').val().length < 3 && ($('#address').val() == '' || $('#address').val().length < 3)) {
      $('#address').focus();
      $('#name').focus();
      $(".contact-danger").html("Name must be greater than 2 character.<br>Please enter description.");
      $('.contact-danger').show();
    }
    else if ($('#name').val().length < 3 ) {
      $('#name').focus();
      $(".contact-danger").html("name must be greater than 2 character.");
      $('.contact-danger').show();
    }

    // from email

    else if ($('#email').val() == '' && ($('#address').val() == '' || $('#address').val().length < 3)) {
      $('#address').focus();
      $('#email').focus();
      $(".contact-danger").html("Please enter email address.<br>Please enter description.");
      $('.contact-danger').show();
    }   
    else if ($('#email').val() == '') {
      $('#email').focus();
      $(".contact-danger").html("Please enter email address.");
      $('.contact-danger').show();
    }
    else if (!regex.test(emailVal) && ($('#address').val() == '' || $('#address').val().length < 3)) {
      $('#address').focus();
      $('#email').focus();
      $(".contact-danger").html("Please enter your valid email address.<br>Please enter description.");
      $('.contact-danger').show();
    }    
    else if (!regex.test(emailVal)) {
      $('#confirm_address').focus();
      $('#email').focus();
      $(".contact-danger").html("Please enter your valid email address.");
      $('.contact-danger').show();
    }

// from address
else if ($('#address').val() == '') {
  $('#address').focus();
  $(".contact-danger").html("Please enter description.");
  $('.contact-danger').show();
}
else if ($('#address').val().length < 3) {
  $('#address').focus();
  $(".contact-danger").html("Description must be greater than 2 character.");
  $('.contact-danger').show();
}
else{
  $('.contact-danger').hide();
       console.log("form register val : ", this.contactForm.value);
       this.UserService.contactFormEmail(this.contactForm.value).subscribe(result => {
         console.log("result : ", result);
         if (result['success'] == true) {
          $('.contact-success').show();
          $('.contact-danger').hide();
          $('#simpleForm')[0].reset();
          //  this.router.navigate(['/login']);
         }
         else if (result['success'] == false) {
          $(".contact-danger").html(result['message']);
          $('.contact-success').hide();
          $('.contact-danger').show();
         }
       });
     }
}
}