import './home.css';
import { invoke } from '@tauri-apps/api/tauri';
import { Box } from '@chakra-ui/react';
import SimpleSidebar from '../components/SideBar';
import HomeContent from '../components/HomeContent';
import Footer from '../components/Footer';

function App() {
  return (

    <div className="App">
      <SimpleSidebar>
        <HomeContent />

      </SimpleSidebar>
      <Footer />
    </div>
  );
}

export default App;
