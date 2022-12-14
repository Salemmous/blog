---
title: "SolidJS: First impression"
date: 2022-12-12T18:00:00.000Z
description: >-
    My first impression about SolidJS, one of the newest JavaScript frameworks
    frameworks.
image: /img/solidjs-example.png
---

JavaScript is famous for having new frameworks popping up every few weeks.
While it might be a dread to some, I find it fascinating and frankly cannot
stop marvelling at every improvement each one brings to the developer experience.
Today, I decided to give [SolidJS](https://www.solidjs.com/) a go, and here are my impressions.

## Premises

Every new framework tries to improve on what other frameworks provide. This is also
the case with SolidJS but in an unexpected way. If I had to sum it up very quickly,
I would say "React, but faster and smaller". It is quite weird to think that one of
its selling points is that it feels similar to React, but it makes sense. React is
the most popular of all the JavaScript frontend frameworks and has seen a lot of
declensions (React Native, Gatsby, Next, Remix, and surely some other). While I love
Svelte, I often have to go for React in new projects at work because most of the team is
already familiar with it.

## Faster than React?

SolidJS's implementation makes it faster than React. "How come?" you might wonder. The
answer is simple; the dreaded virtual dom. SolidJS does not use it to compute
manipulations to the dom. React on the other hand first renders a virtual dom, compares
it with the old one, and then updates the real dom. This is very simplified because 1.
the rendering process is quite complicated and could be its own article, and 2. I am
not educated enough on the topic to make further assertions.

## Creating components

Creating a component is very simple. It is created the same way as a React functional
component:

```jsx
const HelloWord = () => {
    return <h1>Hello world</h1>;
};
```

States can also be added to components, they are called "signals".

```jsx
const Counter = () => {
    const [counter, setCounter] = createSignal(0);
    return (
        <div>
            <h1>Counter: {counter()}</h1>
            <button onClick={() => setCounter((val) => val + 1)}>
                Increment
            </button>
        </div>
    );
};
```

This might seem normal to a React developer. `createSignal` is pretty much the equivalent
of `useState`. However, one thing might suprise them: `{counter()}`. Why is it called as
a function? Well that is because of the way SolidJS works. by calling it as a function,
the framework can remember that this exact part of the dom is to be updated when the signal
"counter" changes.

This way of working is also necessary because of how SolidJS calls the component functions.
In React, after each render of the component, its function would be called. SolidJS only calls
it once. The entire function is run once. `createSignal` is called only once.

This is also the reason why we do not need an equivalent of `useCallback` for the button click
event. The click handler function will anyway only be created once, regardless of its dependencies.

"How can I make computed values if the entire function is run once?" you may ask. And to that
SolidJS also has an answer. It even has two answers, based on your use case.

```jsx
const Counter = () => {
    const [counter, setCounter] = createSignal(0);
    // Equivalent of `doubleCounter = counter * 2;`in React
    const doubleCounter = () => counter() * 2;
    // Equivalent of `sqrtCounter = useMemo(() => Math.sqrt(counter), [counter]);`in React
    const sqrtCounter = createMemo(() => Math.sqrt(counter()));
    return (
        <div>
            <h1>Counter: {counter()}</h1>
            <button onClick={() => setCounter((val) => val + 1)}>
                Increment
            </button>
        </div>
    );
};
```

Thanks to calling signals as function, SolidJS also knows what are the dependencies of memos,
unlike React where one has to manually declare them.

## Quirks

All this seems very promising, but let's see some of the caveats.

### Dynamic components

If a component has a prop container another functional component, you have to wrap it
in a `Dynamic` component. If not, it might cause issues when rendering.

Correct

```jsx
<Dynamic component={LAYER_ICONS[props.layer.type]} />
```

Wrong

```jsx
{
    LAYER_ICONS[props.layer.type]({});
}
```

### Destructuring props

Destructuring components props can have the same effect as the previous point, it
might hinder the rendering process. The `props` argument should always stay the same
if needed be destructured within the function.

Correct

```jsx
const Greeting = (props) => {
    const { firstname, lastname } = props;
    return (
        <h1>
            Hello {firstname} {lastname}
        </h1>
    );
};
```

Wrong

```jsx
const Greeting = ({ firstname, lastname }) => {
    return (
        <h1>
            Hello {firstname} {lastname}
        </h1>
    );
};
```

## Conclusion

SolidJS provides an interesting alternative to React with an easy learning curve.
The out-of-the-box hot reload provided with its Vite setup is also very confortable
to work and fiddle with.

It is however not very forgiving on beginners. The documentation is still sparse
and there are not many resources available for learning. Its website has nice tutorials
and guides but it would be easier to debug with a more thorough documentation.

I think I will use it in my own personal projects but I will let it mature and monitor its
developement before considering using it at my workplace.
