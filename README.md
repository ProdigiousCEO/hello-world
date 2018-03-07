#include <iostream>
#include <stdlib.h> //srand, rand
#include <time.h>//clock_t, clock, CLOCKS_PER_SEC
using namespace std;

// implementing a queue using Stack


class Node {

private:
	int data;
	Node* nextNodePtr;
	Node* prevNodePtr;

public:
	Node() {}

	void setData(int d) {
		data = d;
	}

	int getData() {
		return data;
	}

	void setNextNodePtr(Node* nodePtr) {
		nextNodePtr = nodePtr;
	}

	Node* getNextNodePtr() {
		return nextNodePtr;
	}

	void setPrevNodePtr(Node* nodePtr) {
		prevNodePtr = nodePtr;
	}

	Node* getPrevNodePtr() {
		return prevNodePtr;
	}

};

class Stack {

private:
	Node* headPtr;
	Node* tailPtr;


public:
	Stack() {
		headPtr = new Node();
		tailPtr = new Node();
		headPtr->setNextNodePtr(0);
		tailPtr->setPrevNodePtr(0);
	}

	Node* getHeadPtr() {
		return headPtr;
	}

	Node* getTailPtr() {
		return tailPtr;
	}

	bool isEmpty() {

		if (headPtr->getNextNodePtr() == 0)
			return true;

		return false;
	}


	void push(int data) {

		Node* newNodePtr = new Node();
		newNodePtr->setData(data);
		newNodePtr->setNextNodePtr(0);

		Node* lastNodePtr = tailPtr->getPrevNodePtr();

		if (lastNodePtr == 0) {

			headPtr->setNextNodePtr(newNodePtr);
			newNodePtr->setPrevNodePtr(0);

		}
		else {

			lastNodePtr->setNextNodePtr(newNodePtr);
			newNodePtr->setPrevNodePtr(lastNodePtr);

		}

		tailPtr->setPrevNodePtr(newNodePtr);

	}


	int pop() {

		Node* lastNodePtr = tailPtr->getPrevNodePtr();
		Node* prevNodePtr = 0;

		int poppedData = -100000; //empty stack

		if (lastNodePtr != 0) {
			prevNodePtr = lastNodePtr->getPrevNodePtr();
			poppedData = lastNodePtr->getData();
		}
		else
			return poppedData;

		if (prevNodePtr != 0) {
			prevNodePtr->setNextNodePtr(0);
			tailPtr->setPrevNodePtr(prevNodePtr);
		}
		else {
			headPtr->setNextNodePtr(0);
			tailPtr->setPrevNodePtr(0);
		}

		return poppedData;

	}


	int peek() {

		Node* lastNodePtr = tailPtr->getPrevNodePtr();

		if (lastNodePtr != 0)
			return lastNodePtr->getData();
		else
			return -100000; //  empty stack

	}


	void IterativePrint() {

		Node* currentNodePtr = headPtr->getNextNodePtr();

		while (currentNodePtr != 0) {
			cout << currentNodePtr->getData() << " ";
			currentNodePtr = currentNodePtr->getNextNodePtr();
		}

		cout << endl;

	}



	void ReversePrint() {

		Node* currentNodePtr = tailPtr->getPrevNodePtr();

		while (currentNodePtr != 0) {

			cout << currentNodePtr->getData() << " ";
			currentNodePtr = currentNodePtr->getPrevNodePtr();
		}

		cout << endl;
	}






};


class Queue {

private:
	Stack stack1;
	Stack stack2;

public:
	Queue() {}

	void enqueue(int data) {

		// complete the code for the enqueue function


	}


	int dequeue() {

		// complete the code for the dequeue function



	}


	bool isEmpty() {

		// complete the code for the isEmpty function

	}


};

int main() {

	int queueSize;

	cout << "Enter the number of elements you want to insert: ";
	cin >> queueSize;

	Queue queue; // Create an empty queue

	srand(time(NULL));

	int maxValue;

	cout << "Enter the maximum value for an element: ";
	cin >> maxValue;


	for (int i = 0; i < queueSize; i++) {

		int value = 1 + rand() % maxValue;
		queue.enqueue(value);
		cout << value << " ";
	}

	cout << endl;


	while (!queue.isEmpty()) {

		cout << queue.dequeue() << " ";
	}

	cout << endl;

	return 0;
}
