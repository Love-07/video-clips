import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements AfterContentInit{

   @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();
   
   constructor() { }

   ngAfterContentInit(): void {
      console.log(this.tabs);
      const activeTabs = this.tabs?.filter(tab => tab.active);
      
      if (!activeTabs || activeTabs.length === 0) {//i didn't find any active tabs so i will set the first tab to active
         this.selectTab(this.tabs!.first);
      }
   }

   selectTab(tab: TabComponent) {
      this.tabs?.forEach(t => t.active = false);//we may accidentally have multiple active tabs
      tab.active = true;//set the passed tab to active
      return false;//this is to prevent the default action of the anchor tag
   }

}
