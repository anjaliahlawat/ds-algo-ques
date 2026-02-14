// write code to partition a linked list around a value x, such that all nodes less than x come before nodes greater than or equal to x
// example: given 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 -> 7 and x = 5, return 3 -> 2 -> 1 -> 5 -> 8 -> 5 -> 10 -> 7

import { LinkedList } from "./LinkedListClass";

function createList(): LinkedList<number> {
  const linkedList = new LinkedList<number>();
  linkedList.appendNode(3);
  linkedList.appendNode(5);
  linkedList.appendNode(8);
  linkedList.appendNode(5);
  linkedList.appendNode(10);
  linkedList.appendNode(2);
  linkedList.appendNode(1);
  linkedList.appendNode(7);
  return linkedList;
}

function partitionList(list: LinkedList<number>, x: number): void {
  let current = list.head;

  while (current.next) {
    if (current.data >= x ) {
        
    }
  }
}
