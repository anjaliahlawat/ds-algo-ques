// Creating a LinkedList class

interface LinkedListNode<T> {
  data: T | null;
  next: LinkedListNode<T> | null;
}

export class LinkedList<T> {
  public head: LinkedListNode<T> = null;

  appendNode(data: T): void {
    const newNode: LinkedListNode<T> = {
      data,
      next: null,
    };

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  deleteNode(data: T): void {
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next ? current.next.next : null;
        return;
      }
      current = current.next;
    }
  }

  searchNode(data: T): LinkedListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  printList(): void {
    let current = this.head;
    let i = 1;
    while (current) {
      console.log(i, " => ", current.data);
      current = current.next;
      i += 1;
    }
  }

  findlength(): number {
    let current = this.head;
    let length = 0;
    while (current) {
      length += 1;
      current = current.next;
    }
    return length;
  }
}
