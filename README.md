# React Native Random Number Game

Play the game [here](https://expo.io/@mtanzim/random-number-game).

## Description

React native application suggested by the following lynda.com [tutorial](https://www.lynda.com/React-Native-tutorials/React-Native-Essential-Training/560343-2.html).

[Expo](https://expo.io/) is being used for development alongside and Android emulator.

## Lessons Learned

- Callbacks for setState
- What to put place in app state vs what to leave out?
  - Main question: Does the element impact UI or not?
  - [When does react re-render?](https://lucybain.com/blog/2017/react-js-when-to-rerender/)
    - > A re-render can only be triggered if a component’s state has changed. The state can change from a props change, or from a direct setState change. The component gets the updated state and React decides if it should re-render the component. Unfortunately, by default React is incredibly simplistic and basically re-renders everything all the time. Component changed? Re-render. Parent changed? Re-render. Section of props that doesn't actually impact the view changed? Re-render.
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox in React Native](https://facebook.github.io/react-native/docs/flexbox)
- Compoments can be remounted by changing the props on the parent (ie: `key`)