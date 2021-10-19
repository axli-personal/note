# General Concept

> ACID: Atomicity, Consistency, Isolation and Durability.

#### Concurrency Control

Multiversion bring less waiting time. But it will fail when there is colision.

So you may need to retry mutiple times to finish a transaction.

Lock-based increase waiting time. But it will success in most case.

#### Isolation Level

<u>Read uncommitted</u> and <u>Read committed</u> may get update data from other transanction.

<u>Repeatable reads</u> keep the data at the begaining of current transaction.

Flaw: the range-select will contain new data.

<u>Serializable</u> fix the flaw above and it is most reliable.

