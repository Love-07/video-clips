import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
   private ffmpeg;
   isReady = false;
   isRunnig =false;

  constructor() { 
   this.ffmpeg = createFFmpeg({log: true})
  }

  async init(){
   if(this.isReady){
      return
   }
   await this.ffmpeg.load()
   this.isReady = true
  }

  async getScreenshots(file: File){
   this.isRunnig = true;
   const data = await fetchFile(file);

   const seconds = [1,2,3]
   const commands: string[] = []

   seconds.forEach(second =>{
      commands.push(
         //Input
      '-i', file.name,
      //Output Options
      '-ss', `00:00:0${second}`,
      '-frames:v', '1',
      '-filter:v', 'scale=510:-1',

      //Output
      `output_0${second}.png`
      )
   })

   this.ffmpeg.FS('writeFile', file.name, data);

   await this.ffmpeg.run(
      ...commands
   )

   const screenshots: string[] = []

   seconds.forEach(second =>{
      const screenshotFile =  this.ffmpeg.FS('readFile', `output_0${second}.png`)

      const screenshotBlob = new Blob(
         [screenshotFile.buffer],
         {
            type: 'image/png'
         }
      )

      const screenshotURL = URL.createObjectURL(screenshotBlob)

      screenshots.push(screenshotURL);
   })

   this.isRunnig = false;
   return screenshots
  }

  async blobFromURL(url: string){
   const response = await fetch(url);
   const blob = await response.blob();
   return blob;
  }
}