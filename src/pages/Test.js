import { useState } from 'react'

export default function Test() {
  const [count, setCount] = useState(0)

  console.log("render");
  function changeCount(amount) {
    console.log("in", count);
    setCount((count) =>count + 1);
    console.log("mid", count);
    setCount((count) => count + 1);
    console.log("end", count);
  }

  function resetCount() {
    setCount(0)
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={() => changeCount(1)}>+</button>
      <button onClick={() => changeCount(-1)}>-</button>
      <button onClick={() => resetCount()}>Reset</button>
    </>
  )
}