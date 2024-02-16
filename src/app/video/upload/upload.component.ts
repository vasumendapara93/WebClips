import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {
  isDragover = false
  file: File | null = null
  nextStep = false

  title = new FormControl('',[
  Validators.required,
  Validators.minLength(3)
  ])
  uploadForm = new FormGroup({
    title : this.title
  })

  constructor(private storage: AngularFireStorage){ }

  storeFile($event: Event){
    this.isDragover = false
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null
    if(!this.file || this.file.type != 'video/mp4'){
      return
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
  }

  uploadFile(){
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`

    this.storage.upload(clipPath, this.file)
  }
}
