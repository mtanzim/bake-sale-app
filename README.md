# React Native Bake Sale App

## Description

React native application suggested by the following lynda.com [tutorial](https://www.lynda.com/React-Native-tutorials/React-Native-Essential-Training/560343-2.html).

[Expo](https://expo.io/) is being used for development alongside an Android emulator.

## Lessons Learned

- Callbacks for setState
- What to put place in app state vs what to leave out?
  - Main question: Does the element impact UI or not?
  - [When does react re-render?](https://lucybain.com/blog/2017/react-js-when-to-rerender/)
    - > A re-render can only be triggered if a component’s state has changed. The state can change from a props change, or from a direct setState change. The component gets the updated state and React decides if it should re-render the component. Unfortunately, by default React is incredibly simplistic and basically re-renders everything all the time. Component changed? Re-render. Parent changed? Re-render. Section of props that doesn't actually impact the view changed? Re-render.
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox in React Native](https://facebook.github.io/react-native/docs/flexbox)
- Compoments can be remounted by changing the props on the parent (ie: `key`)
- [Canceling async/fetch commands as component unmounts](https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)
  - See example in [SingleDeal.js](./components/SingleDeal.js)
- [**ES6 Class Properties, this, contexts, and context binding with arrow functions**](https://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/)
- Examples of `componentWillReceiveProps()`
  - [components/EachDeal.js](components/EachDeal.js)