import Header from "./Header";
import SearchForm from "./SearchForm";
import Table from "./Table";
import Tabs from "./Tabs";
import { useState } from "react";
import Overlay from "./Overlay";
import Modal from "./Modal";
import { DataProvider } from "../context/DataContext";

const Homepage = () => {
  const [modal, setModal] = useState(false);
  const [overlay, setOverlay] = useState(false);

  return (
    <div className="xl:ml-[70px] grow overflow-y-auto overflow-x-hidden">
      <DataProvider>
        <Header />
        <SearchForm setModal={setModal} setOverlay={setOverlay} />
        <Tabs />
        <Table />
        {overlay && (
          <Overlay
            modal={modal}
            overlay={overlay}
            setModal={setModal}
            setOverlay={setOverlay}
          />
        )}
        {modal && <Modal setModal={setModal}
            setOverlay={setOverlay}/>}
      </DataProvider>
    </div>
  );
};

export default Homepage;
