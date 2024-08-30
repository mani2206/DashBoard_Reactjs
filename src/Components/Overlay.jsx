


const Overlay = ({ setModal, setOverlay }) => {
  
  const handleCancel = () => {
    setModal(false);
    setOverlay(false);
  };
  return (
    <div
      className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-slate-900 opacity-55 z-20"
      onClick={handleCancel}
    ></div>
  );
};

export default Overlay;
