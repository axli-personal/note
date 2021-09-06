#### Cast

* From number to string: `String(num)`

* From string to intger: `parseInt(str)`

* From string to float: `parseFloat(str)`

* From others to boolean: `Boolean(other)`

#### Element

* `Element.parentNode`: Get the nearest parent element.
* `Element.children`: Get `HTMLCollection` which contains child elements.
* `HTMLCollection.length`: Get a read-only length.
* `HTMLCollection.item(index)`: Get element by index or get null.
* `HTMLCollection.namedItem(name)`: Get element by id's name or get null.

#### Document

* `Document.createElement(tagName)`: Get an element with specific tag.

#### Node

* `Node.appendChild(element)`: Append a element to the end of its children.
* `Node.insertBefore(element, reference)`: Apend a element before the reference.
* `Node.removeChild(element)`: Remove a element from its children and return them removed node.
* `Node.cloneNode()`: Get a cloned node.
