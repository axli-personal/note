# DOM

## Element

* `Element.innerHTML`: 获取元素内部的内容.
* `Element.children`: 返回一个元素的所有子元素.

对于自定义属性, 需要通过以下API进行操作; 根据规范自定义属性需要以`data-xxx`的形式命名.

* `Element.getAttribute()`: 获取属性.
* `Element.setAttribute(name, value)`: 设置属性.
* `Element.removeAttribute()`: 移除属性.

## HTMLCollection

* `HTMLCollection.length`: Get a read-only length.
* `HTMLCollection.item(index)`: Get element by index or get null.
* `HTMLCollection.namedItem(name)`: Get element by id's name or get null.

## Document

* `Document.createElement(tagName)`: Get an element with specific tag.

## Node

* `Node.parentNode`: 获取最近的父节点.
* `Node.appendChild(element)`: Append a element to the end of its children.
* `Node.insertBefore(element, reference)`: Apend a element before the reference.
* `Node.removeChild(element)`: Remove a element from its children and return them removed node.
* `Node.cloneNode()`: Get a cloned node.

## Event

事件委托: 给父元素绑定函数来处理子元素冒泡的事件.

* `Event.target`: 事件原始对象的引用.
* `Event.currentTarget`: 事件注册对象的引用.
* `Event.preventDefault`: 阻止默认动作的执行.
* `Event.stopPropagation()`: 阻止事件冒泡.