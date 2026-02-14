// Problem 3: delete the middle node of a singly linked list
// example: given 1 -> 2 -> 3 -> 4 -> 5, delete the middle node (3) to get 1 -> 2 -> 4 -> 5

import { LinkedList } from "./LinkedListClass";

function createList(): LinkedList<number> {
  const linkedList = new LinkedList<number>();
  linkedList.appendNode(1);
  linkedList.appendNode(2);
  linkedList.appendNode(3);
  linkedList.appendNode(4);
  linkedList.appendNode(5);
  return linkedList;
}

function deleteMidNode(list: LinkedList<number>): void {
    const length = list.findlength();
    if (length < 3) {
        console.log("List is too short to delete a middle node.");
        return;
    }

    let midIndex = Math.floor(length / 2);
    let current = list.head;

    while (midIndex >= 0) {
        if (!current) {
            throw new Error("List is shorter than expected.");
        }
        if (midIndex === 0) {
            list.deleteNode(current.data);
        }
        midIndex -= 1;
        current = current.next;
    }
    console.log("List after deleting the middle node:");
    list.printList();
}

deleteMidNode(createList());