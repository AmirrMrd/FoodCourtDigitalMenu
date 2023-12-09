import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { branch } from 'src/app/Models/BranchModel';
import { BranchService } from 'src/app/Services/branch.service';
import { RestApiService } from 'src/app/Services/rest-api.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})

export class AddBranchComponent implements OnInit {
  branchItem : branch[] = [];
  userAvatar: string = '';

  // addBranchForm :  FormGroup = new FormGroup({}); 
  addBranchForm: FormGroup = new FormGroup({
    branchId: new FormControl(),
    branchName: new FormControl(''),
    branchDescription: new FormControl(''),
    branchPort: new FormControl(''),
    branchIpAddress: new FormControl(''),
    branchLogoUrl: new FormControl(''),
    branchIsActive: new FormControl(false),
  });

  public submitted = false;


  constructor(private http: RestApiService<any>, private formBuilder: FormBuilder , private res : RestApiService<branch>) {
    this.addBranchForm = this.formBuilder.group({
      branchId: ['', Validators.required],
      branchName: ['', [Validators.required, Validators.minLength(3)]],
      branchDescription: ['', Validators.required],
      BranchPortNumber: ['', Validators.required],
      branchIpAddress: ['', [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?(\.|$)){4}')]],
      branchIsActive: [true, Validators.requiredTrue],
      branchLogoUrl: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getAllBranches();
  }



  branchUrlbase64 = '';
  public obj: any = {};
  ImgUrl: string = '';
  OriginUrl: string = location.origin;

  // getUrl(event : any) {
  //   const file : File = event.target.files[0];
  //   this.ImgUrl = this.OriginUrl + '/assets/background/' + file.name;
  // }

  get f(): { [key: string]: AbstractControl } {
    return this.addBranchForm.controls;
  }

  public upload(input: any) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log('Got here: ', e.target.result);
        this.obj.photoUrl = e.target.result;
        this.ImgUrl = this.obj.photoUrl
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  submitBranch(): void {
    if (this.addBranchForm.invalid) {
      this.submitted = true;
      return console.error("فرم به درستی پر نشده است");
    }
    else {
      const newBranch: branch = this.addBranchForm.value;
      newBranch.ImageBase64 = this.obj.photoUrl;
      this.res.postEntity<branch>(newBranch,'CreateBranch').subscribe((data) => {
        console.log(data);
      });
      // this.branchSer.createBranch(newBranch).subscribe((data) => {
      //   console.log(data);
      //   this.addBranchForm.reset();
      // });

      this.addBranchForm.reset();
      this.ImgUrl = '';
    }
  }
  getFileExtension(filename : string) {
    return "." + filename.split(".").pop();
  }
  // getUserAvatar() {
  //   this.http.getImage("SaveBranchLogo").subscribe({
  //     next: (response: any) => {
  //       if (response != null) {
  //         const reader = new FileReader();
  //         let base64Image;
  //         reader.onload = (e: any) => {
  //           base64Image = e.target.result;
  //           this.userAvatar = base64Image;
  //         };
  //         reader.readAsDataURL(response);
  //       }
  //     },
  //   });
  // }

  // setProfilePicture(fileToUpload : any) {
  //   if (fileToUpload.target.files && fileToUpload.target.files[0]) {
  //     const oldName = this.getFileExtension(fileToUpload.target.files[0].name);
  //     const FileName = "avatar" + oldName;
  //     const formData = new FormData();
  //     let barArray = [{item: 'one'}, {item: 'two'}];
      
  //     formData.append("data", JSON.stringify(barArray));
  //     formData.append("FileName", FileName);
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       let image = new Image();
  //       image.src = e.target.result;
  //       console.log(e.target);
  //       image.onload = (rs: any): any => {
  //         const img_height = rs.currentTarget["height"];
  //         const img_width = rs.currentTarget["width"];
  //           this.http.upload( formData,"SaveBranchLogo").subscribe({
  //             next: (response) => {
  //               if (response) this.getUserAvatar();
  //             },
  //           });
  //       };
  //     };
  //     reader.readAsDataURL(fileToUpload.target.files[0]);
  //   }
  //   return "";
  // }
  public getAllBranches() {
    this.http.getEntity('GetAllBranches').subscribe((data:[]) => {
     this.branchItem = data;
    })
   }

}


