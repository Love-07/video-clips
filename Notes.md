# Main Entry File
   The purpose of this file is to load Angular and load our app correctly.
   we load angular before we load our app

# Change Detection 
   Change Detection is the process of updating the HTML document whenever data changes in an app 
   --> When our app initalizes 
   --> during changes in the app 
   --> manually triggering change detection 

   Change detection run twice when an app is initalized , so we manually enable the prod mode where it runs only once during initalization 

# Module System
   The Goal of module system is to break code into separate files (this structure makes our code maintainable, reusable and testable)

# Components 
   These are like reusable HTML Tags with custom behaviour, (these are kind of new tag which we teached browser)

# MVC Pattern 
   Model-> it represents the data in the component 
   View-> it represents the appearnce of the component 
   controller->it represents the business logic of the component 

   controller can be treated like a middle man between the model and the view


# Web Worker 
   A web worker is another script for running code on a different thread 
   Theoritically, if a web worker have blocking code, it would not block the main thread / application
   **Problem**: The web-worker don't have access to the document, if it needs to send data to the main thread, a message must be posted (sending large data between web worker and main thread can freeze the application)
   **Solution**: Add a shared array buffers which are objects and scripts from different thread can read and write to the same object 
