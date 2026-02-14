// Problem 2: find the kth to last element of a singly linked list

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

function kthToLast(list: LinkedList<number>, length:number, kth: number): number {
  let current = list.head;

  let count = length - kth;

  while (count > 0) {
    if (!current) {
      throw new Error("k is larger than the length of the list");
    }
    current = current.next;
    count -= 1;

  }

  return current.data;
}

const list = createList();
list.printList();
const listLength = list.findlength();
console.log(kthToLast(list, listLength, 2)); // Change the value of k to find the kth to last element