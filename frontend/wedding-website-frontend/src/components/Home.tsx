import parthenonSitting from "../assets/parthenon_sitting.jpg"

const Home = () => {
    return (
        <>
            <div className="Home">
                <div className="text">
                    <h1>
                        Ben test
                        Here
                    </h1>
                    <p>
                        Ben test paragraph
                    </p>
                    <p>
                        Ben test paragraph number 2
                    </p>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <img src={parthenonSitting} alt="Aspen and Ben sitting on the steps of the Nashville Parthenon" style={{ maxWidth: "90vw", maxHeight: "75vh", borderRadius: "25px" }} />
                </div>
            </div>
        </>
    )
}

export default Home;