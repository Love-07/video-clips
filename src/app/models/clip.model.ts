import firebase from 'firebase/compat/app'
export default interface IClip{
   uid: string,
   displayName: string,
   fileName: string,
   title: string,
   url:string,
   timestamp: firebase.firestore.FieldValue
}