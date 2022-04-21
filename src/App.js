import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Locations from "./components/Locations";
import Characters from "./components/Characters";
import Character from './components/Character';
import Episodes from "./components/Episodes";
import Episode from "./components/Episode";
import './App.css';
//import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState(1);
  const [episodePage, setEpisodePage] = useState(1);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Characters page={page} setPage={setPage} />} />
          <Route path="/characters/:characterId" element={<Character />} />
          <Route path="/episodes/:episodeId" element={<Episode />} />
          <Route path="/episodes" element={<Episodes page={episodePage} setPage={setEpisodePage} />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
      {/*<ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
