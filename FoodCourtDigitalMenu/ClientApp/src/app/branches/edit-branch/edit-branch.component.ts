import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { branch } from 'src/app/Models/BranchModel';
import { BranchService } from 'src/app/Services/branch.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditComponent {

  ImgUrl : string = '';
  OriginUrl : string = location.origin;

  constructor (private branchSer : BranchService) {}

  editBranchForm = new FormGroup({
    branchId : new FormControl(null , Validators.required),
    branchName: new FormControl('' , Validators.required),
    branchDescription: new FormControl('' , Validators.required),
    branchPort: new FormControl('' , Validators.required),
    branchIpAddress: new FormControl('' , Validators.required),
    branchLogoUrl: new FormControl('', Validators.required),
    branchIsActive : new FormControl(true , Validators.required),

  });

  getUrl(event : any) {
    const file : File = event.target.files[0];
    this.ImgUrl = this.OriginUrl + '/assets/background/' + file.name;

    
  }

  public submitBranch(data : FormGroup) {
      const newBranch : branch = {
        BranchId : data.controls['branchId'].value,
        BranchName : data.controls['branchName'].value,
        BranchDescription : data.controls['branchDescription'].value,
        BranchPortNumber : data.controls['branchPort'].value,
        BranchIpAddress : data.controls['branchIpAddress'].value,
        // BranchLogoUrl : data.controls['branchLogoUrl'].value,
        BranchIsActive : data.controls['branchIsActive'].value,
        ImageBase64 : '',

      }
    this.branchSer.getAllBranch().subscribe((data: any) => {
      console.log(data);
    });
    this.editBranchForm.reset();
    this.ImgUrl = '';
    console.log(location.origin);
    
  }
}
