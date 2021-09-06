import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentHttpService } from 'src/app/service/student-http.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  reactForm: FormGroup;

  student$: Observable<Student> = this.ar.params.pipe(
    switchMap(params => this.studentService.getById(params.id))
  );

  constructor(
    private studentService: StudentHttpService,
    private router: Router,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  saveStudent(ngForm: NgForm) {
    this.studentService.update(ngForm.value, ngForm.value._id).subscribe(
      student => this.router.navigate(['/', 'student-list']),
      err => console.error(err)
    )
  }

}
