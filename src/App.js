import React from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { GradientBackground } from 'gradient-background';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const [searchValue, setSearchValue] = React.useState(''); //new

  const dispatch = useDispatch();   // eslint-disable-next-line
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());  // eslint-disable-next-line
  }, [])

  return (
    <>
      {/* <GradientBackground color='secondary'/> */}
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Container maxWidth="lg">
        <Routes>
        <Route path="/" element={<Home searchValue={searchValue}/>} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />   
        </Routes>
      </Container>
    </>
  );
};

export default App;
