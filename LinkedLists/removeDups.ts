// Problem 1: remove dups from a unsorted linked list
import { LinkedList } from "./LinkedListClass";

function createList(): LinkedList<number> {
  const linkedList = new LinkedList<number>();
  linkedList.appendNode(3);
  linkedList.appendNode(1);
  linkedList.appendNode(2);
  linkedList.appendNode(4);
  linkedList.appendNode(2);
  return linkedList;
}

// with temporary buffer

function removeDups(list: LinkedList<number>): void {
  let obj: any = {};

  let current = list.head;

  while (current) {
    if (!obj[current.data]) {
      obj[current.data] = 1;
    } else {
      list.deleteNode(current.data);
    }
  }

}

// const list = createList();
// removeDups(list);
// list.printList();

// =============================================================================================
// without temporary buffer
function removeDupsNoBuffer(list: LinkedList<number>): void {
  let current = list.head;

  while (current) {
    let runner = current;
    while (runner.next) {
      if (runner.next.data === current.data) {
        list.deleteNode(runner.next.data);
      } else {
        runner = runner.next;
      }
    }
    current = current.next;
  }

}

const list = createList();
removeDups(list);



