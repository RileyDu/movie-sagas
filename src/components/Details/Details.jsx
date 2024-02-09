import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function Details() {
  const params = useParams();
  const details = useSelector(store => store.details);
  const history = useHistory()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS' });
  }, []);
  return (
    <>
      <h1>IN DETAILS PAGE</h1>

      <button onClick={() => history.push(`/`)}>BACK TO HOME</button>
    </>
  );
}
