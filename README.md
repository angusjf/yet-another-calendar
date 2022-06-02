# `yet-another-calendar`

A simple yet highly customizable calendar library for React.

Very simple API + Flexibility to match

## Usage

```js
import { Calendar, usePage } from "yet-another-calendar";

const Date = ({ date }) => <button>{date.getDate()}</button>;

const App = () => {
  const [page, { previous, next }] = usePage({
    month: "may",
    year: 2022,
  });

  return (
    <div>
      <div>
        <button onClick={previous}>⬅ </button>
        {page.month + " " + page.year}
        <button onClick={next}>⮕ </button>
      </div>
      <Calendar page={page} renderDate={Date} />
    </div>
  );
};
```

## Why this Calendar Library?

- **Complete behaviour flexibility**, support for:

  - **date pickers**
  - Multiple **range** selectors
  - Disabled dates
  - & more!

- **Simple** API
  - Just 2 props!
- All _styles_ can be controlled like any other React component
  - For example, using `styled-components`
- Fully **controlled**!
- Fully **typed**!
- Fully **tested**!
- Loads of **examples**!

## Motivation

Calendars shouldn't have a mind of their own.

Developers should be able to control their calendars with `props`!

This way the behaviour of the calendar is _predictable_ and _customisable_.

This library was built with the idea that the developer should have complete control over their components state. It is proof that 'dumb' components only allow for greater flexibility, but also make interfaces simpler!

