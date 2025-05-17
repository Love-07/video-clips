import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
   isDragging = false;
   isFileUploaded = false;
   file : File | null = null;

   title = new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable:true});

   uploadForm = new FormGroup({
      title: this.title
   })

   constructor(){

   }

   ngOnInit(): void {
   }

   onDrop(e:Event){ 
      this.isDragging = false;
      this.file = (e as DragEvent).dataTransfer?.files.item(0) ?? null //this function will handle the grabbing of the file which come over the event 

      if(!this.file || this.file.type != 'video/mp4'){
         return;
      }
      
      this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
      console.log(this.file);
      this.isFileUploaded=true;
   }

   uploadFile(){
      if(this.uploadForm.valid){
         console.log("File Uploaded Successfully!!");
      }
      
   }

}
