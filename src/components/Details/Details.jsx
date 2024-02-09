import { useParams, useEffect } from "react-router-dom";

export default function Details() {
  const params = useParams();

  return (
    <>
      <h1>IN DETAILS PAGE</h1>
      <button>BACK TO HOME</button>
    </>
  );
}
