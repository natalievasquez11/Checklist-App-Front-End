import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Item } from '../Item';
import { ChecklistServiceService } from '../checklist-service.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {
  listItemsArr: Item[];
  itemsSub: Subscription;
  deleteItemSub: Subscription;
  updateItemSub: Subscription;
  deleteAllSub: Subscription;
  addItemSub: Subscription;
  addTaskBtn : boolean = false;
  newTask: string;
  
  constructor(private checklistService: ChecklistServiceService) { 
  }

  ngOnInit() {
    this.getListItemsFromServer();
  }

  ngOnDestroy() {
    if(this.itemsSub) {
      this.itemsSub.unsubscribe();
    }

    if(this.deleteItemSub) {
      this.deleteItemSub.unsubscribe();
    }

    if(this.updateItemSub) {
      this.updateItemSub.unsubscribe();
    }

    if(this.deleteAllSub) {
      this.deleteAllSub.unsubscribe();
    }

    if(this.addItemSub) {
      this.addItemSub.unsubscribe();
    }
  }

  getListItemsFromServer() {
    this.itemsSub = this.checklistService.getListItems().subscribe(
      (res: Item[]) => {
        this.listItemsArr = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  onCheck(item: Item) {
    item.completed = !item.completed;
    this.updateItemSub = this.checklistService.update(item).subscribe(
      (res: number) => {
        console.log(res);
        this.getListItemsFromServer();
      },
      err => {
        console.log(err);
      }
    ) 
  }

  onDelete(itemId: number) {
    this.deleteItemSub = this.checklistService.delete(itemId).subscribe(
      (res: any) => {
        console.log(res + ' item deleted.');
        this.getListItemsFromServer();
      },
      err => {
        console.log(err);
      }
    )
  }

  onShowEdit(item: Item) {
    item.edited = true;
  }

  onUpdate(item:Item) {
    item.edited = false;
    this.updateItemSub = this.checklistService.update(item).subscribe(
      (res: number) => {
        console.log(res);
        this.getListItemsFromServer();
      },
      err => {
        console.log(err);
      }
    ) 
  }

  onClear() {
    this.deleteAllSub = this.checklistService.clear().subscribe(
      (res: number) => {
        console.log(res);
        this.getListItemsFromServer();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onAddBtn() {
    this.addTaskBtn = true;
  }

  onSaveNew() {
    this.addTaskBtn = false;

   const tempItem = new Item(this.newTask);
    this.addItemSub = this.checklistService.saveNew(tempItem).subscribe(
      (res: Item) => {
        console.log('res' + res);
        this.getListItemsFromServer();
        this.newTask = '';
      }, 
      (err) => {
        console.log(err);
      }
    )
  }
}
