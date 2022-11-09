import { useEffect, useState } from 'react'

export default function Test() {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  console.log("1");
  useEffect(() => {
    setCount1(5);
  }, [])
  console.log("2");
  useEffect(() => {
    setCount1(10);
  }, [])
  console.log("3");





  console.log("render");
  function changeCount(amount) {

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