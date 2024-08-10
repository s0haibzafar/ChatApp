import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap} from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileUser } from 'src/app/models/user/user';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user)=>{
      this.profileForm.patchValue({ ...user });
    });
  }



  uploadFile(event: any, user: any) {
    console.log("user --. ", user);
    const { uid } = user;
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        concatMap((photoURL) =>
          this.userService.updateUser({
            uid : user.uid,
            photoURL
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const profileData = this.profileForm.value;
    this.userService.updateUser( profileData as ProfileUser).pipe(
      this.toast.observe({
        loading: "Updating data...",
        success: "Data has been updated",
        error: "There was error in updating data"
      })
    ).subscribe();
  }


}
