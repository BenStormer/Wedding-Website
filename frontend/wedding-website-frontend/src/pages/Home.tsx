import parthenonSitting from '../assets/images/parthenon_sitting.jpg';

const Home = () => {
  return (
    <>
      <div className="home-content">
        <div className="wedding-details">
          <h1 className="names">Aspen & Ben</h1>
          <span>October 11, 2026</span>
          <br />
          <span>Noah Liff Opera Center</span>
          <span>Nashville, TN</span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={parthenonSitting}
              alt="Aspen and Ben sitting on the steps of the Nashville Parthenon"
              style={{
                maxWidth: '90vw',
                maxHeight: '75vh',
                borderRadius: '25px',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
